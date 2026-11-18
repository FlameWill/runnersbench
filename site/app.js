const COLORS = ["#4269d0", "#efb118", "#ff725c", "#6cc5b0", "#3ca951", "#ff8ab7", "#a463f2", "#97bbf5", "#9c6b4e", "#9498a0"];

function el(tag, props = {}, ...children) {
  const node = Object.assign(document.createElement(tag), props);
  node.append(...children.filter((c) => c !== null && c !== undefined));
  return node;
}

function fmt(value, metric) {
  if (value === null || value === undefined) return "–";
  if (metric.label.startsWith("$")) return `$${value.toFixed(4)}`;
  if (Math.abs(value) >= 100) return Math.round(value).toLocaleString("en-US");
  return value.toFixed(1);
}

function table(node, headers, rows) {
  node.append(el("thead", {}, el("tr", {}, ...headers.map((h) => el("th", { textContent: h })))));
  node.append(el("tbody", {}, ...rows.map((cells) => el("tr", {}, ...cells))));
}

function textCell(text, className = "") {
  return el("td", { className, textContent: text ?? "–" });
}

function runnerCell(runner, color) {
  return el("td", {}, el("span", { className: "swatch", style: `background:${color(runner.provider)}` }),
    el("code", { textContent: runner.label }));
}

function best(runners, metric) {
  const values = runners.map((r) => r.medians[metric.key]).filter((v) => v !== null);
  if (values.length < 2) return null;
  return metric.higher_is_better ? Math.max(...values) : Math.min(...values);
}

function renderTables(data, color) {
  const { runners, metrics } = data;
  table(
    document.getElementById("runners"),
    ["Provider", "Label", "Arch", "CPU", "vCPUs", "Memory (GiB)", "Disk (GB)", "$/min", "Virtualization", "Location", "Network", "Samples"],
    runners.map((r) => [
      textCell(r.provider), runnerCell(r, color), textCell(r.arch), textCell(r.cpu_models.join(", ")),
      textCell(r.vcpus, "num"), textCell(r.memory_gib, "num"), textCell(r.disk_gb, "num"),
      textCell(r.price_per_minute === null ? null : `$${r.price_per_minute}`, "num"), textCell(r.virtualization),
      textCell(r.location), textCell(r.network), textCell(r.samples.length, "num"),
    ]),
  );

  const bests = Object.fromEntries(metrics.map((m) => [m.key, best(runners, m)]));
  table(
    document.getElementById("benchmarks"),
    ["Label", ...metrics.map((m) => m.label)],
    runners.map((r) => [
      runnerCell(r, color),
      ...metrics.map((m) => {
        const value = r.medians[m.key];
        return textCell(fmt(value, m), value !== null && value === bests[m.key] ? "num best" : "num");
      }),
    ]),
  );
}

function renderBarCharts(data, color) {
  const container = document.getElementById("charts");
  for (const metric of data.metrics) {
    const runners = data.runners.filter((r) => r.medians[metric.key] !== null);
    if (!runners.length) continue;
    runners.sort((a, b) => (b.medians[metric.key] - a.medians[metric.key]) * (metric.higher_is_better ? 1 : -1));
    const canvas = el("canvas");
    container.append(el("div", { className: "chart" },
      el("h3", {}, metric.label, el("span", { textContent: metric.higher_is_better ? " · higher is better" : " · lower is better" })),
      el("div", { style: `height:${runners.length * 28 + 40}px;position:relative` }, canvas)));
    new Chart(canvas, {
      type: "bar",
      data: {
        labels: runners.map((r) => r.label),
        datasets: [{
          data: runners.map((r) => r.medians[metric.key]),
          backgroundColor: runners.map((r) => color(r.provider)),
        }],
      },
      options: {
        indexAxis: "y",
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: (ctx) => fmt(ctx.parsed.x, metric) } },
        },
        scales: { x: { beginAtZero: true } },
      },
    });
  }
}

function renderHistory(data, color) {
  const select = document.getElementById("history-metric");
  for (const metric of data.metrics) select.append(el("option", { value: metric.key, textContent: metric.label }));
  select.value = "redis_build";

  const chart = new Chart(document.getElementById("history"), {
    type: "line",
    data: { datasets: [] },
    options: {
      maintainAspectRatio: false,
      interaction: { mode: "nearest", intersect: false },
      scales: {
        x: { type: "linear", ticks: { callback: (v) => new Date(v).toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) } },
        y: { beginAtZero: true },
      },
      plugins: {
        tooltip: {
          callbacks: {
            title: (items) => new Date(items[0].parsed.x).toLocaleString(),
            label: (ctx) => `${ctx.dataset.label}: ${fmt(ctx.parsed.y, ctx.chart.$metric)}`,
          },
        },
      },
    },
  });

  const update = () => {
    const metric = data.metrics.find((m) => m.key === select.value);
    chart.$metric = metric;
    chart.data.datasets = data.runners.map((r) => ({
      label: r.label,
      data: r.samples
        .filter((s) => s.values[metric.key] !== null)
        .map((s) => ({ x: Date.parse(s.started_at), y: s.values[metric.key] })),
      borderColor: color(r.provider),
      backgroundColor: color(r.provider),
      borderDash: r.arch === "arm64" ? [6, 4] : [],
    }));
    chart.update();
  };
  select.addEventListener("change", update);
  update();
}

function renderErrors(data) {
  if (!data.errors.length) return;
  document.getElementById("errors-section").hidden = false;
  document.getElementById("errors").append(...data.errors.map((e) =>
    el("li", {}, el("code", { textContent: e.label }), ` ${e.benchmark} (run ${e.run_id}): ${e.error}`)));
}

async function main() {
  const data = await (await fetch("data.json", { cache: "no-cache" })).json();
  const providers = [...new Set(data.runners.map((r) => r.provider))].sort();
  const color = (provider) => COLORS[providers.indexOf(provider) % COLORS.length];

  document.getElementById("meta").textContent =
    `${data.sample_count} samples from ${data.run_count} workflow runs, last updated ${new Date(data.generated_at).toLocaleString()}.`;
  renderTables(data, color);
  renderBarCharts(data, color);
  renderHistory(data, color);
  renderErrors(data);
}

main();

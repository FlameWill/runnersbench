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
  node.append(el("thead", {}, el("tr", {}, ...headers.map((h) => (typeof h === "string" ? el("th", { textContent: h }) : h)))));
  node.append(el("tbody", {}, ...rows.map((cells) => el("tr", {}, ...cells))));
}

function textCell(text, className = "") {
  return el("td", { className, textContent: text ?? "–" });
}

function runnerCell(runner, color, tag = "td") {
  return el(tag, {}, el("span", { className: "swatch", style: `background:${color(runner.provider)}` }),
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
    ["Label", "Provider", "Arch", "CPU", "vCPUs", "Memory (GiB)", "Disk (GB)", "$/min", "Virtualization", "Location", "Network", "Samples"],
    runners.map((r) => [
      runnerCell(r, color), textCell(r.provider), textCell(r.arch), textCell(r.cpu_models.join(", ")),
      textCell(r.vcpus, "num"), textCell(r.memory_gib, "num"), textCell(r.disk_gb, "num"),
      textCell(r.price_per_minute === null ? null : `$${r.price_per_minute}`, "num"), textCell(r.virtualization),
      textCell(r.location), textCell(r.network), textCell(r.sample_count, "num"),
    ]),
  );

  const bests = Object.fromEntries(metrics.map((m) => [m.key, best(runners, m)]));
  table(
    document.getElementById("benchmarks"),
    ["Metric", ...runners.map((r) => runnerCell(r, color, "th"))],
    metrics.map((m) => [
      el("td", {}, m.label, el("span", { className: "hint", textContent: m.higher_is_better ? "higher is better" : "lower is better" })),
      ...runners.map((r) => {
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

  document.getElementById("meta").append(
    `Results from ${new Date(data.generated_at).toLocaleString()}, `,
    ...data.runs.flatMap((run, i) => [i ? ", " : "", el("a", { href: run.url, textContent: `workflow run ${run.run_id}` })]),
    ".",
  );
  renderTables(data, color);
  renderBarCharts(data, color);
  renderErrors(data);
}

main();

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

function runnerCell(runner, color) {
  return el("td", {}, el("span", { className: "swatch", style: `background:${color(runner.provider)}` }),
    el("code", { textContent: runner.label }));
}

function providerCell(runner, color) {
  return el("th", { title: runner.label }, el("span", { className: "swatch", style: `background:${color(runner.provider)}` }),
    runner.provider_name);
}

function hint(metric) {
  const text = metric.higher_is_better ? "higher is better" : "lower is better";
  const node = el("span", { className: "hint", title: text, textContent: text });
  node.dataset.short = metric.higher_is_better ? "↑" : "↓";
  return node;
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
    ["Label", "Provider", "Arch", "CPU", "vCPUs", "Memory (GiB)", "Disk (GB)", "$/min", "Virtualization", "Location", "Network", "Samples", "Measured"],
    runners.map((r) => [
      runnerCell(r, color), textCell(r.provider_name), textCell(r.arch), textCell(r.cpu_models.join(", ")),
      textCell(r.vcpus, "num"), textCell(r.memory_gib, "num"), textCell(r.disk_gb, "num"),
      textCell(r.price_per_minute === null ? null : `$${r.price_per_minute}`, "num"), textCell(r.virtualization),
      textCell(r.location), textCell(r.network), textCell(r.sample_count, "num"),
      el("td", {}, el("a", { href: r.run_url, textContent: new Date(r.measured_at).toLocaleDateString() })),
    ]),
  );

  const bests = Object.fromEntries(metrics.map((m) => [m.key, best(runners, m)]));
  table(
    document.getElementById("benchmarks"),
    ["Metric", ...runners.map((r) => providerCell(r, color))],
    metrics.map((m) => [
      el("td", {}, m.label, hint(m)),
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
        labels: runners.map((r) => r.provider_name),
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

  document.getElementById("meta").textContent =
    `Benchmark version ${data.benchmark_versions.join(", ")}. Each runner shows its latest results at this version; ` +
    "the Measured column links to the run they came from.";
  renderTables(data, color);
  renderBarCharts(data, color);
  renderErrors(data);
}

main();

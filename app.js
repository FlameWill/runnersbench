const COLORS = ["#4269d0", "#efb118", "#ff725c", "#6cc5b0", "#3ca951", "#ff8ab7", "#a463f2", "#97bbf5", "#9c6b4e", "#9498a0"];
let color = () => COLORS[0];

const HEADLINES = [
  ["redis_build", "fastest redis build"],
  ["redis_cost", "cheapest redis build"],
  ["cpu_multi", "most cpu throughput"],
  ["queue", "shortest queue"],
];

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

function compact(value, metric) {
  if (value === null || value === undefined || Math.abs(value) < 10000) return fmt(value, metric);
  return Math.abs(value) < 100000 ? `${(value / 1000).toFixed(1)}k` : `${Math.round(value / 1000)}k`;
}

function unit(metric) {
  const match = metric.label.match(/\(([^)]+)\)$/);
  return match ? ` ${match[1]}` : "";
}

function table(node, headers, rows) {
  node.append(el("thead", {}, el("tr", {}, ...headers.map((h) => (typeof h === "string" ? el("th", { textContent: h }) : h)))));
  node.append(el("tbody", {}, ...rows.map((cells) => el("tr", {}, ...cells))));
}

function textCell(text, className = "") {
  return el("td", { className, textContent: text ?? "–" });
}

function swatch(runner) {
  return el("span", { className: "swatch", style: `background:${color(runner.provider)}` });
}

function hint(metric) {
  const text = metric.higher_is_better ? "higher is better" : "lower is better";
  const node = el("span", { className: "hint", title: text, textContent: metric.higher_is_better ? "↑" : "↓" });
  node.setAttribute("aria-label", text);
  return node;
}

function ranked(runners, metric) {
  return runners
    .filter((r) => r.medians[metric.key] !== null)
    .sort((a, b) => (b.medians[metric.key] - a.medians[metric.key]) * (metric.higher_is_better ? 1 : -1));
}

function best(runners, metric) {
  const order = ranked(runners, metric);
  return order.length > 1 ? order[0].medians[metric.key] : null;
}

function renderStats(data) {
  const container = document.getElementById("stats");
  for (const [key, label] of HEADLINES) {
    const metric = data.metrics.find((m) => m.key === key);
    const winner = metric && ranked(data.runners, metric)[0];
    if (!winner) continue;
    const winners = ranked(data.runners, metric).filter((r) => r.medians[key] === winner.medians[key]);
    container.append(el("div", { className: "stat" },
      el("div", { className: "label", textContent: label }),
      el("div", { className: "value" }, fmt(winner.medians[key], metric),
        el("span", { className: "unit", textContent: metric.label.startsWith("$") ? "" : unit(metric) })),
      el("div", { className: "who" }, ...winners.flatMap((r, i) => [i ? ", " : "", swatch(r), r.provider_name]))));
  }
}

function renderTables(data) {
  const { runners, metrics } = data;
  const bests = Object.fromEntries(metrics.map((m) => [m.key, best(runners, m)]));
  document.getElementById("benchmarks-caption").textContent =
    `${runners.length} runners · ${metrics.length} metrics · benchmark v${data.benchmark_versions.join(", ")}`;
  table(
    document.getElementById("benchmarks"),
    ["Metric", ...runners.map((r) => el("th", { className: "provider", title: r.label, style: `border-top-color:${color(r.provider)}`, textContent: r.provider_name }))],
    metrics.map((m) => [
      el("td", {}, m.label, hint(m)),
      ...runners.map((r) => {
        const value = r.medians[m.key];
        const cell = textCell(compact(value, m), value !== null && value === bests[m.key] ? "num best" : "num");
        cell.title = fmt(value, m);
        return cell;
      }),
    ]),
  );

  document.getElementById("runners-caption").textContent = `${runners.length} runners · as reported by each machine`;
  table(
    document.getElementById("runners"),
    ["Provider", "Label", "Arch", "CPU", "vCPUs", "Memory (GiB)", "Disk (GB)", "$/min", "Virtualization", "Location", "Network", "Samples", "Measured"],
    runners.map((r) => [
      el("td", {}, swatch(r), r.provider_name), el("td", {}, el("code", { textContent: r.label })), textCell(r.arch),
      textCell(r.cpu_models.join(", ")), textCell(r.vcpus, "num"), textCell(r.memory_gib, "num"), textCell(r.disk_gb, "num"),
      textCell(r.price_per_minute === null ? null : `$${r.price_per_minute}`, "num"), textCell(r.virtualization),
      textCell(r.location), textCell(r.network), textCell(r.sample_count, "num"),
      el("td", {}, el("a", { href: r.run_url, textContent: new Date(r.measured_at).toLocaleDateString() })),
    ]),
  );
}

function renderBoards(data) {
  const container = document.getElementById("boards");
  for (const metric of data.metrics) {
    const order = ranked(data.runners, metric);
    if (!order.length) continue;
    const max = Math.max(...order.map((r) => r.medians[metric.key]));
    const top = best(data.runners, metric);
    container.append(el("div", { className: "board" },
      el("h3", {}, metric.label, hint(metric)),
      ...order.map((r) => {
        const value = r.medians[metric.key];
        const fill = el("div", { className: "fill" });
        fill.style.width = `${max > 0 ? (value / max) * 100 : 0}%`;
        fill.style.background = color(r.provider);
        return el("div", { className: value === top ? "row best" : "row", title: r.label },
          el("span", { className: "name" }, swatch(r), r.provider_name),
          el("div", { className: "track" }, fill),
          el("span", { className: "val", textContent: fmt(value, metric) }));
      })));
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
  color = (provider) => COLORS[providers.indexOf(provider) % COLORS.length];
  document.getElementById("meta").textContent =
    `benchmark v${data.benchmark_versions.join(", ")} · ${data.runners.length} runners · updated ${new Date(data.generated_at).toLocaleDateString()}`;
  renderStats(data);
  renderTables(data);
  renderBoards(data);
  renderErrors(data);
}

main();

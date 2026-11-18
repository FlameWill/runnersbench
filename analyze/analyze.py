#!/usr/bin/env python3
"""Summarise benchmark results into a Markdown report.

Accepts result files written by bench/run.py, or combined results.json files
written by this script, and any directories containing them. Multiple samples
of the same runner label are reduced to their median.
"""

import argparse
import json
import os
import statistics
import subprocess
from collections import defaultdict
from datetime import datetime


def load(paths):
    results = {}
    for path in paths:
        files = [path] if os.path.isfile(path) else [
            os.path.join(root, name) for root, _, names in os.walk(path) for name in names if name.endswith(".json")
        ]
        for file in sorted(files):
            with open(file) as f:
                data = json.load(f)
            for result in data if isinstance(data, list) else [data]:
                if "benchmarks" not in result:
                    continue
                gh, spec = result["github"], result["spec"]
                key = (gh["run_id"], gh["run_attempt"], spec.get("label"), spec.get("rep"))
                if "timing" in results.get(key, {}) and "timing" not in result:
                    continue
                results[key] = result
    return list(results.values())


def job_name(spec):
    return f"{spec['label']} ({spec['rep']})"


def parse_time(value):
    return datetime.fromisoformat(value.replace("Z", "+00:00")) if value else None


def add_job_timing(results):
    """Add queue and job durations from the GitHub API; needs `gh` and a token with actions:read."""
    runs = {(r["github"]["repository"], r["github"]["run_id"], r["github"]["run_attempt"]) for r in results}
    jobs = {}
    for repo, run_id, attempt in runs:
        out = subprocess.run(
            ["gh", "api", "--paginate", f"repos/{repo}/actions/runs/{run_id}/attempts/{attempt}/jobs",
             "--jq", ".jobs[] | [.name, .created_at, .started_at, .completed_at] | @tsv"],
            capture_output=True, text=True, check=True,
        ).stdout
        for line in out.splitlines():
            name, created, started, completed = (line.split("\t") + [""] * 4)[:4]
            jobs[(run_id, attempt, name)] = (parse_time(created), parse_time(started), parse_time(completed))
    for r in results:
        created, started, completed = jobs.get((r["github"]["run_id"], r["github"]["run_attempt"], job_name(r["spec"])), (None,) * 3)
        r["timing"] = {
            "queue_seconds": (started - created).total_seconds() if created and started else None,
            "job_seconds": (completed - started).total_seconds() if started and completed else None,
        }


def get(obj, *path):
    for key in path:
        if not isinstance(obj, dict) or obj.get(key) is None:
            return None
        obj = obj[key]
    return obj


def cost_per_build(r):
    price, seconds = get(r, "spec", "price_per_minute"), get(r, "benchmarks", "compile_redis", "seconds")
    return price * seconds / 60 if price is not None and seconds is not None else None


# (column header, extractor, higher_is_better)
METRICS = [
    ("Queue (s)", lambda r: get(r, "timing", "queue_seconds"), False),
    ("apt install (s)", lambda r: get(r, "benchmarks", "apt_install", "seconds"), False),
    ("CPU 1 thread (events/s)", lambda r: get(r, "benchmarks", "cpu_single", "events_per_second"), True),
    ("CPU all threads (events/s)", lambda r: get(r, "benchmarks", "cpu_multi", "events_per_second"), True),
    ("Memory (MiB/s)", lambda r: get(r, "benchmarks", "memory", "mib_per_second"), True),
    ("Seq read (MB/s)", lambda r: get(r, "benchmarks", "disk", "seq_read", "mb_per_second"), True),
    ("Seq write (MB/s)", lambda r: get(r, "benchmarks", "disk", "seq_write", "mb_per_second"), True),
    ("4k rand read (IOPS)", lambda r: get(r, "benchmarks", "disk", "rand_read", "iops"), True),
    ("4k rand write (IOPS)", lambda r: get(r, "benchmarks", "disk", "rand_write", "iops"), True),
    ("Download (MB/s)", lambda r: get(r, "benchmarks", "download_cloudflare", "mb_per_second"), True),
    ("Redis build (s)", lambda r: get(r, "benchmarks", "compile_redis", "seconds"), False),
    ("$ per Redis build", cost_per_build, False),
]


def fmt(value, header=""):
    if value is None:
        return "–"
    if header.startswith("$"):
        return f"${value:.4f}"
    if abs(value) >= 100:
        return f"{value:,.0f}"
    return f"{value:.1f}"


def table(headers, rows):
    lines = ["| " + " | ".join(headers) + " |", "|" + "---|" * len(headers)]
    lines += ["| " + " | ".join(str(c) for c in row) + " |" for row in rows]
    return "\n".join(lines)


def report(results):
    by_label = defaultdict(list)
    for r in results:
        by_label[(r["spec"].get("provider"), r["spec"].get("label"))].append(r)
    groups = sorted(by_label.items(), key=lambda kv: (kv[1][0]["spec"].get("arch", ""), kv[0]))

    info_rows = []
    for (provider, label), samples in groups:
        latest = max(samples, key=lambda r: r["started_at"])
        system = latest["system"]
        cpu_models = sorted({get(r, "system", "cpu", "model") or "?" for r in samples})
        mem = get(system, "memory", "total_bytes")
        disk = get(system, "disk", "total_bytes")
        net = system.get("network") or {}
        info_rows.append([
            provider, f"`{label}`", "<br>".join(cpu_models), get(system, "cpu", "available_cpus"),
            f"{mem / 2**30:.1f}" if mem else "–", f"{disk / 1e9:.0f}" if disk else "–",
            system.get("virtualization") or "–", ", ".join(filter(None, [net.get("city"), net.get("country")])) or "–",
            net.get("org") or "–", len(samples),
        ])

    medians = []
    for _, samples in groups:
        row = []
        for _, extract, _ in METRICS:
            values = [v for v in map(extract, samples) if v is not None]
            row.append(statistics.median(values) if values else None)
        medians.append(row)

    bench_rows = []
    for ((provider, label), _), row in zip(groups, medians):
        cells = [provider, f"`{label}`"]
        for i, (header, _, higher_is_better) in enumerate(METRICS):
            column = [m[i] for m in medians if m[i] is not None]
            best = (max if higher_is_better else min)(column) if len(column) > 1 else None
            text = fmt(row[i], header)
            cells.append(f"**{text}**" if row[i] is not None and row[i] == best else text)
        bench_rows.append(cells)

    errors = [
        f"- `{r['spec'].get('label')}` {name}: {str(b['error']).splitlines()[0]}"
        for r in results for name, b in r["benchmarks"].items() if isinstance(b, dict) and "error" in b
    ]

    sections = [
        "# Runner benchmark report",
        f"{len(results)} samples from {len({r['github']['run_id'] for r in results})} workflow run(s). "
        "Benchmark values are medians across samples; the best value in each column is bold.",
        "## Runners",
        table(["Provider", "Label", "CPU", "vCPUs", "Memory (GiB)", "Disk (GB)", "Virtualization", "Location",
               "Network", "Samples"], info_rows),
        "## Benchmarks",
        table(["Provider", "Label"] + [h for h, _, _ in METRICS], bench_rows),
    ]
    if errors:
        sections += ["## Errors", "\n".join(errors)]
    return "\n\n".join(sections) + "\n"


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("paths", nargs="+", help="result files or directories")
    parser.add_argument("--job-timing", action="store_true", help="fetch queue times from the GitHub API")
    parser.add_argument("--json", help="write combined results to this file")
    parser.add_argument("--markdown", help="write the report to this file instead of stdout")
    args = parser.parse_args()

    results = load(args.paths)
    if not results:
        parser.error("no results found")
    if args.job_timing:
        add_job_timing(results)

    for path in (args.json, args.markdown):
        if path:
            os.makedirs(os.path.dirname(os.path.abspath(path)), exist_ok=True)
    if args.json:
        with open(args.json, "w") as f:
            json.dump(results, f, indent=2)
    text = report(results)
    if args.markdown:
        with open(args.markdown, "w") as f:
            f.write(text)
    else:
        print(text)


if __name__ == "__main__":
    main()

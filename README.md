# CI runner benchmarks

Benchmarks GitHub Actions runner providers (GitHub-hosted, Avrea, Buildkite, Checklane, Depot,
luxor.ai, WarpBuild, ...) side by side on the same workloads.

## How it works

`.github/workflows/benchmark.yml` runs weekly and on demand:

1. **setup** reads `providers.json` and builds a job matrix of enabled runners,
   skipping any that already have results for the current benchmark version
   (see [Versioning](#versioning)).
2. **bench** runs `bench/run.py` once per runner (and per repetition). It records
   hardware and environment details and runs the benchmarks below, then uploads
   `result.json` as an artifact.
3. **analyze** merges every result, adds queue times from the GitHub API, writes
   a report to the job summary, and uploads `combined-results` (the report and
   all results as JSON). On `main`, `scripts/publish.sh` stores the new results
   on the `gh-pages` branch and rebuilds the site from the stored results of
   every enabled runner.

Results are published at <https://runnersbench.com/>. The page
itself lives in `site/`; `analyze.py --summary` produces the `data.json` it reads.

### What gets collected

| Area | Details |
|---|---|
| System | CPU model, vendor, core count, cgroup limits, CPU flags, memory, disk and filesystem, kernel, image version, virtualization, DMI vendor, public IP location and network owner |
| Queue time | Time between the job being created and a runner picking it up |
| Package install | Linux: `apt-get update` and installing `sysbench`, `fio` and `build-essential`. macOS: `brew install sysbench fio` without `brew update` |
| CPU | `sysbench cpu` with 1 thread and with all threads. Skipped on macOS, where Homebrew's sysbench reports impossible scores |
| Memory | `sysbench memory`, single-thread bandwidth |
| Disk | `fio` sequential read/write (1M blocks) and 4k random read/write IOPS on the runner's work disk |
| Network | 50 MB download from Cloudflare, Redis source download from GitHub |
| Real build | `make -j$(nproc)` of Redis, plus what a job of that length costs at the runner's list price and billing granularity (see below) |

## Running

Run **Benchmark** from the Actions tab. Set `providers` (e.g. `luxor`) to
only run some providers, `repetitions` to collect several samples per runner
(the report uses the median), and `force` to re-run runners that already have
results.

### Versioning

`bench/VERSION` holds the benchmark version, and every result records it.
Results are stored per runner on the `gh-pages` branch as
`results/v<version>/<label>.json`, and a run only benchmarks enabled runners
with no stored result at the current version. So the weekly schedule only picks
up new providers or changed labels, and the site shows each runner's latest
result at the current version.

- **Bump `bench/VERSION`** when a change to the benchmarks makes new numbers
  incomparable with stored ones (for example a new test, a different duration
  or Redis version). The next run re-benchmarks every runner. Changes that
  don't affect the numbers don't need a bump.
- **Use `force`** to re-measure runners without changing the benchmarks, e.g.
  when a provider changes its hardware. It replaces their stored result.
- **Prices and names** are read from `providers.json` when the site is built,
  so fixing a price doesn't need a re-run.

To rebuild the report for a run locally:

```sh
gh run download <run id> --name combined-results --dir combined
python analyze/analyze.py combined
```

## Adding a provider

1. Install the provider's GitHub App on the account that owns this repo.
2. Add an entry to `providers.json`:

   ```json
   {
     "provider": "example",
     "label": "example-4vcpu-ubuntu-2404",
     "arch": "x64",
     "vcpu": 4,
     "memory_gb": 16,
     "price_per_minute": 0.008,
     "billing": {"increment_seconds": 60},
     "enabled": true,
     "pricing_source": "https://example.com/pricing"
   }
   ```

   `arch` is `x64` or `arm64`; the site shows each architecture on its own tab.
   Add `"os": "macos"` for Apple Silicon runners, which get a separate macOS
   tab. Mac runners don't share a common size, so use the provider's smallest
   Apple Silicon size on macOS 26 (the version every provider offers).
   `label` is the `runs-on` value. Pick the provider's 4 vCPU size so every
   runner is compared at the same core count. `price_per_minute` may be `null`
   if unknown.
   `billing` describes how the provider rounds each job's duration, which
   matters because most jobs are short: `increment_seconds` is `1` for
   per-second billing or `60` for per-minute billing rounded up, and optional
   `minimum_seconds` and `grace_seconds` (seconds past a minute that aren't
   charged) cover rules like Namespace's. The Redis build cost is charged as if
   the build were its own job.
   Set `enabled: false` to stop running a runner without losing its entry.

### Buildkite

Buildkite doesn't run GitHub Actions jobs, so it works differently. Entries
with a `buildkite` object are run by the `bench-buildkite` job, which starts a
build of `.buildkite/pipeline.yml` through the Buildkite API, waits for it, and
downloads its `result.json`. Queue time comes from Buildkite rather than GitHub.

One-time setup:

1. In Buildkite, create a cluster with a hosted Linux queue using the Medium
   AMD64 shape (4 vCPU, 16 GB). Its key must match `buildkite.queue` in
   `providers.json` (`linux-medium`).
2. Create a pipeline named `runners` (or set `buildkite.pipeline`) for this
   repository in that cluster, with the steps:

   ```yaml
   steps:
     - command: buildkite-agent pipeline upload
   ```

   Turn off building on pushes and pull requests; builds should only come from
   the workflow. The step in `.buildkite/pipeline.yml` is skipped without a
   `RUNNER_SPEC` anyway.
3. Create an API access token with `read_builds`, `write_builds` and
   `read_artifacts`, and save it as the `BUILDKITE_API_TOKEN` Actions secret.
4. Check `buildkite.organization` and set `enabled: true`.

## Caveats

- A label that no runner serves leaves its job queued (up to 24 hours) and
  delays the report. Disable runners you lose access to.
- All runners run at the same time, so results reflect one moment of each
  provider's capacity. Use repetitions and the weekly schedule to smooth that out.
- GitHub's standard `ubuntu-24.04` runner has 4 vCPUs only because this repo is
  public (private repos get 2). Its price is GitHub's 4-core larger runner rate,
  since the public-repo runner is free.
- Prices in `providers.json` are list prices at the time of writing; check them
  against each provider's pricing page.

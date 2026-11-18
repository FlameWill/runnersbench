# CI runner benchmarks

Benchmarks GitHub Actions runner providers (GitHub-hosted, Blacksmith, Depot,
Tenki/luxor.ai, ...) side by side on the same workloads.

## How it works

`.github/workflows/benchmark.yml` runs weekly and on demand:

1. **setup** reads `providers.json` and builds a job matrix of enabled runners.
2. **bench** runs `bench/run.py` once per runner (and per repetition). It records
   hardware and environment details and runs the benchmarks below, then uploads
   `result.json` as an artifact.
3. **analyze** merges every result, adds queue times from the GitHub API, writes
   a report to the job summary, and uploads `combined-results` (the report and
   all results as JSON).

### What gets collected

| Area | Details |
|---|---|
| System | CPU model, vendor, core count, cgroup limits, CPU flags, memory, disk and filesystem, kernel, image version, virtualization, DMI vendor, public IP location and network owner |
| Queue time | Time between the job being created and a runner picking it up |
| apt install | `apt-get update` and installing `sysbench`, `fio` and `build-essential` |
| CPU | `sysbench cpu` with 1 thread and with all threads |
| Memory | `sysbench memory`, single-thread bandwidth |
| Disk | `fio` sequential read/write (1M blocks) and 4k random read/write IOPS on the runner's work disk |
| Network | 50 MB download from Cloudflare, Redis source download from GitHub |
| Real build | `make -j$(nproc)` of Redis, plus the cost of that build at the runner's list price |

## Running

Run **Benchmark** from the Actions tab. Set `providers` (e.g. `depot,tenki`) to
only run some providers, and `repetitions` to collect several samples per
runner; the report uses the median.

To analyse every past run locally:

```sh
mise run analyze            # or: LIMIT=200 scripts/fetch-history.sh
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
     "enabled": true,
     "pricing_source": "https://example.com/pricing"
   }
   ```

   `label` is the `runs-on` value. `price_per_minute` may be `null` if unknown.
   Set `enabled: false` to stop running a runner without losing its entry.

## Caveats

- A label that no runner serves leaves its job queued (up to 24 hours) and
  delays the report. Disable runners you lose access to.
- All runners run at the same time, so results reflect one moment of each
  provider's capacity. Use repetitions and the weekly schedule to smooth that out.
- GitHub's standard runners have 4 vCPUs on public repos and 2 on private ones;
  the report shows the vCPUs actually seen.
- Prices in `providers.json` are list prices at the time of writing; check them
  against each provider's pricing page.

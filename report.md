# Runner benchmark report

5 samples from 3 workflow run(s). Benchmark values are medians across samples; the best value in each column is bold.

## Runners

| Provider | Label | CPU | vCPUs | Memory (GiB) | Disk (GB) | Virtualization | Location | Network | Samples |
|---|---|---|---|---|---|---|---|---|---|
| github | `ubuntu-24.04-arm` | Neoverse-N2 | 4 | 15.6 | 155 | microsoft | Chicago, US | AS8075 Microsoft Corporation | 2 |
| github | `ubuntu-24.04` | AMD EPYC 9V74 80-Core Processor<br>INTEL(R) XEON(R) PLATINUM 8573C | 4 | 15.6 | 155 | microsoft | Moses Lake, US | AS8075 Microsoft Corporation | 2 |
| luxor | `luxor-ubuntu-small-2c-4g` | AMD Ryzen 9 9950X 16-Core Processor | 2 | 3.8 | 89 | kvm | Seattle, US | AS19538 Luxor | 1 |

## Benchmarks

| Provider | Label | Queue (s) | apt install (s) | CPU 1 thread (events/s) | CPU all threads (events/s) | Memory (MiB/s) | Seq read (MB/s) | Seq write (MB/s) | 4k rand read (IOPS) | 4k rand write (IOPS) | Download (MB/s) | Redis build (s) | $ per Redis build |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| github | `ubuntu-24.04-arm` | 4.0 | 15.1 | 3,959 | **15,720** | 27,812 | 413 | 336 | 19,597 | 19,573 | 93.7 | 46.0 | $0.0038 |
| github | `ubuntu-24.04` | **2.0** | 20.9 | 3,584 | 7,474 | 29,346 | 326 | 210 | 18,441 | 18,906 | 200 | 66.8 | $0.0067 |
| luxor | `luxor-ubuntu-small-2c-4g` | 15.0 | **8.6** | **6,947** | 13,675 | **42,368** | **17,385** | **14,980** | **125,773** | **137,919** | **242** | **45.1** | **$0.0030** |

# Runner benchmark report

2 samples from 1 workflow run(s). Benchmark values are medians across samples; the best value in each column is bold.

## Runners

| Provider | Label | CPU | vCPUs | Memory (GiB) | Disk (GB) | Virtualization | Location | Network | Samples |
|---|---|---|---|---|---|---|---|---|---|
| github | `ubuntu-24.04` | AMD EPYC 9V45 96-Core Processor | 4 | 15.6 | 155 | microsoft | Des Moines, US | AS8075 Microsoft Corporation | 1 |
| luxor | `luxor-ubuntu-medium-4c-8g` | AMD Ryzen 9 9950X 16-Core Processor | 4 | 7.8 | 156 | kvm | Seattle, US | AS19538 Luxor | 1 |

## Benchmarks

| Provider | Label | Queue (s) | apt install (s) | CPU 1 thread (events/s) | CPU all threads (events/s) | Memory (MiB/s) | Seq read (MB/s) | Seq write (MB/s) | 4k rand read (IOPS) | 4k rand write (IOPS) | Download (MB/s) | Redis build (s) | $ per Redis build |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| github | `ubuntu-24.04` | **2.0** | 13.0 | 5,230 | 10,896 | 32,108 | 405 | 223 | 19,430 | 19,566 | 32.9 | 45.3 | $0.0091 |
| luxor | `luxor-ubuntu-medium-4c-8g` | 13.0 | **10.0** | **6,945** | **26,944** | **42,858** | **16,966** | **11,839** | **99,206** | **118,329** | **140** | **23.7** | **$0.0032** |

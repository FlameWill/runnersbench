# Runner benchmark report

2 samples from 1 workflow run(s). Benchmark values are medians across samples; the best value in each column is bold.

## Runners

| Provider | Label | CPU | vCPUs | Memory (GiB) | Disk (GB) | Virtualization | Location | Network | Samples |
|---|---|---|---|---|---|---|---|---|---|
| github | `ubuntu-24.04` | AMD EPYC 9V74 80-Core Processor | 4 | 15.6 | 155 | microsoft | Cheyenne, US | AS8075 Microsoft Corporation | 1 |
| luxor | `luxor-ubuntu-small-2c-4g` | AMD Ryzen 9 9950X 16-Core Processor | 2 | 3.8 | 89 | kvm | Seattle, US | AS19538 Luxor | 1 |

## Benchmarks

| Provider | Label | Queue (s) | apt install (s) | CPU 1 thread (events/s) | CPU all threads (events/s) | Memory (MiB/s) | Seq read (MB/s) | Seq write (MB/s) | 4k rand read (IOPS) | 4k rand write (IOPS) | Download (MB/s) | Redis build (s) | $ per Redis build |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| github | `ubuntu-24.04` | **2.0** | 12.8 | 3,508 | 7,394 | 24,914 | 414 | 414 | 19,582 | 19,572 | 94.9 | 65.8 | $0.0066 |
| luxor | `luxor-ubuntu-small-2c-4g` | 11.0 | **7.3** | **6,976** | **13,684** | **43,203** | **19,539** | **12,464** | **136,312** | **147,879** | **173** | **45.0** | **$0.0030** |

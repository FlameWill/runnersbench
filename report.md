# Runner benchmark report

2 samples from 1 workflow run(s). Benchmark values are medians across samples; the best value in each column is bold.

## Runners

| Provider | Label | CPU | vCPUs | Memory (GiB) | Disk (GB) | Virtualization | Location | Network | Samples |
|---|---|---|---|---|---|---|---|---|---|
| github | `ubuntu-24.04` | AMD EPYC 7763 64-Core Processor | 4 | 15.6 | 155 | microsoft | San Jose, US | AS8075 Microsoft Corporation | 1 |
| luxor | `luxor-ubuntu-medium-4c-8g` | AMD Ryzen 9 9950X 16-Core Processor | 4 | 7.8 | 156 | kvm | Seattle, US | AS19538 Luxor | 1 |

## Benchmarks

| Provider | Label | Queue (s) | apt install (s) | CPU 1 thread (events/s) | CPU all threads (events/s) | Memory (MiB/s) | Seq read (MB/s) | Seq write (MB/s) | 4k rand read (IOPS) | 4k rand write (IOPS) | Download (MB/s) | Redis build (s) | $ per Redis build |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| github | `ubuntu-24.04` | **3.0** | 12.0 | 3,668 | 8,200 | 27,331 | 414 | 413 | 19,632 | 19,610 | **230** | 67.5 | $0.0135 |
| luxor | `luxor-ubuntu-medium-4c-8g` | 14.0 | **7.4** | **6,954** | **26,977** | **42,731** | **17,040** | **12,953** | **88,162** | **114,740** | 107 | **23.4** | **$0.0031** |

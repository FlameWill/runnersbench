# Runner benchmark report

3 samples from 1 workflow run(s). Benchmark values are medians across samples; the best value in each column is bold.

## Runners

| Provider | Label | CPU | vCPUs | Memory (GiB) | Disk (GB) | Virtualization | Location | Network | Samples |
|---|---|---|---|---|---|---|---|---|---|
| avrea | `avrea-ubuntu-24.04-4-vcpu` | AMD EPYC 4585PX 16-Core Processor | 4 | 14.7 | 156 | kvm | Roubaix, FR | AS16276 OVH SAS | 1 |
| github | `ubuntu-24.04` | AMD EPYC 9V74 80-Core Processor | 4 | 15.6 | 155 | microsoft | Chicago, US | AS8075 Microsoft Corporation | 1 |
| luxor | `luxor-ubuntu-medium-4c-8g` | AMD Ryzen 9 9950X 16-Core Processor | 4 | 7.8 | 156 | kvm | Seattle, US | AS19538 Luxor | 1 |

## Benchmarks

| Provider | Label | Queue (s) | apt install (s) | CPU 1 thread (events/s) | CPU all threads (events/s) | Memory (MiB/s) | Seq read (MB/s) | Seq write (MB/s) | 4k rand read (IOPS) | 4k rand write (IOPS) | Download (MB/s) | Redis build (s) | $ per Redis build |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| avrea | `avrea-ubuntu-24.04-4-vcpu` | 9.0 | 9.2 | 6,388 | 24,686 | 38,665 | 11,771 | 7,617 | **194,278** | 73,631 | 241 | 26.2 | $0.0035 |
| github | `ubuntu-24.04` | **4.0** | 14.7 | 4,529 | 9,542 | 32,047 | 413 | 236 | 19,076 | 17,679 | 231 | 59.8 | $0.0120 |
| luxor | `luxor-ubuntu-medium-4c-8g` | 13.0 | **6.6** | **6,892** | **26,682** | **41,850** | **17,934** | **14,337** | 96,173 | **123,024** | **251** | **23.8** | **$0.0032** |

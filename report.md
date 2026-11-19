# Runner benchmark report

2 samples from 1 workflow run(s). Benchmark values are medians across samples; the best value in each column is bold.

## Runners

| Provider | Label | CPU | vCPUs | Memory (GiB) | Disk (GB) | Virtualization | Location | Network | Samples |
|---|---|---|---|---|---|---|---|---|---|
| github | `ubuntu-24.04` | Intel(R) Xeon(R) 6975P-C | 4 | 15.3 | 155 | amazon | Boardman, US | AS16509 Amazon.com, Inc. | 1 |
| luxor | `luxor-ubuntu-medium-4c-8g` | AMD Ryzen 9 9950X 16-Core Processor | 4 | 7.8 | 156 | kvm | Seattle, US | AS19538 Luxor | 1 |

## Benchmarks

| Provider | Label | Queue (s) | apt install (s) | CPU 1 thread (events/s) | CPU all threads (events/s) | Memory (MiB/s) | Seq read (MB/s) | Seq write (MB/s) | 4k rand read (IOPS) | 4k rand write (IOPS) | Download (MB/s) | Redis build (s) | $ per Redis build |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| github | `ubuntu-24.04` | **3.0** | 37.4 | 3,294 | 6,915 | 39,011 | 472 | 226 | 68,818 | 33,546 | 210 | 58.8 | $0.0118 |
| luxor | `luxor-ubuntu-medium-4c-8g` | 12.0 | **20.4** | **6,973** | **27,307** | **43,457** | **17,859** | **14,931** | **114,509** | **119,348** | **255** | **23.3** | **$0.0031** |

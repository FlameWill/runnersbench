# Runner benchmark report

3 samples from 1 workflow run(s). Benchmark values are medians across samples; the best value in each column is bold.

## Runners

| Provider | Label | CPU | vCPUs | Memory (GiB) | Disk (GB) | Virtualization | Location | Network | Samples |
|---|---|---|---|---|---|---|---|---|---|
| avrea | `avrea-ubuntu-24.04-4-vcpu` | AMD EPYC 4585PX 16-Core Processor | 4 | 14.7 | 156 | kvm | Roubaix, FR | AS16276 OVH SAS | 1 |
| github | `ubuntu-24.04` | Intel(R) Xeon(R) 6975P-C | 4 | 15.3 | 155 | amazon | Ashburn, US | AS14618 Amazon.com, Inc. | 1 |
| luxor | `luxor-ubuntu-medium-4c-8g` | AMD Ryzen 9 9950X 16-Core Processor | 4 | 7.8 | 156 | kvm | Seattle, US | AS19538 Luxor | 1 |

## Benchmarks

| Provider | Label | Queue (s) | apt install (s) | CPU 1 thread (events/s) | CPU all threads (events/s) | Memory (MiB/s) | Seq read (MB/s) | Seq write (MB/s) | 4k rand read (IOPS) | 4k rand write (IOPS) | Download (MB/s) | Redis build (s) | $ per Redis build |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| avrea | `avrea-ubuntu-24.04-4-vcpu` | 11.0 | 9.9 | 6,450 | 25,556 | 40,149 | 12,964 | 10,615 | **142,619** | 96,126 | 98.6 | 24.8 | $0.0033 |
| github | `ubuntu-24.04` | **3.0** | 18.7 | 3,325 | 6,993 | 41,092 | 472 | 226 | 69,510 | 33,545 | **302** | 52.2 | $0.0104 |
| luxor | `luxor-ubuntu-medium-4c-8g` | 33.0 | **6.2** | **6,988** | **27,051** | **43,104** | **16,925** | **13,097** | 85,591 | **141,011** | 280 | **23.6** | **$0.0032** |

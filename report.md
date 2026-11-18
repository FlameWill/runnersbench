# Runner benchmark report

8 samples from 4 workflow run(s). Benchmark values are medians across samples; the best value in each column is bold.

## Runners

| Provider | Label | CPU | vCPUs | Memory (GiB) | Disk (GB) | Virtualization | Location | Network | Samples |
|---|---|---|---|---|---|---|---|---|---|
| github | `ubuntu-24.04-arm` | Neoverse-N2 | 4 | 15.6 | 155 | microsoft | San Jose, US | AS8075 Microsoft Corporation | 3 |
| github | `ubuntu-24.04` | AMD EPYC 9V74 80-Core Processor<br>INTEL(R) XEON(R) PLATINUM 8573C<br>Intel(R) Xeon(R) 6975P-C | 4 | 15.3 | 155 | amazon | Ashburn, US | AS14618 Amazon.com, Inc. | 3 |
| luxor | `luxor-ubuntu-small-2c-4g` | AMD Ryzen 9 9950X 16-Core Processor | 2 | 3.8 | 89 | kvm | Seattle, US | AS19538 Luxor | 2 |

## Benchmarks

| Provider | Label | Queue (s) | apt install (s) | CPU 1 thread (events/s) | CPU all threads (events/s) | Memory (MiB/s) | Seq read (MB/s) | Seq write (MB/s) | 4k rand read (IOPS) | 4k rand write (IOPS) | Download (MB/s) | Redis build (s) | $ per Redis build |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| github | `ubuntu-24.04-arm` | 4.0 | 15.8 | 3,958 | **15,744** | 27,817 | 413 | 348 | 19,576 | 19,577 | 136 | 47.5 | $0.0040 |
| github | `ubuntu-24.04` | **2.0** | 28.9 | 3,314 | 6,963 | 31,976 | 414 | 226 | 19,533 | 19,158 | 205 | 63.8 | $0.0064 |
| luxor | `luxor-ubuntu-small-2c-4g` | 13.5 | **8.0** | **6,950** | 13,650 | **42,639** | **17,701** | **15,056** | **112,403** | **118,999** | **213** | **44.1** | **$0.0029** |

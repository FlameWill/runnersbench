# Runner benchmark report

6 samples from 1 workflow run(s). Benchmark values are medians across samples; the best value in each column is bold.

## Runners

| Provider | Label | CPU | vCPUs | Memory (GiB) | Disk (GB) | Virtualization | Location | Network | Samples |
|---|---|---|---|---|---|---|---|---|---|
| avrea | `avrea-ubuntu-24.04-4-vcpu` | AMD EPYC 4585PX 16-Core Processor | 4 | 14.7 | 156 | kvm | Roubaix, FR | AS16276 OVH SAS | 1 |
| checklane | `checklane-4vcpu-ubuntu-2404` | AMD EPYC | 4 | 15.6 | 169 | kvm | London, GB | AS212027 PebbleHost Ltd | 1 |
| depot | `depot-ubuntu-24.04-4` | AMD EPYC 9R45 96-Core Processor | 4 | 15.6 | 156 | kvm | Ashburn, US | AS14618 Amazon.com, Inc. | 1 |
| github | `ubuntu-24.04` | Intel(R) Xeon(R) 6975P-C | 4 | 15.3 | 155 | amazon | Boardman, US | AS16509 Amazon.com, Inc. | 1 |
| luxor | `luxor-ubuntu-medium-4c-8g` | AMD Ryzen 9 9950X 16-Core Processor | 4 | 7.8 | 156 | kvm | Seattle, US | AS19538 Luxor | 1 |
| warpbuild | `warp-ubuntu-2404-x64-4x` | AMD Ryzen 9 9950X 16-Core Processor | 4 | 15.6 | 265 | kvm | Chicago, US | AS398418 WarpBuild | 1 |

## Benchmarks

| Provider | Label | Queue (s) | apt install (s) | CPU 1 thread (events/s) | CPU all threads (events/s) | Memory (MiB/s) | Seq read (MB/s) | Seq write (MB/s) | 4k rand read (IOPS) | 4k rand write (IOPS) | Download (MB/s) | Redis build (s) | $ per Redis build |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| avrea | `avrea-ubuntu-24.04-4-vcpu` | 8.0 | 9.6 | 6,507 | 24,524 | 39,753 | 9,850 | 8,905 | 207,523 | 87,188 | 96.3 | 28.2 | $0.0038 |
| checklane | `checklane-4vcpu-ubuntu-2404` | 8.0 | 5.1 | 6,926 | **26,912** | 42,092 | 8,602 | 3,119 | 93,499 | 91,103 | 95.5 | 24.2 | **$0.0016** |
| depot | `depot-ubuntu-24.04-4` | **1.0** | **3.9** | 5,199 | 20,399 | 32,176 | 7,393 | 14,266 | **230,356** | **221,340** | **231** | 31.5 | $0.0063 |
| github | `ubuntu-24.04` | 3.0 | 24.6 | 3,310 | 6,970 | 40,975 | 472 | 226 | 69,179 | 33,546 | 202 | 56.2 | $0.0112 |
| luxor | `luxor-ubuntu-medium-4c-8g` | 10.0 | 5.9 | **6,974** | 26,834 | **42,712** | **19,263** | **15,654** | 104,885 | 106,138 | 175 | **23.7** | $0.0032 |
| warpbuild | `warp-ubuntu-2404-x64-4x` | 8.0 | 10.4 | 6,294 | 13,101 | 38,734 | 4,799 | 2,508 | 99,471 | 77,711 | 204 | 36.1 | $0.0048 |

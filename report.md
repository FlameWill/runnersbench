# Runner benchmark report

7 samples from 1 workflow run(s). Benchmark values are medians across samples; the best value in each column is bold.

## Runners

| Provider | Label | CPU | vCPUs | Memory (GiB) | Disk (GB) | Virtualization | Location | Network | Samples |
|---|---|---|---|---|---|---|---|---|---|
| avrea | `avrea-ubuntu-24.04-4-vcpu` | AMD EPYC 4585PX 16-Core Processor | 4 | 14.7 | 156 | kvm | Roubaix, FR | AS16276 OVH SAS | 1 |
| buildkite | `buildkite-linux-amd64-4x16` | AMD EPYC | 4 | 15.7 | 101 | docker | Ashburn, US | AS401483 Namespace Labs | 1 |
| checklane | `checklane-4vcpu-ubuntu-2404` | AMD EPYC | 4 | 15.6 | 169 | kvm | London, GB | AS212027 PebbleHost Ltd | 1 |
| depot | `depot-ubuntu-24.04-4` | Intel(R) Xeon(R) 6975P-C | 4 | 30.8 | 87 | amazon | Ashburn, US | AS14618 Amazon.com, Inc. | 1 |
| github | `ubuntu-24.04` | Intel(R) Xeon(R) 6975P-C | 4 | 15.3 | 155 | amazon | Boardman, US | AS16509 Amazon.com, Inc. | 1 |
| luxor | `luxor-ubuntu-medium-4c-8g` | AMD Ryzen 9 9950X 16-Core Processor | 4 | 7.8 | 156 | kvm | Seattle, US | AS19538 Luxor | 1 |
| warpbuild | `warp-ubuntu-2404-x64-4x` | AMD Ryzen 9 9950X 16-Core Processor | 4 | 15.6 | 265 | kvm | Chicago, US | AS398418 WarpBuild | 1 |

## Benchmarks

| Provider | Label | Queue (s) | apt install (s) | CPU 1 thread (events/s) | CPU all threads (events/s) | Memory (MiB/s) | Seq read (MB/s) | Seq write (MB/s) | 4k rand read (IOPS) | 4k rand write (IOPS) | Download (MB/s) | Redis build (s) | $ per Redis build |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| avrea | `avrea-ubuntu-24.04-4-vcpu` | 7.0 | 6.8 | 6,598 | 25,687 | 40,822 | 15,408 | 9,519 | 195,633 | 112,466 | 152 | 24.5 | $0.0033 |
| buildkite | `buildkite-linux-amd64-4x16` | 12.7 | 6.0 | 6,724 | 26,203 | 40,498 | 3,569 | 2,777 | **384,982** | **380,441** | 253 | 27.1 | $0.0072 |
| checklane | `checklane-4vcpu-ubuntu-2404` | 9.0 | **5.0** | **6,995** | **27,894** | **43,644** | 7,335 | 3,227 | 95,175 | 96,296 | 94.2 | **23.4** | **$0.0016** |
| depot | `depot-ubuntu-24.04-4` | **1.0** | 25.6 | 3,317 | 6,970 | 40,386 | 343 | 333 | 5,757 | 8,605 | **280** | 53.5 | $0.0107 |
| github | `ubuntu-24.04` | 3.0 | 34.2 | 3,309 | 6,936 | 40,739 | 472 | 226 | 68,711 | 33,546 | 128 | 62.4 | $0.0125 |
| luxor | `luxor-ubuntu-medium-4c-8g` | 12.0 | 6.2 | 6,971 | 26,885 | 42,869 | **21,353** | **15,871** | 132,729 | 110,187 | 35.6 | 23.6 | $0.0031 |
| warpbuild | `warp-ubuntu-2404-x64-4x` | 9.0 | 8.2 | 6,166 | 13,142 | 39,264 | 4,091 | 2,878 | 71,022 | 25,092 | 106 | 34.1 | $0.0045 |

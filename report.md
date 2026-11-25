# Runner benchmark report

Benchmark version 1. 10 samples from 5 workflow run(s). Benchmark values are medians across samples; the best value in each column is bold.

## Runners

| Provider | Label | CPU | vCPUs | Memory (GiB) | Disk (GB) | Virtualization | Location | Network | Samples |
|---|---|---|---|---|---|---|---|---|---|
| avrea | `avrea-ubuntu-24.04-4-vcpu` | AMD EPYC 4585PX 16-Core Processor | 4 | 14.7 | 156 | kvm | Roubaix, FR | AS16276 OVH SAS | 1 |
| blacksmith | `blacksmith-4vcpu-ubuntu-2404` | AMD EPYC | 4 | 15.4 | 161 | kvm | Phoenix, US | AS20454 SECURED SERVERS LLC | 1 |
| buildkite | `buildkite-linux-amd64-4x16` | AMD EPYC | 4 | 15.7 | 101 | docker | Ashburn, US | AS401483 Namespace Labs | 1 |
| checklane | `checklane-4vcpu-ubuntu-2404` | AMD EPYC | 4 | 15.6 | 169 | kvm | London, GB | AS212027 PebbleHost Ltd | 1 |
| depot | `depot-ubuntu-24.04-4` | Intel(R) Xeon(R) 6975P-C | 4 | 30.8 | 136 | amazon | Ashburn, US | AS14618 Amazon.com, Inc. | 1 |
| github | `ubuntu-24.04` | AMD EPYC 7763 64-Core Processor | 4 | 15.6 | 155 | microsoft | San Jose, US | AS8075 Microsoft Corporation | 1 |
| groundbox | `groundbox-4vcpu` | AMD EPYC | 4 | 15.6 | 63 | kvm | Warrenton, US | AS16276 OVH SAS | 1 |
| luxor | `luxor-ubuntu-medium-4c-8g` | AMD Ryzen 9 9950X 16-Core Processor | 4 | 7.8 | 156 | kvm | Seattle, US | AS19538 Luxor | 1 |
| namespace | `nscloud-ubuntu-24.04-amd64-4x8` | AMD EPYC | 4 | 7.8 | 68 | docker | Ashburn, US | AS401483 Namespace Labs | 1 |
| warpbuild | `warp-ubuntu-2404-x64-4x` | AMD Ryzen 9 9950X 16-Core Processor | 4 | 15.6 | 265 | kvm | Chicago, US | AS398418 WarpBuild | 1 |

## Benchmarks

| Provider | Label | Queue (s) | apt install (s) | CPU 1 thread (events/s) | CPU all threads (events/s) | Memory (MiB/s) | Seq read (MB/s) | Seq write (MB/s) | 4k rand read (IOPS) | 4k rand write (IOPS) | Download (MB/s) | Redis build (s) | $ per Redis build |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| avrea | `avrea-ubuntu-24.04-4-vcpu` | 7.0 | 7.1 | 6,795 | 27,017 | 42,332 | 18,155 | 10,815 | 89,046 | 133,862 | 139 | 22.9 | $0.0031 |
| blacksmith | `blacksmith-4vcpu-ubuntu-2404` | 7.0 | 9.6 | 6,534 | 25,584 | 40,472 | 6,247 | 1,795 | 615,990 | 426,474 | 110 | 25.9 | $0.0035 |
| buildkite | `buildkite-linux-amd64-4x16` | 6.4 | 4.2 | 6,258 | 24,684 | 36,810 | 3,335 | 2,198 | 404,009 | 281,067 | 305 | 31.4 | $0.0084 |
| checklane | `checklane-4vcpu-ubuntu-2404` | 8.0 | 3.4 | 6,963 | 27,057 | 42,234 | 5,295 | 3,843 | 96,953 | 92,981 | 263 | 24.1 | **$0.0016** |
| depot | `depot-ubuntu-24.04-4` | **2.0** | 24.8 | 3,317 | 6,965 | 40,814 | 344 | 333 | 5,898 | 6,528 | 177 | 58.0 | $0.0116 |
| github | `ubuntu-24.04` | 4.0 | 16.0 | 3,672 | 8,197 | 27,365 | 414 | 414 | 19,570 | 19,574 | 58.5 | 74.4 | $0.0149 |
| groundbox | `groundbox-4vcpu` | 5.0 | **2.9** | 6,958 | 27,035 | 42,495 | 828 | 1,035 | 201,291 | 199,993 | 77.7 | 23.4 | $0.0023 |
| luxor | `luxor-ubuntu-medium-4c-8g` | 10.0 | 6.3 | 6,926 | 26,787 | 41,951 | **18,948** | **13,181** | 130,617 | 119,834 | 298 | 23.8 | $0.0032 |
| namespace | `nscloud-ubuntu-24.04-amd64-4x8` | 9.0 | 8.5 | **6,979** | **27,449** | **42,761** | 6,171 | 4,620 | **685,171** | **553,259** | **329** | **22.6** | $0.0030 |
| warpbuild | `warp-ubuntu-2404-x64-4x` | 8.0 | 6.2 | 6,189 | 13,208 | 39,323 | 4,353 | 3,013 | 285,085 | 100,366 | 0.3 | 33.9 | $0.0045 |

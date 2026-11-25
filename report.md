# Runner benchmark report

Benchmark version 1. 22 samples from 8 workflow run(s). Benchmark values are medians across samples; the best value in each column is bold.

## Runners

| Provider | Label | CPU | vCPUs | Memory (GiB) | Disk (GB) | Virtualization | Location | Network | Samples |
|---|---|---|---|---|---|---|---|---|---|
| avrea | `avrea-ubuntu-24.04-arm-4-vcpu` | - | 4 | 14.7 | 155 | vm-other | Helsinki, FI | AS209378 Inios Oy | 1 |
| blacksmith | `blacksmith-4vcpu-ubuntu-2404-arm` | Ampere-1a | 4 | 11.7 | 133 | – | Phoenix, US | AS20454 SECURED SERVERS LLC | 1 |
| depot | `depot-ubuntu-24.04-arm-4` | Neoverse-V2 | 4 | 15.6 | 156 | qemu | Ashburn, US | AS14618 Amazon.com, Inc. | 1 |
| github | `ubuntu-24.04-arm` | Neoverse-N2 | 4 | 15.6 | 155 | microsoft | San Jose, US | AS8075 Microsoft Corporation | 1 |
| warpbuild | `warp-ubuntu-2404-arm64-4x` | Neoverse-V2 | 4 | 15.3 | 155 | amazon | Ashburn, US | AS14618 Amazon.com, Inc. | 1 |
| avrea | `avrea-macos-26-8-vcpu` | Apple M5 Max (Virtual) | 8 | 24.0 | 361 | apple | Helsinki, FI | AS209378 Inios Oy | 1 |
| blacksmith | `blacksmith-6vcpu-macos-26` | Apple M5 Max (Virtual) | 6 | 24.0 | 439 | apple | San Jose, US | AS402960 MACWEB | 1 |
| depot | `depot-macos-26` | Apple M4 (Virtual) | 9 | 17.0 | 424 | apple | Ashburn, US | AS14618 Amazon.com, Inc. | 1 |
| github | `macos-26` | Apple M1 (Virtual) | 3 | 7.0 | 343 | apple | San Jose, US | AS8075 Microsoft Corporation | 1 |
| groundbox | `groundbox-macos` | Apple M6 (Virtual) | 12 | 12.0 | 139 | apple | Martinez, US | AS7922 Comcast Cable Communications, LLC | 1 |
| luxor | `luxor-macos-26-small` | Apple M4 Pro (Virtual) | 4 | 8.0 | 449 | apple | Seattle, US | AS19538 Luxor | 1 |
| warpbuild | `warp-macos-26-arm64-6x` | Apple M5 Pro (Virtual) | 6 | 22.0 | 424 | apple | Atlanta, US | AS395336 MacStadium, Inc. | 1 |
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

| Provider | Label | Queue (s) | Package install (s) | CPU 1 thread (events/s) | CPU all threads (events/s) | Memory (MiB/s) | Seq read (MB/s) | Seq write (MB/s) | 4k rand read (IOPS) | 4k rand write (IOPS) | Download (MB/s) | Redis build (s) | $ per Redis build |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| avrea | `avrea-ubuntu-24.04-arm-4-vcpu` | 14.0 | 9.0 | **11,662** | **46,245** | **46,793** | **24,666** | **19,029** | 93,187 | 121,282 | 298 | 23.3 | $0.0096 |
| blacksmith | `blacksmith-4vcpu-ubuntu-2404-arm` | 10.0 | 11.5 | 931 | 3,677 | 26,322 | 1,568 | 899 | 228,881 | 94,215 | 181 | 51.6 | $0.0050 |
| depot | `depot-ubuntu-24.04-arm-4` | 14.0 | 5.2 | 3,332 | 13,127 | 26,508 | 4,957 | 14,734 | 184,048 | 193,759 | 202 | 38.9 | $0.0078 |
| github | `ubuntu-24.04-arm` | 6.0 | 19.3 | 3,958 | 15,748 | 27,832 | 421 | 351 | 19,634 | 19,567 | 312 | 55.2 | $0.0080 |
| warpbuild | `warp-ubuntu-2404-arm64-4x` | 46.0 | 30.2 | 3,332 | 13,262 | 26,651 | 315 | 315 | 4,198 | 4,198 | 122 | 44.3 | $0.0060 |
| avrea | `avrea-macos-26-8-vcpu` | 29.0 | 5.0 | – | – | 32,501 | 16,431 | 13,761 | 90,044 | 55,284 | 268 | 14.4 | $0.0200 |
| blacksmith | `blacksmith-6vcpu-macos-26` | 25.0 | 3.2 | – | – | 30,315 | 12,548 | 10,289 | 56,914 | 25,920 | 219 | 13.8 | $0.0800 |
| depot | `depot-macos-26` | 12.0 | – | – | – | 33,686 | 6,174 | 364 | 35,686 | 21,218 | 246 | 16.6 | $0.0227 |
| github | `macos-26` | 3.0 | 16.2 | – | – | 14,148 | 5,174 | 3,206 | 40,433 | 15,397 | 109 | 63.7 | $0.1240 |
| groundbox | `groundbox-macos` | 21.0 | 5.4 | – | – | 36,294 | 5,329 | 6,137 | 13,847 | 8,932 | 59.5 | **12.5** | $0.0108 |
| luxor | `luxor-macos-26-small` | 30.0 | 6.3 | – | – | 33,699 | 5,012 | 6,155 | 16,234 | 6,744 | 60.4 | 18.5 | $0.0253 |
| warpbuild | `warp-macos-26-arm64-6x` | 4.0 | 4.5 | – | – | 31,599 | 7,251 | 6,837 | 14,068 | 6,640 | 109 | 16.8 | $0.0800 |
| avrea | `avrea-ubuntu-24.04-4-vcpu` | 7.0 | 7.1 | 6,795 | 27,017 | 42,332 | 18,155 | 10,815 | 89,046 | 133,862 | 139 | 22.9 | $0.0031 |
| blacksmith | `blacksmith-4vcpu-ubuntu-2404` | 7.0 | 9.6 | 6,534 | 25,584 | 40,472 | 6,247 | 1,795 | 615,990 | 426,474 | 110 | 25.9 | $0.0080 |
| buildkite | `buildkite-linux-amd64-4x16` | 6.4 | 4.2 | 6,258 | 24,684 | 36,810 | 3,335 | 2,198 | 404,009 | 281,067 | 305 | 31.4 | $0.0085 |
| checklane | `checklane-4vcpu-ubuntu-2404` | 8.0 | 3.4 | 6,963 | 27,057 | 42,234 | 5,295 | 3,843 | 96,953 | 92,981 | 263 | 24.1 | **$0.0017** |
| depot | `depot-ubuntu-24.04-4` | **2.0** | 24.8 | 3,317 | 6,965 | 40,814 | 344 | 333 | 5,898 | 6,528 | 177 | 58.0 | $0.0116 |
| github | `ubuntu-24.04` | 4.0 | 16.0 | 3,672 | 8,197 | 27,365 | 414 | 414 | 19,570 | 19,574 | 58.5 | 74.4 | $0.0240 |
| groundbox | `groundbox-4vcpu` | 5.0 | **2.9** | 6,958 | 27,035 | 42,495 | 828 | 1,035 | 201,291 | 199,993 | 77.7 | 23.4 | $0.0024 |
| luxor | `luxor-ubuntu-medium-4c-8g` | 10.0 | 6.3 | 6,926 | 26,787 | 41,951 | 18,948 | 13,181 | 130,617 | 119,834 | 298 | 23.8 | $0.0032 |
| namespace | `nscloud-ubuntu-24.04-amd64-4x8` | 9.0 | 8.5 | 6,979 | 27,449 | 42,761 | 6,171 | 4,620 | **685,171** | **553,259** | **329** | 22.6 | $0.0080 |
| warpbuild | `warp-ubuntu-2404-x64-4x` | 8.0 | 6.2 | 6,189 | 13,208 | 39,323 | 4,353 | 3,013 | 285,085 | 100,366 | 0.3 | 33.9 | $0.0080 |

## Errors

- `depot-macos-26` apt_install: ['env', 'HOMEBREW_NO_AUTO_UPDATE=1', 'HOMEBREW_NO_INSTALL_CLEANUP=1', 'HOMEBREW_NO_INSTALLED_DEPENDENTS_CHECK=1', 'brew', 'install', '--quiet', 'sysbench', 'fio'] exited 1: ✔︎ Bottle readline (8.3.6)

# Runner benchmark report

Benchmark version 2. 66 samples from 1 workflow run(s). Benchmark values are medians across samples, with the lowest to highest sample in brackets; the best median in each column is bold.

## Runners

| Provider | Label | CPU | vCPUs | Memory (GiB) | Disk (GB) | Virtualization | Location | Network | Samples |
|---|---|---|---|---|---|---|---|---|---|
| avrea | `avrea-ubuntu-24.04-arm-4-vcpu` | - | 4 | 14.7 | 155 | vm-other | Helsinki, FI | AS209378 Inios Oy | 3 |
| blacksmith | `blacksmith-4vcpu-ubuntu-2404-arm` | Ampere-1a | 4 | 11.7 | 133 | – | Phoenix, US | AS20454 SECURED SERVERS LLC | 3 |
| depot | `depot-ubuntu-24.04-arm-4` | Neoverse-V2 | 4 | 15.6 | 156 | qemu | Ashburn, US | AS14618 Amazon.com, Inc. | 3 |
| github | `ubuntu-24.04-arm` | Neoverse-N2 | 4 | 15.6 | 155 | microsoft | Moses Lake, US | AS8075 Microsoft Corporation | 3 |
| warpbuild | `warp-ubuntu-2404-arm64-4x` | Neoverse-V2 | 4 | 15.3 | 155 | amazon | Ashburn, US | AS14618 Amazon.com, Inc. | 3 |
| avrea | `avrea-macos-26-8-vcpu` | Apple M5 Max (Virtual) | 8 | 24.0 | 361 | apple | Helsinki, FI | AS209378 Inios Oy | 3 |
| blacksmith | `blacksmith-6vcpu-macos-26` | Apple M5 Max (Virtual) | 6 | 24.0 | 438 | apple | San Jose, US | AS402960 MACWEB | 3 |
| depot | `depot-macos-26` | Apple M4 (Virtual) | 9 | 17.0 | 424 | apple | Ashburn, US | AS14618 Amazon.com, Inc. | 3 |
| github | `macos-26` | Apple M1 (Virtual) | 3 | 7.0 | 343 | apple | San Antonio, US | AS8075 Microsoft Corporation | 3 |
| groundbox | `groundbox-macos` | Apple M6 (Virtual) | 12 | 12.0 | 139 | apple | Martinez, US | AS7922 Comcast Cable Communications, LLC | 3 |
| luxor | `luxor-macos-26-small` | Apple M4 Pro (Virtual)<br>Apple M5 Pro (Virtual) | 4 | 8.0 | 449 | apple | Seattle, US | AS19538 Luxor | 3 |
| warpbuild | `warp-macos-26-arm64-6x` | Apple M5 Pro (Virtual) | 6 | 22.0 | 424 | apple | Las Vegas, US | AS395337 MacStadium, Inc. | 3 |
| avrea | `avrea-ubuntu-24.04-4-vcpu` | AMD EPYC 4585PX 16-Core Processor | 4 | 14.7 | 156 | kvm | Roubaix, FR | AS16276 OVH SAS | 3 |
| blacksmith | `blacksmith-4vcpu-ubuntu-2404` | AMD EPYC | 4 | 15.4 | 161 | kvm | Phoenix, US | AS20454 SECURED SERVERS LLC | 3 |
| buildkite | `buildkite-linux-amd64-4x16` | AMD EPYC | 4 | 15.7 | 101 | docker | Ashburn, US | AS401483 Namespace Labs | 3 |
| checklane | `checklane-4vcpu-ubuntu-2404` | AMD EPYC | 4 | 15.6 | 169 | kvm | London, GB | AS212027 PebbleHost Ltd | 3 |
| depot | `depot-ubuntu-24.04-4` | AMD EPYC 9R45 96-Core Processor | 4 | 15.6 | 156 | kvm | Ashburn, US | AS14618 Amazon.com, Inc. | 3 |
| github | `ubuntu-24.04` | AMD EPYC 7763 64-Core Processor<br>Intel(R) Xeon(R) 6975P-C | 4 | 15.3 | 155 | amazon | Boardman, US | AS16509 Amazon.com, Inc. | 3 |
| groundbox | `groundbox-4vcpu` | AMD EPYC | 4 | 15.6 | 63 | kvm | Warrenton, US | AS16276 OVH SAS | 3 |
| luxor | `luxor-ubuntu-medium-4c-8g` | AMD Ryzen 9 9950X 16-Core Processor | 4 | 7.8 | 156 | kvm | Seattle, US | AS19538 Luxor | 3 |
| namespace | `nscloud-ubuntu-24.04-amd64-4x8` | AMD EPYC | 4 | 7.8 | 68 | docker | Ashburn, US | AS401483 Namespace Labs | 3 |
| warpbuild | `warp-ubuntu-2404-x64-4x` | AMD Ryzen 9 9950X 16-Core Processor | 4 | 15.6 | 265 | kvm | Chicago, US | AS398418 WarpBuild | 3 |

## Benchmarks

| Provider | Label | Queue (s) | Package install (s) | CPU 1 thread (events/s) | CPU all threads (events/s) | Memory (MiB/s) | Seq read (MB/s) | Seq write (MB/s) | 4k rand read (IOPS) | 4k rand write (IOPS) | Download (MB/s) | Redis build (s) | $ per Redis build |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| avrea | `avrea-ubuntu-24.04-arm-4-vcpu` | 19.0 (15.0 to 19.0) | 6.8 (6.8 to 6.8) | **13,498 (13,013 to 13,533)** | **49,533 (49,421 to 50,460)** | **53,026 (52,115 to 54,269)** | **33,037 (31,546 to 33,582)** | **26,002 (21,464 to 28,958)** | 92,759 (90,269 to 92,982) | 115,100 (113,235 to 115,773) | 277 (269 to 281) | 19.8 (19.2 to 23.8) | $0.0080 ($0.0080 to $0.0096) |
| blacksmith | `blacksmith-4vcpu-ubuntu-2404-arm` | 11.0 (10.0 to 11.0) | 13.0 (11.2 to 13.9) | 930 (927 to 934) | 3,661 (3,647 to 3,669) | 26,272 (26,111 to 26,286) | 1,777 (1,595 to 1,806) | 930 (883 to 977) | 235,415 (231,530 to 257,677) | 96,865 (93,864 to 99,286) | 154 (90.0 to 170) | 51.8 (50.7 to 52.0) | $0.0050 |
| depot | `depot-ubuntu-24.04-arm-4` | **2.0** | 6.0 (4.5 to 9.2) | 3,336 (3,326 to 3,351) | 13,028 (12,922 to 13,097) | 26,545 (26,421 to 26,663) | 3,408 (2,656 to 3,467) | 14,788 (13,619 to 15,680) | 171,919 (161,604 to 222,012) | 193,910 (190,943 to 196,695) | 252 (235 to 282) | 39.3 (38.8 to 39.3) | $0.0080 ($0.0078 to $0.0080) |
| github | `ubuntu-24.04-arm` | 6.0 | 20.2 (19.9 to 26.8) | 3,956 (3,956 to 3,958) | 15,745 (15,744 to 15,756) | 27,822 (27,762 to 27,822) | 414 (413 to 419) | 321 (320 to 353) | 19,586 (19,577 to 19,625) | 19,579 (19,577 to 19,591) | 207 (164 to 209) | 47.7 (46.3 to 57.1) | $0.0080 |
| warpbuild | `warp-ubuntu-2404-arm64-4x` | 40.0 (40.0 to 41.0) | 28.9 (28.5 to 30.2) | 3,334 (3,332 to 3,341) | 13,267 (13,260 to 13,269) | 26,643 (26,450 to 26,645) | 315 (315 to 315) | 315 (315 to 315) | 4,197 (4,196 to 4,198) | 4,198 (4,198 to 4,198) | 254 (168 to 306) | 43.4 (41.8 to 44.0) | $0.0060 |
| avrea | `avrea-macos-26-8-vcpu` | 30.0 (24.0 to 32.0) | 5.4 (4.8 to 9.7) | – | – | 33,224 (32,160 to 34,248) | 17,489 (16,918 to 17,693) | 16,102 (14,786 to 16,914) | 100,784 (92,924 to 101,084) | 58,252 (53,799 to 60,253) | 281 (239 to 294) | 14.2 (13.7 to 16.2) | $0.0200 ($0.0187 to $0.0227) |
| blacksmith | `blacksmith-6vcpu-macos-26` | 24.0 (23.0 to 35.0) | 25.8 (4.7 to 26.3) | – | – | 28,306 (14,789 to 33,558) | 12,600 (8,675 to 12,946) | 9,445 (5,517 to 11,785) | 53,607 (29,356 to 59,071) | 24,093 (13,953 to 24,884) | 182 (101 to 233) | 17.9 (14.5 to 39.4) | $0.0800 |
| depot | `depot-macos-26` | 205 (195 to 206) | 21.4 (19.7 to 23.7) | – | – | 33,601 (33,555 to 33,740) | 6,400 (5,863 to 7,491) | 787 (657 to 880) | 41,245 (32,897 to 42,354) | 23,718 (23,623 to 26,694) | 242 (239 to 253) | 16.4 (15.6 to 16.4) | $0.0227 ($0.0213 to $0.0227) |
| github | `macos-26` | 4.0 (4.0 to 5.0) | 16.2 (11.7 to 40.1) | – | – | 13,229 (13,089 to 18,653) | 6,520 (5,631 to 6,964) | 4,573 (3,359 to 4,676) | 34,502 (19,042 to 36,337) | 15,089 (11,308 to 18,587) | 115 (95.5 to 127) | 47.6 (46.9 to 54.8) | $0.0620 |
| groundbox | `groundbox-macos` | 22.0 (21.0 to 175) | 12.6 (5.6 to 13.7) | – | – | 36,207 (36,116 to 36,266) | 5,279 (5,147 to 5,303) | 6,088 (5,529 to 6,241) | 14,477 (14,297 to 14,520) | 8,655 (8,506 to 8,965) | 55.0 (54.7 to 59.3) | **12.8 (12.4 to 13.3)** | $0.0108 ($0.0108 to $0.0117) |
| luxor | `luxor-macos-26-small` | 29.0 (19.0 to 29.0) | 13.9 (6.8 to 15.4) | – | – | 29,945 (26,211 to 29,994) | 3,319 (3,075 to 7,122) | 3,529 (2,258 to 5,606) | 15,510 (15,295 to 15,695) | 6,356 (6,249 to 8,740) | 232 (191 to 285) | 20.4 (19.6 to 20.5) | $0.0280 ($0.0267 to $0.0280) |
| warpbuild | `warp-macos-26-arm64-6x` | 5.0 | 5.4 (5.2 to 9.2) | – | – | 32,426 (31,894 to 33,297) | 7,751 (7,023 to 8,047) | 8,383 (5,352 to 8,760) | 14,941 (12,851 to 15,305) | 8,728 (7,731 to 8,890) | 199 (122 to 250) | 15.2 (14.7 to 15.7) | $0.0800 |
| avrea | `avrea-ubuntu-24.04-4-vcpu` | 8.0 (8.0 to 9.0) | 8.1 (7.8 to 8.2) | 6,524 (6,344 to 6,650) | 25,517 (25,213 to 26,255) | 40,544 (37,680 to 40,803) | 11,068 (10,398 to 14,116) | 8,741 (7,437 to 10,180) | 188,694 (137,679 to 212,730) | 88,080 (84,736 to 194,221) | 259 (132 to 288) | 30.4 (24.6 to 30.6) | $0.0041 ($0.0033 to $0.0041) |
| blacksmith | `blacksmith-4vcpu-ubuntu-2404` | 8.0 (8.0 to 9.0) | 13.8 (8.7 to 16.9) | 6,418 (6,284 to 6,476) | 25,314 (24,411 to 25,402) | 39,004 (39,001 to 40,335) | 5,820 (4,804 to 11,213) | 1,941 (1,243 to 1,946) | 712,831 (655,941 to 761,636) | 390,600 (389,947 to 411,895) | **351 (167 to 358)** | 26.6 (25.5 to 27.3) | $0.0080 |
| buildkite | `buildkite-linux-amd64-4x16` | 5.0 (4.8 to 9.1) | 5.8 (5.0 to 6.8) | 6,853 (6,814 to 6,902) | 27,040 (26,784 to 27,094) | 41,816 (41,574 to 42,117) | 5,503 (4,721 to 5,994) | 3,590 (3,547 to 4,515) | 710,567 (673,403 to 711,635) | **530,668 (527,487 to 584,019)** | 280 (98.1 to 338) | 23.8 (23.6 to 25.1) | $0.0064 ($0.0064 to $0.0069) |
| checklane | `checklane-4vcpu-ubuntu-2404` | 8.0 | 8.2 (8.1 to 8.3) | 6,698 (6,686 to 6,974) | 26,319 (26,091 to 26,561) | 41,508 (40,867 to 41,863) | 5,199 (4,528 to 6,402) | 2,545 (2,533 to 2,552) | **871,784 (664,115 to 1,084,598)** | 408,932 (395,670 to 510,409) | 42.7 (38.7 to 59.4) | 26.0 (25.7 to 26.1) | **$0.0018 ($0.0017 to $0.0018)** |
| depot | `depot-ubuntu-24.04-4` | **2.0 (1.0 to 2.0)** | **3.7 (3.4 to 3.7)** | 5,251 (5,050 to 5,486) | 20,371 (19,659 to 21,697) | 33,554 (31,420 to 34,582) | 6,586 (4,862 to 7,019) | 14,034 (9,212 to 15,636) | 212,752 (189,869 to 244,897) | 225,847 (176,569 to 258,841) | 106 (91.2 to 216) | 30.2 (26.9 to 31.5) | $0.0062 ($0.0054 to $0.0064) |
| github | `ubuntu-24.04` | 4.0 (3.0 to 4.0) | 21.6 (13.2 to 34.5) | 3,325 (3,297 to 3,674) | 7,001 (6,951 to 8,198) | 40,905 (27,236 to 41,164) | 472 (414 to 472) | 226 (226 to 414) | 68,686 (19,572 to 68,691) | 33,546 (19,583 to 33,546) | 231 (73.1 to 308) | 61.3 (53.9 to 69.4) | $0.0240 ($0.0120 to $0.0240) |
| groundbox | `groundbox-4vcpu` | 6.0 | 7.6 (6.3 to 7.9) | 6,391 (6,385 to 6,419) | 23,760 (22,862 to 23,846) | 38,920 (38,539 to 39,009) | 1,189 (1,111 to 3,394) | 1,077 (1,018 to 1,153) | 199,292 (198,806 to 201,042) | 201,915 (201,089 to 203,244) | 43.8 (40.4 to 68.5) | 33.9 (33.6 to 34.1) | $0.0034 ($0.0034 to $0.0035) |
| luxor | `luxor-ubuntu-medium-4c-8g` | 10.0 (8.0 to 10.0) | 6.1 (5.9 to 7.3) | 6,929 (6,901 to 6,981) | 26,714 (26,703 to 26,883) | 41,978 (41,862 to 43,000) | 19,332 (17,940 to 23,362) | 14,420 (13,514 to 14,550) | 101,516 (96,226 to 113,716) | 121,981 (109,944 to 129,332) | 178 (63.9 to 203) | 23.8 (23.7 to 23.8) | $0.0032 |
| namespace | `nscloud-ubuntu-24.04-amd64-4x8` | 7.0 | 8.4 (7.1 to 9.4) | 6,911 (6,836 to 6,919) | 27,077 (27,034 to 27,187) | 42,226 (41,914 to 42,391) | 5,297 (5,053 to 6,119) | 3,840 (3,684 to 4,177) | 655,919 (615,766 to 723,352) | 524,316 (523,826 to 598,132) | 297 (81.1 to 320) | 23.2 (22.9 to 23.5) | $0.0080 |
| warpbuild | `warp-ubuntu-2404-x64-4x` | 9.0 (8.0 to 11.0) | 7.9 (6.7 to 8.5) | 6,422 (6,064 to 6,490) | 13,393 (12,945 to 13,401) | 40,010 (37,254 to 40,390) | 3,839 (3,643 to 5,438) | 2,891 (1,694 to 3,397) | 53,917 (26,883 to 134,469) | 37,925 (22,637 to 82,733) | 208 (82.1 to 266) | 34.5 (34.0 to 36.5) | $0.0080 |

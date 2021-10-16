const deleteSvg = `<svg width="16px" class="deleteSvg" height="16px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle;"><path class="deleteSvg" fill="#ff4d4f" d="M677.647059 256l0-90.352941c0-37.436235-23.461647-60.235294-61.771294-60.235294L408.094118 105.411765c-38.249412 0-61.741176 22.799059-61.741176 60.235294l0 90.352941-180.705882 0 0 60.235294 60.235294 0 0 512c0 54.272 33.972706 90.352941 90.352941 90.352941l391.529412 0c55.085176 0 90.352941-33.490824 90.352941-90.352941l0-512 60.235294 0 0-60.235294L677.647059 256zM406.588235 165.647059l210.823529 0-1.264941 90.352941L406.588235 256 406.588235 165.647059zM737.882353 858.352941l-451.764706 0 0-542.117647 451.764706 0L737.882353 858.352941zM466.823529 376.470588l-58.729412 0-1.505882 391.529412 60.235294 0L466.823529 376.470588zM617.411765 376.470588l-60.235294 0 0 391.529412 60.235294 0L617.411765 376.470588z" /></svg>`

const editSvg = `<svg width="12px" class="editSvg" height="12px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle;"><path class="editSvg" fill="#1890ff" d="M1014.642 150.772c-7.923 28.292-14.956 54.581-34.507 70.42-171.054 138.593-308.162 310.68-463.298 464.871-4.074 4.061-8.949 7.641-11.991 12.379-65.929 102.828-181.262 115.945-282.196 154.651-21.67 8.3-55.57-30.316-49.069-53.263 18.317-64.627 36.254-129.378 55.954-193.592 3.332-10.863 13.737-20.27 22.483-28.673 147.544-141.694 295.884-282.56 442.692-425.014 35.012-33.975 65.363-72.802 97.388-109.813 43.243-49.963 103.691-53.987 150.811-7.654 28.364 27.89 62.838 52.147 69.349 96.114 0.846 5.7 1.756 11.387 2.64 17.076 2.149 1.29-2.409 1.207-0.257 2.497v0zM746.265 198.034c-143.031 143.31-285.798 286.353-425.513 426.335 24.065 24.382 50.698 51.374 73.962 74.938 142.838-139.748 286.956-280.736 430.361-421.026-29.209-29.747-55.809-56.826-78.809-80.248v0zM780.431 137.468c35.534 34.035 66.499 63.695 103.078 98.73 6.533-8.912 12.87-19.914 21.406-28.782 61.69-64.018 61.828-63.88-3.146-125.401-1.389-1.318-2.658-2.784-4.08-4.063-17.97-16.119-36.193-16.301-53.943-0.005-20.473 18.801-40.525 38.055-63.316 59.521v0zM250.913 775.782c32.921-13.26 58.889-23.713 81.104-32.654-17.064-20.07-32.667-38.427-51.038-60.045-10.237 31.532-18.925 58.35-30.067 92.699v0zM457.325 1010.618c-95.18 0-190.363 0.146-285.55-0.065-52.12-0.109-98.169-14.202-133.136-56.247-23.055-27.724-29.593-59.946-29.642-94.142-0.291-189.403-1.034-378.814 0.219-568.217 0.664-101.677 63.442-162.274 165.278-162.868 102.874-0.599 205.757-0.022 308.627-0.226 22.538-0.043 44.021 1.736 46.9 30.199 2.109 20.825-14.922 31.334-48.338 31.361-99.987 0.084-199.985-0.147-299.974 0.094-71.519 0.181-112.147 41.233-112.165 112.856-0.072 182.666-0.089 365.333-0.043 547.999 0.01 56.514 38.085 96.863 95.137 97.074 195.173 0.735 390.353 0.596 585.525 0.129 46.174-0.104 76.086-33.055 76.29-83.051 0.51-124.969 0.241-249.947 0.433-374.927 0.017-9.542-2.207-21.578 2.57-28.067 8.038-10.926 21.765-26.173 31.426-25.058 10.109 1.164 19.003 18.963 26.809 30.577 2.697 4.002 0.62 11.255 0.62 17.019 0.011 124.028 0.17 248.059-0.049 372.085-0.182 104.429-49.419 153.352-154.028 153.468-92.305 0.096-184.61 0.022-276.91 0.011v0zM457.325 1010.618z"  /></svg>`

const plusSvg = `<svg width="16px" class="plusSvg" height="16px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" style="vertical-align: middle;"><path class="plusSvg" fill="#1890ff" d="M469.333 213.333l85.333 0 0 597.333-85.333 0 0-597.333zM213.333 469.333l597.333 0 0 85.333-597.333 0 0-85.333z" /></svg>`

const checkSvg = `<svg t="1592638568542" class="checkSvg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3239" xmlns:xlink="http://www.w3.org/1999/xlink" width="16px" height="16px" style="vertical-align: middle;"><defs><style type="text/css"></style></defs><path class="checkSvg" fill="#ff4d4f" d="M426.667 665.003L243.499 481.835a42.667 42.667 0 1 0-60.331 60.33L396.501 755.5a42.667 42.667 0 0 0 60.331 0l426.667-426.667a42.667 42.667 0 1 0-60.331-60.33l-396.501 396.5z" p-id="3240"></path></svg>`

// const buildGroupSvg = `<svg class="buildGroupSvg" width="14px" height="14px" style="vertical-align: middle;margin-right:3px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path class="doorGroupSvg" fill="#1890ff" d="M998.4 921.6h-51.2V70.4c0-12.8-12.8-25.6-25.6-25.6H550.4c-12.8 0-25.6 12.8-25.6 25.6v844.8h-25.6V371.2c0-12.8-12.8-25.6-25.6-25.6H96c-12.8 0-25.6 12.8-25.6 25.6v339.2l83.2-96c6.4-12.8 25.6-12.8 32 0 6.4 12.8 6.4 25.6 0 38.4l-115.2 134.4v134.4H25.6c-12.8 0-25.6 12.8-25.6 25.6s12.8 25.6 25.6 25.6h972.8c12.8 0 25.6-12.8 25.6-25.6s-12.8-25.6-25.6-25.6zM224 844.8l-70.4 76.8H83.2l102.4-115.2c6.4-12.8 25.6-12.8 32 0 12.8 6.4 12.8 25.6 6.4 38.4z m19.2-339.2h-57.6c-12.8 0-25.6-12.8-25.6-25.6 0-19.2 12.8-32 25.6-32h57.6c12.8 0 25.6 12.8 25.6 25.6 0 19.2-12.8 32-25.6 32zM384 876.8l-38.4 44.8h-64l70.4-83.2c6.4-12.8 25.6-12.8 32 0 12.8 12.8 12.8 32 0 38.4z m6.4-102.4h-57.6c-12.8 0-25.6-12.8-25.6-25.6s12.8-25.6 25.6-25.6h57.6c12.8 0 25.6 12.8 25.6 25.6s-12.8 25.6-25.6 25.6z m0-134.4h-57.6c-12.8 0-25.6-12.8-25.6-25.6s12.8-25.6 25.6-25.6h57.6c12.8 0 25.6 12.8 25.6 25.6s-12.8 25.6-25.6 25.6z m0-134.4h-57.6c-12.8 0-25.6-12.8-25.6-32 0-12.8 12.8-25.6 25.6-25.6h57.6c12.8 0 25.6 12.8 25.6 25.6 0 19.2-12.8 32-25.6 32z m300.8 268.8h-57.6c-12.8 0-25.6-12.8-25.6-25.6s12.8-25.6 25.6-25.6h57.6c12.8 0 25.6 12.8 25.6 25.6s-12.8 25.6-25.6 25.6z m0-134.4h-57.6c-12.8 0-25.6-12.8-25.6-25.6s12.8-25.6 25.6-25.6h57.6c12.8 0 25.6 12.8 25.6 25.6s-12.8 25.6-25.6 25.6z m0-134.4h-57.6c-12.8 0-25.6-12.8-25.6-25.6 0-19.2 12.8-32 25.6-32h57.6c12.8 0 25.6 12.8 25.6 25.6 0 19.2-12.8 32-25.6 32z m0-140.8h-57.6c-12.8 0-25.6-12.8-25.6-25.6s12.8-25.6 25.6-25.6h57.6c12.8 0 25.6 12.8 25.6 25.6s-12.8 25.6-25.6 25.6z m0-134.4h-57.6c-12.8 0-25.6-12.8-25.6-25.6s12.8-25.6 25.6-25.6h57.6c12.8 0 25.6 12.8 25.6 25.6s-12.8 25.6-25.6 25.6z m147.2 544h-57.6c-12.8 0-25.6-12.8-25.6-25.6s12.8-25.6 25.6-25.6h57.6c12.8 0 25.6 12.8 25.6 25.6s-12.8 25.6-25.6 25.6z m0-134.4h-57.6c-12.8 0-25.6-12.8-25.6-25.6s12.8-25.6 25.6-25.6h57.6c12.8 0 25.6 12.8 25.6 25.6s-12.8 25.6-25.6 25.6z m0-134.4h-57.6c-12.8 0-25.6-12.8-25.6-25.6 0-19.2 12.8-32 25.6-32h57.6c12.8 0 25.6 12.8 25.6 25.6 0 19.2-12.8 32-25.6 32z m0-140.8h-57.6c-12.8 0-25.6-12.8-25.6-25.6s12.8-25.6 25.6-25.6h57.6c12.8 0 25.6 12.8 25.6 25.6s-12.8 25.6-25.6 25.6z m0-134.4h-57.6c-12.8 0-25.6-12.8-25.6-25.6s12.8-25.6 25.6-25.6h57.6c12.8 0 25.6 12.8 25.6 25.6s-12.8 25.6-25.6 25.6z m0 0"  /></svg>`

// const buildSvg = `<svg class="buildSvg" width="20px" height="20px" style="vertical-align: middle;margin-bottom:1px;margin-right:3px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path class="buildSvg" fill="#1890ff" d="M725.333333 298.666667h-85.333333V213.333333h-213.333333v85.333334H341.333333v512h384V298.666667z m0-42.666667a42.666667 42.666667 0 0 1 42.666667 42.666667v512h64a21.333333 21.333333 0 0 1 0 42.666666h-597.333333a21.333333 21.333333 0 0 1 0-42.666666H298.666667V298.666667a42.666667 42.666667 0 0 1 42.666666-42.666667h42.666667V213.333333a42.666667 42.666667 0 0 1 42.666667-42.666666h213.333333a42.666667 42.666667 0 0 1 42.666667 42.666666v42.666667h42.666666z m-213.333333 256h42.666667v85.333333h-42.666667v-85.333333z m0 170.666667h42.666667v85.333333h-42.666667v-85.333333z m0-341.333334h42.666667v85.333334h-42.666667V341.333333zM384 341.333333h42.666667v85.333334H384V341.333333z m256 170.666667h42.666667v85.333333h-42.666667v-85.333333z m0 170.666667h42.666667v85.333333h-42.666667v-85.333333z m0-341.333334h42.666667v85.333334h-42.666667V341.333333z m-256 170.666667h42.666667v85.333333H384v-85.333333z m0 170.666667h42.666667v85.333333H384v-85.333333z" /></svg>`

// const floorSvg = `<svg class="floorSvg" width="14px" height="14px" style="vertical-align: middle;margin-right:3px" viewBox="0 0 1117 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path class="floorSvg" fill="#1890ff" d="M555.070359 591.277419a79.556565 79.556565 0 0 1-33.497501-7.257792L54.934057 371.636165a83.743753 83.743753 0 0 1 0-151.994911L521.107614 7.304316A83.743753 83.743753 0 0 1 554.605116 0a81.138392 81.138392 0 0 1 33.497501 7.257792l466.6388 212.383462a83.743753 83.743753 0 0 1 0 151.994911l-466.173557 212.383462a84.441617 84.441617 0 0 1-33.497501 7.257792z m-0.465243 232.621536a45.640345 45.640345 0 0 1-18.609723-4.094139L26.55423 580.80945a46.524307 46.524307 0 0 1-22.331668-60.946842 45.268151 45.268151 0 0 1 41.406634-26.798001 43.500227 43.500227 0 0 1 18.609722 4.233712l490.831441 230.016174 497.344843-230.155747a46.896502 46.896502 0 0 1 19.074966-4.094139 44.616811 44.616811 0 0 1 40.94139 26.937574 46.245161 46.245161 0 0 1 1.395729 35.2189 44.942481 44.942481 0 0 1-23.727396 25.774466l-516.41981 238.855793a47.594366 47.594366 0 0 1-19.074965 4.140664z m0 200.054521a45.68687 45.68687 0 0 1-18.609723-4.140664L26.55423 780.863971a45.314675 45.314675 0 0 1-23.727397-25.914039 45.872967 45.872967 0 0 1 1.395729-35.079328 45.128578 45.128578 0 0 1 40.94139-26.798001 43.407179 43.407179 0 0 1 19.074966 4.280237l490.831441 229.96965 497.344843-230.155748a46.849977 46.849977 0 0 1 19.074966-4.047614 44.616811 44.616811 0 0 1 40.94139 26.937573 46.105588 46.105588 0 0 1 1.395729 35.172377 44.570286 44.570286 0 0 1-23.727396 25.727942l-516.41981 238.809268a43.174557 43.174557 0 0 1-19.074965 4.140663z" /></svg>`

// const areaSvg = `<svg class="areaSvg" width="14px" height="14px" style="vertical-align: middle;margin-right:3px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path class="areaSvg" fill="#1890ff" d="M736.70857156 40.57142844c-134.88 0-240 110.67428531-240 245.07428625 0 102.72 65.41714312 219.36 120.96 298.35428531 43.68 61.30285687 89.28 112.66285688 109.09714313 136.38857156 1.98857156 1.98857156 5.96571469 5.89714313 9.94285687 5.89714313 1.98857156 0 7.88571469-1.98857156 9.87428531-5.89714313 21.87428531-23.72571469 65.48571469-75.08571469 109.09714313-136.38857156 55.54285687-78.99428531 121.02857156-195.63428531 121.02857156-298.35428531 1.92-134.4-107.10857156-245.07428531-240-245.07428625z m0 342.85714312c-56.98285688 0-102.85714313-46.62857156-102.85714312-102.85714312 0-57.6 45.87428531-102.85714313 102.85714312-102.85714313s102.85714313 46.62857156 102.85714313 102.85714313-45.87428531 102.85714313-102.85714313 102.85714312z m-102.85714312 303.08571375L101.6 658.05714313l62.05714313-216.89142844a24.48 24.48 0 0 1 22.97142843-18.65142938l274.28571375-8.91428531c12.54857156 37.44 44.43428531 101.48571469 65.82857156 136.45714313 13.85142844 22.62857156 49.57714312 68.09142844 107.10857157 136.45714218zM460.91428531 925.48571469l-401.76-2.4c-8.36571469 0-16.73142844-2.05714313-20.91428531-10.35428625C32 908.61714312 32 900.25142844 32 891.88571469l54.30857156-189.05142938 517.30285688 34.42285782-142.62857157 188.16z m496.59428625-157.85142938l-160.04571468-14.88a4668.54857156 4668.54857156 0 0 0 99.70285781-126.72c2.05714313-8.22857156 8.36571469-12.41142844 12.48-20.70857062l47.86285687 162.30857062z m31.54285688 120.13714313c0 2.05714313 2.12571469 6.24 2.12571469 8.29714312a27.49714313 27.49714313 0 0 1-27.15428625 27.01714313H502.05714312l145.71428532-177.05142938 318.30857156 58.69714313 23.04 83.04z"/></svg>`

const pointSvg = `<svg class="pointSvg" width="18px" height="18px" style="vertical-align: middle;margin-right:3px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path class="pointSvg" fill="#27b200" d="M512 163.85c35.13 0 69.18 6.86 101.18 20.4 30.95 13.09 58.76 31.85 82.67 55.75 23.9 23.9 42.66 51.72 55.75 82.67 13.54 32.01 20.4 66.05 20.4 101.18 0 12.48-0.89 25-2.64 37.24-5.79 40.49-21.4 79.57-45.14 113.03-10.51 14.13-135.82 171.27-211.47 262.09C435.64 744.44 307.5 584.87 293.8 565.3c-20.64-31.74-33.81-66.79-39.16-104.24a263.07 263.07 0 0 1-2.64-37.21c0-35.13 6.86-69.18 20.4-101.18 13.09-30.95 31.85-58.76 55.75-82.67 23.9-23.9 51.72-42.66 82.67-55.75 32-13.54 66.05-20.4 101.18-20.4m0-76c-185.57 0-336 150.43-336 336 0 16.3 1.16 32.32 3.41 48 7.06 49.41 24.88 95.36 51.01 135.39 13.26 20.32 192.39 242.55 258.39 317.99 6.38 7.29 15.23 10.93 24.08 10.93 8.9 0 17.8-3.68 24.18-11.04 64.87-74.8 239.17-293.01 248.93-306.73l0.02-0.03c30.26-42.56 50.85-92.46 58.58-146.51a337.73 337.73 0 0 0 3.41-48c-0.01-185.57-150.44-336-336.01-336z"  /><path fill="#27b200" d="M512 361.85c34.19 0 62 27.81 62 62s-27.81 62-62 62-62-27.81-62-62 27.81-62 62-62m0-76c-76.22 0-138 61.78-138 138s61.78 138 138 138 138-61.78 138-138-61.78-138-138-138z"  /></svg>`

// const deviceSvg = `<svg class="deviceSvg" width="16px" height="16px" style="vertical-align: middle;"  viewBox="0 0 1192 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path class="deviceSvg" fill="#1890ff" d="M1184.779915 416.759041c-16.501113 33.002226-39.602671 62.704229-66.004452 85.805788 9.900668 9.900668 13.20089 26.401781 6.600445 39.602671L1009.868117 792.984418c-6.600445 16.501113-29.702003 26.401781-46.203117 16.501113l-99.006678-46.203117c-29.702003 33.002226-79.205342 39.602671-118.808014 19.801336l-198.013356-92.406233-66.004452 135.309127c-16.501113 36.302449-52.803562 56.103784-92.406233 56.103784H207.914024v36.302449c0 56.103784-46.203116 105.607123-105.607123 105.607123h-66.004452c-9.900668 0-16.501113-3.300223-23.101559-9.900668-9.900668-6.600445-13.20089-16.501113-13.20089-26.401781V641.174178c0-19.801336 16.501113-36.302449 36.302449-36.302449h69.304674c42.902894 0 82.505565 26.401781 99.006678 69.304675h118.808014l36.302449-72.604897-178.212021-82.505565c-85.805788-39.602671-125.408459-145.209795-82.505565-231.015583L188.112688 99.937671C227.71536 14.131883 333.322483-25.470788 419.128271 17.432106l755.750976 353.123818c9.900668 3.300223 13.20089 9.900668 16.501113 19.801336-3.300223 6.600445-3.300223 16.501113-6.600445 26.401781zM105.607123 677.476627H69.304675v277.218698h36.302448c19.801336 0 36.302449-16.501113 36.302449-36.302448v-207.914024c-3.300223-19.801336-16.501113-33.002226-36.302449-33.002226z m854.757655 56.103784l89.10601-188.112689h-3.300223c-26.401781 9.900668-52.803562 13.20089-79.205342 13.200891l-69.304675 148.510017 62.70423 26.401781z m-617.141627 13.20089h-132.008904v69.304675h174.911798c13.20089 0 26.401781-6.600445 29.702003-19.801336l66.004452-132.008904-62.704229-29.702003-46.203117 92.406233c-6.600445 9.900668-19.801336 19.801336-29.702003 19.801335zM201.313579 225.34613L158.410685 321.052585c-23.101558 52.803562-3.300223 115.507791 49.503339 138.60935l564.338065 264.017808c9.900668 3.300223 16.501113 3.300223 26.401781 0 9.900668-3.300223 16.501113-9.900668 19.801336-16.501113l75.90512-158.410685c-9.900668-3.300223-23.101558-6.600445-33.002226-13.20089l-660.044521-310.220925z m181.512243-145.209795c-52.803562-23.101558-112.207569 0-138.609349 49.503339l-13.200891 33.002226 660.044521 306.920703c75.90512 36.302449 165.01113 13.20089 211.214247-52.803562L382.825822 80.136335zM739.249863 627.973288l-125.408459-59.404007c-9.900668-6.600445-19.801336-16.501113-19.801335-29.702004s3.300223-23.101558 13.20089-33.002226c9.900668-6.600445 23.101558-9.900668 33.002226-3.300222l125.408459 59.404006c9.900668 6.600445 19.801336 16.501113 19.801336 29.702004s-3.300223 23.101558-13.200891 33.002226c-6.600445 9.900668-19.801336 9.900668-33.002226 3.300223z m-363.024486-171.611576c-19.801336 0-36.302449-16.501113-36.302449-36.302449s16.501113-36.302449 36.302449-36.302448c19.801336 0 36.302449 16.501113 36.302448 36.302448 0 19.801336-16.501113 36.302449-36.302448 36.302449zM250.816918 396.957705c-19.801336 0-33.002226-13.20089-33.002226-33.002226s16.501113-36.302449 36.302448-36.302448c19.801336 0 36.302449 16.501113 36.302449 36.302448-3.300223 19.801336-19.801336 33.002226-39.602671 33.002226z" /></svg>`

const userSvg = `<svg class="userSvg"  width="14px" height="14px" style="vertical-align: middle;margin-bottom:1px"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path class="userSvg" fill="#1890ff" d="M516.482 622.742c130.342-0.176 217.178-174.638 217.178-268.506 0-93.867-0.351-260.859-217.178-260.859s-217.177 166.992-217.177 260.86 86.836 268.769 217.177 268.505zM874.285 754.93c-55.459-43.418-215.42-115.664-215.42-115.664L555.066 831.395l-15.38-45.791 28.388-57.745-56.865-57.744-56.865 57.744 28.476 57.745-18.369 46.845-100.986-193.183s-159.873 72.246-215.42 115.664c-23.643 18.545-41.66 52.998-54.492 86.572v88.682h836.806v-93.428c-12.48-30.586-30.498-61.787-56.074-81.826z" /></svg>`

const userGroupSvg = `<svg class="userGroupSvg" width="14px" height="14px" style="vertical-align: middle;margin-bottom:1px"  viewBox="0 0 1307 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path class="userGroupSvg" fill="#1890ff" d="M439.644596 616.121191c11.002553-4.096 24.358128-8.017702 40.219234-17.887319 23.094468-14.444936 40.851064-44.42417-2.026213-81.135659-142.227064-204.647489-90.373447-340.534468-68.84766-391.712681-18.061617-7.059064-38.476255-11.133277-62.050042-11.133277h-7.40766c-136.061277 0-172.206298 123.490043-174.886127 192.860596-1.873702 163.360681 98.216851 228.504511 98.216851 228.504511s6.296511 8.627745 6.29651 33.574127c0 5.664681-3.790979 22.745872-10.065702 27.778724C203.318468 642.156936 16.797957 689.239149 3.899915 786.519149c-6.906553 28.105532-2.83234 57.300426-1.41617 84.425532C32.985872 894.365957 130.723404 914.126979 130.723404 914.126979s8.170213-24.619574 16.340426-65.274553c11.939404-60.263489 93.467234-157.565277 292.580766-232.731235z m863.62417 169.482894c-13.355574-97.149277-204.756426-144.231489-261.947915-189.265702-6.601532-5.185362-10.370723-22.13583-10.370723-27.778723 0-24.946383 6.274723-33.421617 6.274723-33.421617s102.617872-64.969532 100.722383-228.177703c-2.83234-69.218043-46.036426-192.708085-179.287149-192.708085h-7.538383c-28.759149 0-52.790468 5.490383-73.531915 14.423149 28.43234 95.275574 62.681872 270.248851-81.397106 387.46417-56.581447 84.273021 131.812766 133.555745 102.617872 120.374469 170.310809 76.582128 216.194723 135.276936 228.765958 195.867234 10.370723 50.677106 16.340426 81.593191 16.340425 81.593191s127.76034-19.456 160.768-44.249872c1.41617-26.841872 5.664681-56.036766-1.41617-84.120511zM747.302128 599.148936c-8.017702-6.449021-12.745532-27.626213-12.745532-34.532766 0-30.916085 7.712681-41.59183 7.712681-41.59183-0.152511 0.174298 126.017362-68.106894 123.511829-283.560851C862.338723 153.469277 809.373957 0 645.773617 0h-9.259574c-171.116936 0-216.543319 153.316766-219.985703 239.485277-2.353021 202.904511 123.51183 283.560851 123.51183 283.560851s15.251064 17.429787 15.251064 48.345872c0 7.059064-12.113702 21.504-20.131404 27.778723-70.242043 56.014979-323.061106 112.509277-339.423319 233.341277-12.723745 51.178213-87.67183 132.466383 161.879149 165.25617 68.804085 8.932766 162.140596 14.292426 288.332255 14.292426 578.886809 0 459.14417-112.051745 442.956255-177.653107-16.492936-120.832-271.36-179.221787-341.62383-235.236766z" /></svg>`

const doorSvg = `<svg t="1592646249837" class="doorSvg" width="16px" height="16px" style="vertical-align: middle;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4921" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"></style></defs><path class="doorSvg" d="M825.06752 71.8336l-512 0c-11.30496 0-20.48 9.17504-20.48 20.48l0 306.18624 28.17024 0c-8.46848-10.81344-13.06624-24.064-13.06624-38.01088-0.01024-16.51712 6.43072-32.0512 18.11456-43.7248 2.4064-2.4064 5.02784-4.54656 7.75168-6.5024L333.55776 112.7936l471.04 0 0 14.71488-215.04 156.12928 0 668.53888 216.20736-156.9792c2.75456 8.06912 10.31168 13.91616 19.31264 13.91616 11.30496 0 20.48-9.17504 20.48-20.48l0-696.32C845.54752 80.9984 836.38272 71.8336 825.06752 71.8336zM670.79168 633.47712c-9.65632 0-17.70496-11.9296-19.78368-27.89376l-23.06048 0 0-17.92 23.38816 0c2.44736-14.99136 10.17856-26.01984 19.44576-26.01984 11.22304 0 20.31616 16.0768 20.31616 35.92192C691.10784 617.40032 682.01472 633.47712 670.79168 633.47712zM325.81632 603.86304c2.4064 2.39616 5.0176 4.52608 7.7312 6.47168l0 178.29888c0 11.30496-9.17504 20.48-20.48 20.48s-20.48-9.17504-20.48-20.48L292.58752 522.09664l28.17024 0C301.83424 546.33472 303.50336 581.53984 325.81632 603.86304zM472.29952 441.30304c8.15104 8.15104 8.15104 21.32992 0 29.48096l-99.80928 99.81952c-4.06528 4.05504-9.40032 6.10304-14.73536 6.11328-5.33504-0.01024-10.67008-2.048-14.73536-6.11328-8.1408-8.1408-8.13056-21.34016 0-29.47072l64.24576-64.24576-207.9744 0c-11.50976 0-20.8384-9.32864-20.8384-20.8384s9.3184-20.8384 20.84864-20.8384l207.95392 0-64.23552-64.24576c-8.13056-8.13056-8.1408-21.32992 0-29.46048 8.1408-8.1408 21.34016-8.1408 29.48096 0L472.29952 441.30304z" p-id="4922"></path></svg>`

const doorGroupSvg = `<svg class="doorGroupSvg" width="16px" height="16px" style="vertical-align: middle;"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path class="doorGroupSvg" fill="#1890ff" d="M160 192h512a32 32 0 0 1 32 32v608h192V96a32 32 0 0 0-32-32H352a32 32 0 0 0-32 32v32h512v640h-64v64h-64v128H128V224a32 32 0 0 1 32-32z m32 64v640h448V256z m256 384h64v64h-64v64H384v-197.464C346.712 557.36 320 521.8 320 480c0-53.02 42.98-96 96-96s96 42.98 96 96c0 41.8-26.712 77.36-64 90.536z m-32-128a32 32 0 1 0 0-64 32 32 0 0 0 0 64z" /></svg>`

const orgSvg = `<svg t="1593056125819" class="orgSvg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2865" xmlns:xlink="http://www.w3.org/1999/xlink"  width="12px" height="12px" style="vertical-align: middle;margin-right:2px;margin-bottom:2px"><defs><style type="text/css"></style></defs><path d="M896 896v-64h-64V384h192L512 0 0 384h192v448H128v64c-70.688 0-128 57.312-128 128h1024c0-70.688-57.312-128-128-128z m-128-512v448h-64V384h64z m-192 0v448h-128V384h128z m-320 0h64v448h-64V384z" fill="#1890ff" p-id="2866" ></path></svg>`

const floorSvg = `<svg id="图层_1" style="position:relative;top:3px" width="16px" height="16px" data-name="图层 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><defs><style>.cls-1{fill:#27b200;}</style></defs><title>楼层-全部在线</title><path class="cls-1" d="M857.8,342.28C806.3,196.56,668.11,98.15,513.17,98.15H511.5c-201,0-365.15,163.73-365.57,364.73A365.79,365.79,0,0,0,389.22,808.34C418.54,856.08,470,927.27,512.34,927.27c21.77,0,44-15.08,73.7-50.67,16.33-19.26,34.33-44.39,49-68.26,91.7-32.66,165.4-98.82,207.28-186.76C885,533.65,890,434.4,857.8,342.28ZM648,302.09H449.78V423.7H611a39.65,39.65,0,1,1,0,79.3H449.78V696a39.65,39.65,0,1,1-79.3,0V262.44a39.94,39.94,0,0,1,39.65-39.65H648a39.65,39.65,0,1,1,0,79.3Z"/></svg>`

const buildSvg = `<svg id="图层_1" style="position:relative;top:3px" width="16px" height="16px" data-name="图层 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><defs><style>.cls-1{fill:#27b200;}</style></defs><title>单位-全部在线</title><path class="cls-1" d="M873.34,847.07H851.22V391.86A70.14,70.14,0,0,0,830,341a71.63,71.63,0,0,0-50.87-21.24H611V199.43a70.15,70.15,0,0,0-21.24-50.88,71.67,71.67,0,0,0-50.87-21.23H250a70.94,70.94,0,0,0-50.88,21.23,71.69,71.69,0,0,0-21.23,50.88V847.07H152.26a23.89,23.89,0,1,0,0,47.77H873.34a23.89,23.89,0,0,0,0-47.77Zm-503-94.67h-96v-96h96Zm0-192.44h-96V464h96Zm0-192h-96V271.53h96ZM514.57,752.4h-96v-96h96Zm0-192.44h-96V464h96Zm0-192h-96V271.53h96ZM754.78,752.4h-96v-96h96Zm0-192.44h-96V464h96Z"/></svg>`

const areaSvg = `<svg id="图层_1" style="position:relative;top:3px" width="16px" height="16px" data-name="图层 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><defs><style>.cls-1{fill:#27b200;}</style></defs><title>定点-全部在线</title><path class="cls-1" d="M823.87,648.46l-201.52-.78L534.86,748.59a31,31,0,0,1-46.86.1L399.05,646.81,207.55,646,78.26,895.87H943.34Z"/><path class="cls-1" d="M736.28,353.13c0-124.52-100.9-225.43-225.43-225.43H509C385.35,128.77,285.51,229.19,285.51,353a224.9,224.9,0,0,0,4.28,43.84s.29,2.14,1.36,6.61a224.26,224.26,0,0,0,28.09,68.24c.3.49.59,1,.88,1.56C345.69,522.48,392.44,596.65,477.8,700c4.27,5.16,8.65,10.41,13.12,15.66a25.09,25.09,0,0,0,38.69-.3c92.16-112.86,142.32-189,169.63-238.46.29-.48.49-.87.78-1.36a224.58,224.58,0,0,0,26.25-56.38c5.64-15.85,5.64-22.26,5.64-22.26a223.3,223.3,0,0,0,4.37-43.75ZM510.46,461.72A100.13,100.13,0,1,1,610.59,361.59,100.12,100.12,0,0,1,510.46,461.72Z"/></svg>`

const fenceSvg = `<svg id="图层_1" style="position:relative;top:3px" width="16px" height="16px" data-name="图层 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><defs><style>.cls-1{fill:#27b200;}</style></defs><title>围栏3</title><path class="cls-1" d="M279.29,597.14,361.08,332.2l288.44-40.76,84,244.56L547.32,742.07Z"/><path class="cls-1" d="M692,229.44,797.27,536.76,558.11,802.18,219.26,618.39,322.84,281.77,692,229.44m41.56-67.79-457.85,64.9L145.93,648.31,571.36,879.06,866.94,551Z"/></svg>`

const planeSvg = `<svg id="图层_1" style="position:relative;top:3px" width="16px" height="16px" data-name="图层 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><defs><style>.cls-1{fill:#27b200;}</style></defs><title>平面图3</title><path class="cls-1" d="M376.48,633.93,786.12,833.74a84.78,84.78,0,0,1-31.63,6.09h-453l74.92-205.9ZM201.1,548.41l103.19,50.35L225.75,814.59a84.9,84.9,0,0,1-24.65-59.9ZM754.49,201.3a85.14,85.14,0,0,1,85.14,85.14V754.69a85.84,85.84,0,0,1-1.45,15.67L403.9,558.54,534,201.3ZM449,201.3l-117.24,322L201.1,459.61V286.44a85.14,85.14,0,0,1,85.14-85.14Z"/></svg>`

const buildGroupSvg = `<svg id="图层_1" style="position:relative;top:3px" width="16px" height="16px" data-name="图层 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><defs><style>.cls-1{fill:#27b200;}</style></defs><title>建筑物分组-全部在线</title><path class="cls-1" d="M861.25,679.79h-250c-39,0-70.61-34.3-70.61-76.62V498.45c0-42.32,31.61-76.63,70.61-76.63h250c2,0,3.94.15,5.88.32V272.51c0-42.62-31.82-77.16-71.09-77.16H232.22c-39.27,0-71.09,34.54-71.09,77.16V811c0,42.61,31.82,77.16,71.09,77.16H796c39.27,0,71.09-34.55,71.09-77.16V679.47C865.19,679.65,863.24,679.79,861.25,679.79Z"/><circle class="cls-1" cx="690.26" cy="550.76" r="66.59"/></svg>`

const deviceSvg = ``

const parentNodeSvg = `<svg style="position:relative;top:1px;margin-right:5px" viewBox="0 0 1260 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2020" xmlns:xlink="http://www.w3.org/1999/xlink" width="14px" height="14px"><defs><style type="text/css"></style></defs><path d="M1171.561026 935.253333H88.746667V246.285128h1082.814359zM88.746667 88.746667h398.047179L508.849231 157.538462h-420.102564zM1171.561026 157.538462H601.796923l-30.982564-96.098462A88.221538 88.221538 0 0 0 486.793846 0H88.746667A88.746667 88.746667 0 0 0 0 88.746667v846.506666a88.746667 88.746667 0 0 0 88.746667 88.746667h1082.814359A88.746667 88.746667 0 0 0 1260.307692 935.253333V246.285128A88.746667 88.746667 0 0 0 1171.561026 157.538462z" fill="#5E5C5C" p-id="2021"></path></svg>`

const leafNodeSvg = `<svg style="position:relative;top:3px;margin-right:5px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2037" xmlns:xlink="http://www.w3.org/1999/xlink" width="16px" height="16px"><defs><style type="text/css"></style></defs><path d="M858.251002 65.538669 709.22692 65.538669l-0.204661 0.184195c-0.112564 0-0.204661-0.038886-0.312108-0.038886-13.967106 0-25.461905 10.3006-27.538193 23.667026l-0.248663 0.225127c-7.556093 33.045627-18.427698 76.41232-53.822836 76.41232l-246.183935-1.517563c-34.927487 0-45.37442-42.771129-53.413514-75.16491-1.36509-13.386892-12.069897-23.892153-25.568329-24.910343l-0.370437-0.375553L165.181063 64.020082c-20.552082 0-37.239136 16.666588-37.239136 37.239136l0 819.454394c0 20.571525 16.686031 37.238113 37.239136 37.238113l693.049472 1.517563c20.557198 0 37.239136-16.666588 37.239136-37.238113L895.469672 102.777805C895.490138 82.205257 878.788757 65.538669 858.251002 65.538669L858.251002 65.538669 858.251002 65.538669zM858.251002 922.232199l-693.069939-1.517563L165.181063 101.260242l126.998439 0c9.087982 36.459377 26.38288 100.44569 88.810698 100.44569l246.183935 1.517563c62.952774 0 80.69281-64.810075 88.940658-100.44569L858.230536 102.777805l0 819.454394L858.251002 922.232199 858.251002 922.232199 858.251002 922.232199zM407.172513 101.372805l209.110575 1.517563c10.295484 0 18.61701-8.346085 18.61701-18.622126 0-10.277064-8.321526-18.61701-18.61701-18.61701L407.172513 64.133669c-10.281157 0-18.622126 8.339946-18.622126 18.61701C388.550387 93.025697 396.891356 101.372805 407.172513 101.372805L407.172513 101.372805 407.172513 101.372805zM246.674099 381.845685c0 10.276041 8.339946 18.61701 18.61701 18.61701l497.744321 1.517563c10.295484 0 18.622126-8.340969 18.622126-18.61701 0-10.277064-8.326643-18.622126-18.622126-18.622126l-497.744321-1.517563C255.014044 363.223558 246.674099 371.56862 246.674099 381.845685L246.674099 381.845685 246.674099 381.845685zM763.03543 542.794353l-497.744321-1.517563c-10.277064 0-18.61701 8.321526-18.61701 18.61701 0 10.3006 8.339946 18.622126 18.61701 18.622126l497.744321 1.517563c10.295484 0 18.622126-8.321526 18.622126-18.622126C781.657556 551.115879 773.330914 542.794353 763.03543 542.794353L763.03543 542.794353 763.03543 542.794353zM763.03543 719.526497l-497.744321-1.517563c-10.277064 0-18.61701 8.321526-18.61701 18.622126 0 10.295484 8.339946 18.61701 18.61701 18.61701l497.744321 1.517563c10.295484 0 18.622126-8.321526 18.622126-18.61701C781.657556 727.848023 773.330914 719.526497 763.03543 719.526497L763.03543 719.526497 763.03543 719.526497zM763.03543 719.526497" p-id="2038"></path></svg>`

export {
	deleteSvg, editSvg, plusSvg, checkSvg, buildGroupSvg, buildSvg,
	floorSvg, areaSvg, pointSvg, deviceSvg, userSvg, userGroupSvg, doorSvg,
	doorGroupSvg, orgSvg, fenceSvg, planeSvg, parentNodeSvg, leafNodeSvg,
}
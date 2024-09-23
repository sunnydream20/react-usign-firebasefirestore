const Logo = (props) => {
  const gradientId = props.name === 'mobile' ? "_Linear1" : "_Linear2"
  const pathClassName = props.name === 'mobile' ? 'logo-fill-1' : 'logo-fill-2'

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 667 74"
      aria-labelledby={props.name}
      style={{display: 'block'}}
      {...props}
    >
      <title id={props.name}>{props.name} icon</title>
      <g transform="matrix(1,0,0,1,-262.942,-577.311)">
        <g transform="matrix(0.183257,0,0,0.183257,224.469,511.979)">
          <path
            id={props.id + '0'}
            d="M209.938,666.429L271.923,356.506L329.48,356.506L277.236,617.726L439.281,617.726L429.54,666.429L209.938,666.429Z"
            className={pathClassName}
          />
          <path
            id={props.id + '1'}
            d="M584.502,669.528C561.479,669.528 541.334,665.174 524.067,656.467C506.8,647.759 493.443,635.658 483.998,620.162C474.553,604.665 469.83,586.439 469.83,565.482C469.83,538.918 475.881,515.231 487.983,494.422C500.085,473.613 516.688,457.231 537.792,445.277C558.896,433.323 583.026,427.346 610.181,427.346C633.499,427.346 653.791,431.552 671.058,439.964C688.325,448.376 701.682,460.33 711.127,475.826C720.572,491.322 725.295,509.696 725.295,530.948C725.295,557.218 719.244,580.831 707.142,601.788C695.04,622.744 678.438,639.273 657.333,651.375C636.229,663.477 611.952,669.528 584.502,669.528ZM588.043,622.154C603.982,622.154 618.003,618.391 630.104,610.864C642.206,603.337 651.799,592.933 658.883,579.65C665.967,566.368 669.509,551.019 669.509,533.605C669.509,515.305 664.048,500.842 653.127,490.216C642.206,479.59 626.858,474.277 607.082,474.277C591.438,474.277 577.491,478.04 565.242,485.567C552.993,493.093 543.326,503.498 536.242,516.78C529.158,530.063 525.616,545.411 525.616,562.826C525.616,581.421 531.077,595.958 541.998,606.436C552.919,616.915 568.268,622.154 588.043,622.154Z"
            className={pathClassName}
          />
          <path
            id={props.id + '2'}
            d="M848.821,755.421C826.389,755.421 805.727,752.69 786.837,747.23C767.946,741.769 751.712,733.726 738.134,723.1L766.913,681.482C776.063,689.451 788.165,695.871 803.218,700.741C818.271,705.612 834.653,708.047 852.363,708.047C878.337,708.047 897.966,702.365 911.248,691.001C924.531,679.637 933.385,662.591 937.813,639.864L947.553,591.162L962.164,541.131L971.019,487.559L982.088,430.002L1034.77,430.002L994.927,630.566C986.072,674.546 969.543,706.35 945.34,725.978C921.136,745.606 888.963,755.421 848.821,755.421ZM862.546,655.803C842.18,655.803 824.027,651.892 808.088,644.07C792.149,636.248 779.605,625.032 770.455,610.421C761.305,595.811 756.73,578.322 756.73,557.956C756.73,539.36 760.05,522.167 766.692,506.376C773.333,490.585 782.63,476.786 794.585,464.979C806.539,453.173 820.707,443.949 837.088,437.307C853.47,430.666 871.401,427.346 890.882,427.346C908.001,427.346 923.793,430.371 938.256,436.422C952.719,442.473 964.23,452.213 972.79,465.643C981.35,479.073 985.334,496.709 984.744,518.551C984.154,544.526 978.988,567.918 969.248,588.727C959.508,609.536 945.635,625.917 927.63,637.871C909.625,649.826 887.93,655.803 862.546,655.803ZM874.943,608.872C890.882,608.872 904.902,605.403 917.004,598.467C929.106,591.531 938.625,581.938 945.561,569.689C952.497,557.439 955.966,543.64 955.966,528.292C955.966,511.467 950.505,498.259 939.584,488.666C928.663,479.073 913.462,474.277 893.981,474.277C878.042,474.277 864.022,477.745 851.92,484.681C839.818,491.618 830.226,501.137 823.142,513.238C816.058,525.34 812.516,539.213 812.516,554.857C812.516,571.681 818.05,584.889 829.119,594.482C840.187,604.075 855.462,608.872 874.943,608.872Z"
            className={pathClassName}
          />
          <path
            id={props.id + '0'}
            d="M1177.34,669.528C1154.32,669.528 1134.17,665.174 1116.9,656.467C1099.64,647.759 1086.28,635.658 1076.84,620.162C1067.39,604.665 1062.67,586.439 1062.67,565.482C1062.67,538.918 1068.72,515.231 1080.82,494.422C1092.92,473.613 1109.53,457.231 1130.63,445.277C1151.73,433.323 1175.86,427.346 1203.02,427.346C1226.34,427.346 1246.63,431.552 1263.89,439.964C1281.16,448.376 1294.52,460.33 1303.96,475.826C1313.41,491.322 1318.13,509.696 1318.13,530.948C1318.13,557.218 1312.08,580.831 1299.98,601.788C1287.88,622.744 1271.28,639.273 1250.17,651.375C1229.07,663.477 1204.79,669.528 1177.34,669.528ZM1180.88,622.154C1196.82,622.154 1210.84,618.391 1222.94,610.864C1235.04,603.337 1244.64,592.933 1251.72,579.65C1258.8,566.368 1262.35,551.019 1262.35,533.605C1262.35,515.305 1256.88,500.842 1245.96,490.216C1235.04,479.59 1219.69,474.277 1199.92,474.277C1184.28,474.277 1170.33,478.04 1158.08,485.567C1145.83,493.093 1136.16,503.498 1129.08,516.78C1122,530.063 1118.45,545.411 1118.45,562.826C1118.45,581.421 1123.91,595.958 1134.84,606.436C1145.76,616.915 1161.11,622.154 1180.88,622.154Z"
            className={pathClassName}
          />
          <path
            id={props.id + '3'}
            d="M1473.54,666.429L1535.52,356.506L1593.08,356.506L1540.83,617.726L1702.88,617.726L1693.14,666.429L1473.54,666.429Z"
            className={pathClassName}
          />
          <path
            id={props.id + '4'}
            d="M1848.1,669.528C1825.08,669.528 1804.93,665.174 1787.66,656.467C1770.4,647.759 1757.04,635.658 1747.6,620.162C1738.15,604.665 1733.43,586.439 1733.43,565.482C1733.43,538.918 1739.48,515.231 1751.58,494.422C1763.68,473.613 1780.29,457.231 1801.39,445.277C1822.49,433.323 1846.62,427.346 1873.78,427.346C1897.1,427.346 1917.39,431.552 1934.66,439.964C1951.92,448.376 1965.28,460.33 1974.72,475.826C1984.17,491.322 1988.89,509.696 1988.89,530.948C1988.89,557.218 1982.84,580.831 1970.74,601.788C1958.64,622.744 1942.04,639.273 1920.93,651.375C1899.83,663.477 1875.55,669.528 1848.1,669.528ZM1851.64,622.154C1867.58,622.154 1881.6,618.391 1893.7,610.864C1905.8,603.337 1915.4,592.933 1922.48,579.65C1929.56,566.368 1933.11,551.019 1933.11,533.605C1933.11,515.305 1927.65,500.842 1916.73,490.216C1905.8,479.59 1890.45,474.277 1870.68,474.277C1855.04,474.277 1841.09,478.04 1828.84,485.567C1816.59,493.093 1806.92,503.498 1799.84,516.78C1792.76,530.063 1789.21,545.411 1789.21,562.826C1789.21,581.421 1794.67,595.958 1805.6,606.436C1816.52,616.915 1831.87,622.154 1851.64,622.154Z"
            className={pathClassName}
          />
          <path
            id={props.id + '5'}
            d="M2112.42,755.421C2089.99,755.421 2069.32,752.69 2050.43,747.23C2031.54,741.769 2015.31,733.726 2001.73,723.1L2030.51,681.482C2039.66,689.451 2051.76,695.871 2066.82,700.741C2081.87,705.612 2098.25,708.047 2115.96,708.047C2141.93,708.047 2161.56,702.365 2174.85,691.001C2188.13,679.637 2196.98,662.591 2201.41,639.864L2211.15,591.162L2225.76,541.131L2234.62,487.559L2245.68,430.002L2298.37,430.002L2258.53,630.566C2249.67,674.546 2233.14,706.35 2208.94,725.978C2184.73,745.606 2152.56,755.421 2112.42,755.421ZM2126.14,655.803C2105.78,655.803 2087.62,651.892 2071.69,644.07C2055.75,636.248 2043.2,625.032 2034.05,610.421C2024.9,595.811 2020.33,578.322 2020.33,557.956C2020.33,539.36 2023.65,522.167 2030.29,506.376C2036.93,490.585 2046.23,476.786 2058.18,464.979C2070.14,453.173 2084.3,443.949 2100.69,437.307C2117.07,430.666 2135,427.346 2154.48,427.346C2171.6,427.346 2187.39,430.371 2201.85,436.422C2216.32,442.473 2227.83,452.213 2236.39,465.643C2244.95,479.073 2248.93,496.709 2248.34,518.551C2247.75,544.526 2242.59,567.918 2232.85,588.727C2223.11,609.536 2209.23,625.917 2191.23,637.871C2173.22,649.826 2151.53,655.803 2126.14,655.803ZM2138.54,608.872C2154.48,608.872 2168.5,605.403 2180.6,598.467C2192.7,591.531 2202.22,581.938 2209.16,569.689C2216.1,557.439 2219.56,543.64 2219.56,528.292C2219.56,511.467 2214.1,498.259 2203.18,488.666C2192.26,479.073 2177.06,474.277 2157.58,474.277C2141.64,474.277 2127.62,477.745 2115.52,484.681C2103.42,491.618 2093.82,501.137 2086.74,513.238C2079.66,525.34 2076.11,539.213 2076.11,554.857C2076.11,571.681 2081.65,584.889 2092.72,594.482C2103.78,604.075 2119.06,608.872 2138.54,608.872Z"
            className={pathClassName}
          />
          <path
            id={props.id + '6'}
            d="M2440.94,669.528C2417.91,669.528 2397.77,665.174 2380.5,656.467C2363.23,647.759 2349.88,635.658 2340.43,620.162C2330.99,604.665 2326.26,586.439 2326.26,565.482C2326.26,538.918 2332.32,515.231 2344.42,494.422C2356.52,473.613 2373.12,457.231 2394.23,445.277C2415.33,433.323 2439.46,427.346 2466.62,427.346C2489.93,427.346 2510.23,431.552 2527.49,439.964C2544.76,448.376 2558.12,460.33 2567.56,475.826C2577.01,491.322 2581.73,509.696 2581.73,530.948C2581.73,557.218 2575.68,580.831 2563.58,601.788C2551.47,622.744 2534.87,639.273 2513.77,651.375C2492.66,663.477 2468.39,669.528 2440.94,669.528ZM2444.48,622.154C2460.42,622.154 2474.44,618.391 2486.54,610.864C2498.64,603.337 2508.23,592.933 2515.32,579.65C2522.4,566.368 2525.94,551.019 2525.94,533.605C2525.94,515.305 2520.48,500.842 2509.56,490.216C2498.64,479.59 2483.29,474.277 2463.52,474.277C2447.87,474.277 2433.93,478.04 2421.68,485.567C2409.43,493.093 2399.76,503.498 2392.68,516.78C2385.59,530.063 2382.05,545.411 2382.05,562.826C2382.05,581.421 2387.51,595.958 2398.43,606.436C2409.35,616.915 2424.7,622.154 2444.48,622.154Z"
            className={pathClassName}
          />
          <path
            id={props.id + '7'}
            d="M2737.13,666.429L2799.12,356.506L2856.68,356.506L2804.43,617.726L2966.48,617.726L2956.74,666.429L2737.13,666.429Z"
            className={pathClassName}
          />
          <path
            id={props.id + '8'}
            d="M3111.7,669.528C3088.67,669.528 3068.53,665.174 3051.26,656.467C3033.99,647.759 3020.64,635.658 3011.19,620.162C3001.75,604.665 2997.03,586.439 2997.03,565.482C2997.03,538.918 3003.08,515.231 3015.18,494.422C3027.28,473.613 3043.88,457.231 3064.99,445.277C3086.09,433.323 3110.22,427.346 3137.38,427.346C3160.69,427.346 3180.99,431.552 3198.25,439.964C3215.52,448.376 3228.88,460.33 3238.32,475.826C3247.77,491.322 3252.49,509.696 3252.49,530.948C3252.49,557.218 3246.44,580.831 3234.34,601.788C3222.24,622.744 3205.63,639.273 3184.53,651.375C3163.42,663.477 3139.15,669.528 3111.7,669.528ZM3115.24,622.154C3131.18,622.154 3145.2,618.391 3157.3,610.864C3169.4,603.337 3178.99,592.933 3186.08,579.65C3193.16,566.368 3196.7,551.019 3196.7,533.605C3196.7,515.305 3191.24,500.842 3180.32,490.216C3169.4,479.59 3154.05,474.277 3134.28,474.277C3118.63,474.277 3104.69,478.04 3092.44,485.567C3080.19,493.093 3070.52,503.498 3063.44,516.78C3056.35,530.063 3052.81,545.411 3052.81,562.826C3052.81,581.421 3058.27,595.958 3069.19,606.436C3080.11,616.915 3095.46,622.154 3115.24,622.154Z"
            className={pathClassName}
          />
          <path
            id={props.id + '9'}
            d="M3376.02,755.421C3353.58,755.421 3332.92,752.69 3314.03,747.23C3295.14,741.769 3278.91,733.726 3265.33,723.1L3294.11,681.482C3303.26,689.451 3315.36,695.871 3330.41,700.741C3345.47,705.612 3361.85,708.047 3379.56,708.047C3405.53,708.047 3425.16,702.365 3438.44,691.001C3451.72,679.637 3460.58,662.591 3465.01,639.864L3474.75,591.162L3489.36,541.131L3498.21,487.559L3509.28,430.002L3561.97,430.002L3522.12,630.566C3513.27,674.546 3496.74,706.35 3472.53,725.978C3448.33,745.606 3416.16,755.421 3376.02,755.421ZM3389.74,655.803C3369.38,655.803 3351.22,651.892 3335.28,644.07C3319.34,636.248 3306.8,625.032 3297.65,610.421C3288.5,595.811 3283.93,578.322 3283.93,557.956C3283.93,539.36 3287.24,522.167 3293.89,506.376C3300.53,490.585 3309.83,476.786 3321.78,464.979C3333.73,453.173 3347.9,443.949 3364.28,437.307C3380.66,430.666 3398.6,427.346 3418.08,427.346C3435.2,427.346 3450.99,430.371 3465.45,436.422C3479.91,442.473 3491.43,452.213 3499.99,465.643C3508.55,479.073 3512.53,496.709 3511.94,518.551C3511.35,544.526 3506.18,567.918 3496.44,588.727C3486.7,609.536 3472.83,625.917 3454.83,637.871C3436.82,649.826 3415.12,655.803 3389.74,655.803ZM3402.14,608.872C3418.08,608.872 3432.1,605.403 3444.2,598.467C3456.3,591.531 3465.82,581.938 3472.76,569.689C3479.69,557.439 3483.16,543.64 3483.16,528.292C3483.16,511.467 3477.7,498.259 3466.78,488.666C3455.86,479.073 3440.66,474.277 3421.18,474.277C3405.24,474.277 3391.22,477.745 3379.12,484.681C3367.01,491.618 3357.42,501.137 3350.34,513.238C3343.25,525.34 3339.71,539.213 3339.71,554.857C3339.71,571.681 3345.24,584.889 3356.31,594.482C3367.38,604.075 3382.66,608.872 3402.14,608.872Z"
            className={pathClassName}
          />
          <path
            id={props.id + '10'}
            d="M3704.53,669.528C3681.51,669.528 3661.37,665.174 3644.1,656.467C3626.83,647.759 3613.47,635.658 3604.03,620.162C3594.59,604.665 3589.86,586.439 3589.86,565.482C3589.86,538.918 3595.91,515.231 3608.01,494.422C3620.12,473.613 3636.72,457.231 3657.82,445.277C3678.93,433.323 3703.06,427.346 3730.21,427.346C3753.53,427.346 3773.82,431.552 3791.09,439.964C3808.36,448.376 3821.71,460.33 3831.16,475.826C3840.6,491.322 3845.33,509.696 3845.33,530.948C3845.33,557.218 3839.28,580.831 3827.17,601.788C3815.07,622.744 3798.47,639.273 3777.37,651.375C3756.26,663.477 3731.98,669.528 3704.53,669.528ZM3708.08,622.154C3724.01,622.154 3738.03,618.391 3750.14,610.864C3762.24,603.337 3771.83,592.933 3778.91,579.65C3786,566.368 3789.54,551.019 3789.54,533.605C3789.54,515.305 3784.08,500.842 3773.16,490.216C3762.24,479.59 3746.89,474.277 3727.11,474.277C3711.47,474.277 3697.52,478.04 3685.27,485.567C3673.03,493.093 3663.36,503.498 3656.27,516.78C3649.19,530.063 3645.65,545.411 3645.65,562.826C3645.65,581.421 3651.11,595.958 3662.03,606.436C3672.95,616.915 3688.3,622.154 3708.08,622.154Z"
            className={pathClassName}
          />
        </g>
      </g>
      <defs>
        <linearGradient
          id={gradientId}
          x1="0"
          y1="0"
          x2="1"
          y2="0"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(3650.88,0,0,539.708,191.786,507.704)"
        >
          <stop offset="0" className="logo-stop-0" />
          <stop offset="0.37" className="logo-stop-0" />
          <stop offset="1" className="logo-stop-1" />
        </linearGradient>
        <linearGradient
          id={gradientId}
          x1="0"
          y1="0"
          x2="1"
          y2="0"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(3650.88,0,0,539.708,191.786,507.704)"
        >
          <stop offset="0" className="logo-stop-0" />
          <stop offset="0.37" className="logo-stop-0" />
          <stop offset="1" className="logo-stop-1" />
        </linearGradient>
        <linearGradient
          id={gradientId}
          x1="0"
          y1="0"
          x2="1"
          y2="0"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(3650.88,0,0,539.708,191.786,507.704)"
        >
          <stop offset="0" className="logo-stop-0" />
          <stop offset="0.37" className="logo-stop-0" />
          <stop offset="1" className="logo-stop-1" />
        </linearGradient>
        <linearGradient
          id={gradientId}
          x1="0"
          y1="0"
          x2="1"
          y2="0"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(3650.88,0,0,539.708,191.786,507.704)"
        >
          <stop offset="0" className="logo-stop-0" />
          <stop offset="0.37" className="logo-stop-0" />
          <stop offset="1" className="logo-stop-1" />
        </linearGradient>
        <linearGradient
          id={gradientId}
          x1="0"
          y1="0"
          x2="1"
          y2="0"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(3650.88,0,0,539.708,191.786,507.704)"
        >
          <stop offset="0" className="logo-stop-0" />
          <stop offset="0.37" className="logo-stop-0" />
          <stop offset="1" className="logo-stop-1" />
        </linearGradient>
        <linearGradient
          id={gradientId}
          x1="0"
          y1="0"
          x2="1"
          y2="0"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(3650.88,0,0,539.708,191.786,507.704)"
        >
          <stop offset="0" className="logo-stop-0" />
          <stop offset="0.37" className="logo-stop-0" />
          <stop offset="1" className="logo-stop-1" />
        </linearGradient>
        <linearGradient
          id={gradientId}
          x1="0"
          y1="0"
          x2="1"
          y2="0"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(3650.88,0,0,539.708,191.786,507.704)"
        >
          <stop offset="0" className="logo-stop-0" />
          <stop offset="0.37" className="logo-stop-0" />
          <stop offset="1" className="logo-stop-1" />
        </linearGradient>
        <linearGradient
          id={gradientId}
          x1="0"
          y1="0"
          x2="1"
          y2="0"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(3650.88,0,0,539.708,191.786,507.704)"
        >
          <stop offset="0" className="logo-stop-0" />
          <stop offset="0.37" className="logo-stop-0" />
          <stop offset="1" className="logo-stop-1" />
        </linearGradient>
        <linearGradient
          id={gradientId}
          x1="0"
          y1="0"
          x2="1"
          y2="0"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(3650.88,0,0,539.708,191.786,507.704)"
        >
          <stop offset="0" className="logo-stop-0" />
          <stop offset="0.37" className="logo-stop-0" />
          <stop offset="1" className="logo-stop-1" />
        </linearGradient>
        <linearGradient
          id={gradientId}
          x1="0"
          y1="0"
          x2="1"
          y2="0"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(3650.88,0,0,539.708,191.786,507.704)"
        >
          <stop offset="0" className="logo-stop-0" />
          <stop offset="0.37" className="logo-stop-0" />
          <stop offset="1" className="logo-stop-1" />
        </linearGradient>
        <linearGradient
          id={gradientId}
          x1="0"
          y1="0"
          x2="1"
          y2="0"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(3650.88,0,0,539.708,191.786,507.704)"
        >
          <stop offset="0" className="logo-stop-0" />
          <stop offset="0.37" className="logo-stop-0" />
          <stop offset="1" className="logo-stop-1" />
        </linearGradient>
        <linearGradient
          id={gradientId}
          x1="0"
          y1="0"
          x2="1"
          y2="0"
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(3650.88,0,0,539.708,191.786,507.704)"
        >
          <stop offset="0" className="logo-stop-0" />
          <stop offset="0.37" className="logo-stop-0" />
          <stop offset="1" className="logo-stop-1" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Logo;

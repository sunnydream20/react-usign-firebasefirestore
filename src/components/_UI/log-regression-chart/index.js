import { area, ascending, extent, line, max, min, scaleLog, scaleUtc } from 'd3';
import { useMeasure } from 'hooks/useMeasure';
import { useId, useMemo } from 'react';
import getRegressionBands from './get-regression-bands';
import UtcAxis from './UtcAxis';

const lineColor = '#5A60ED';
const bandColors = ['#4DD652', '#6CE271', '#95EA9D', '#EC8F8F', '#F06666', '#EB5454'];
const bandMultiplier = 1.333;

const xAccessor = (d) => new Date(d.date);
const yAccessor = (d) => d.close;

const LogRegressionChart = ({ data }) => {
  const [ref, { width }] = useMeasure();
  const height = Math.floor(width * 0.37);
  const marginTop = 2;
  const marginBottom = 20;

  const transformedData = useMemo(() => data.map((d) => [xAccessor(d), yAccessor(d)]).sort((a, b) => ascending(a[0], b[0])), [data]);

  const bandsData = useMemo(() => getRegressionBands(transformedData, bandColors.length, bandMultiplier), [transformedData]);

  const xScale = useMemo(
    () =>
      scaleUtc()
        .domain(extent(transformedData, (d) => d[0]))
        .range([0, width]),
    [transformedData, width]
  );

  const yScale = useMemo(() => {
    const [minYLine, maxYLine] = extent(transformedData, (d) => d[1]);
    const minYBand = min(bandsData[0], (d) => d[0]);
    const maxYBand = max(bandsData[bandsData.length - 1], (d) => d[1]);
    const minY = Math.min(minYLine, minYBand);
    const maxY = Math.max(maxYLine, maxYBand);
    return scaleLog()
      .domain([minY, maxY])
      .range([height - marginBottom, marginTop]);
  }, [bandsData, height, transformedData]);

  const lineGenerator = line()
    .x((d) => xScale(d[0]))
    .y((d) => yScale(d[1]));

  const areaGenerator = area()
    .x((_, i) => xScale(transformedData[i][0]))
    .y0((d) => yScale(d[0]))
    .y1((d) => yScale(d[1]));

  const id = useId();

  return (
    <div ref={ref}>
      {width > 0 ? (
        <svg className="block w-full font-roboto" viewBox={`0 0 ${width} ${height}`}>
          <defs>
            <clipPath id={id}>
              <rect width={width} y={marginTop} height={height - marginTop - marginBottom} />
            </clipPath>
          </defs>
          <UtcAxis xScale={xScale} top={height - marginBottom} />
          <g clipPath={`url(#${id})`}>
            {bandsData.map((d, i) => (
              <path key={i} fill={bandColors[i]} d={areaGenerator(d)} />
            ))}
          </g>
          <path stroke={lineColor} fill="none" d={lineGenerator(transformedData)} />
        </svg>
      ) : null}
    </div>
  );
};

export default LogRegressionChart;

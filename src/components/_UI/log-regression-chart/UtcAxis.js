import { memo } from 'react';
import formatUtcTick from './format-utc-tick';
import { useMeasure } from 'hooks/useMeasure';

const UtcAxis = memo(({ xScale, top }) => {
  const [firstRef, { width: firstWidth }] = useMeasure();
  const [lastRef, { width: lastWidth }] = useMeasure();

  const [x1, x2] = xScale.range();

  const ts = xScale.ticks((x2 - x1) / 60).map((t, i, ts) => {
    if (i === 0) {
      const noAdjustment = xScale(t) - firstWidth / 2 > x1;
      return {
        t,
        ref: firstRef,
        x: noAdjustment ? xScale(t) : x1,
        textAnchor: noAdjustment ? 'middle' : 'start',
      };
    } else if (i === ts.length - 1) {
      const noAdjustment = xScale(ts[ts.length - 1]) + lastWidth / 2 < x2;
      return {
        t,
        ref: lastRef,
        x: noAdjustment ? xScale(t) : x2,
        textAnchor: noAdjustment ? 'middle' : 'end',
      };
    } else {
      return {
        t,
        ref: null,
        x: xScale(t),
        textAnchor: 'middle',
      };
    }
  });

  return (
    <g className="text-[14px] text-[#595959] font-roboto" transform={`translate(0,${top})`} fill="currentColor">
      <line stroke="currentColor" x1={x1} x2={x2} />
      {ts.map(({ t, ref, x, textAnchor }) => (
        <text key={t} ref={ref} x={x} y={6} dy="0.71em" textAnchor={textAnchor}>
          {formatUtcTick(t)}
        </text>
      ))}
    </g>
  );
});

export default UtcAxis;

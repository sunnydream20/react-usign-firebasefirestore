import { pairs, range, zip } from 'd3';
import { logarithmic } from 'regression';

export default function getRegressionBands(data, numberOfBands, bandMultiplier = Math.E) {
  const regression = logarithmic(data);

  const predicted = data.map((d) => regression.predict(d[0]));

  const thresholds = range(-numberOfBands / 2, numberOfBands / 2 + 1).map((i) => predicted.map(([_, y]) => y * bandMultiplier ** i));

  const bands = pairs(thresholds).map(([a, b]) => zip(a, b));
  return bands;
}

import { max as d3Max, min as d3Min } from 'd3';

function calulateDispMinMax(arr, ticks) {
  const dispGaps = [1, 2, 5, 10];

  const min0 = d3Min(arr);
  const max0 = d3Max(arr);

  const gap0 = (max0 - min0) / ticks;

  let exp = 0;
  let gain = 1;

  exp = Math.floor(Math.log10(gap0));
  gain = gap0 / Math.pow(10, exp);

  let dispGap;

  for (let i = 1; i < dispGaps.length; i++) {
    if (gain <= dispGaps[i]) {
      dispGap = dispGaps[i];
      break;
    }
  }

  dispGap = dispGap * Math.pow(10, exp);

  const min = Math.floor(min0 / dispGap) * dispGap;
  const max = min + dispGap * ticks;

  return { min, max };
}

export function findDisplayMinMax(arr) {
  let ticks = 4;
  const max0 = d3Max(arr);

  let ret;
  do {
    ret = calulateDispMinMax(arr, ticks);
    ticks++;
  } while (ret.max < max0);

  return { min: ret.min, max: ret.max, tickCounts: ticks - 1 };
}

/* Get day dates from date array
   param: dArr: an Array of date objects

*/
export function reduceDates(dArr) {
  const arr = [];
  let matDate = dArr[0];

  arr.push(dArr[0]);
  for (let i = 0; i < dArr.length; i++) {

    if (matDate.toDateString() !== dArr[i].toDateString()) {
      matDate = dArr[i];
      arr.push(dArr[i]);
    }
  }

  return arr;
}

export function pickYears(dArr, cnt) {
  const dates = reduceDates(dArr);
  const gap = Math.round(dates.length / cnt);
  if (gap < 5) {
    return null;
  }
  const arr = [];

  for (let i = 1; i < cnt; i++) {
    const idx = i * gap;
    arr.push(dates[idx]);
  }

  return arr;
}

export function getUnitAndValue(range) {
  const splitRange = range.match(/[a-zA-Z]+|[0-9]+/g);
  const unitValue = splitRange[0];
  const unit = splitRange[1];
  return { unit, unitValue };
}
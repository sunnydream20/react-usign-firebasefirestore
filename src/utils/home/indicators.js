/**
 * RSI Indicator / Calc
 * @param {*} closes
 * @param {*} period
 * @returns
 */
export function calculateRSI(closes, period = 14) {
  const rsiData = [];

  for (let i = 0; i < closes.length; ++i) {
    const close = closes[i];

    if (i === 0) {
      rsiData.push({ close, change: 0, gain: 0, loss: 0 });
      continue;
    }

    const change = +(closes[i] - closes[i - 1]).toFixed(2);
    const gain = change > 0 ? change : 0;
    const loss = change < 0 ? Math.abs(change) : 0;
    if (i < period) {
      rsiData.push({ close, change, gain, loss });
      continue;
    }

    const avgGain = i === period ?
      (rsiData.reduce((avg, { gain }) => avg + (gain || 0), 0) + gain) / period :
      (rsiData[i - 1].avgGain * (period - 1) + gain) / period;
    const avgLoss = i === period ?
      (rsiData.reduce((avg, { loss }) => avg + (loss || 0), 0) + loss) / period :
      (rsiData[i - 1].avgLoss * (period - 1) + loss) / period;
    const rs = avgGain / avgLoss;
    const rsi = 100 - (100 / (1 + rs));
    rsiData.push({ close, change, gain, loss, avgGain, avgLoss, rs, rsi });
  }

  return rsiData[rsiData.length - 1].rsi;
}

/**
 * Stochastic Oscillator Calculation
 * This function takes four arguments: an array of high prices, an array of low prices, an array of closing prices, and a period (typically 14).
 * It calculates the Stochastic Oscillator for the most recent period using the high, low, and close prices, and returns the result as a percentage.
 * @param {Array} highs
 * @param {Array} lows
 * @param {Array} closes
 * @param {number} period
 * @returns
 */
export function calculateStochasticOscillator(highs, lows, closes, period = 14) {
  const highestHigh = Math.max(...highs.slice(-period));
  const lowestLow = Math.min(...lows.slice(-period));
  const currentClose = closes[closes.length - 1];

  const stochasticOscillator = ((currentClose - lowestLow) / (highestHigh - lowestLow)) * 100;

  return stochasticOscillator;
}

/**
 *
 * @param {Array} highs: An array of the highest prices for each period.
 * @param {Array} lows: An array of the lowest prices for each period.
 * @param {number} period: The number of periods to use in the Aroon calculation.
 * @returns
 */
export function calculateAroonOscillator(highs, lows, period = 25) {
  const length = highs.length;
  // Calculate Aroon Up
  const highestHigh = Math.max(...highs.slice(length - period, length - 1))
  const aroonUp = ((period - (length - highs.indexOf(highestHigh))) / period) * 100;

  // Calculate Aroon Down
  const lowestLow = Math.min(...lows.slice(length - period, length - 1))
  const aroonDown = ((period - (length - lows.indexOf(lowestLow))) / period) * 100;

  // Return the last value of the Aroon Oscillator array
  return aroonUp - aroonDown;
}

/**
 *
 * @param {Array} highs
 * @param {Array} lows
 * @param {Array} closes
 * @param {number} period
 */
export function calculateWilliamsPercentageRange(highs, lows, closes, period = 14) {
  const highestHigh = Math.max(...highs.slice(-period));
  const lowestLow = Math.min(...lows.slice(-period));
  const close = closes[closes.length - 1];

  const percentR = ((highestHigh - close) / (highestHigh - lowestLow)) * -100;

  return percentR;
}

/**
 *
 * @param {Array} closes
 * @param {number} period
 */
export function calculateCMO(closes, period = 14) {
  const length = closes.length;
  let sH = 0, sL = 0;
  for (let i = Math.max(length - period - 1, 1); i < length; ++i) {
    const differ = closes[i] - closes[i - 1];
    sH += differ > 0 ? differ : 0;
    sL += differ < 0 ? -differ : 0;
  }

  return (sH - sL) / (sH + sL) * 100;
}


/**
 *
 * @param {Array} highs
 * @param {Array} lows
 * @param {Array} closes
 * @param {Array} volumes
 * @param {number} period
 */
export function calculateMFI(highs, lows, closes, volumes, period = 14) {
  const length = highs.length;
  const typicalPrice = highs.map((high, index) => (highs[index] + lows[index] + closes[index]) / 3);

  const positiveMoneyFlow = typicalPrice.map((price, index) =>
    index && price > typicalPrice[index - 1] ? price * volumes[index] : 0);
  const negativeMoneyFlow = typicalPrice.map((price, index) =>
    index && price < typicalPrice[index - 1] ? price * volumes[index] : 0);

  const postiveFlowSum = positiveMoneyFlow.reduce((sum, value, index) =>
    sum + (index >= length - period ? value : 0), 0);
  const negativeFlowSum = negativeMoneyFlow.reduce((sum, value, index) =>
    sum + (index >= length - period ? value : 0), 0);

  const ratio = postiveFlowSum / negativeFlowSum;
  const mfi = 100 - (100 / (1 + ratio));

  return mfi;
}

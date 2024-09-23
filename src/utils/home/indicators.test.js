
import { calculateAroonOscillator, calculateRSI, calculateStochasticOscillator, calculateWilliamsPercentageRange } from "./indicators";

// Use x before the test if you want to skip that test from running at all
// example: xtest()

xtest('should return RSI calculated value', () => {
  const prices = [54, 53, 52, 50, 49, 48, 50, 52, 54, 55, 57, 58, 59];
  const rsi = calculateRSI(prices);
  console.log(rsi, '>> rsi value <<');
  expect(rsi).toEqual(64.70588235294117);
})

xtest('should return StochasticOscillator value', () => {
  const highs = [54, 53, 52, 50, 49, 48, 50, 52, 54, 55, 57, 58, 59];
  const lows = [52, 51, 52, 49, 48, 45, 49, 51, 52, 52, 53, 53, 55];
  const closes = [54, 53, 52, 50, 49, 48, 50, 52, 54, 55, 57, 58, 59];
  const stochasticOsc = calculateStochasticOscillator(highs, lows, closes, 2);
  console.log(stochasticOsc, '>> stochasticosc value <<');
  expect(stochasticOsc).toBeGreaterThan(0)
  expect(stochasticOsc).toEqual(100)
});


xtest('should return AroonOscillator value', () => {
  const highs = [50, 55, 60, 65, 70, 75, 80, 75, 70, 65, 60, 55, 50];
  const lows = [40, 45, 50, 55, 60, 65, 70, 65, 60, 55, 50, 45, 40];
  const period = 7;
  let result = calculateAroonOscillator(highs, lows, period);
  console.log(result, '>> AroonOscillator value <<');
  expect(result).toBeGreaterThan(0);
  expect(parseFloat(Number(result).toFixed(2))).toEqual(85.71);
});

test('should return Williams Percentage Range value', () => {
  const highs = [10, 12, 15, 14, 16, 18, 20];
  const lows = [8, 10, 11, 13, 12, 14, 16];
  const closes = [10, 19];
  const period = 5;
  let result = calculateWilliamsPercentageRange(highs, lows, closes, period);
  console.log(result, '>> Williams %R value <<');
  expect(result).toBeLessThanOrEqual(0);
  expect(parseFloat(Number(result).toFixed(2))).toEqual(-11.11);
});

import { utcDay, utcFormat, utcMonth, utcYear } from 'd3';

const formatHour = utcFormat('%H:%M'),
  formatDay = utcFormat('%b %e'),
  formatMonth = utcFormat('%b'),
  formatYear = utcFormat('%Y');

export default function formatUtcTick(date) {
  return (utcDay(date) < date ? formatHour : utcMonth(date) < date ? formatDay : utcYear(date) < date ? formatMonth : formatYear)(date);
}

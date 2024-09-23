import Graph from './graph';

const numberToString = (value) => `${value > 0 ? '+' : ''}${value.toFixed(2)}`;

export const getStatisticsValue = (data) => {
  const value0 = data && data[0]?.price;
  const value1 = data && data[data.length - 1]?.price;
  const dv = value1 - value0;
  const pro = (dv / value0) * 100;
  return { dv, pro };
}

export const getChartColor = (divisionValue) => {
  return divisionValue < 0 ? '#C20033' : '#00C25A';
}

const modeNames = {
  '1D': '1 Day',
  '5D': '5 Days',
  '1M': '1 Month',
  '3M': '3 Months',
  '6M': '6 Months',
  '1Y': '1 Year',
  '5Y': '5 Years'
}

const Chart = ({ groupName, mode, data, groupColor }) => {
  const { dv, pro } = getStatisticsValue(data);
  const chartColor = getChartColor(dv) ?? groupColor;

  return (
    <>
      <div className="text-[18px] leading-[22px] mb-[6px] w-full whitespace-nowrap overflow-hidden font-roboto">
        {data?.length > 0 && (
          <>
            <span className="text-white font-roboto" style={{marginLeft: '2px'}}>{groupName} </span>{' '}
            <span style={{ color: chartColor }}>
              {`${numberToString(pro)}% (${modeNames[mode]})`}
            </span>
          </>
        )}
      </div>
      <Graph data={data || []} mode={mode} groupColor={chartColor} />
    </>
  );
};

export default Chart;

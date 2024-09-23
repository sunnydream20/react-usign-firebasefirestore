import Graph from './graph';

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

const numberToString = (value) => value.toFixed(2);
const amountToString = (value, currency) => {
  if (Math.sign(value) !== 0) return `${value > 0 ? '+' : '-'}${currency}${Math.abs(value).toFixed(2)}`;
  else return `${value.toFixed(2)}`;
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

const ChartExtra = ({ groupName, mode, data, groupColor, currency = '' }) => {
  const { dv, pro } = getStatisticsValue(data);
  const chartColor = getChartColor(dv);

  return (
    <>
      <div className="text-[18px] leading-[22px] mb-[6px] w-full whitespace-nowrap overflow-hidden font-roboto">
        {data?.length > 0 && (
          <>
            <span className="text-white font-roboto">{groupName} </span>{' '}

            {/* amount changed */}
            {
              (currency !== "") && (
                <span style={{ color: chartColor }}>
                  {`${amountToString(dv, currency)}`}
                </span>
              )
            }

            {/* percentage change */}
            <span style={{ color: chartColor, paddingLeft: 5 }}>
              {`(${numberToString(pro)}%) ${modeNames[mode]}`}
            </span>
          </>
        )}
      </div>
      <Graph data={data || []} mode={mode} groupColor={chartColor} />
    </>
  );
};

export default ChartExtra;
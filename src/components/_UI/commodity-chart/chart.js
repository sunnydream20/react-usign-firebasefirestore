import Graph from './graph';

const numberToString = (value) => `${value > 0 ? '+' : ''}${value.toFixed(2)}`;

const Chart = ({ mode, currency, data, highlightColor }) => {
  const value0 = data && data[0]?.price;
  const value1 = data && data[data.length - 1]?.price;
  const dv = value1 - value0;
  const pro = (dv / value0) * 100;
  const currencySymbol = currency === 'USD' ? '$' : currency;

  return (
    <>
      <div className="text-lg h-7 currency">
        {data?.length > 0 && (
          <>
            <span className="text-white">{currencySymbol}</span>
            <span className="text-white">{value1.toFixed(2)}</span> {' '}
            <span style={{ color: highlightColor }}>
              {numberToString(dv)} ({numberToString(pro)}%)
            </span>
          </>
        )}
      </div>

      <Graph data={data || []} mode={mode} highlightColor={highlightColor} />
    </>
  );
};

export default Chart;

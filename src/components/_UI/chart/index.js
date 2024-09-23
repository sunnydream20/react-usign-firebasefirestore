import React from 'react';
import Graph from './graph';
import GrowthChart from './GrowthChart';

const Chart = ({ mode, currency, data, isCursorPointer, isWidgetOne = false, showCurrencyInfo }) => {
  const value0 = data && data[0]?.price;
  const value1 = data && data[data.length - 1]?.price;
  const dv = value1 - value0;
  const pro = (dv / value0) * 100;
  const currencySymbol = currency === 'USD' ? '$' : currency;

  const numberToString = (value) => {
    const sign = value > 0 ? '+' : value < 0 ? '-' : '';
    return (
      <>
        <span style={{ marginRight: '2px' }}>{sign}</span>
        <span>{Math.abs(value.toFixed(2))}</span>
      </>
    );
  };

  const pathName = window.location.pathname;
  const isPortfolio = pathName.includes('portfolio');

  return (
    <div className={isCursorPointer === true ? 'hover:cursor-pointer' : ''}>
      {showCurrencyInfo && (
        <div className="text-lg h-7 currency">
          {data?.length > 0 && (
            <>
              { isWidgetOne ? <span className='text-white'>{currencySymbol}{value0}</span> : null } {' '}
              <span className="text-[#00C25A]">
                {numberToString(dv)} ({numberToString(pro)}%)
              </span>
              {isWidgetOne ? <span style={{ color: '#00C25A', marginLeft: '5px' }}></span> : ''}
            </>
          )}
        </div>
      )}
      <div className="mb-[2px]" />
      <Graph data={data || []} mode={mode} />
      {isPortfolio ? <GrowthChart current={4567.678} average={1122.234} /> : ""}
    </div>
  );
};

export default Chart;

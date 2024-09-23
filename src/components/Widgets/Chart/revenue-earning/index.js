import { useEffect, useState } from 'react';
import WidgetTitle from '../WidgetTitle';
import RevenueEarningPlot from './RevenueEarningPlot';

// const quarterlyRevenueEarning = [
//   { group: 'Q1', Revenue: '11.3', Earnings: '-1.6' },
//   { group: 'Q2', Revenue: '11.3', Earnings: '3.7' },
//   { group: 'Q3', Revenue: '11.3', Earnings: '5.9' },
//   { group: 'Q4', Revenue: '11.3', Earnings: '1.35' },
// ];

// const annualRevenueEarning = [
//   { group: '2019', Revenue: '11.3', Earnings: '-1.6' },
//   { group: '2020', Revenue: '11.3', Earnings: '3.7' },
//   { group: '2021', Revenue: '11.3', Earnings: '5.9' },
//   { group: '2022', Revenue: '11.3', Earnings: '1.35' },
// ];

const orderAttributes = (data, keyOrder) => {
  return data?.map((item) => {
    const orderedItem = {};

    // Insert required keys in order
    keyOrder.forEach((key) => {
      if (item.hasOwnProperty(key)) {
        orderedItem[key] = item[key];
      }
    });

    // Add any additional keys that are not in the predefined order, placing them at the end
    Object.keys(item).forEach((key) => {
      if (!keyOrder.includes(key)) {
        orderedItem[key] = item[key];
      }
    });

    return orderedItem;
  });
};

// Attribute order we expect
const expectedOrder = ['group', 'Revenue', 'Earnings'];

const RevenueEarning = ({ revenueAndEarnings }) => {
  const [annual, setAnnual] = useState(true);
  const [revenueData, setRevenueData] = useState(null);
  const [year] = useState('2022');
  useEffect(() => {
    if (annual) setRevenueData(orderAttributes(revenueAndEarnings.fy, expectedOrder));
    else setRevenueData(orderAttributes(revenueAndEarnings.qr, expectedOrder));
  }, [annual, revenueAndEarnings]);

  return (
    <div className="flex flex-col items-center justify-center gap-1.5 w-full">
      <WidgetTitle title={'Revenue & Earnings'} />
      {revenueAndEarnings?.fy?.length ? (
        <RevenueEarningPlot title="Revenue And Earnings" year={year} data={revenueData} annual={annual} onChangeAnnual={setAnnual} />
      ) : (
        <p className="text-center my-4">Data not available</p>
      )}
    </div>
  );
};

export default RevenueEarning;

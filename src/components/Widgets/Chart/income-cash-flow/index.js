import { useEffect, useState } from "react";
import WidgetTitle from "../WidgetTitle";
import CashFlowPlot from "./CashFlowPlot";

// const quarterlyCashflowData = [
//     {
//       group: "Q1",
//       "Estimate": 1.1,
//       "EPS": 1.3,
//     },
//     {
//       group: "Q2",
//       "Estimate": 1.2,
//       "EPS": 1.35,
//     },
//     {
//       group: "Q3",
//       "Estimate": 1.2,
//       "EPS": 1.12,
//     },
//     {
//       group: "Q4",
//       "Estimate": 1.8,
//       "EPS": 0,
//     },
// ];
// const annualCashflowData = [
//   {
//     group: "2019",
//     "Estimate": 1.0,
//     "EPS": 1.1,
//   },
//   {
//     group: "2020",
//     "Estimate": 1.8,
//     "EPS": 1.3,
//   },
//   {
//     group: "2021",
//     "Estimate": 1.4,
//     "EPS": 1.2,
//   },
//   {
//     group: "2022",
//     "Estimate": 1.2,
//     "EPS": 0,
//   },
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

const expectedOrder = ["group", "Estimate", "EPS"];


const IncomeCashFlow = ({earningsPerShare}) => {
  const [annual, setAnnual] = useState(true);
  const [cashData, setCashData] = useState(null);
  const [years, setYears] = useState([]);

  useEffect(() => {
    setYears(earningsPerShare.qr?.map(q => ({group: q.group, value: q.calendarYear})))
    if (annual) setCashData(orderAttributes(earningsPerShare.fy, expectedOrder))
    else setCashData(orderAttributes(earningsPerShare.qr, expectedOrder)?.map(q => ({
      group: q.group,
      Estimate: q.Estimate,
      EPS: q.EPS
    })))
  }, [annual, earningsPerShare]);

  return (
    <div className="flex flex-col items-center justify-center gap-1.5 w-full">
      <WidgetTitle
        title={'Earnings Per Share'}
      />
      <CashFlowPlot
        data={cashData}
        years={years}
        annual={annual}
        onChangeAnnual={setAnnual}
      />
    </div>
  );
};

export default IncomeCashFlow;

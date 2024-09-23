import { useEffect, useState } from 'react';
import { mockTreasuryData } from '../../../../data/home/mock-data';
import Box from '../../../_UI/box';
import RatesNewsGraph from '../../../_UI/rates-news-graph';

const rates = [
  {
    value: '3M',
    label: '3 Month',
    interest: 4.5,
    key: 0
  },
  {
    value: '6M',
    label: '6 Month',
    interest: 4.2,
    key: 1
  },
  {
    value: '1Y',
    label: '1 Year',
    interest: 4.0,
    key: 2
  },
  {
    value: '2Y',
    label: '2 Year',
    interest: 3.8,
    key: 3
  },
  {
    value: '5Y',
    label: '5 Year',
    interest: 3.5,
    key: 4
  },
  {
    value: '10Y',
    label: '10 Year',
    interest: 2.8,
    key: 5
  },
  {
    value: '20Y',
    label: '20 Year',
    interest: 2.4,
    key: 6
  }
];

const posts = [
  {
    date: 'Oct-28-22',
    company: 'Motley Fool',
    title: 'Apple Provides Further Proof of Dominance in the Business World',
    key: 0
  },
  {
    date: 'Oct-28-22',
    company: 'Financial Times',
    title: 'Apple/China: intricate supply chain makes hanging up hard to do',
    key: 1
  },
  {
    date: 'Oct-28-22',
    company: 'Reuters',
    title: 'US STOCKS-Wall St drops as focus shifts to Fed rate decision',
    key: 2
  },
  {
    date: 'Oct-28-22',
    company: 'The Wall Street Journal',
    title: 'Foxconn to Shift Some iPhone Production From Covid-Hit Plant to Other Sites',
    key: 3
  }
];

const getData = (mode, rate) => mockTreasuryData(mode, rate);

const USTreasyBondsWidget = ({ widgetData }) => {
  const [mode, setMode] = useState('1Y');
  const [rate, setRate] = useState(rates[0]);
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const data = getData(mode, rate.value);
    setGraphData(data);
  }, [mode, rate]);

  return (
    <Box title={'US Treasury Bonds \n1 Year Chart'} width={325} height={560} data={widgetData}>
      <RatesNewsGraph
        rates={rates}
        graphData={graphData}
        mode={mode}
        onChangeMode={setMode}
        rate={rate}
        onChangeRate={setRate}
        posts={posts}
      />
    </Box>

  );
}

export default USTreasyBondsWidget;
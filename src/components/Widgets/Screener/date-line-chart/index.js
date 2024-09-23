import { useEffect, useState } from 'react';
import Box from '../../../_UI/box';
import GraphListMini from '../../../_UI/graph-list-mini';
import { mockAPI } from '../../../../data/home/mock-data';
import { stockMarketHistory } from '../../../../utils/home/stockAPIs';
import { getUnitAndValue } from '../../../../utils/home/utils';

const stocks = ['Apple', 'Tesla', 'Microsoft', 'Meta', 'Stock name5', 'Stock name6', 'Stock name7', 'Stock name8', 'Stock name9', 'Stock name10'];

const getData = async () => {
  const mockData = mockAPI('6M'); // Set mode to '6M'
  const arr = [];

  for (const stock of stocks) {
    const obj = {
      name: stock,
      data: [],
      currency: 'USD',
    };

    if (stock === 'Apple') {
      const { unit, unitValue } = getUnitAndValue('6M'); // Set mode to '6M'
      obj.data = await stockMarketHistory(unit, unitValue, 'AAPL').then(
        (resp) => Array.isArray(resp) && resp.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
      );
    } else {
      obj.data = mockData;
    }

    arr.push(obj);
  }

  return arr;
};

const DateLineChart = () => {
  const [graphData, setGraphData] = useState([]);
  const widgetData = {}; // Placeholder for widget data, adjust as needed

  useEffect(() => {
    getData().then((data) => {
      setGraphData([...data]);
    });
  }, []);

  return (
    <Box title={'Widget 13 \nLine Chart'} width={325} height={560} data={widgetData} style={{ paddingTop: '5px', paddingBottom:'5px' }}>
      <GraphListMini graphDataList={graphData} height={492} />
    </Box>
  );
};

export default DateLineChart;

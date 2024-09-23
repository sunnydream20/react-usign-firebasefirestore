import ScrollContainer from 'components/_UI/ScrollContainer';
import Box from '../../../_UI/box';

import dummyData from '../../../../data/dummy-log-regression-chart.json';
import LogRegressionChart from 'components/_UI/log-regression-chart';

// Fake an array of dummyData
const dataList = Array(5)
  .fill(dummyData)
  .map((d, i) => (i > 0 ? { ...d, symbol: `${d.symbol}-${i}` } : d));

const CryptoLogRegressionWidget = ({ widgetData }) => {
  return (
    <Box title={widgetData.title} width={325} height={560} data={widgetData}>
      <ScrollContainer>
        {dataList.map((d) => (
          <div key={d.symbol} className="mb-2 overflow-hidden">
            <h6 className="text-[17px] leading-[17px] text-white">{d.symbol}</h6>
            <LogRegressionChart data={d.historical} />
          </div>
        ))}
      </ScrollContainer>
    </Box>
  );
};

export default CryptoLogRegressionWidget;

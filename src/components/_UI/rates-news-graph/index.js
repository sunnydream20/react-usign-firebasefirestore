import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../../../assets/css/scroll-bar.css';
import ChartWrapper, { monthModes } from '../chart-wrapper';
import News from '../news';
import Chart from '../rates-chart/chart';
import './index.css';

const RatesNewsGraph = ({ rates, graphData, mode, onChangeMode, rate, onChangeRate, posts }) => {
  const onViewChangeMode = (m) => {
    onChangeRate(rates.find((r) => r.value === m));
    onChangeMode(m);
  };

  return (
    <ChartWrapper mode={mode} onChangeMode={onViewChangeMode} monthMode={monthModes.twentyYearsMode}>
      <Chart rate={rate} mode={'1Y'} currency="USD" data={graphData} />

      <div className="mt-[9px] mr-[-12px] h-[320px] w-[309px]">
        <PerfectScrollbar options={{ suppressScrollX: true, wheelPropagation: false, swipeEasing: true }}>
          <div className="flex-col space-y-[5px]">
            <News posts={posts} companyColor={'#2898FF'} />
          </div>
        </PerfectScrollbar>
      </div>
    </ChartWrapper>
  );
};

export default RatesNewsGraph;

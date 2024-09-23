import { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useNavigate } from 'react-router-dom';
import '../../../assets/css/scroll-bar.css';
import Chart from '../../_UI/chart';
import ChartWrapper, { monthModes } from '../../_UI/chart-wrapper';

const SortableItemChart = ({ data, onChangeMode }) => {
  const [mode, setMode] = useState('1D');
  const navigate = useNavigate();

  useEffect(() => {
    onChangeMode(mode);
  });

  const onChartPress = (event) => {
    event.preventDefault();
    navigate(`/chart/${data.symbol}`);
  }

  return (
    <ChartWrapper
      mode={mode}
      monthMode={monthModes.maxMode}
      onChangeMode={(mode) => {
        onChangeMode(mode);
        setMode(mode);
      }}
    >
      <div className="mt-[5px] mr-[-12px] mb-[-13px] flex-1 overflow-hidden" onClick={(event) => onChartPress(event)}>
        <PerfectScrollbar options={{ suppressScrollX: true, wheelPropagation: false, swipeEasing: true }}>
          <div className="mb-2 flex-col space-y-[8px] pr-2">
            <Chart data={data.chartData} symbol={data.symbol} mode={mode} key={`categary-chart-${data.id}`} isCursorPointer={true} />
          </div>
        </PerfectScrollbar>
      </div>
    </ChartWrapper>
  );
};
export default SortableItemChart;

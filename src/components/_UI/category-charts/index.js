import { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../../../assets/css/scroll-bar.css';
import ChartWrapper, { monthModes } from '../chart-wrapper';
import Chart from '../group-chart/chart';

const CategoryCharts = ({ allGroupData, onChangeMode }) => {
  const [mode, setMode] = useState('1D');

  useEffect(() => {
    onChangeMode(mode);
  }, [mode, onChangeMode]);

  return (
    <>
      <ChartWrapper
        mode={mode}
        monthMode={monthModes.fiveYearsMode}
        onChangeMode={(mode) => {
          onChangeMode(mode);
          setMode(mode);
        }}
      >
        <div className="mt-[5px] mr-[-12px] mb-[-13px] flex-1 overflow-hidden font-roboto">
          <PerfectScrollbar options={{ suppressScrollX: true, wheelPropagation: false, swipeEasing: true }}>
            <div className="mb-2 flex-col space-y-[8px] pr-[13px]">
              {allGroupData.map((item, idx) => (
                <Chart data={item.data} mode={mode} groupName={item.companyName} groupColor="#00C25A" key={`category-chart-${idx}`} />
              ))}
            </div>
          </PerfectScrollbar>
        </div>
      </ChartWrapper>
    </>
  );
};

export default CategoryCharts;

import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../../../assets/css/scroll-bar.css';
import Chart from '../chart';
import ChartWrapper, { monthModes } from '../chart-wrapper';

const GraphList = ({ graphDataList /* [{ name, data }]*/, mode, onChangeMode, height }) => {
	return (
		<ChartWrapper mode={mode} onChangeMode={onChangeMode} monthMode={monthModes.fiveYearsMode}>
			{/* <div className='mt-2 mr-[-12px] mb-[-8px] flex-1' style={{height:height}}> */}
			<div className="mt-2 mr-[-12px] mb-[-12px] flex-1 overflow-hidden">
				<PerfectScrollbar options={{ suppressScrollX: true, wheelPropagation: false, swipeEasing: true }}>
					<div className="mb-2 flex-col space-y-[5px] pr-[12px]">
						{graphDataList.map((item, idx) => (
							<div key={`graph-list-${idx}`} className="mb-2" style={{overflow: 'hidden'}}>
								<h6 className="text-[17px] leading-[17px] text-white" style={{marginLeft: '1px'}}>{item.name}</h6>
								<Chart mode={mode} currency={item.currency} data={item.data} />
							</div>
						))}
					</div>
				</PerfectScrollbar>
			</div>
		</ChartWrapper>
	);
};

export default GraphList;

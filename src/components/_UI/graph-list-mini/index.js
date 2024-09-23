import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../../../assets/css/scroll-bar.css';
import Chart from '../chart';
import ChartWrapper, { monthModes } from '../chart-wrapper';

const GraphListMini = ({ graphDataList /* [{ name, data }]*/, mode, onChangeMode, height }) => {
    return (
        <ChartWrapper showMode={false} mode={'6M'} onChangeMode={onChangeMode} monthMode={monthModes.sixMonthModes}>
            <PerfectScrollbar options={{ suppressScrollX: true, wheelPropagation: false, swipeEasing: true }}>
                {graphDataList.map((item, idx) => (
                    <div key={`graph-list-${idx}`} style={{ overflow: 'hidden', marginTop: '0.5px' }}>
                        <div className="h-[23px]">
                            <svg className={'add-button'} style={{ display: 'inline', marginLeft: '-2px' }} width="23" height="23" viewBox="0 0 23 23" fill={'#404040'}>
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M21.1898 9.75154L21.1897 13.4816L13.7036 13.4817L13.7035 20.9418L9.96041 20.9419L9.96057 13.4818L2.47446 13.482L2.47454 9.75193L9.96064 9.75178L9.9608 2.29169L13.7039 2.29162L13.7037 9.7517L21.1898 9.75154Z"
                                />
                            </svg>
                            <h6 className="inline ml-0.5 text-[17px] leading-none text-white">{item.name}</h6>
                        </div>
                        <Chart mode={'6M'} currency={item.currency} data={item.data} />
                    </div>
                ))}
            </PerfectScrollbar>
        </ChartWrapper>
    );
};

export default GraphListMini;

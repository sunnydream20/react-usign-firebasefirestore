import React, { useEffect, useState } from 'react';
// import IconRefresh from './icons/IconRefresh';
import '../../assets/css/item-rotation.css';
import ChartTradingView from './ChartTradingView';
// import AddImage from '../../assets/img/png/add.png';
import AnalystPriceTarget from 'components/Widgets/Chart/analyst-price-target';
import AnalystRating from 'components/Widgets/Chart/analyst-rating';
import FreeCashFlowYield from 'components/Widgets/Chart/free-cash-flow-yield';
import GeneralInformation from 'components/Widgets/Chart/general-information';
import IncomeCashFlow from 'components/Widgets/Chart/income-cash-flow';
import NewsWidget from 'components/Widgets/Chart/news-widget';
import RevenueEarning from 'components/Widgets/Chart/revenue-earning';
import TechnicalIndicators from 'components/Widgets/Chart/technical-indicators';
import AddBtn from '../../assets/img/svg/add.svg';
import './charts.css';
import CompanyDescription from 'components/Widgets/Chart/company-description';
import ChartSettingPanel from './ChartSettingPanel';

const MODES = ['1M', '3M', '6M', '1Y', '5Y', 'MAX'];

const getDayCount = (mode) => {
  switch (mode) {
    case '1M':
      return 30;
    case '3M':
      return 90;
    case '6M':
      return 180;
    case '1Y':
      return 360;
    case '5Y':
      return 360 * 5;
    case 'MAX':
      return 'ALL';
    default:
      return 30;
  }
};

const ChartTradingViewComponent = React.memo(function MyChartTradingView({ data, scaleType, chartType, volumeType, toolTip, chartItems }) {
  return <ChartTradingView data={data} scaleType={scaleType} chartType={chartType} volumeType={volumeType} toolTip={toolTip} chartItems={chartItems} />;
});

const ChartMultipleItems = ({
  setNodeRef,
  style,
  attributes,
  listeners,
  chartData,
  infoData,
  analystData,
  stockNews,
  technicalIndicators,
  freeCashFlowYield,
  revenueAndEarnings,
  financialMetrics,
  earningsPerShare,
  isLoading,
  chartItems
}) => {
  const [scaleType, setScaleType] = useState('Price');
  const [chartType, setChartType] = useState('Area');
  const [volumeType, setVolumeType] = useState('On');
  const [toolTip, setToolTip] = useState('Off');
  const [filteredData, setFilteredData] = useState(chartData);
  const [filteredChartItems, setFilteredChartItems] = useState(chartItems);
  // const [refreshIconClass, setRefreshIconClass] = useState('');
  // const [isSpinning, setSpinning] = useState(false);
  // const [selectedItem, setSelectedItem] = useState(data.find((item) => item.selected ?? data[0]));

  // const handleRefreshChart = () => {
  // 	// start spinning
  // 	setSpinning(true);
  // 	setRefreshIconClass('rotating-icon');

  // 	setTimeout(() => {
  // 		setRefreshIconClass('');
  // 		setSpinning(false);
  // 	}, 3000);
  // };

  // useEffect(() => {
  //   if (Array.isArray(data) && data.length > 1) setSelectedItem(data.find((item) => item.selected === true));
  //   else if (data.length === 1) setSelectedItem(data[0]);
  //   else {
  //     setSelectedItem(null);
  //   }
  // }, [data, selectedItem]);
  const [selMode, setSelMode] = useState('1M');
  const handleChangeSelMode = (newMode) => {
    setSelMode(newMode);
  };

  useEffect(() => {
    const dayCount = getDayCount(selMode);
    const newFilteredData = dayCount === 'ALL' ? chartData : chartData.slice(-dayCount);
    setFilteredData(newFilteredData);
  }, [chartData, selMode]);

  useEffect(() => {
    const dayCount = getDayCount(selMode);
  
    // Function to slice and sort each chartItem's data based on the selected mode
    const newFilteredChartItems = chartItems.map(chartItem => {
  
      // Sort the filtered data by date
      const sortedData = chartItem.chartData.map(item => ({
        ...item,
        time: new Date(item.date).getTime() / 1000 // Convert date to Unix timestamp in seconds
      })).sort((a, b) => a.time - b.time); // Sort by time in ascending order

      // Slice the data based on dayCount
      const filteredData = dayCount === 'ALL' 
        ? sortedData 
        : sortedData.slice(-dayCount);
  
      return {
        ...chartItem,
        chartData: filteredData // Update the chartData with the sorted data
      };
    });
  
    // Set the filtered and sorted data for each chartItem
    setFilteredChartItems(newFilteredChartItems);
  }, [chartItems, selMode]);

  return (
    <div className="relative">
      <div
        ref={setNodeRef}
        style={{ ...style }}
        {...attributes}
        {...listeners}
        className="flex flex-col rounded-[6px] w-full h-[auto] overflow-hidden bg-black"
      >
        <div className="w-full py-1 px-3 flex flex-grow-1 justify-between items-center h-[46px] bg-[#000] border-none">
          <div className="flex items-center justify-start">
            <span className="">
              <img src={AddBtn} alt="" width="16px" />
            </span>
            {/* Show only symbol on mobile */}
            <span className="pl-2 text-white inline-block md:hidden">{`${infoData?.symbol || ''}`}</span>
            <span className="pl-2 text-white truncate hidden md:inline-block max-w-md lg:max-w-3xl">
              {Object.keys(infoData).length
                ? `${infoData?.symbol || ''} ${infoData?.companyName || ''} ${(infoData?.country || '') + ','} ${infoData?.industry || ''} `
                : ''}
            </span>
            {/* <span className="pl-2 text-white">{selectedItem ? selectedItem.symbol : 'Stock Items'}</span> */}
          </div>

          <div className="flex items-center justify-start font-normal gap-1 md:gap-2 text-[#1FC02F]  text-sm md:text-[22px]">
            <div className="text-white">45.11</div>
            <div>12%</div>
            <div>+2.12</div>
          </div>
          {/* <button onClick={handleRefreshChart} disabled={isSpinning} className={'flex items-center justify-center'}>
            <div className="icon-container">
              <IconRefresh className={refreshIconClass} />
            </div>
          </button> */}
        </div>
        <div className="h-full">
          <div className="flex justify-between items-center p-2 bg-[#131313] h-11">
            <div className="flex items-center">
              {MODES.map((m) => (
                <div
                  key={m}
                  className={`rounded-[3px] cursor-pointer px-1.5 mx-1 ${
                    m === selMode ? 'bg-neutral-700 text-white' : 'hover:bg-neutral-700'
                  }`}
                  onClick={() => handleChangeSelMode(m)}
                >
                  {m}
                </div>
              ))}
            </div>
            <ChartSettingPanel {...{ scaleType, chartType, volumeType, toolTip, setScaleType, setChartType, setVolumeType, setToolTip }} />
          </div>
          <ChartTradingViewComponent
            data={[...filteredData]}
            scaleType={scaleType}
            chartType={chartType}
            volumeType={volumeType}
            toolTip={toolTip}
            chartItems={filteredChartItems}
          />
          {/* <ChartTradingViewMemo /> */}
        </div>
      </div>

      <div className="h-full relative grid-box-container">
        <div className="grid-box-item">
          <GeneralInformation title={'General Information'} companyData={infoData} />
        </div>
        <div className="grid-box-item">
          <AnalystRating analystData={analystData} />
        </div>
        <div className="grid-box-item">
          <AnalystPriceTarget />
        </div>
        <div className="grid-box-item">
          <TechnicalIndicators technicalIndicators={technicalIndicators} />
        </div>
        <div className="grid-box-item">
          <RevenueEarning revenueAndEarnings={revenueAndEarnings} />
        </div>
        <div className="grid-box-item">
          <IncomeCashFlow earningsPerShare={earningsPerShare} />
        </div>
        <div className="grid-box-item">
          <FreeCashFlowYield freeCashFlowYield={freeCashFlowYield} />
        </div>
        <div className="grid-box-item">
          <GeneralInformation title={'Financial Metrics'} type="finance" companyData={financialMetrics} />
        </div>
        <div className="grid-box-item" style={{ paddingTop: 0, overflow: 'hidden' }}>
          <NewsWidget widgetData={stockNews} />
        </div>
        <div className="grid-box-item" style={{ paddingTop: 0, overflow: 'hidden' }}>
          <CompanyDescription description={infoData.description} />
        </div>
      </div>
    </div>
  );
};

export default ChartMultipleItems;

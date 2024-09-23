import { createChart } from 'lightweight-charts';
import { useEffect, useLayoutEffect, useRef } from 'react';
// import SelectFilter from '../Filters/SelectFilter';
import '../../assets/css/trading-chart.css';

// Manage Chart Features
// const ChartFeaturesRow = ({ handlePriceScaleModeChange, handleIndicatorModeChange }) => {
//   const priceOptions = [
//     { value: PriceScaleMode.Normal, label: 'Normal', key: 0 },
//     { value: PriceScaleMode.Logarithmic, label: 'Logarithmic', key: 1 },
//     { value: PriceScaleMode.Percentage, label: 'Percentage', key: 2 },
//     { value: PriceScaleMode.IndexedTo100, label: 'IndexedTo100', key: 3 },
//   ];

//   const indicatorMarkers = [
//     { value: 'volume', label: 'Volume', key: 0 },
//     { value: 'moving-average', label: 'Moving Average', key: 1 },
//   ];

//   return (
//     <div className="p-2 grid grid-cols-2 gap-1 place-content-center border-b-[1px] border-gray-600">
//       <SelectFilter label={'Type:'} options={priceOptions} handleChangeOption={handlePriceScaleModeChange} />
//       <SelectFilter label={'Indicators & markers:'} options={indicatorMarkers} handleChangeOption={handleIndicatorModeChange} />

//       {/* <button className="border-[#efee] border-[0.5px] hover:bg-gray-700 text-white py-1 px-6 m-2"
//         onClick={() => setChartTheme('Dark')}>
//         Dark
//       </button>
//       <button className="border-[#efee] border-[0.5px] hover:bg-[#fff] text-white hover:text-black py-1 px-6 m-2"
//         onClick={() => setChartTheme('Light')}>
//         Light
//       </button>
//       <button className="border-[#efee] border-[0.5px] hover:bg-gray-700 text-white py-1 px-6 m-2 ml-auto"
//         onClick={() => setShowWatermark(!showWatermark)}>
//         { (!showWatermark) ? 'Show' : 'Hide' } Watermark
//       </button> */}
//     </div>
//   );
// };

const ChartTradingView = ({ data, scaleType, chartType, volumeType, toolTip, chartItems }) => {
  const chartContainerRef = useRef();
  const chart = useRef();
  const resizeObserver = useRef();

  useLayoutEffect(() => {

    const option = {
      width: chartContainerRef.current.clientWidth,
      height: 400, //"300px", //chartContainerRef.current.clientHeight,
      layout: {
        background: "#333",
        textColor: "rgba(255, 255, 255, 0.9)"
      },
      grid: {
        vertLines: {
          visible: false,
          color: "#334158"
        },
        horzLines: {
          visible: false,
          color: "#334158"
        }
      },
      crosshair: {
        // mode: CrosshairMode.Normal,
        // horzLine: {
        //   visible: false
        // }
      },
      priceScale: {
        borderColor: "#485c7b"
      },
      timeScale: {
        borderColor: "#485c7b"
      },
      handleScale: false
    };
    let root = chart.current = createChart(chartContainerRef.current, option);
    let volumeSeries,candlestickSeries, histogramSeries;

    let chartData = data;

    if(chartType === 'Area') {
      volumeSeries = chart.current.addAreaSeries({
        topColor: 'rgba(41, 98, 255, 0.56)',
        bottomColor: 'rgba(41, 98, 255, 0.04)',
        lineColor: 'rgba(41, 98, 255, 1)',
        lineWidth: 2,
        priceFormat: {
          type: "volume"
        },
        overlay: true
      });

      if(volumeType === 'On') {
        volumeSeries.priceScale().applyOptions({
          scaleMargins: {
            top: 0.1,
            bottom: 0.4
          },
          mode: scaleType==='Price'? 0 : 2
        })
      }
  
      volumeSeries.setData(chartData);  
    }
    else {
      candlestickSeries = chart.current.addCandlestickSeries({ upColor: '#26a69a', downColor: '#ef5350', borderVisible: false, wickUpColor: '#26a69a', wickDownColor: '#ef5350' });
      
      if(volumeType === 'On') {
        candlestickSeries.priceScale().applyOptions({
          scaleMargins: {
            top: 0.1,
            bottom: 0.4
          },
          mode: scaleType==='Price'? 0 : 2
        })
      }
      
      candlestickSeries.setData(chartData);
    }

    if(volumeType === 'On') {
      histogramSeries = chart.current.addHistogramSeries({
        color: '#26a69a',
        priceFormat: {
            type: 'volume',
        },
        priceScaleId: '', // set as an overlay by setting a blank priceScaleId
        // set the positioning of the volume series
        scaleMargins: {
            top: 0.7, // highest point of the series will be 70% away from the top
            bottom: 0,
        },
      });
      histogramSeries.priceScale().applyOptions({
        scaleMargins: {
            top: 0.7, // highest point of the series will be 70% away from the top
            bottom: 0,
        },
      });
      const histogramData = chartData.map(item => ({time: item.time, value: item.volumn, color: item.value>=item.open ? '#26a69a': '#ef5350' }))
      histogramSeries.setData(histogramData)
      const colors = ['purple', 'green', 'red', 'orange'];

      // eslint-disable-next-line array-callback-return
      chartItems.map((chartItem, index) => {
        const cd = chartItem.chartData;
        const color = colors[index % colors.length];
        
        // Add a line series instead of a histogram series
        const lineSeries = chart.current.addLineSeries({
          color: color, // Customize the color for each line series
          lineWidth: 2,   // Set the line width
        });
      
        // Map the data to match the format required by the line series and sort by time
        const lineSeriesData = cd.map(item => ({
          time: new Date(item.date).getTime() / 1000, // Convert date to Unix timestamp in seconds
          value: item.close // Use the 'close' property for the value (or 'adjClose', 'price', etc. as needed)
        }))
        .sort((a, b) => a.time - b.time); // Sort data by time in ascending order
      
        lineSeries.setData(lineSeriesData);
      });
    }

    if(toolTip === "On") {

      const toolTipWidth = 80;
      // Create and style the tooltip html element
      const toolTip = document.createElement('div');
      toolTip.style = `width: 96px; height: 80px; position: absolute; display: none; padding: 8px; box-sizing: border-box; font-size: 12px; text-align: left; z-index: 1000; top: 12px; left: 12px; pointer-events: none; border: 1px solid; border-radius: 2px;font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`;
      toolTip.style.background = 'white';
      toolTip.style.color = 'black';
      toolTip.style.borderColor = '#2962FF';
      chartContainerRef.current.appendChild(toolTip);
  
      // update tooltip
      chart.current.subscribeCrosshairMove(param => {
        if (
            param.point === undefined ||
            !param.time ||
            param.point.x < 0 ||
            param.point.x > chart.current.clientWidth ||
            param.point.y < 0 ||
            param.point.y > chartContainerRef.current.clientHeight
        ) {
            toolTip.style.display = 'none';
        } else {
            // time will be in the same format that we supplied to setData.
            // thus it will be YYYY-MM-DD
            const dateStr = param.time;
            toolTip.style.display = 'block';
            let data, coordinate;
            if(chartType==='Area')
              data = param.seriesData.get(volumeSeries);
            else
              data = param.seriesData.get(candlestickSeries);
            const price = data.value !== undefined ? data.value : data.close;
            toolTip.innerHTML = `<div style="font-size: 24px; margin: 4px 0px; color: ${'black'}">
                ${Math.round(100 * price) / 100}
                </div><div style="color: ${'black'}">
                ${dateStr}
                </div>`;
            if(chartType==='Area')
              coordinate = volumeSeries.priceToCoordinate(price);
            else
              coordinate = candlestickSeries.priceToCoordinate(price);

            let shiftedCoordinate = param.point.x - 50;
            if (coordinate === null) {
                return;
            }
            shiftedCoordinate = Math.max(
                0,
                Math.min(chartContainerRef.current.clientWidth - toolTipWidth, shiftedCoordinate)
            );
           const coordinateY =
                coordinate > 0
                    ? coordinate
                    : Math.max(
                        0,
                        Math.min(
                          chartContainerRef.current.clientHeight ,
                            coordinate
                        )
                    );
  
            toolTip.style.left = shiftedCoordinate + 'px';
            toolTip.style.top = coordinateY + 'px';
        }
      });
    }

    return () => {
      root.remove();
    }
  }, [data, scaleType, chartType, volumeType, toolTip, chartItems]);

  useEffect(() => {
    resizeObserver.current = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      chart.current.applyOptions({ width, height });
      setTimeout(() => {
        chart.current.timeScale().fitContent();
      }, 0);
    });

    resizeObserver.current.observe(chartContainerRef.current);

    return () => resizeObserver.current.disconnect();
  }, [data]);

  return (
    <div className="flex flex-col">
      {/* <div className="">
        <ChartFeaturesRow
          handlePriceScaleModeChange={(option) => setPriceScaleMode(option.value)}
          handleIndicatorModeChange={(option) => setIndicatorMode(option.value)}
        />
      </div> */}
      <div ref={chartContainerRef} />
    </div>
  );
};

export default ChartTradingView;

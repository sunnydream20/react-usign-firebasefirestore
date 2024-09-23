import { useState, useEffect, useCallback } from 'react';
import { mockAPI } from '../../../../data/home/mock-data';
import { authenticateAnonymously, streamStockSymbolHistoricalValue } from '../../../../services/db.service';
import {
  calculateCMO,
  calculateRSI,
  calculateStochasticOscillator,
  calculateWilliamsPercentageRange,
} from '../../../../utils/home/indicators';
import ChartWrapper from '../../../_UI/ChartWrapper';
import Chart from '../../../_UI/chart';
import GeneralSlider from '../../../_UI/general-slider';

const Slider = ({ widgetData }) => {
  const [mode, setMode] = useState('1D');
  const [data, setData] = useState([]);
  const [sliderRSI, setSlidersRSI] = useState({});
  const [sliderStochastic, setSliderStochastic] = useState({});
  const [sliderWilliamsR, setSliderWilliamsR] = useState({});
  const [sliderCMO, setSliderCMO] = useState({});
  const [isStandard, setIsStandard] = useState(true);

  const handleChangeStatus = (status) => {
    setIsStandard(status);
  };

  const renderButtons = useCallback(() => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', marginBottom: '10px' }}>
        <button
          className="control_svg"
          style={{
            width: '150px',
            height: '27px',
            borderRadius: '3px',
            fontSize: '14px',
            backgroundColor: isStandard ? '#6D6D6D' : '#1A1A1A',
            color: 'white',
            cursor: 'pointer',
            marginRight: '5px',
          }}
          onClick={() => handleChangeStatus(true)}
        >
          Standard
        </button>
        <button
          className="control_svg"
          style={{
            width: '150px',
            height: '27px',
            borderRadius: '3px',
            fontSize: '14px',
            backgroundColor: isStandard ? '#1A1A1A' : '#6D6D6D',
            color: 'white',
            cursor: 'pointer',
          }}
          onClick={() => handleChangeStatus(false)}
        >
          Equal Weight
        </button>
      </div>
    );
  }, [isStandard]);

  useEffect(() => {
    setData(mockAPI(mode));
    const maxDataNumber = 35;
    const _fnSortByDate = (a, b) => +new Date(a.date) - +new Date(b.date);

    const listenStockSymbolHistoricalValue = (symbol, range) => {
      const _sliderInd1 = {},
        _sliderInd2 = {},
        _sliderInd3 = {},
        _sliderInd4 = {};

      const _onSnapshot = (snapshot) => {
        if (!snapshot.data()) return;
        const _chartData = Array.isArray(snapshot.data().data.chartData)
          ? snapshot.data().data.chartData.splice(0, maxDataNumber).sort(_fnSortByDate)
          : [];

        const closes = _chartData.map((item) => item.price);
        const highs = _chartData.map((item) => item.high);
        const lows = _chartData.map((item) => item.low);

        // calc: use RSI for inditator
        const rsi = calculateRSI(closes);
        _sliderInd1[symbol] = rsi;
        // set slider indicator
        setSlidersRSI(_sliderInd1);

        // calc: use stochastic oscillator for indicator
        const stochasticOsc = calculateStochasticOscillator(highs, lows, closes, highs.length);
        _sliderInd2[symbol] = stochasticOsc;
        setSliderStochastic(_sliderInd2);

        // calc: use williams %R for cal indicator val
        const williamsR = calculateWilliamsPercentageRange(highs, lows, closes, highs.length);
        _sliderInd3[symbol] = williamsR;
        setSliderWilliamsR(_sliderInd3);

        // calc: use CMO for cal indicator val
        const cmo = calculateCMO(closes, highs.length);
        _sliderInd4[symbol] = cmo;
        setSliderCMO(_sliderInd4);

        // console.log([_sliderInd1, _sliderInd2, _sliderInd3, _sliderInd4]);
      };

      const _onSnapshotError = (error) => {
        console.error(error, '>> snapshot error <<');
      };

      // listen to the categories historical data
      streamStockSymbolHistoricalValue(symbol, range, _onSnapshot, _onSnapshotError);
    };

    // authenticate and access data from firestore
    authenticateAnonymously().then(() => {
      listenStockSymbolHistoricalValue('SPY', mode);
    });
  }, [mode, isStandard]);

  return (
    <div className='widget-one' style={{ paddingLeft: '1px' }}>
      <ChartWrapper title={'Widget 1\nLine Chart'} mode={mode} onChangeMode={setMode} data={widgetData}>
        <Chart currency="USD" data={data} mode={mode} isWidgetOne={true} />
        {renderButtons()}
        <GeneralSlider title="Relative Strength Index" average={sliderRSI.SPY || 0} />
        <GeneralSlider title="Williams Percent Range" average={sliderStochastic.SPY || 0} />
        <GeneralSlider title="Money Flow Index" average={sliderWilliamsR.SPY || 0} min={-100} max={0} />
        <GeneralSlider title="Chande Momentum Osc" average={sliderCMO.SPY || 0} min={-100} max={100} />
      </ChartWrapper>
    </div>
  );
};

export default Slider;

import { useEffect, useRef, useState } from 'react';
import Graph from './graph';

export const IncMode = {
  dec: -1,
  plain: 0,
  inc: 1,
};

const SimpleChart = ({ symbol, description, noticed, mode, data, setFavourite, favourite }) => {
  const [svgWidth, setSvgWidth] = useState(90);
  const [svgHeight] = useState(40);
  const svgRef = useRef();
  const [color, setColor] = useState('#C20033');
  const [value1, setValue1] = useState(0);
  const [pro, setPro] = useState(0);
  // const [dv, setDv] = useState(0);

  function _handleArrayOfData(data) {
    // Fill empty prices with 0
    for (let i = 0; i < data.length; i++) {
      if (data[i].price === undefined) {
        data[i].price = 0;
      }
    }

    const _value0 = (data && data[0]?.price) || 0;
    const _value1 = (data && data[data.length - 1]?.price) || 0;
    const _dv = _value1 - _value0;
    const _pro = (_dv / _value0) * 100;

    let _color;
    if (_dv < 0) {
      _color = '#C20033';
    } else if (_dv === 0) {
      _color = '#808080';
    } else {
      _color = '#04A500';
    }

    setValue1(_value1);
    setPro(_pro);
    setColor(_color);
  }

  function _handleObjectData(data) {
    const _dv = data?.change || 0;
    const _pro = data?.changesPercentage || 0;

    let _color;
    if (_dv < 0) {
      _color = '#C20033';
    } else if (_dv === 0) {
      _color = '#808080';
    } else {
      _color = '#04A500';
    }

    setValue1(data.price);
    // if( _value1 === null || _value1 === undefined ) {
    //   console.log('_value1 error =>', symbol,mode, data[data.length - 1]);
    // }
    // setDv(_dv);
    setPro(_pro);
    setColor(_color);
  }

  const handleButtonClick = () => {
    setFavourite({ ...data, title: description, favourite: !data.favourite ?? false, isDeleted: !data.favourite });
  };

  useEffect(() => {
    const width = svgRef.current.clientWidth;
    setSvgWidth(width);

    if (data) {
      if (Array.isArray(data)) _handleArrayOfData(data);
      else _handleObjectData(data);
    }
  }, [symbol, data, favourite]);

  return (
    <div className="w-full h-12 flex font-roboto">
     
      <div className="flex flex-none w-[132px] pr-1.5">
        <div onClick={handleButtonClick}>
          <svg className={'add-button'} width="23" height="23" viewBox="0 0 23 23" fill={favourite ? '#8C4CF4' : '#404040'}>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M21.1898 9.75154L21.1897 13.4816L13.7036 13.4817L13.7035 20.9418L9.96041 20.9419L9.96057 13.4818L2.47446 13.482L2.47454 9.75193L9.96064 9.75178L9.9608 2.29169L13.7039 2.29162L13.7037 9.7517L21.1898 9.75154Z"
            />
          </svg>
        </div>
        <div className="text-white pl-[2px]">
          <h6 className="text-[24px] leading-[24px] mb-1">{symbol}</h6>
          <div className="w-[100px] h-[15px] overflow-y-hidden">
            <p className="text-[14px] leading-[15px] whitespace-nowrap mb-0 select-none overflow-x-hidden overflow-y-hidden scroll-smooth">
              {description}
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1 h-full" ref={svgRef}>
        <Graph data={data.chartData || data} color={color} width={88} height={svgHeight} mode={mode} />
      </div>
      <div className="flex-col flex-none text-white text-center ml-1">
        {svgWidth > 0 && (
          <>
            <p className={`text-[16px] w-[77px] leading-[24px] border-1.5 border-solid rounded h-6`} style={{ borderColor: color, color: color }} >
              {pro.toFixed(2)}%
            </p>
            {typeof value1 !== 'undefined' ? <p className="text-[16px] w-[77.05px] leading-[21px]">${value1.toFixed(2)}</p> : <></>}
          </>
        )}
      </div>
    </div>
  );
};

export default SimpleChart;

import React, { useState, useEffect } from 'react';
import '../../../assets/css/scroll-bar.css';
import ChartWrapper, { monthModes } from '../chart-wrapper';
import Chart from '../commodity-chart/chart';
import News from '../news';

const NewsGraph = ({ selectOptions, graphData, mode, onChangeMode, selectedOption, onChangeOption, posts, textHighlightColor }) => {
  const [selectedType, setSelectedType] = useState(selectedOption);
  const [currentMode, setCurrentMode] = useState('1M');

  const onViewChangeMode = (m) => {
    setCurrentMode(m);
    onChangeMode(m);
  }

  const handleTypeChange = (type) => {
    setSelectedType(type);
    onChangeOption(type);
  };

  useEffect(() => {
    setSelectedType(monthModes[0]);
  }, []);

  useEffect(() => {
    setCurrentMode('1M');
    onChangeMode('1M');
  }, [onChangeMode]);

  useEffect(() => {
    setSelectedType(selectOptions[0]);
  }, [selectOptions]);

  return (
    <ChartWrapper mode={currentMode} onChangeMode={onViewChangeMode} monthMode={monthModes.monthtoFiveYearsModes}>
      <Chart mode={mode} currency="USD" data={graphData} highlightColor={textHighlightColor} />

      <div className="flex justify-center buttons">
        <div className="flex" style={{ maxWidth: '307px' }}>
          {selectOptions.slice(0, 3).map((option, index) => (
            <button
              key={option.value}
              className={`mr-${index < 2 ? 1 : 0} rounded`}
              style={{
                width: index === 1 || index === 4 ? '97px' : '99px',
                height: '27px',
                fontFamily: 'Roboto',
                fontSize: '14px',
                fontWeight: '400',
                lineHeight: '19.92px',
                borderRadius: '3px',
                backgroundColor: selectedType === option ? '#414141' : '#1A1A1A',
                color: selectedType === option ? '#FFFFFF' : '#FFFFFF',
                marginLeft: index === 0 ? 0 : '2.5px',
                marginRight: index === 2 ? 0 : '2.5px',
              }}
              onClick={() => handleTypeChange(option)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex buttons-below">
        <div className="flex">
          {selectOptions.slice(3).map((option, index) => (
            <button
              key={option.value}
              className={`mr-2 rounded`}
              style={{
                width: index === 0 || index === 2 ? '99px' : '97px',
                height: '27px',
                fontFamily: 'Roboto',
                fontSize: '14px',
                fontWeight: '400',
                lineHeight: '19.92px',
                borderRadius: '3px',
                backgroundColor: selectedType === option ? '#414141' : '#1A1A1A',
                color: selectedType === option ? '#FFFFFF' : '#FFFFFF',
                margin: '0 2.5px',
                marginLeft: index === 0 ? "1px" : '2.5px',
                marginTop: '-3px'
              }}
              onClick={() => handleTypeChange(option)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      <div className='mt-[9px] mr-[-12px] h-[320px] w-[309px]'>
        {/* Removed PerfectScrollbar and its related JSX */}
        <div className='flex-col space-y-[5px]'>
          <News posts={posts} companyColor={textHighlightColor} />
        </div>
      </div>
    </ChartWrapper>
  );
}

export default NewsGraph;

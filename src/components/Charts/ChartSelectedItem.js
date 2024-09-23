import { useState } from 'react';
import '../styles/item-rotation.css';
import IconRefresh from './icons/IconRefresh';
// import AnyStockChart from './ChartAnyStock';
import ChartTradingView from './ChartTradingView';

const ChartSelectedItem = ({ setNodeRef, style, attributes, listeners, data, position }) => {
  const [refreshIconClass, setRefreshIconClass] = useState('');
  const [isSpinning, setSpinning] = useState(false);

  const handleRefreshChart = () => {
    // start spinning
    setSpinning(true);
    setRefreshIconClass('rotating-icon');

    setTimeout(() => {
      setRefreshIconClass('');
      setSpinning(false);
    }, 3000);
  };

  return (
    <div className="relative">
      <div
        ref={setNodeRef}
        style={{ ...style }}
        {...attributes}
        {...listeners}
        className="flex flex-col rounded-xl w-full h-[auto] border-grey border-[3px] overflow-hidden"
      >
        <div className="w-full py-1 px-3 flex flex-grow-1 justify-between items-center h-14 bg-darkGrey">
          <div className="flex flex-col h-full text-white leading-tight pt-1">
            <h3>{data.symbol}</h3>
            <p>{data.title}</p>
          </div>
          <button onClick={handleRefreshChart} disabled={isSpinning} className={'flex items-center justify-center'}>
            <div className="icon-container">
              <IconRefresh className={refreshIconClass} />
            </div>
          </button>
        </div>
        <div className="h-full bg-black">
          <ChartTradingView data={data} />
        </div>
      </div>
    </div>
  );
};

export default ChartSelectedItem;

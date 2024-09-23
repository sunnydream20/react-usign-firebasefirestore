import { useCallback, useEffect, useRef, useState } from 'react';
import IconArrowDown from '../../assets/icons/IconArrowDown';

const normalWidth = 200;
const largeWidth = 200;

const BoxesFilter = ({ items, setCurrentFilters, currentFilters, customLabel, showAll, isPortfolio = false, ...rest }) => {
  const [filters, setFilters] = useState([]);
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const BUTTON_W = isPortfolio ? largeWidth + 10 : normalWidth + 10; // width + margin-right

  useEffect(() => {
    if (!filters.length) return;

    const handleResize = () => {
      if (containerRef.current) {
        const scroller = containerRef.current.querySelector('.scroller');
        const bodyWidth = document.body.clientWidth;
        const containerWidth = containerRef.current.clientWidth;
        const currentWidth = containerWidth - 200 > bodyWidth ? bodyWidth : containerWidth - 200;
        const n = Math.floor(currentWidth / BUTTON_W);
        scroller.style['max-width'] = `${(n - 1) * BUTTON_W - 10}px`;
        const max = items.length - n + 1;
        setMaxIndex(max);
        setIndex((index) => Math.max(0, Math.min(index, max)));
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [filters, items.length, BUTTON_W]);

  const handleFiltersClick = useCallback(
    (clickedFilter) => {
      if (clickedFilter === 'All') {
        let AllList = [];
        AllList.push('All');
        items.forEach((item) => {
          if (AllList.includes(item.category)) {
          } else {
            AllList.push(item.category);
          }
        });
        setCurrentFilters(AllList);
      } else {
        setCurrentFilters([clickedFilter]);
      }
    },
    [items, setCurrentFilters]
  );

  useEffect(() => {
    const getFilters = () => {
      if (items?.length) {
        let tempFilters = new Set();
        if (showAll) {
          !customLabel && tempFilters.add('All');
        }
        items.forEach((item) => {
          tempFilters.add(item.category);
        });
        let allFilters;
        allFilters = Array.from(tempFilters);
        setFilters(allFilters);
        !currentFilters.length && handleFiltersClick({ clickedFilter: allFilters[0] });
      }
    };
    getFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const activeFilters = (filter) =>
    (currentFilters.includes(filter) && !currentFilters.includes('All')) || (currentFilters.includes('All') && filter === 'All');

  return !filters.length ? null : (
    <div className="w-full" {...rest}>
      <div ref={containerRef} className="flex w-full justify-center gap-2.5 flex-wrap items-center my-2.5 flex-row">
        <span className="text-white text-[17px]">{customLabel || 'Filter: '}</span>
        <div className="scroller overflow-hidden">
          <div
            className="flex gap-2.5 transition-transform duration-300 ease-linear"
            style={{ transform: `translateX(${-index * BUTTON_W}px)` }}
          >
            {filters.map((filter) => (
              <div
                key={filter}
                onClick={() => handleFiltersClick(filter)}
                className={`cursor-pointer text-white min-w-[${
                  isPortfolio ? largeWidth : normalWidth
                }px] max-w-full rounded-full text-center text-[17px] leading-10 ${
                  activeFilters(filter) ? 'bg-lightGrey' : 'bg-[#404040] hover:bg-lightGrey'
                }`}
                style={{ minWidth: isPortfolio ? largeWidth : normalWidth }}
              >
                {filter}
              </div>
            ))}
          </div>
        </div>
        {maxIndex > 0 && (
          <>
            <button
              className="bg-[#404040] hover:bg-lightGrey rounded-full w-10 h-10 flex justify-center items-center disabled:opacity-40 disabled:pointer-events-none rotate-90"
              onClick={() => {
                setIndex(Math.max(0, index - 1));
              }}
              disabled={index === 0}
            >
              <IconArrowDown />
            </button>
            <button
              className=" bg-[#404040] hover:bg-lightGrey rounded-full w-10 h-10 flex justify-center items-center disabled:opacity-40 disabled:pointer-events-none -rotate-90"
              onClick={() => {
                setIndex(Math.min(index + 1, maxIndex));
              }}
              disabled={index === maxIndex}
            >
              <IconArrowDown />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BoxesFilter;

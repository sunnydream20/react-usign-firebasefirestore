import { useLayoutEffect, useMemo, useState } from 'react';
import IconCross from '../../assets/icons/IconCross';
import IconArrowDown from '../../assets/icons/IconArrowDown';
import { SearchFilter } from './SearchFilter';

const ChartFilter = ({ activeOptions, suggestedOptions, customLabel, onFilterChange }) => {
  const [activeFilters, setActiveFilters] = useState([]);

  const [index, setIndex] = useState(0);

  const [firstFilter, setFirstFilter] = useState(null);

  const handleMoreFiltersClick = () => {
    // TODO: load more items from the list
  };

  // handle click of remove filter
  const handleRemoveItem = (event, removedFilter) => {
    event.preventDefault();
    if (!removedFilter) return;
    // items remove selected item
    const filterIndex = activeOptions.findIndex((item) => item.symbol === removedFilter.symbol);
    delete activeOptions[filterIndex];

    // update activeFilters
    setActiveFilters([...activeOptions.filter((item) => item !== null)]);

    // set activeFilters
    onFilterChange([...activeOptions.filter((item) => item !== null)]);
  };

  const setActiveOption = (event, option) => {
    event.preventDefault();
    option.selected = true;
    activeOptions = [...activeOptions.filter((opt) => opt.symbol !== option.symbol).map((opt) => ({ ...opt, selected: false })), option];

    // call parent
    onFilterChange([...activeOptions]);
  };

  useMemo(() => {
    // update active options
    setActiveFilters([...activeOptions.filter((item) => firstFilter && item.symbol !== firstFilter.symbol)]);

    // setOptions([...suggestedOptions.filter(item => activeOptions.findIndex(opt => opt.symbol === item.symbol) < 0)]);
  }, [activeOptions, firstFilter]);

  const handleSelectedOption = (option) => {
    // set active activeFilters
    if (Array.isArray(activeOptions)) activeOptions.push(option);

    // remove from suggested filter options
    onFilterChange(activeOptions);
  };

  useLayoutEffect(() => {
    setFirstFilter(activeOptions.find((item) => item.selected === true) ?? activeOptions[0]);
  }, [activeOptions]);

  const handleScroll = (increment) => {
    setIndex((prevIndex) => Math.max(0, Math.min(prevIndex + increment, activeFilters.length - 2)));
  };

  const Filters = (
    <div className="flex w-full gap-[10px] flex-wrap items-center my-2.5 flex-row overlay-wrapper">
      <div className="search-filter">
        <SearchFilter activeOptions={activeOptions} searchValue={() => {}} setSelectedOption={handleSelectedOption} />
      </div>
      <div className="hidden md:flex flex-wrap gap-[10px] items-center justify-center relative flex-row chart-filter truncate flex-1">
        <div className="scroller overflow-hidden flex flex-1 gap-2." style={{ display: 'flex', gap: '10px' }}>
          <div style={{ flex: '1' }}>
            <div
              className="flex gap-2.5 transition-transform duration-300 ease-linear"
              style={{ transform: `translateX(${-index * 157}px)` }}
            >
              {activeFilters.map((item, idx) => (
                <div
                  key={item.symbol + '_' + idx}
                  className="item-symbol flex items-center cursor-pointer min-w-[147px] h-[40px] justify-between bg-transparent text-white rounded-full px-3.5"
                  style={{ borderWidth: 3, borderColor: item.color ?? '#fff' }}
                >
                  <span onClick={(event) => setActiveOption(event, item)}>{item.symbol}</span>
                  <button onClick={(event) => handleRemoveItem(event, item)} className="remove-item flex items-center justify-center">
                    <IconCross className="w-[18px] h-[18px] fill-[#808080]" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        {activeFilters.length > 2 && (
          <>
            <button
              className="hidden border-2 border-[#808080] rounded-full w-10 h-10 md:flex justify-center items-center disabled:opacity-40 disabled:pointer-events-none rotate-90"
              onClick={() => {
                handleScroll(-1);
                setIndex(Math.max(0, index - 1));
              }}
              disabled={index === 0}
            >
              <IconArrowDown />
            </button>
            <button
              className="hidden border-2 border-[#808080] rounded-full w-10 h-10 md:flex justify-center items-center disabled:opacity-40 disabled:pointer-events-none -rotate-90"
              onClick={() => {
                handleScroll(1);
                setIndex(Math.min(index + 1, activeFilters.length - 2));
              }}
              disabled={index >= activeFilters.length - 2}
            >
              <IconArrowDown />
            </button>
          </>
        )}
        {activeFilters.length > 10 ? (
          <div key={'more-btn'} onClick={() => handleMoreFiltersClick()} className="hidden item-symbol md:flex items-center">
            <span>{'>>'}</span>
          </div>
        ) : (
          <></>
        )}
      </div>
      {activeFilters.map((item, idx) => (
        <div
          key={item.symbol + '_' + idx}
          className="item-symbol flex md:hidden items-center cursor-pointer min-w-[147px] h-[40px] justify-between bg-transparent text-white rounded-full px-3.5"
          style={{ borderWidth: 3, borderColor: item.color ?? '#fff' }}
        >
          <span onClick={(event) => setActiveOption(event, item)}>{item.symbol}</span>
          <button onClick={(event) => handleRemoveItem(event, item)} className="remove-item flex items-center justify-center">
            <IconCross className="w-[18px] h-[18px] fill-[#808080]" />
          </button>
        </div>
      ))}
    </div>
  );

  return Filters;
};

export default ChartFilter;

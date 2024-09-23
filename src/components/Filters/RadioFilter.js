import { useCallback, useEffect, useState } from 'react';
import IconChevronDown from '../../assets/icons/IconChevronDown';

const RadioFilter = ({ items, setCurrentFilters, currentFilters, customLabel, showAll, ...rest }) => {
  const [filters, setFilters] = useState([]);

  const handleFiltersClick = useCallback(
    ({ clickedFilter, event = undefined }) => {
      if (event) event.preventDefault();

      if (clickedFilter === 'All results') {
        let AllList = [];
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
        items.forEach((item) => {
          tempFilters.add(item.category);
        });
        let allFilters;
        if (showAll) {
          !customLabel && tempFilters.add('All results');
          allFilters = Array.from(tempFilters).sort();
          setFilters(allFilters);
          !currentFilters.length && handleFiltersClick({ clickedFilter: 'All results' });
          return;
        }
        allFilters = Array.from(tempFilters).sort();
        setFilters(allFilters);
        !currentFilters.length && handleFiltersClick({ clickedFilter: allFilters[0] });
      }
    };
    getFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const displayAll = currentFilters.length === filters.length - 1;
 
  return !filters.length ? null : (
    <div {...rest}>
      <div className="text-white text-lg flex gap-2 items-center my-2.5 relative flex-row justify-center">
        <span className="text-white text-[17px]">{customLabel || 'Filter: '}</span>
        <div className="bg-neutral-700 w-[200px] rounded-full overflow-hidden flex items-center relative">
          <select
            value={displayAll ? 'All results' : currentFilters[0]}
            onChange={(event) => handleFiltersClick({ clickedFilter: event.target.value, event })}
            className="bg-inherit h-10 px-4 w-full outline-none appearance-none text-base leading-9"
          >
            {filters.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
          <IconChevronDown className="w-3 h-3 fill-lightGrey1 mr-4 absolute right-0" />
        </div>
      </div>
    </div>
  );
};

export default RadioFilter;

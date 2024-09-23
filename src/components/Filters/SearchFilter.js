import { useState } from 'react';
import { generalSearch, getStockData } from 'utils/home/stockAPIs';
import IconGlass from '../../assets/icons/IconGlass';
import { colors } from '../_UI/ColorPicker';

const SearchFilter = ({ searchValue, setSelectedOption, activeOptions }) => {
  const [results, setResults] = useState([]);
  const [search, SetSearch] = useState('');

  const handleChangeSearched = async (event) => {
    // searchValue(event.target.value);
    SetSearch(event.target.value);

    if (event.target.value.length < 3) setResults([]);
    else {
      const res = await generalSearch(event.target.value)
      setResults(res)
    }
  };

  const onSelectedOption = async (option) => {
    // close modal
    setResults([]);
    SetSearch('');

    // get real time data
    const selOption = await getStockData(option.symbol).then((data) => {
      return {
        id: option.id,
        key: option.id,
        symbol: data.symbol,
        category: 'stock history',
        chartData: data.historical.map((stockdata) => ({ ...stockdata, price: stockdata.close })),
        color: colors[Math.floor(Math.random() * 16)],
        favourite: true,
        selected: true,
      };
    });

    // call parent component
    // setSelectedOption(option);
    setSelectedOption(selOption);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    SetSearch('');
  };

  return (
    <div className="flex flex-col search-ctrl h-[40px]">
      <form
        style={{ maxWidth: '194px', border: '3px solid #777777' }}
        className="pl-4 pr-1.5 py-1.5 rounded-[30px] overflow-hidden items-center flex w-[147px] md:w-48 2xl:w-80 border-[#8B8B8B] bg-[#363636] border-2"
        onSubmit={handleSubmit}
      >
        <input
          type="search"
          placeholder="Add Overlay"
          autoComplete="off"
          value={search}
          onChange={handleChangeSearched}
          className="outline-none bg-inherit text-[##8B8B8B] placeholder:text-[#8B8B8B] placeholder:font-normal placeholder:font-roboto placeholder:leading-[19.92px] text-[17px] w-full appearance-none"
        />
        <button className="text-neutral-400" type="button">
          <IconGlass className="w-6 h-6 p-px fill-[#8B8B8B]" />
        </button>
      </form>
      <div className={results.length > 0 ? 'sg-list show' : 'sg-list hidden'}>
        <ul>
          {results.map((result) => (
            <li className="suggested-list-item" key={result.symbol} onClick={(e) => onSelectedOption(result)}>
              {result.symbol}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export { SearchFilter };

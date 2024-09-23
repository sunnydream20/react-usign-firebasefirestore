import { useEffect, useState } from 'react';
import IconGlass from '../../../assets/icons/IconGlass';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseAPIUrl } from 'utils/home/defaultValue';

let apiURL = `${baseAPIUrl}/dynamicApiCall`;

const SearchMobile = ({ isSearchOpen, setIsSearchOpen, setSearchValue }) => {
  const [searchedValue, setSearchedValue] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchOptions = async (value) => {
    setLoading(true);
    try {
      // Make API call to fetch options based on the input value
      const response = await axios.post(apiURL, {
        endpoint: 'search',
        params: `query=${value}&limit=10`,
        version: 'v3',
      });
      setOptions(response.data);
    } catch (error) {
      console.error('Error fetching options:', error);
    }
    setLoading(false);
  };

  const handleSearchClick = (option) => {
    setSearchedValue('');
    setOptions([]);
    navigate(`/chart/${option.toUpperCase()}`);
  };

  useEffect(() => {
    if (isSearchOpen && searchedValue.length >= 3) {
      fetchOptions(searchedValue);
    } else setOptions([]);
  }, [isSearchOpen, searchedValue]);

  const toggleSearchInput = () => {
    setIsSearchOpen(!isSearchOpen);
    setSearchedValue('');
    setOptions([]); // Clear options when toggling search input
  };

  return (
    <div className="relative rounded-full bg-[#1a1a1a]">
      <input
        type="text"
        disabled={!isSearchOpen}
        id="search"
        name="search"
        placeholder="Search"
        autoComplete="off"
        value={searchedValue}
        onChange={(event) => setSearchedValue(event.target.value)}
        className={`${
          isSearchOpen
            ? 'w-[17.5rem] md:w-72 placeholder:text-base placeholder:text-[#8B8B8B] placeholder:opacity-100'
            : 'w-10 placeholder:opacity-0'
        }
                    bg-transparent w-9 h-9 duration-500 rounded-full p-4 text-sm appearance-none hover:appearance-none active:appearance-none !outline-none 
                    ${isSearchOpen && 'pr-9 pl-5'}`}
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul className="absolute bg-black top-full left-0 w-full z-10">
          {options.map((option) => (
            <li key={option.symbol} onClick={() => handleSearchClick(option.symbol)} className="cursor-pointer p-2 hover:bg-gray-800">
              {`${option.name} - ${option.symbol}`}
            </li>
          ))}
        </ul>
      )}
      <button onClick={toggleSearchInput} className="absolute" type="button">
        <div className="relative right-[27px] top-[8px]">
          <IconGlass
            className="w-5 h-5 fill-[#8B8B8B] absolute flex items-center justify-center"
            style={{ transform: isSearchOpen ? 'rotate(45deg)' : '', opacity: isSearchOpen ? 0 : 1, transition: 'all .2s ease' }}
          />
          <div
            className="absolute text-4xl h-6 w-6 pr-2 pt-1 flex items-center justify-center font-thin"
            style={{ transform: isSearchOpen ? 'rotate(45deg)' : '', opacity: isSearchOpen ? 1 : 0, transition: 'all .3s ease' }}
          >
            +
          </div>
        </div>
      </button>
    </div>
  );
};

const SearchDesktop = ({ setSearchValue }) => {
  const [searchedValue, setSearchedValue] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearchClick = (option) => {
    setSearchedValue('');
    setOptions([]);
    navigate(`/chart/${option.toUpperCase()}`);
  };

  const fetchOptions = async (value) => {
    setLoading(true);
    try {
      // Make API call to fetch options based on the input value
      const response = await axios.post(apiURL, {
        endpoint: 'search',
        params: `query=${value}&limit=10`,
        version: 'v3',
      });
      setOptions(response.data);
    } catch (error) {
      console.error('Error fetching options:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (searchedValue.length >= 3) {
      fetchOptions(searchedValue);
    } else setOptions([]);
  }, [searchedValue]);

  return (
    <div className="relative flex flex-col">
      <div className=" bg-[#1a1a1a] pl-4 pr-1 py-1 rounded-3xl overflow-hidden items-center flex  w-48 2xl:w-80 ">
        <input
          type="search"
          placeholder="Search"
          autoComplete="off"
          value={searchedValue}
          onChange={(event) => setSearchedValue(event.target.value)}
          className="outline-none bg-inherit text-[#8B8B8B] placeholder:text-[#8B8B8B] text-xl w-full appearance-none"
        />
        {loading && <div>Loading...</div>}

        <IconGlass className="w-7 h-7 p-px fill-[#8B8B8B]" />
      </div>
      {!loading && (
        <ul className="absolute bg-black top-full w-full z-10 border border-gray-300 rounded-b-lg">
          {options.map((option) => (
            <li
              key={option.symbol}
              onClick={() => {
                handleSearchClick(option.symbol);
              }}
              className="cursor-pointer p-2 hover:bg-gray-800"
            >
              {`${option.name} - ${option.symbol}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export { SearchMobile, SearchDesktop };

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import IconCross from '../../../assets/icons/IconCross';
import IconGlass from '../../../assets/icons/IconGlass';
import Logo from '../../../assets/icons/LogoDesktop';
import useStoredData from '../../../hooks/useStoredData';
import useToggle from '../../../hooks/useToggle';
import { DotsMenu, OpenDotsDropdownMenu } from './DotsMenu';
import LanguageSelector from './LanguageSelector';
import { HamburguerMenu, OpenMobileMenu } from './MobileHamburguerMenu';
import { NavDesktop } from './Nav';
import { SearchDesktop, SearchMobile } from './Search';
import SearchResult from './SearchResult';
import { getStockData } from '../../../utils/home/stockAPIs';

const Header = ({ props }) => {
  const [isOpenMenuDropDown, setIsOpenMenuDropDown] = useState(false);
  const [isOpenSidebarMenu, setIsOpenSidebarMenu] = useToggle();
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useToggle(false);
  const [searchValue, setSearchedValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [favoriteStockItems, setFavoriteStockItems] = useStoredData('favouriteStockItems', []);

  const handleDisappearSidebar = (value) => setIsOpenMenuDropDown(value);

  const desktopProps = { setIsOpenMenuDropDown: handleDisappearSidebar, isOpenMenuDropDown, backNavigation: props?.backNavigation };
  const mobileProps = {
    setIsOpenMenuDropDown: handleDisappearSidebar,
    isOpenMenuDropDown,
    setIsOpenSidebarMenu,
    isOpenSidebarMenu,
    isMobileSearchOpen,
    setIsMobileSearchOpen,
    backNavigation: props.backNavigation ?? -1,
  };
  const openMobileMenuProps = { isOpenSidebarMenu, setIsOpenSidebarMenu };

  useEffect(() => {
    const searchSymbols = async () => {
      if (searchValue) {
        return await getStockData(searchValue).then(setSearchResults);
      }
    };
    // fire search symbols
    searchSymbols();
  }, [searchValue, favoriteStockItems]);

  // handle set item to the portfolio list
  const handleAddFavoriteStockItem = (item) => {
    if (Boolean(favoriteStockItems.length) && favoriteStockItems.findIndex((itm) => itm.id === item.id) < 0) {
      setFavoriteStockItems([...favoriteStockItems, item]);
    }

    // notify parent
    window.dispatchEvent(new Event('update_portfolio'));
  };

  // display search result component
  const SearchResults = () => {
    return (
      <div className="search-results w-full p-3 flex flex-col">
        <div className="row flex">
          <span className="font-light text-md">Search results: </span>
          <button onClick={() => setSearchedValue('')} className="flex items-center justify-center ml-auto">
            <IconCross className="w-6 h-6 fill-[#808080]" />
          </button>
        </div>
        <div className="search-results-list row pl-2 pt-1 pb-1">
          {searchResults.map((item, index) => (
            <SearchResult key={index} item={item} addToPortfolio={handleAddFavoriteStockItem} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <header className="bg-black text-white fixed w-full shadow-lg flex flex-col justify-center items-center z-[100]">
      <div className="w-full relative">
        <MobileHeader {...mobileProps} setSearchValue={setSearchedValue} className="lg:hidden" />
        <OpenMobileMenu {...openMobileMenuProps} className="lg:hidden" />
        {props.backButton ? (
          <SubPageHeader {...desktopProps} className="hidden lg:block" />
        ) : (
          <DesktopHeader {...desktopProps} setSearchValue={setSearchedValue} className="hidden lg:block" />
        )}
      </div>

      {searchResults.length ? <SearchResults /> : <></>}
    </header>
  );
};

const MobileHeader = ({
  setIsOpenSidebarMenu,
  setIsOpenMenuDropDown,
  isOpenMenuDropDown,
  isOpenSidebarMenu,
  isMobileSearchOpen,
  setIsMobileSearchOpen,
  setSearchValue: setSearchedValue,
  backNavigation,
  ...rest
}) => {
  return (
    <div {...rest}>
      <div className="mobile-header relative w-first md:w-second flex justify-between items-center py-2.5 mx-auto flex-row">
        <HamburguerMenu setIsOpenSidebarMenu={setIsOpenSidebarMenu} />
        <Link to="/" className="text-2xl font-bold absolute ml-[50%] translate-x-[-50%]">
          <Logo
            className={`w-52 h-6 md:w-52 md:h-6 opacity-100 'opacity-100 w-full'}`}
            id={10021}
            name="mobile"
            style={{ transition: 'all .5s ease', display: isMobileSearchOpen ? 'none' : 'block' }}
          />
        </Link>
        <SearchMobile
          isSearchOpen={isMobileSearchOpen}
          setIsSearchOpen={setIsMobileSearchOpen}
          setSearchValue={(value) => setSearchedValue(value)}
        />
      </div>
    </div>
  );
};

const DesktopHeader = ({ setIsOpenMenuDropDown, isOpenMenuDropDown, setSearchValue: setSearchedValue, backNavigation, ...rest }) => {
  return (
    <div {...rest}>
      <div className="w-third 2xl:w-fourth 3xl:w-fifth 4xl:w-sixth flex justify-between py-2.5 mx-auto">
        <div className="flex gap-4 items-center">
          <Link to="/" className="text-2xl font-bold">
            <Logo className="w-52 h-6 opacity-100" id={10012} name="desktop" />
          </Link>
          <SearchDesktop setSearchValue={(value) => setSearchedValue(value)} />
          <NavDesktop />
        </div>
        <div className="flex gap-[10px] justify-center items-center">
          <LanguageSelector />
          <div className="flex gap-4 items-center">
            <div className="relative">
              <DotsMenu isOpenMenuDropDown={isOpenMenuDropDown} setIsOpenMenuDropDown={setIsOpenMenuDropDown} />
              <OpenDotsDropdownMenu isOpenMenuDropDown={isOpenMenuDropDown} setIsOpenMenuDropDown={setIsOpenMenuDropDown} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SubPageHeader = ({ setIsOpenMenuDropDown, isOpenMenuDropDown, backNavigation, ...rest }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/chart/${search}`);
    setSearch('');
  };

  return (
    <div {...rest}>
      <div className="md:w-[660px] lg:w-[995px] xl:w-[995px] 2xl:w-[1330px] 3xl:w-[1665px] 4xl:w-[2000px] flex justify-between py-2.5 mx-auto">
        <div className="flex gap-4 items-center">
          <button
            onClick={() => {
              navigate(backNavigation ? '/' + backNavigation : -1);
            }}
          >
            <div className="flex items-center">
              <svg width="9" height="19" viewBox="0 0 9 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.32976 9.50589L8.19213 2.81265C8.54349 2.33066 8.54349 1.54554 8.19213 1.05857C7.84546 0.581549 7.28249 0.581549 6.93618 1.05857L0.80018 9.50589L1.52096 10.4947L1.5224 10.4997L6.90801 17.9085C7.27021 18.4054 7.8581 18.4054 8.22029 17.9085C8.55613 17.4464 8.55613 16.6961 8.22029 16.234L3.32976 9.50589Z"
                  fill="#BFBFBF"
                />
              </svg>

              <svg width="9" height="19" viewBox="0 0 9 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.32976 9.50589L8.19213 2.81265C8.54349 2.33066 8.54349 1.54554 8.19213 1.05857C7.84546 0.581549 7.28249 0.581549 6.93618 1.05857L0.80018 9.50589L1.52096 10.4947L1.5224 10.4997L6.90801 17.9085C7.27021 18.4054 7.8581 18.4054 8.22029 17.9085C8.55613 17.4464 8.55613 16.6961 8.22029 16.234L3.32976 9.50589Z"
                  fill="#BFBFBF"
                />
              </svg>
              <span className="ml-1" style={{ fontSize: '22px' }}>
                Back
              </span>
            </div>
          </button>
        </div>
        <div className="flex gap-4 items-center">
          <Link to="/" className="text-2xl font-bold">
            <Logo className="w-52 h-6 opacity-100" id={10012} name="desktop" />
          </Link>
        </div>
        <div className="flex gap-2 justify-center items-center">
          <form
            style={{ maxWidth: '185px', width: '100%' }}
            className="pl-4 pr-1.5 py-1.5 rounded-[30px] overflow-hidden items-center flex w-24 2xl:w-80 border-[#8B8B8B] bg-[#000] border-2"
            onSubmit={handleSubmit}
          >
            <input
              type="search"
              name="search"
              placeholder="Search"
              autoComplete="off"
              className="outline-none bg-inherit text-[##8B8B8B] placeholder:text-[#8B8B8B] text-base w-full appearance-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="text-neutral-400" type="button">
              <IconGlass className="w-6 h-6 p-px fill-[#8B8B8B]" />
            </button>
          </form>
          {/* <div style={{maxWidth: "50px"}}>
            <LanguageSelector />
          </div> */}
          <div className="flex gap-4 items-center">
            <div className="relative">
              <DotsMenu isOpenMenuDropDown={isOpenMenuDropDown} setIsOpenMenuDropDown={setIsOpenMenuDropDown} />
              <OpenDotsDropdownMenu isOpenMenuDropDown={isOpenMenuDropDown} setIsOpenMenuDropDown={setIsOpenMenuDropDown} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

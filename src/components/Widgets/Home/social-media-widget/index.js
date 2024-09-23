/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import Select from 'react-select';
import useStoredData from '../../../../hooks/useStoredData';
import { authenticateAnonymously, getSocialResults } from '../../../../services/db.service';
import Box from '../../../_UI/box';
import './index.css';
import StockItemLine from './stock-item';

const filters = [
  { value: 'wallstreetbets', label: 'From Reddit: Wall Sreet Bets', key: 1 },
  { value: 'all-stocks', label: 'From Reddit: All Stock Forums', key: 2 },
  // { value: 'cryptocurrency', label: 'r/Crypto Currency', key: 3 },
  // { value: 'all-crypto', label: 'All Crypto Forums', key: 4 },
];

const LocalStorageKey = 'favouriteStockItems';

const SocialMediaWidget = ({ widgetData }) => {
  const [userId, setUserId] = React.useState(null);
  const [results, setResults] = React.useState([]);
  const [selectedFilter, setSelectedFilter] = React.useState(filters[0]);
  const [selectOptions, setSelectOptions] = React.useState([]);
  const [favouriteStockItems, setFavoriteStockList] = useStoredData(LocalStorageKey, () => {
    return JSON.parse(window.localStorage.getItem(LocalStorageKey) || []);
  });
  const [menuIsOpen, setMenuIsOpen] = React.useState(false);

  const onChangeOption = function (option) {
    setSelectedFilter(option);
    // fetchSocialResults();
  };

  // Use an effect to authenticate and load the grocery list from the database
  useEffect(() => {
    const fetchSocialResults = () => {
      authenticateAnonymously()
        .then(async (userCredential) => {
          setUserId(userCredential.user.uid);

          // success: snapshot
          const _onSnapshot = (snapshot) => {
            if (snapshot.size && snapshot.docs) {
              const data = snapshot.docs[0].data();

              // set the results
              const results = data.data.map((item, index) => {
                const key = `socialmedia_${item.ticker}_${index}`;
                return {
                  ...item,
                  key,
                  id: key,
                  symbol: item.ticker,
                  favourite:
                    favouriteStockItems.length &&
                    favouriteStockItems.findIndex((_item) => (typeof _item.ticker !== 'undefined' && _item.ticker === item.ticker)) > -1,
                  position: index,
                  category: 'social media',
                };
              });

              setResults([...results]);
            }
          };

          // error: snapshot
          const _onSnapshotError = function (error) {
            console.error(error, '>> snapshot error <<');
          };

          // listen to subcollection to get data
          getSocialResults(selectedFilter.value, _onSnapshot, _onSnapshotError);
        })
        .catch((error) => {
          console.error(error, '>> error <<');
        });
    };
    fetchSocialResults();
    setSelectOptions(filters);
  }, [selectedFilter, favouriteStockItems]);

  const toggleItemToPortfolio = (item) => {
    if (item.favourite) setFavoriteStockList([...favouriteStockItems, item]);
    else setFavoriteStockList([...favouriteStockItems.filter(fItem => fItem.symbol !== item.symbol)]);
  };

  const onClickTitle = () => {
    setMenuIsOpen(!menuIsOpen)
  }

  return (
    <Box title={'Social Media Interest\nSome text'} width={325} height={560} data={widgetData}>
      <div className="flex-col">
        <div className="relative flex justify-left items-center ml-[auto] social-data-source">
          <div className="relative flex items-center text-center" onClick={onClickTitle}>
            <Select
              className="social-select w-72 p-2 pt-0"
              classNamePrefix="social-select"
              name="form-field-name"
              value={selectedFilter}
              onChange={(val) => onChangeOption(val)}
              options={selectOptions}
              placeholder=""
              isSearchable={false}
              menuIsOpen={menuIsOpen}
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  minHeight: '23px',
                  height: '23px',
                }),

                valueContainer: (provided, state) => ({
                  ...provided,
                  height: '23px',
                  padding: '0px'
                }),

                input: (provided, state) => ({
                  ...provided,
                  margin: '0px',
                }),
                indicatorSeparator: state => ({
                  display: 'none',
                }),
                indicatorsContainer: (provided, state) => ({
                  ...provided,
                  height: '23px',
                }),
              }}
            />
          </div>
        </div>
        {results.map((item, idx) => (
          <StockItemLine title={item.name} data={item} key={idx} setFavourite={toggleItemToPortfolio} />
        ))}
      </div>
    </Box>
  );
};

export default SocialMediaWidget;

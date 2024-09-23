/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
 
import { useEffect, useState } from 'react';
import useStoredData from '../../../../hooks/useStoredData';
import { authenticateAnonymously, getStockList, streamStockValues } from '../../../../services/db.service';
import Box from '../../../_UI/box';
import SimpleChart from '../../../_UI/simple-chart';

const LocalStorageKey = 'favouriteStockItems';

const StockHistory = ({ widgetData }) => {
  const [mode, setMode] = useState('5Y'); // used on chart display
  const [userId, setUserId] = useState(null);
  const [stockList, setStockList] = useState([]);
  const [favouriteStockItems, setFavourites] = useStoredData(LocalStorageKey, []);

  const loadStockList = () => {
    authenticateAnonymously()
      .then(async (userCredential) => {
        setUserId(userCredential.user.uid);
        // read from firestore
        await getStockList().then((stockItemDoc) => {
          const data = stockItemDoc.data().data || [];
          // set stocklist
          const stockListDocs = Array.isArray(data) ? data : [];

          // success: snapshot
          const _onSnapshot = function (snapshot) {
            if (!snapshot.size) return;

            // set the stock list
            const _stockListDocs = snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data().data }));

            const items = stockListDocs.map((item, index) => {
              const findStockItem = _stockListDocs.find((stockItem) => stockItem.id === item.symbol);
              let stockItemData = {};
              if (findStockItem) stockItemData = findStockItem.data;
              // in case of using splice from the client
              // stockItemData['chartData'] = Array.isArray(stockItemData.chartData) ? stockItemData.chartData.splice(0, 30) : [];

              return {
                ...item,
                data: {
                  ...stockItemData,
                  favourite: favouriteStockItems.findIndex((fav) => typeof fav.symbol !== 'undefined' && fav.symbol === item.symbol) > -1,
                  position: index,
                  key: 'stockhistory_' + index,
                  id: 'stockhistory_' + index,
                  category: 'stock history',
                  color: null,
                },
              };
            });

            // update favouriteList
            // setFavourites([...items.filter(item => item.data.favourite)]);

            // update stock list
            setStockList([...items]);
          };

          // error: snapshot
          const _onSnapshotError = function (error) {
            console.error(error, '>> snapshot error <<');
          };

          // listen to the stock list history > 1D charts
          streamStockValues('1D', _onSnapshot, _onSnapshotError);
        });
      })
      .catch((error) => {
        console.error(error, '>> error <<');
      });
  };

  // Use an effect to authenticate and load the grocery list from the database
  useEffect(() => {
    loadStockList();
  }, [favouriteStockItems]);

  const toggleItemToPortfolio = (item) => {
    const favouriItemIndex = favouriteStockItems.findIndex((_item) => _item.symbol === item.symbol);
    if (item.favourite && favouriItemIndex < 0) setFavourites([...favouriteStockItems, item]);
    else if (favouriItemIndex > -1) {
      favouriteStockItems.splice(favouriItemIndex, 1);
      setFavourites([...favouriteStockItems]);
    }
  };

  return (
    <Box title={'Widget 2\nLine Chart'} width={325} height={560} data={widgetData}>
      <div className="flex-col space-y-[5px]">
        {[...stockList].map((item, idx) => (
          <SimpleChart
            key={`m-chart-${idx}`}
            symbol={item.symbol}
            description={item.companyName}
            noticed={item.noticed}
            data={item.data}
            mode={mode}
            favourite={favouriteStockItems.findIndex(favItem => favItem.symbol === item.symbol) > -1}
            setFavourite={toggleItemToPortfolio}
          />
        ))}
      </div>
    </Box>
  );
};

export default StockHistory;

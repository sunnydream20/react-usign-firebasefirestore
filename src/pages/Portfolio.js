import { useEffect, useState } from 'react';
import DnDDashboard from '../components/DnDGrids/DnDDashboard.jsx';
import FiltersSection from '../components/Filters/index.js';
import Breakpoints from '../components/Layout/Breakpoints.js';
import Layout from '../components/Layout/index.js';
import useStoredData from '../hooks/useStoredData.js';
import listFilters from '../utils/portfolio/listFilters.js';

const LocalStorageKey = 'favouriteStockItems'; // "StocksList"

const Portfolio = () => {
  const [items, setItems] = useState([]);
  const [currentFilters, setCurrentFilters] = useState([listFilters?.[0]?.category ?? 'Full']);
  const [favoriteStockItems, setFavoriteStockItems] = useStoredData(LocalStorageKey, () => {
    return JSON.parse(localStorage.getItem(LocalStorageKey)) ?? [];
  });

  const loadPortfolioItems = (favItems) => {
    setItems([...favItems].map((item) => ({ ...item, category: 'Full' })));
  };

  useEffect(() => {
    loadPortfolioItems(favoriteStockItems);

    // listen to changes to update the list of items
    window.addEventListener('update_portfolio', (e) => {
      loadPortfolioItems([...JSON.parse(localStorage.getItem(LocalStorageKey))]);
    });
  }, [favoriteStockItems]);

  const handleSetItems = (items) => {
    if (!Array.isArray(items)) return;
    setFavoriteStockItems([...items]);
    loadPortfolioItems(items);
    window.dispatchEvent(new Event('update_portfolio'));
  };

  const handleSetCurrentFilters = (currentFilters, isFirstRender = false) => {
    const mapped = items.map((item) => {
      return { ...item, category: currentFilters[0] };
    });
    setCurrentFilters(currentFilters);
    !isFirstRender && setItems(mapped);
  };

  return (
    <Layout>
      <div className="w-full flex flex-wrap justify-center items-center pb-20">
        <Breakpoints>
          <div className="w-full flex flex-wrap justify-center items-center">
            <FiltersSection
              currentFilters={currentFilters}
              setCurrentFilters={handleSetCurrentFilters}
              items={listFilters}
              customLabel={'Display:'}
              isPortfolio={true}
            />
            <DnDDashboard
              isList
              items={items}
              itemsList={LocalStorageKey}
              setItemsList={handleSetItems}
              currentFilters={currentFilters}
              source={'portfolio'}
            />
          </div>
        </Breakpoints>
      </div>
    </Layout>
  );
};

export default Portfolio;

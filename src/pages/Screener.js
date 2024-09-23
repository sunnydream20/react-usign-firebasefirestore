import { useEffect, useState } from 'react';
import DnDDashboard from '../components/DnDGrids/DnDDashboard.jsx';
import FiltersSection from '../components/Filters/index.js';
import Breakpoints from '../components/Layout/Breakpoints.js';
import Layout from '../components/Layout/index.js';
import Widgets from '../components/Widgets/Screener/index.js';

const LocalStorageKey = 'homeWidgets';

const Screener = () => {
  const [items, setItems] = useState([]);
  const [currentFilters, setCurrentFilters] = useState([]);
  const [favourites, setFavouriteIds] = useState(() => {
    return JSON.parse(localStorage.getItem('favouriteItems')) || [];
  });

  const readStorageFavouriteItems = () => {
    setFavouriteIds(JSON.parse(localStorage.getItem('favouriteItems')) || []);
  };

  useEffect(() => {
    const fetchList = () => {
      try {
        const widgets = Widgets({ favourites });
        setItems(widgets);
      } catch (error) {
        console.error(error);
      }
    };

    // listen to the changes
    window.addEventListener('updateFavourites', readStorageFavouriteItems);

    fetchList();
  }, [favourites]);

  const handleSetCurrentFilters = (currentFilters) => setCurrentFilters(currentFilters);

  const handleSetItems = (items) => {
    if (!Array.isArray(items)) return;
    setItems(items);
  };

  return (
    <Layout>
      <div className="w-full flex flex-wrap justify-center items-center pb-10 font-roboto">
        <Breakpoints>
          <FiltersSection currentFilters={currentFilters} setCurrentFilters={handleSetCurrentFilters} items={items.slice(0, 6)} showAll />
          <DnDDashboard
            items={items}
            itemsList={LocalStorageKey}
            setItemsList={handleSetItems}
            currentFilters={currentFilters}
            source="home"
          />
        </Breakpoints>
      </div>
    </Layout>
  );
};

export default Screener;

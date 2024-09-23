import { useEffect, useState } from 'react';
import DnDDashboard from '../DnDGrids/DnDDashboard.jsx';
import FiltersSection from '../Filters/index.js';
import Breakpoints from '../Layout/Breakpoints.js';
import Layout from '../Layout/index.js';
import Widgets from '../Widgets/Home/index.js';

const ListChartsPage = ({ isFavorite = false, localStorageKey }) => {
  const [items, setItems] = useState([]);
  const [listFilterItems, setListFilterItems] = useState([]);
  const [currentFilters, setCurrentFilters] = useState([]);
  const [favorites, setFavoriteIds] = useState(() => {
    return JSON.parse(localStorage.getItem('favouriteItems')) || [];
  });

  const readStorageFavoriteItems = () => {
    setFavoriteIds(JSON.parse(localStorage.getItem('favouriteItems')) || []);
  };

  useEffect(() => {
    const fetchList = () => {
      try {
        const { widgets, listAllWidgets } = Widgets({ favorites: favorites, filtered: isFavorite });
        setItems(widgets);
        setListFilterItems(listAllWidgets);
      } catch (error) {
        console.error(error);
      }
    };

    // listen to the changes
    window.addEventListener('updateFavourites', readStorageFavoriteItems);

    fetchList();
  }, [favorites, isFavorite]);

  const handleSetCurrentFilters = (currentFilters) => setCurrentFilters(currentFilters);

  const handleSetItems = (items) => {
    if (!Array.isArray(items)) return;
    setItems(items);
  };

  return (
    <Layout>
      <div sytle={{fontFamily:"Roboto"}} className="w-full flex flex-wrap justify-center items-center pb-10 font-roboto">
        <Breakpoints> 
          <FiltersSection 
            currentFilters={currentFilters}
            setCurrentFilters={handleSetCurrentFilters}
            items={listFilterItems.slice(0, 9)}
            showAll
          />
          <DnDDashboard
            items={items}
            itemsList={localStorageKey}
            setItemsList={handleSetItems}
            currentFilters={currentFilters}
            source="home"
          />
        </Breakpoints>
      </div>
    </Layout>
  );
};

export default ListChartsPage;

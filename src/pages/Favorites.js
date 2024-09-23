import ListChartsPage from 'components/Layout/ListChartsPage.js';

const LocalStorageKey = 'favouriteItems';

const Favorites = () => {
  return <ListChartsPage localStorageKey={LocalStorageKey} isFavorite />;
};

export default Favorites;

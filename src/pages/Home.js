import ListChartsPage from 'components/Layout/ListChartsPage.js';

const LocalStorageKey = 'homeWidgets';

const Home = () => {
  return <ListChartsPage localStorageKey={LocalStorageKey} />;
};

export default Home; 

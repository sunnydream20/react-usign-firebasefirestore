import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Contact = lazy(() => import('./pages/Contact'));
const Favorites = lazy(() => import('./pages/Favorites'));
const Chart = lazy(() => import('./pages/Chart'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Home = lazy(() => import('./pages/Home'));
const Screener = lazy(() => import('./pages/Screener'));

function App() {  
  document.title = 'Finance Site';
 
  return (
    <Suspense fallback={<div style={{ backgroundColor: '#000' }}>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route exact path="/chart" element={<Chart />} />
        <Route path="/chart/:symbol" element={<Chart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/screener" element={<Screener />} />
      </Routes>
    </Suspense>
  );
}

export default App;

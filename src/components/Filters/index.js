import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import BoxesFilter from './BoxesFilter';
import RadioFilter from './RadioFilter';
 
const FiltersSection = (props) => {
  const [display, setDisplay] = useState('radio');

  const handleResize = () => {
    if (window.innerWidth >= 1024) setDisplay('boxes');
    else setDisplay('radio');
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', debounce(handleResize, 20));
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return display === 'radio' ? <RadioFilter {...props} /> : <BoxesFilter {...props} />;
};

export default FiltersSection;

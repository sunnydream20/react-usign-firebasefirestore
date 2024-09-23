import { colors } from '../../_UI/ColorPicker';
import SvgButton from '../../_UI/buttons';

const SearchResult = ({ item, addToPortfolio }) => {
  const handleItemClick = () => {
    addToPortfolio({
      ...item,
      title: item.name,
      id: 'search_item_' + item.symbol,
      favourite: !item.favourite ?? true,
      color: colors[Math.floor(Math.random() * 16)],
    });
  };

  return (
    <div className="search-result w-full flex flex-wrap cursor-pointer" onClick={handleItemClick}>
      <div>
        <SvgButton type={'plus'} color={'#b5b5b5'} buttonClass={'add-button'} />
      </div>
      <div className="result-title pl-2">{item.symbol}</div>
      <div className="result-description pl-2">({item.name})</div>
    </div>
  );
};

export default SearchResult;

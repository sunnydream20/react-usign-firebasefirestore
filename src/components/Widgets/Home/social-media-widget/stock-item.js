import SvgArrow from '../../../_UI/arrows';
import SvgButton from '../../../_UI/buttons';

// use sub component for social
const parse = require('html-react-parser');

const StockItemLine = ({ title, data, setFavourite }) => {
  const prevRank = data.rank_24h_ago ?? 0;
  const currRank = data.rank;
  const diff = (prevRank && prevRank > 0) ? Math.abs(prevRank - currRank) : 0;
  let direction = 'equal';

  if (prevRank && prevRank > 0) {
    if (prevRank > currRank) direction = 'up';
    else if (prevRank < currRank) direction = 'down';
  }

  const handleButtonClick = () => {
    setFavourite({ ...data, title, favourite: !data.favourite ?? false, isDeleted: false });
  }

  const buttonClass = data.favourite ? 'add-button favourite' : 'add-button';

  let colorClass = 'equal-rank-color';
  switch (direction) {
    case 'up': colorClass = 'up-rank-color'; break;
    case 'down': colorClass = 'down-rank-color'; break;
    default:
  }

  const boxClass = currRank % 2 === 1 ? 'border-box' : '';

  return (
    <div className={`flex flex-none w-[309px] p-[3px] ${boxClass}`}>
      <div className='' onClick={() => handleButtonClick()}>
        <SvgButton type={'plus'} buttonClass={buttonClass} />
      </div>
      <div className="text-white pl-[5px]">
        <div className="max-w-[300px] w-[275px] h-[21px] overflow-hidden">
          <span className="text-[20px] font-normal leading-[20px]">{parse(title)}</span>
        </div>
        <div className="flex w-full justify-between h-[23px] pt-[6px] pr-[6px] overflow-y-hidden">
          <p className="text-[20px] leading-[15px] flex row">
            <span>{currRank}</span>
            <span className="text-[12px] pl-[5px] pr-[5px] rank-arrow pb-[5px]">
              <SvgArrow direction={direction} />
            </span>
            <span className={`${colorClass}`}>{diff}</span>
          </p>
          <p className={`text-[20px] leading-[15px] flex row ${colorClass}`}>
            <span>{diff}%</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default StockItemLine;
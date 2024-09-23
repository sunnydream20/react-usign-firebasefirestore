import { useState } from 'react';
import { PortfolioFilterEnum } from 'utils/portfolio/listFilters';
import IconMove from '../../../assets/icons/IconMove';
import ColorPicker from '../../_UI/ColorPicker';
import SortableItemIcon from '../SortableItemIcon';
import SortableItemChart from './SortableItemChart';

const FullSortableItem = ({ ...props }) => {
  const { setNodeRef, style, attributes, listeners, data, updateColor, removeItemFromList, currentFilters } = props;
  const [selectedColor, setSelectedColor] = useState(data.color);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleDisplayColorPicker = () => setDisplayColorPicker(!displayColorPicker);

  const handleColorChange = (color) => {
    if (!displayColorPicker) return null;
    setDisplayColorPicker(false);
    setSelectedColor(color?.hex);
    updateColor(color?.hex);
  };

  const onChartChangeMode = (mode) => {
    //
  };

  const renderWidgetByFilter = () => {
    if (currentFilters && (currentFilters[0] === 'Chart' || currentFilters[0] === PortfolioFilterEnum.CHART)) {
      return <SortableItemChart data={data} onChangeMode={onChartChangeMode} />;
    }

    return <div></div>;
  };

  return (
    <div className="relative">
      <div
        ref={setNodeRef}
        style={{ ...style }}
        className="flex flex-col rounded-md w-[325px] h-[343px] border-none overflow-hidden cursor-auto"
      >
        <div
          className="w-full py-[7px] px-[9px] flex flex-grow-1 justify-between items-center h-14 bg-[#404040]"
          style={{ backgroundColor: selectedColor }}
        >
          <div className="flex flex-col h-full text-[#DDDDDD] leading-tight">
            <h3>{data.symbol}</h3>
            <p>{data.title}</p>
          </div>

          <div className="flex mr-2">
            <button className="mr-2 active:cursor-grabbing focus:cursor-grab hover:cursor-grab" {...attributes} {...listeners}>
              <IconMove className="w-6 h-6" />
            </button>
            <SortableItemIcon data={data} isStock={true} onWidgetRemove={(item) => removeItemFromList(item)} />
          </div>
        </div>

        <div className="h-full bg-black p-2">{renderWidgetByFilter()}</div>

        <button
          style={{ backgroundColor: selectedColor, zIndex: displayColorPicker ? '51' : '1' }}
          className="bg-grey h-3 w-3 ml-[7px] mb-[9px] rounded-full absolute bottom-0"
          onClick={handleDisplayColorPicker}
        ></button>
      </div>

      <ColorPicker
        handleColorChange={handleColorChange}
        isEnabled={displayColorPicker}
        positioningStyles={{ top: '-3px', left: '-5px' }}
        styles={{ transition: 'all .3s easy-in' }}
        className={`duration-300 ${displayColorPicker ? 'opacity-100 z-50' : 'opacity-0 -z-1'}`}
      />
    </div>
  );
};

export default FullSortableItem;

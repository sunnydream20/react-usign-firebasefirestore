import { useState } from 'react';
import ColorPicker from '../ColorPicker';
import SortableItemIcon from './SortableItemIcon';

const MiniSortableItem = ({ setNodeRef, style, attributes, listeners, data, position, updateColor }) => {
  const [selectedColor, setSelectedColor] = useState(data.color);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleDisplayColorPicker = () => setDisplayColorPicker(!displayColorPicker);

  const handleColorChange = (color) => {
    if (!displayColorPicker) return null;
    setDisplayColorPicker(false);
    setSelectedColor(color?.hex);
    updateColor(color?.hex);
  };

  return (
    <div className="relative">
      <div
        ref={setNodeRef}
        style={{ ...style, borderColor: selectedColor }}
        {...attributes}
        {...listeners}
        className="flex flex-col rounded-xl w-[325px] h-[251px] border-[3px] overflow-hidden relative"
      >
        <div className="w-full py-1 px-3 flex flex-grow-1 justify-between items-center h-14 bg-darkGrey">
          <div className="flex flex-col h-full text-white leading-tight pt-1">
            <h3>{data.title}</h3>
            <p>{data.symbol}</p>
          </div>
          <SortableItemIcon isStock={true} />
        </div>
        <div className="h-full bg-black">
          <p className="text-white pl-4 pt-4">Position: {position}</p>
        </div>
        <button
          style={{ backgroundColor: selectedColor, zIndex: displayColorPicker ? '51' : '1' }}
          className="bg-grey h-3 w-3 ml-[7px] mb-[6px] rounded-full absolute bottom-0"
          onClick={handleDisplayColorPicker}
        ></button>
      </div>
      <ColorPicker
        handleColorChange={handleColorChange}
        isEnabled={displayColorPicker}
        positioningStyles={{ top: '-3px', left: '-5px' }}
        styles={{ transition: 'all .3s easy-in' }}
        className={`duration-300 ${displayColorPicker ? 'opacity-100 z-50' : 'opacity-0 -z-10'}`}
      />
    </div>
  );
};

export default MiniSortableItem;

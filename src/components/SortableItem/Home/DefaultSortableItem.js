import IconMove from "../../../assets/icons/IconMove";
import SortableItemIcon from "../SortableItemIcon";

const DefaultSortableItem = ({
  setNodeRef,
  style,
  attributes,
  listeners,
  data,
  title,
}) => {
  // update favourite list

  const updateFavorite = (widgetId) => {
    const favItems = JSON.parse(localStorage.getItem('favouriteItems')) || [];

    if (Array.isArray(favItems) && favItems.indexOf(widgetId) > -1) {
      const removeIndex = favItems.findIndex((item) => item === widgetId);
      delete favItems[removeIndex]; // remove if that exists
      data.isFavourite = false;
    } else {
      data.isFavourite = true;
      favItems.push(widgetId);
    }

    // update localstorage
    localStorage.setItem('favouriteItems', JSON.stringify([...favItems.filter((item) => item)]));

    // notify parent
    window.dispatchEvent(new Event("updateFavourites"));
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex flex-col rounded-md w-[325px] h-[603px] overflow-hidden"
    >
      <div className="flex items-center justify-between px-[10px] py-[9px] h-[53px] leading-[20px] text-[17px] text-[#DDDDDD] bg-[#404040] whitespace-pre z-50">
        <span>{title}</span>
        <div className='flex mr-2'>
          <button
            className='mr-2 active:cursor-grabbing focus:cursor-grab hover:cursor-grab'
            {...attributes}
            {...listeners}>
            <IconMove className="w-6 h-6" />
          </button>
          <SortableItemIcon updateFavorite={updateFavorite} data={data} />
        </div>
      </div>

      <div className="h-full bg-black">{data.component}</div>
      <div className="bg-darkGrey h-7 flex items-center"></div>
    </div>
  );
};

export default DefaultSortableItem;

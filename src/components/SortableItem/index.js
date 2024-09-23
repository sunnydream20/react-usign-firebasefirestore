import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Categories } from '../../utils/categories';
import DefaultSortableItem from './Home/DefaultSortableItem';
import FullSortableItem from './Portfolio/FullSortableItem';

const SortableItem = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: props.id });
  let { data, setItems, position, category, itemsList, source, currentFilters, title } = props;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 2 : 'inherit',
  };

  const updateFavorite = (id) => {
    let currentElements = JSON.parse(localStorage.getItem(itemsList));
    let index = currentElements.findIndex((item) => item.id === id);
    currentElements[index] = {
      ...currentElements[index],
      isFavourite: !currentElements[index].isFavourite,
    };
    localStorage.setItem(itemsList, JSON.stringify(currentElements));
    setItems(currentElements);
  };

  const updateColor = (newColor) => {
    const items = JSON.parse(window.localStorage.getItem(itemsList));
    const newItemsColor = items.map((item) => {
      return item.id === data.id
        ? {
          ...item,
          color: newColor,
        }
        : item;
    });
    setItems(newItemsColor);
  };

  const removeItemFromList = (selectedWidgetId) => {
    let storageElements = JSON.parse(localStorage.getItem(itemsList));
    const findElementIndex = storageElements.findIndex((item) => item && item.id === selectedWidgetId);
    delete storageElements[findElementIndex];
    // filter null elements
    storageElements = [...storageElements.filter((item) => Boolean(item))];
    localStorage.setItem(itemsList, JSON.stringify(storageElements));
    setItems([...storageElements]);
  };

  const sortableItemProps = {
    setNodeRef,
    style,
    attributes,
    listeners,
    data,
    updateFavorite,
    position,
    category,
    removeItemFromList,
    source,
    currentFilters,
    title,
  };
  const listSortableItemProps = { ...sortableItemProps, updateColor };

  switch (category) {
    case Categories.DEFAULT.CATEGORY_1:
    case Categories.DEFAULT.CATEGORY_2:
    case Categories.DEFAULT.CATEGORY_3:
    case Categories.DEFAULT.CATEGORY_4:
      return <DefaultSortableItem {...sortableItemProps} />;
    case Categories.STOCK.FULL:
    case Categories.STOCK.CHART:
    case Categories.STOCK.METHOD_1:
    case Categories.STOCK.METHOD_2:
    case Categories.STOCK.METHOD_3:
    case Categories.STOCK.METHOD_4:
    case Categories.STOCK.METHOD_5:
    case Categories.STOCK.METHOD_6:
    case Categories.STOCK.METHOD_7:
    case Categories.STOCK.METHOD_8:
      return <FullSortableItem {...listSortableItemProps} />;
    default:
      return <DefaultSortableItem {...sortableItemProps} />;
  }
};

export default SortableItem;

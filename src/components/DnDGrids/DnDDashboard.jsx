import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import SortableItem from "../SortableItem";
import Grid from "./Grid";

const DnDDashboard = ({ isList, currentFilters, itemsList, setItemsList, items, source = null }) => {

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = items.findIndex(({ id }) => id === active.id);
      const newIndex = items.findIndex(({ id }) => id === over.id);

      let afterDragList = arrayMove(items, oldIndex, newIndex);
      if (currentFilters.length === 1 && !isList) return afterDragList;
      const swappedItems = afterDragList.map((item, index) => ({ ...item, position: index + 1 }));

      // call parent function
      setItemsList(swappedItems);
      return swappedItems;
    }
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map(({ id }) => id)}
          strategy={rectSortingStrategy}
          disabled={window.innerWidth < 1024}
        >
          <Grid>
            {items?.length > 0 &&
              // items?.filter((item) => currentFilters.includes(item.category) ? item : null)
              items?.map((item) =>
                <SortableItem
                  heart={isList ? false : true}
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  data={item}
                  setItems={setItemsList}
                  position={item.position}
                  isStock={isList}
                  category={item.category}
                  itemsList={itemsList}
                  source={source}
                  currentFilters={currentFilters}
                  handle={true}
                />
              )
            }
          </Grid>
        </SortableContext>
      </DndContext>
    </>
  );
}

export default DnDDashboard;

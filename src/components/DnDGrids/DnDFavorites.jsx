import { DndContext, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, rectSortingStrategy, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import SortableItem from '../SortableItem';
import Grid from './Grid';

const DnDFavorites = ({ items, itemsList, setItemsList, currentFilters }) => {
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

	return (
		<>
			<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
				<SortableContext items={items.map(({ id }) => id)} strategy={rectSortingStrategy}>
					<Grid>
						{items.length > 0 &&
							items
								?.filter((item) => item.isFavourite === true)
								.filter((item) => (currentFilters.length ? currentFilters.includes(item.category) : true))
								.map((item) => (
									<SortableItem
										key={item.id}
										heart={true}
										id={item.id}
										data={item}
										setItems={setItemsList}
										position={item.position}
										category={item.category}
										itemsList={itemsList}
									/>
								))}
					</Grid>
				</SortableContext>
			</DndContext>
		</>
	);

	function handleDragEnd(event) {
		const { active, over } = event;

		if (active.id !== over.id) {
			setItemsList((items) => {
				const oldIndex = items.findIndex(({ id }) => id === active.id);
				const newIndex = items.findIndex(({ id }) => id === over.id);

				return arrayMove(items, oldIndex, newIndex);
			});
		}
	}
};

export default DnDFavorites;

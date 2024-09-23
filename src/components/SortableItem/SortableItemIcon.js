import IconCross from '../../assets/icons/IconCross';
import IconHeart from '../../assets/icons/IconHeart';

const SortableItemIcon = ({ data, updateFavorite, isStock, onWidgetRemove }) => {
	return isStock ? (
		<div className="flex items-center justify-center mt-[1px]">
			<button onClick={() => { onWidgetRemove(data.id) }} className='hover:cursor-auto'>
				<IconCross className="w-6 h-6 fill-[#DDDDDD]" />
			</button>
		</div>
	) : (
		<button onClick={() => updateFavorite(data.id)} className="flex items-center justify-center">
			<IconHeart isFilled={data.isFavourite} />
		</button>
	);
};

export default SortableItemIcon;

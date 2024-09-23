const Grid = ({ children }) => {
	return (
		<div className="flex flex-wrap gap-2.5 w-full mx-auto font-roboto">
			{children}
		</div>
	);
}

export default Grid
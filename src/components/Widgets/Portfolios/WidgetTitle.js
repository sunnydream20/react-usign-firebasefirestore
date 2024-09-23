const WidgetTitle = ({ title }) => {
	return (
		<div className="flex items-center justify-center mb-2">
			<h1
				className="text-[20px] text-white leading-5"
				style={{ fontFamily: 'Arial' }}
			>{title}</h1>
		</div>
	);
};

export default WidgetTitle;
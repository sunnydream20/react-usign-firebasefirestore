const Box = ({ children, width, height, treemapPadding, fullHeight, scrollable = false, noPadding, style, ...data }) => {
	// calc custom padding css based on box type
	const customPaddingCss = fullHeight || scrollable ? 'pr-2 pl-2' : (treemapPadding === true ? 'p-[5px]' : 'p-2');
	const boxIdsToSkip = [4, 8];
	const boxId = data.data.id;
	const customStyling = {
		overflow: 'hidden'
	};

	if(!boxIdsToSkip.includes(boxId)) {
		customStyling.paddingTop = "10px";
		customStyling.paddingBottom = "10px";
		customStyling.paddingLeft = "8px";
		customStyling.paddingRight = "9px";
	}

	return (
		<div
			className="flex flex-col rounded-md bg-neutral-700 text-white pb-[18px] antialiased font-roboto"
			style={{ width, height }}
		>
			<div data-no-dnd={true} style={{...customStyling, ...style}} className={'flex-1 h-[536px] bg-black relative ' + (noPadding === true ? '' : customPaddingCss)}>
				{children}
			</div>
		</div>
	);
};

export default Box;

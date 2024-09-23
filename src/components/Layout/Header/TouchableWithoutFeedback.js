const TouchableWithoutFeedback = ({ action, classes, ...rest }) => {
	const hideElement = () => action(false)
	return <div className={`absolute w-screen h-screen ${classes}`} onClick={hideElement} {...rest} />
}

export default TouchableWithoutFeedback;
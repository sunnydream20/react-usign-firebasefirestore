import './radio-group.css';

const ChartWrapper = ({ children }) => {
	// const [mode, setMode] = useState('1D');

	return (
		<fieldset className="radio-group">
			{children}
		</fieldset>
	);
};

export default ChartWrapper;

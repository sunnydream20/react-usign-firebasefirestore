import Box from './box';

const MODES = ['1D', '5D', '1M', '3M', '6M', '1Y', '5Y'];

const ChartWrapper = ({ title, mode, onChangeMode, children, data }) => {
	// const [mode, setMode] = useState('1D');

	return (
		<Box title={title} width={325} height={560} data={data}>
			<div className="text-lg text-[#595959]">
				<div className="flex justify-between cursor-auto mb-2.5">
					{MODES.map((m, i) => (
						<div
							key={m}
							style={{
								width: '37px',
								height: '27px',
								overflow: 'hidden',
								textAlign: 'center',
								padding: 0
							}}
							className={`cursor-pointer rounded-[3px] h-[27px] px-1.5 ${m === mode ? 'bg-neutral-700 text-white' : 'hover:bg-neutral-700 hover:text-white'}`}
							onClick={() => onChangeMode && onChangeMode(m)}
						>
							{m}
						</div>
					))}
				</div>
				{children}
			</div>
		</Box>
	);
};

export default ChartWrapper;

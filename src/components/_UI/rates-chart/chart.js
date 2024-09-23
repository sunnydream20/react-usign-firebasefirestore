import Graph from './graph';

// const numberToString = (value) => `${value > 0 ? '+' : ''}${value.toFixed(2)}`;

const Chart = ({ rate, mode, data }) => {
	return (
		<>
			<div className="text-[18px] w-full whitespace-nowrap overflow-hidden">
				{data?.length > 0 && (
					<>
						<span className="text-white">{rate.label} Maturity Rate:</span> <span className="text-[#2898FF]">{rate.interest}%</span>
					</>
				)}
			</div>
			<Graph data={data || []} mode={mode} yAxisSuffix="%" />
		</>
	);
};

export default Chart;

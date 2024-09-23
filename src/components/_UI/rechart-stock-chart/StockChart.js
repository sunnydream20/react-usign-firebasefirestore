/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { useState } from 'react';
import { CartesianGrid, Label, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';


//chart to display stocks with recharts
const StockChart = ({ stock, idx, handleButtonClick, favouriteStockItems }) => {
	const [chartX, setChartX] = useState(0)

	//custom tooltip to show date and price
	const CustomTooltip = ({ active, payload, label }) => {
		if (active && payload && payload.length) {
			return (
				<div className="custom-tooltip" >
					<p className="label">{`${label}`}</p>
					<p className="label">{`$${payload[0].value}`}</p>
				</div>
			);
		}

		return null;
	};

	//displays favorite button, stock and full stock name, and chart with recharts
	return (
		<tr className='stock-line-chart' key={idx}>

			<td className="plus-btn-div my-1" onClick={() => handleButtonClick(idx)}>
				<svg className={'add-button'} width="23" height="23" viewBox="0 0 23 23"
					fill={favouriteStockItems.includes(idx) ? '#8C4CF4' : '#404040'}>
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M21.1898 9.75154L21.1897 13.4816L13.7036 13.4817L13.7035 20.9418L9.96041 20.9419L9.96057 13.4818L2.47446 13.482L2.47454 9.75193L9.96064 9.75178L9.9608 2.29169L13.7039 2.29162L13.7037 9.7517L21.1898 9.75154Z"
					/>
				</svg>
			</td>

			<td className='my-1'>
				<h6 className='stock-short text-[24px] leading-[24px] mb-1'>{stock.stock}</h6>
				<p className='stock-name text-[14px] leading-[15px]  mb-0 select-none  scroll-smooth'>
					{stock.name}</p>
			</td>

			<td className='my-1'>
				{/* <ResponsiveContainer width="185%" height="17%"> */}
				<div className='bg-gray-400'>
					<LineChart
						width={185}
						height={150}
						data={stock.data}
						margin={{
							top: 0,
							right: -71,
							left: -289,
							bottom: 0,
						}}

						onMouseMove={(e) => setChartX(e.chartX - 100)}
					>
						<CartesianGrid strokeDasharray="0 0" vertical={false} horizontal={false} />
						<XAxis dataKey="date" axisLine={false} tick={false} />
						<YAxis dataKey="price" axisLine={false} tick={false} />
						<Tooltip content={<CustomTooltip />} position={{ x: chartX > 0 ? chartX : 0, y: -10 }} />
						<Label value="a" />
						<Line
							strokeWidth="3"
							type="monotone"
							dataKey="price"
							stroke={stock.color}
							dot={false}
							activeDot={{ r: 8 }}
							isAnimationActive={false} />
					</LineChart>
				</div>
				{/* </ResponsiveContainer> */}
			</td>
		</tr>
	);
};

export default StockChart;

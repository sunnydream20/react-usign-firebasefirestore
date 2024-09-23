import { useEffect, useState } from 'react';
import { mockAPI } from '../../../../data/home/mock-data';
import Box from '../../../_UI/box';
import NewsGraph from '../../../_UI/news-graph';

const commodities = [
	{
		value: 'brent_crude_oil',
		label: 'Bent Crude',
		key: 0,
	},
	{
		value: 'wti_crude_oil',
		label: 'WTI Crude',
		key: 1,
	},
	{
		value: 'natural_gas',
		label: 'Natural Gas',
		key: 2,
	},
	{
		value: 'gasoline',
		label: 'Gasoline',
		key: 3,
	},
	{
		value: 'heating_oil',
		label: 'Heating Oil',
		key: 4,
	},
];

const news_list = [
	{
		date: 'Mar-28-23',
		company: 'Alibaba',
		title: 'Alibaba plans to split into six in radical overhaul',
	},
	{
		date: 'Mar-27-23',
		company: 'Financial Times',
		title: 'Shale oil drillers left exposed after pulling back price hedges',
	},
	{
		date: 'Oct-28-22',
		company: 'Motley Fool',
		title: 'Apple Provides Further Proof of Dominance in the Business World',
	},
	{
		date: 'Oct-28-22',
		company: 'Financial Times',
		title: 'Apple/China: intricate supply chain makes hanging up hard to do',
	},
	{
		date: 'Oct-28-22',
		company: 'Reuters',
		title: 'US STOCKS-Wall St drops as focus shifts to Fed rate decision',
	},
	{
		date: 'Oct-28-22',
		company: 'The Wall Street Journal',
		title: 'Foxconn to Shift Some iPhone Production From Covid-Hit Plant to Other Sites',
	},
];

const commodityPosts = {
	wti_crude_oil: news_list,
	brent_crude_oil: news_list,
	natural_gas: news_list,
	gasoline: news_list,
	heating_oil: news_list,
};

const getData = (mode, commodity) => {
	const mockData = mockAPI(mode);
	let newData = [];
	if (commodity.value !== commodities[0].value) {
		for (const obj of mockData) {
			const newObj = { date: obj.date, price: Math.random() * 300 + 300 };
			newData.push(newObj);
		}
	} else {
		newData = mockData;
	}

	return newData;
};

const CommoditiesWidget = ({ widgetData }) => {
	const [mode, setMode] = useState('1D');
	const [commodity, setCommodity] = useState(commodities[0]);
	const [graphData, setGraphData] = useState([]);

	useEffect(() => {
		const data = getData(mode, commodity);
		setGraphData(data);
	}, [mode, commodity]);

	return (
		<Box title={'Commodities \nSome text'} width={325} height={560} data={widgetData}>
			<NewsGraph
				selectOptions={commodities}
				graphData={graphData}
				mode={mode}
				onChangeMode={setMode}
				selectedOption={commodity}
				onChangeOption={setCommodity}
				posts={commodityPosts[commodity.value]}
				textHighlightColor={'#A092F3'}
			/>
		</Box>
	);
};

export default CommoditiesWidget;

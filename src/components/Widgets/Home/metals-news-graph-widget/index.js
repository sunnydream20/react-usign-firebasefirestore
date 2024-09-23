import { useEffect, useState } from 'react';
import { mockAPI } from '../../../../data/home/mock-data';
import Box from '../../../_UI/box';
import NewsGraph from '../../../_UI/news-graph';

const metals = [
	{
		value: 'gold',
		label: 'Gold',
		key: 0,
	},
	{
		value: 'silver',
		label: 'Silver',
		key: 1,
	},
	{
		value: 'copper',
		label: 'Copper',
		key: 2,
	},
	{
		value: 'uranium',
		label: 'Uranium',
		key: 3,
	},
	{
		value: 'lithium',
		label: 'Lithium',
		key: 4,
	},
	{
		value: 'aluminum',
		label: 'Aluminum',
		key: 5,
	},
];

const metalPosts = {
	gold: [
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
	],

	silver: [
		{
			date: 'Mar-27-23',
			company: 'Financial Times',
			title: 'Shale oil drillers left exposed after pulling back price hedges',
		},
		{
			date: 'Mar-28-23',
			company: 'Alibaba',
			title: 'Alibaba plans to split into six in radical overhaul',
		},
		{
			date: 'Oct-28-22',
			company: 'Motley Fool_silver',
			title: 'Apple Provides Further Proof of Dominance in the Business World',
		},
		{
			date: 'Oct-28-22',
			company: 'Financial Times_silver',
			title: 'Apple/China: intricate supply chain makes hanging up hard to do',
		},
		{
			date: 'Oct-28-22',
			company: 'Reuters_silver',
			title: 'US STOCKS-Wall St drops as focus shifts to Fed rate decision',
		},
		{
			date: 'Oct-28-22',
			company: 'The Wall Street Journal _ silver',
			title: 'Foxconn to Shift Some iPhone Production From Covid-Hit Plant to Other Sites',
		},
	],

	copper: [
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
	],

	uranium: [
		{
			date: 'Mar-27-23',
			company: 'Financial Times',
			title: 'Shale oil drillers left exposed after pulling back price hedges',
		},
		{
			date: 'Mar-28-23',
			company: 'Alibaba',
			title: 'Alibaba plans to split into six in radical overhaul',
		},
		{
			date: 'Oct-28-22',
			company: 'Motley Fool_silver',
			title: 'Apple Provides Further Proof of Dominance in the Business World',
		},
		{
			date: 'Oct-28-22',
			company: 'Financial Times_silver',
			title: 'Apple/China: intricate supply chain makes hanging up hard to do',
		},
		{
			date: 'Oct-28-22',
			company: 'Reuters_silver',
			title: 'US STOCKS-Wall St drops as focus shifts to Fed rate decision',
		},
		{
			date: 'Oct-28-22',
			company: 'The Wall Street Journal _ silver',
			title: 'Foxconn to Shift Some iPhone Production From Covid-Hit Plant to Other Sites',
		},
	],

	lithium: [
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
	],

	aluminum: [
		{
			date: 'Mar-27-23',
			company: 'Financial Times',
			title: 'Shale oil drillers left exposed after pulling back price hedges',
		},
		{
			date: 'Mar-28-23',
			company: 'Alibaba',
			title: 'Alibaba plans to split into six in radical overhaul',
		},
		{
			date: 'Oct-28-22',
			company: 'Motley Fool_silver',
			title: 'Apple Provides Further Proof of Dominance in the Business World',
		},
		{
			date: 'Oct-28-22',
			company: 'Financial Times_silver',
			title: 'Apple/China: intricate supply chain makes hanging up hard to do',
		},
		{
			date: 'Oct-28-22',
			company: 'Reuters_silver',
			title: 'US STOCKS-Wall St drops as focus shifts to Fed rate decision',
		},
		{
			date: 'Oct-28-22',
			company: 'The Wall Street Journal _ silver',
			title: 'Foxconn to Shift Some iPhone Production From Covid-Hit Plant to Other Sites',
		},
	],
};

const getData = (mode, metal) => {
	const mockData = mockAPI(mode);
	let newData = [];
	if (metal.value !== metals[0].value) {
		for (const obj of mockData) {
			const newObj = { date: obj.date, price: Math.random() * 300 + 300 };
			newData.push(newObj);
		}
	} else {
		newData = mockData;
	}

	return newData;
};

const PreciousMetalWidget = ({ widgetData }) => {
	const [mode, setMode] = useState('1D');
	const [metal, setMetal] = useState(metals[0]);
	const [graphData, setGraphData] = useState([]);

	useEffect(() => {
		const data = getData(mode, metal);
		setGraphData(data);
	}, [mode, metal]);
	useEffect(() => {
		const data = getData(mode, metal);
		setGraphData(data);
	}, [mode, metal]);
	return (
		<Box title={'Metals & Minerals \nSome text'} width={325} height={560} data={widgetData}>
			<NewsGraph
				selectOptions={metals}
				graphData={graphData}
				mode={mode}
				onChangeMode={setMode}
				selectedOption={metal}
				onChangeOption={setMetal}
				posts={metalPosts[metal.value]}
				textHighlightColor={'#70DDF5'}
			/>
		</Box>
	);
};

export default PreciousMetalWidget;

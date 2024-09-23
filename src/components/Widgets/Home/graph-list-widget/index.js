import { useEffect, useState } from 'react';
import { mockAPI } from '../../../../data/home/mock-data';
import { stockMarketHistory } from '../../../../utils/home/stockAPIs';
import { getUnitAndValue } from '../../../../utils/home/utils';
import Box from '../../../_UI/box';
import GraphList from '../../../_UI/graph-list';

const stocks = ['Apple', 'Stock name2', 'Stock name3', 'Stock name4', 'Stock name5', 'Stock name6', 'Stock name7'];

const getData = async (mode) => {
	const mockData = mockAPI(mode);
	const arr = [];

	for (const stock of stocks) {
		const obj = {
			name: stock,
			data: [],
			currency: 'USD',
		};

		// if (stock === 'Apple' && ['1D', '1M'].indexOf(mode) > -1) {
		if (stock === 'Apple') {
			const { unit, unitValue } = getUnitAndValue(mode);
			obj.data = await stockMarketHistory(unit, unitValue, 'AAPL').then(
				(resp) => Array.isArray(resp) && resp.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
			);
		} else {
			obj.data = mockData;
		}

		arr.push(obj);
	}

	return arr;
};

const GraphListWidget = ({ widgetData }) => {
	const [mode, setMode] = useState('1D');
	const [graphData, setGraphData] = useState([]);

	useEffect(() => {
		getData(mode).then((data) => {
			setGraphData([...data]);
		});
	}, [mode]);

	return (
		<Box title={'Widget 13 \nLine Chart'} width={325} height={560} data={widgetData}>
			<GraphList mode={mode} onChangeMode={setMode} graphDataList={graphData} height={492} />
		</Box>
	);
};

export default GraphListWidget;

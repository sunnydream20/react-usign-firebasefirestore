/* eslint-disable no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
import Box from '../../../_UI/box';
import CalendarHeatMap from '../../../_UI/calendar-heatmap';

const priceTable = [
	{
		Symbol: '123',
		Name: 'New Company Name',
		Price: '18.00 - 20.00',
	},
	{
		Symbol: '12345',
		Name: 'New Company Name',
		Price: '8.00',
	},
	{
		Symbol: 'AAA',
		Name: 'New Company Name',
		Price: '31.00 - 33.25',
	},
	{
		Symbol: 'ABAB',
		Name: 'New Company Name',
		Price: '5.11',
	},
	{
		Symbol: 'ABAB',
		Name: 'New Company Name',
		Price: '8.00',
	},
];

function getAllDaysInMonth(year, month) {
	const date = new Date(year, month, 1);

	const dates = [];

	while (date.getMonth() === month) {
		dates.push(new Date(date));
		date.setDate(date.getDate() + 1);
	}

	return dates;
}

const CalendarHeatmapWidget = ({ widgetData }) => {
	const [data, setData] = useState(null);

	useEffect(() => {
		const date = new Date();
		onCurrentYearMonth(date);
	}, []);

	const onCurrentYearMonth = useCallback((date) => {
		const dates = getAllDaysInMonth(date.getFullYear(), date.getMonth());

		const arr = [];

		for (const date of dates) {
			const time = date.getTime() / 1000;
			const day = date.getDate();

			if (day === 12 || day === 14 || day === 19 || day === 20 || day === 25) {
				const end = day % 2 === 0 ? 3 : 5;
				const obj = {
					date: time,
					value: priceTable.slice(0, end),
				};
				arr.push(obj);
			}
		}
		setData(arr);
	}, []);

	return (
		<Box title={'Widget 4_1 \nLine Chart'} width={325} height={560} data={widgetData}>
			<CalendarHeatMap onCurrentYearMonth={onCurrentYearMonth} data={data} />
		</Box>
	);
};

export default CalendarHeatmapWidget;

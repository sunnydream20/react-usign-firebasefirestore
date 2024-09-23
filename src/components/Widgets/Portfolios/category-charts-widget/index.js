/* eslint-disable no-unused-vars */

import { useEffect, useState } from 'react';
import { authenticateAnonymously, getCategoryList, streamCategoryHistoricalValues } from '../../../../services/db.service';
import Box from '../../../_UI/box';
import CategoryCharts from '../../../_UI/category-charts';

// Sector widget
const CategoryChartsWidget = ({ widgetData }) => {
	const [allCategoriesData, setCategoriesData] = useState([]);
	const [range, setRange] = useState('1D');

	const onChangeMode = (mode) => setRange(mode);

	const loadCategoryList = function (callbackFn) {
		authenticateAnonymously().then(async () => {
			// read from firestore
			return await getCategoryList().then((res) => {
				if (res.data() && res.data().data) {
					callbackFn(res.data().data);
				}
			});
		});
	};

	useEffect(() => {
		const listenCategoryHistoricalDataByRange = function (categories) {
			const _onSnapshot = function (snapshot) {
				const _docs = snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data().data }));
				const categoriesData = _docs.map((item) => {
					const category = categories.find((category) => category.symbol === item.id);
					item.data = [...item.data.sort((a, b) => +new Date(a.date) - +new Date(b.date))];
					return { ...item, companyName: category?.companyName || '', sortId: category?.sortId || 0 };
				});

				// set categories list > also sorted by sortId of the category
				setCategoriesData([
					...categoriesData.sort((a, b) => {
						return a.sortId - b.sortId;
					}),
				]);
			};

			const _onSnapshotError = function (error) {
				console.error(error, '>> snapshot error <<');
			};

			// listen to the categories historical data
			streamCategoryHistoricalValues(range, _onSnapshot, _onSnapshotError);
		};

		// load categories
		loadCategoryList((_categories) => {
			// listen category history changes
			listenCategoryHistoricalDataByRange(_categories);
		});
	}, [range]);

	return (
		<Box title={'Widget 15 \nLine Chart'} width={325} height={560} data={widgetData}>
			<CategoryCharts allGroupData={allCategoriesData} onChangeMode={onChangeMode} />
		</Box>
	);
};

export default CategoryChartsWidget;
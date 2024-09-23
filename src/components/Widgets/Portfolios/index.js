import { lazy } from 'react';
const CategoryChartsWidget = lazy(() => import('./category-charts-widget/index.js'));

const Widgets = ({ favourites, filtered }) => {

	const widgetsData = [
		{ id: 1, category: 'Category 1', isFavourite: false, position: 1 },
		{ id: 2, category: 'Category 1', isFavourite: false, position: 2 },
		{ id: 3, category: 'Category 1', isFavourite: false, position: 3 },
		{ id: 4, category: 'Category 2', isFavourite: false, position: 4 },
		{ id: 5, category: 'Category 2', isFavourite: false, position: 5 },
		{ id: 6, category: 'Category 2', isFavourite: false, position: 6 },

	];

	if (Array.isArray(favourites) && favourites.length > 0) {
		widgetsData.map((widget) => {
			widget.isFavourite = favourites.indexOf(widget.id) > -1 || false;
			return widget;
		});
	}

	const _widgets = [
		{
			...widgetsData.find((w) => w.id === 1),
			component: <CategoryChartsWidget widgetData={widgetsData.find((w) => w.id === 1)} />,
		},
		{
			...widgetsData.find((w) => w.id === 2),
			component: <CategoryChartsWidget widgetData={widgetsData.find((w) => w.id === 2)} />,
		},
		{
			...widgetsData.find((w) => w.id === 3),
			component: <CategoryChartsWidget widgetData={widgetsData.find((w) => w.id === 3)} />,
		}
	];

	if (filtered) return _widgets.filter(item => item.isFavourite);
	else return _widgets;
};

export default Widgets;

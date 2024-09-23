import { lazy } from 'react';
const CompanyDescription = lazy(() => import('./company-description/index.js'));
const CategoryChartsWidget = lazy(() => import('./category-charts-widget/index.js'));
const NewsWidget = lazy(() => import('./news-widget/index.js'));

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
		},
		{
			...widgetsData.find((w) => w.id === 4),
			component: <NewsWidget widgetData={widgetsData.find((w) => w.id === 4)} />,
		},
		{
			...widgetsData.find((w) => w.id === 5),
			component: <NewsWidget widgetData={widgetsData.find((w) => w.id === 5)} />,
		},
		{
			...widgetsData.find((w) => w.id === 6),
			component: <NewsWidget widgetData={widgetsData.find((w) => w.id === 6)} />,
		},
		{
			...widgetsData.find((w) => w.id === 6),
			component: <CompanyDescription widgetData={widgetsData.find((w) => w.id === 6)} />,
		},
	];

	if (filtered) return _widgets.filter(item => item.isFavourite);
	else return _widgets;
};

export default Widgets;

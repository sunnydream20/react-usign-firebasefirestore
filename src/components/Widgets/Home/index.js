import { lazy } from 'react';
const Slider = lazy(() => import('./slider/index.js'));
const StockHistory = lazy(() => import('./stock-history/index.js'));
const GraphListWidget = lazy(() => import('./graph-list-widget/index.js'));
const SocialMediaWidget = lazy(() => import('./social-media-widget/index.js'));
const CategoryChartsWidget = lazy(() => import('./category-charts-widget/index.js'));
const NewsWidget = lazy(() => import('./news-widget/index.js'));
const CalendarHeatmapWidget = lazy(() => import('./calendar-heatmap/index.js'));
const EasyText = lazy(() => import('./easy-text/index.js'));
const CommoditiesWidget = lazy(() => import('./commodities-news-graph-widget/index.js'));
const PreciousMetalWidget = lazy(() => import('./metals-news-graph-widget/index.js'));
const USTreasyBondsWidget = lazy(() => import('./rates-news-graph-widget/index.js'));
const SP500Treemap = lazy(() => import('./treemap/index.js'));
const CryptoLogRegressionWidget = lazy(() => import('./crypto-log-regression-widget/index.js'));
const FinancialNewsPopularWidget = lazy(() => import('./financial-news-popular-widget/index.js'));

const Widgets = ({ favorites, filtered }) => {
  const widgetsData = [
    { id: 1, category: 'Category 1', isFavourite: false, position: 1, title: 'Widget 1\nLine Chart' },
    { id: 2, category: 'Category 2', isFavourite: false, position: 2, title: 'Widget 2\nLine Chart' },
    { id: 3, category: 'Category 3', isFavourite: false, position: 3, title: 'Widget 13 \nLine Chart' },
    { id: 4, category: 'Category 4', isFavourite: false, position: 4, title: 'Social Media Interest\nSome text' },
    { id: 5, category: 'Category 5', isFavourite: false, position: 5, title: 'Widget 15 \nLine Chart' },
    { id: 6, category: 'Category 6', isFavourite: false, position: 6, title: 'Widget 14 \nLine Chart' },
    { id: 7, category: 'Category 7', isFavourite: false, position: 7, title: 'Widget 4_1 \nLine Chart' },
    { id: 8, category: 'Category 8', isFavourite: false, position: 8, title: 'Widget 9\nEasy text' },
    { id: 9, category: 'Category 9', isFavourite: false, position: 9, title: 'Commodities \nSome text' },
    { id: 10, category: 'Category 10', isFavourite: false, position: 10, title: 'Metals & Minerals \nSome text' },
    { id: 11, category: 'Category 11', isFavourite: false, position: 11, title: 'US Treasury Bonds \n1 Year Chart' },
    { id: 12, category: 'Category 12', isFavourite: false, position: 12, title: 'Widget 12\nTreemap' },
    { id: 13, category: 'Category 13', isFavourite: false, position: 13, title: 'Crypto\nLog Regression' },
    { id: 14, category: 'Category 14', isFavourite: false, position: 14, title: 'Financial News\nMost Popular' },
  ];

  if (Array.isArray(favorites) && favorites.length > 0) {
    widgetsData.map((widget) => {
      widget.isFavourite = favorites.indexOf(widget.id) > -1 || false;
      return widget;
    });
  }

  const _widgets = [
    {
      ...widgetsData.find((w) => w.id === 1),
      component: <Slider widgetData={widgetsData.find((w) => w.id === 1)} />,
    },
    {
      ...widgetsData.find((w) => w.id === 2),
      component: <StockHistory widgetData={widgetsData.find((w) => w.id === 2)} />,
    },
    {
      ...widgetsData.find((w) => w.id === 3),
      component: <GraphListWidget widgetData={widgetsData.find((w) => w.id === 3)} />,
    },
    {
      ...widgetsData.find((w) => w.id === 4),
      component: <SocialMediaWidget widgetData={widgetsData.find((w) => w.id === 4)} />,
    },
    {
      ...widgetsData.find((w) => w.id === 5),
      component: <CategoryChartsWidget widgetData={widgetsData.find((w) => w.id === 5)} />,
    },
    {
      ...widgetsData.find((w) => w.id === 6),
      component: <NewsWidget widgetData={widgetsData.find((w) => w.id === 6)} />,
    },
    {
      ...widgetsData.find((w) => w.id === 7),
      component: <CalendarHeatmapWidget widgetData={widgetsData.find((w) => w.id === 7)} />,
    },
    {
      ...widgetsData.find((w) => w.id === 8),
      component: <EasyText text="Some sample text" widgetData={widgetsData.find((w) => w.id === 8)} />,
    },
    {
      ...widgetsData.find((w) => w.id === 9),
      component: <CommoditiesWidget widgetData={widgetsData.find((w) => w.id === 9)} />,
    },
    {
      ...widgetsData.find((w) => w.id === 10),
      component: <PreciousMetalWidget widgetData={widgetsData.find((w) => w.id === 10)} />,
    },
    {
      ...widgetsData.find((w) => w.id === 11),
      component: <USTreasyBondsWidget widgetData={widgetsData.find((w) => w.id === 11)} />,
    },
    {
      ...widgetsData.find((w) => w.id === 12),
      component: <SP500Treemap widgetData={widgetsData.find((w) => w.id === 12)} />,
    },
    {
      ...widgetsData.find((w) => w.id === 13),
      component: <CryptoLogRegressionWidget widgetData={widgetsData.find((w) => w.id === 13)} />,
    },
    {
      ...widgetsData.find((w) => w.id === 14),
      component: <FinancialNewsPopularWidget widgetData={widgetsData.find((w) => w.id === 14)} />,
    },
  ];

  if (filtered) return { widgets: _widgets.filter((item) => item.isFavourite), listAllWidgets: _widgets };
  else return { widgets: _widgets, listAllWidgets: _widgets };
};

export default Widgets;

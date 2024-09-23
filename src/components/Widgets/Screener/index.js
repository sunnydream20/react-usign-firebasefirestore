import { lazy } from 'react';

const EasyText = lazy(() => import('./easy-text/index.js'));
const DateLineChart = lazy(() => import('./date-line-chart/index.js'));

const Widgets = ({ favourites, filtered }) => {
  const widgetsData = [
    { id: 1, category: 'Category 1', isFavourite: false, position: 1, title: 'Widget 9\nEasy text' },
    { id: 2, category: 'Category 2', isFavourite: false, position: 2, title: 'Widget 2\nLine Chart' },
    { id: 3, category: 'Category 3', isFavourite: false, position: 3, title: 'Widget 3\nLine Chart' },
    { id: 4, category: 'Category 4', isFavourite: false, position: 4, title: 'Widget 4\nLine Chart' },
    { id: 5, category: 'Category 5', isFavourite: false, position: 5, title: 'Widget 5\nLine Chart' },
    { id: 6, category: 'Category 6', isFavourite: false, position: 6, title: 'Widget 6\nLine Chart' },
    { id: 7, category: 'Category 7', isFavourite: false, position: 7, title: 'Widget 7\nLine Chart' },
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
      component: <EasyText text="Some sample text" widgetData={widgetsData.find((w) => w.id === 1)} />,
    },
    {
      ...widgetsData.find((w) => w.id === 2),
      component: <DateLineChart widgetData={widgetsData.find((w) => w.id === 2)} />,
    },
    {
      ...widgetsData.find((w) => w.id === 3),
      component: <DateLineChart widgetData={widgetsData.find((w) => w.id === 3)} />,
    },
    {
      ...widgetsData.find((w) => w.id === 4),
      component: <DateLineChart widgetData={widgetsData.find((w) => w.id === 4)} />,
    },
    {
      ...widgetsData.find((w) => w.id === 5),
      component: <DateLineChart widgetData={widgetsData.find((w) => w.id === 5)} />,
    },
    {
      ...widgetsData.find((w) => w.id === 6),
      component: <DateLineChart widgetData={widgetsData.find((w) => w.id === 6)} />,
    },
    {
      ...widgetsData.find((w) => w.id === 7),
      component: <DateLineChart widgetData={widgetsData.find((w) => w.id === 7)} />,
    },
  ];

  if (filtered) return _widgets.filter((item) => item.isFavourite);
  else return _widgets;
};

export default Widgets;

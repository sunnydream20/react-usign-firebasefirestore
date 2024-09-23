import 'react-perfect-scrollbar/dist/css/styles.css';
import '../../../../assets/css/scroll-bar.css';
import News from '../../../_UI/news';
import WidgetTitle from '../WidgetTitle';

const NewsWidget = ({ widgetData }) => {  
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 w-full">
      <WidgetTitle title="News" />
      <div className="flex flex-col space-y-2 w-full h-58 px-3.75 overflow-auto">
        <News posts={widgetData} />
      </div>
    </div>
  );
};

export default NewsWidget;

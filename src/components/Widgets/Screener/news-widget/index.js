import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../../../../assets/css/scroll-bar.css';
import Box from '../../../_UI/box';
import News from '../../../_UI/news';

const posts = [
  {
    date: 'Oct-28-22',
    company: 'Motley Fool',
    title: 'Apple Provides Further Proof of Dominance in the Business World'
  },
  {
    date: 'Oct-28-22',
    company: 'Financial Times',
    title: 'Apple/China: intricate supply chain makes hanging up hard to do'
  },
  {
    date: 'Oct-28-22',
    company: 'Reuters',
    title: 'US STOCKS-Wall St drops as focus shifts to Fed rate decision'
  },
  {
    date: 'Oct-28-22',
    company: 'The Wall Street Journal',
    title: 'Foxconn to Shift Some iPhone Production From Covid-Hit Plant to Other Sites'
  },
  {
    date: 'Oct-28-22',
    company: 'Motley Fool_silver',
    title: 'Apple Provides Further Proof of Dominance in the Business World'
  },
  {
    date: 'Oct-28-22',
    company: 'Financial Times_silver',
    title: 'Apple/China: intricate supply chain makes hanging up hard to do'
  },
  {
    date: 'Oct-28-22',
    company: 'Reuters_silver',
    title: 'US STOCKS-Wall St drops as focus shifts to Fed rate decision'
  },
  {
    date: 'Oct-28-22',
    company: 'The Wall Street Journal _ silver',
    title: 'Foxconn to Shift Some iPhone Production From Covid-Hit Plant to Other Sites'
  }
];

const NewsWidget = ({ widgetData }) => {

  return (
    <Box title={'Widget 14 \nLine Chart'} width={325} height={560} fullHeight data={widgetData}>
      <div className="mr-[-12px] h-full font-roboto">
        <PerfectScrollbar options={{ suppressScrollX: true, wheelPropagation: false, swipeEasing: true }}>
          <div className="flex-col space-y-[5px] pt-[8px] pb-[8px] pr-[8px]">
            <News posts={posts} />
          </div>
        </PerfectScrollbar>
      </div>
    </Box>
  );
}

export default NewsWidget;
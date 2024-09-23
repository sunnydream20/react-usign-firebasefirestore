import 'react-perfect-scrollbar/dist/css/styles.css';
import '../../../../assets/css/scroll-bar.css';
import WidgetTitle from '../WidgetTitle';
import CompanyDesc from 'components/_UI/company-description';

// const posts = [
//   {
//     title: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. The company offers iPhone, a line of smartphones; Mac, a line of personal computers; iPad, a line of multi-purpose tablets; and wearables, home, and accessories comprising AirPods, Apple TV, Apple Watch, Beats products, and HomePod. It also provides AppleCare support and cloud services; and operates various platforms, including the App Store that allow customers to discover and download applications and digital content, such as books, music, video, games and podcasts.'
//   },
// ];

const CompanyDescription = ({ widgetData, description }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 w-full">
      <WidgetTitle title="Company Description" />
      <CompanyDesc description={description} />
    </div>
  );
};

export default CompanyDescription;

import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../../../assets/css/scroll-bar.css';
import News from '../news';

const FinancialNewsPopular = ({ posts }) => {
  return (
    <div className="mt-[9px] mr-[-12px] h-[510px] w-[309px]">
      <PerfectScrollbar options={{ suppressScrollX: true, wheelPropagation: false, swipeEasing: true }}>
        <div className="flex-col space-y-[5px]">
          <News posts={posts} companyColor={'#2898FF'} />
        </div>
      </PerfectScrollbar>
    </div>
  );
};

export default FinancialNewsPopular;

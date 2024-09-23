import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../../assets/css/scroll-bar.css';

const ScrollContainer = ({ children }) => {
  return (
    <PerfectScrollbar options={{ suppressScrollX: true, wheelPropagation: false, swipeEasing: true }} style={{ marginRight: -9 }}>
      <div className="pr-[12px]">{children}</div>
    </PerfectScrollbar>
  );
};

export default ScrollContainer;

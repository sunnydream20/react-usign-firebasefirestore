import Footer from './Footer';
import Header from './Header';
import ScrollToTop from './ScrollToTop';

const Layout = ({ children, backButton, backNavigation }) => {
  return (
    <>
      <Header props={{ backButton: Boolean(backButton), backNavigation }} />
      <main className="w-full bg-neutral-800 text-gray-400 pt-[60px] pb-3 min-h-[80vh] overflow-hidden mx-auto relative">
        {children}
        <ScrollToTop />
      </main>
      <Footer />
    </>
  );
};

export default Layout;

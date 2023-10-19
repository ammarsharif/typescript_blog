import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
const TemplateLayout = () => {
  return (
    <>
      <Header />
      <div>
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default TemplateLayout;

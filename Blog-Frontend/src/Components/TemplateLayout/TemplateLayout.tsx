import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
const TemplateLayout = () => {
  return (
    <>
      <Header />
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default TemplateLayout;

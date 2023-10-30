import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { AuthProvider } from '../AuthContext/AuthContext';
const TemplateLayout = () => {
  return (
    <>
      <AuthProvider>
        <Header />
        <div>
          <Outlet />
          <Footer />
        </div>
      </AuthProvider>
    </>
  );
};

export default TemplateLayout;

import { Outlet } from 'react-router-dom';
import TopHeader from '../components/global/TopHeader';
import MainHeader from '../components/global/MainHeader';
import Navbar from '../components/global/Navbar';
import Footer from '../components/global/Footer';

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <TopHeader />
      <MainHeader />
      <Navbar />
      
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default RootLayout;

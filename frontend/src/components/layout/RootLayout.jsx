import { Outlet, ScrollRestoration } from 'react-router-dom';
import TopBar from './TopBar';
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingSocials from '../global/FloatingSocials';

/**
 * RootLayout.jsx
 * Komponen pembungkus utama yang menjahit keseluruhan layout publik.
 *
 * Menggunakan flex-col dan min-h-screen untuk memastikan Footer
 * selalu berada di paling bawah layar, bahkan saat konten halaman sedikit.
 */
const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ScrollRestoration: Mengembalikan scroll ke posisi atas (0,0) tiap ganti halaman */}
      <ScrollRestoration />
      
      {/* Foundation Layout */}
      <TopBar />
      <Header />
      <Navbar />
      <FloatingSocials />

      
      {/* Konten Halaman Dinamis */}
      <main id="main-content" className="flex-grow relative">
        <Outlet />
      </main>
      
      {/* Footer Utama */}
      <Footer />
    </div>
  );
}

export default RootLayout;

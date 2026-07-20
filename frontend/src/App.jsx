import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import UIKit from './pages/UIKit';
import Profil from './pages/Profil';
import Layanan from './pages/Layanan';
import LayananDetail from './pages/LayananDetail';
import Berita from './pages/Berita';
import BeritaDetail from './pages/BeritaDetail';
import Galeri from './pages/Galeri';
import Pengaduan from './pages/Pengaduan';
import Kontak from './pages/Kontak';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          
          {/* Profil Routes */}
          <Route path="profil" element={<Profil />} />
          <Route path="profil/:slug" element={<Profil />} />

          {/* Layanan Routes */}
          <Route path="layanan" element={<Layanan />} />
          <Route path="layanan/:slug" element={<LayananDetail />} />

          {/* Galeri & Berita Routes */}
          <Route path="berita" element={<Berita />} />
          <Route path="berita/:slug" element={<BeritaDetail />} />
          <Route path="galeri" element={<Galeri />} />

          {/* Pengaduan & Kontak Routes */}
          <Route path="pengaduan" element={<Pengaduan />} />
          <Route path="kontak" element={<Kontak />} />

          <Route path="ui-kit" element={<UIKit />} />
          
          {/* Fallback 404 sederhana dialihkan ke Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

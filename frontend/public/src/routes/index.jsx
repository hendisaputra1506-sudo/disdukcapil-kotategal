import { createBrowserRouter, Navigate } from 'react-router-dom'
import RootLayout from '../components/layout/RootLayout'
import Home from '../pages/Home'
import Berita from '../pages/Berita'
import BeritaDetail from '../pages/BeritaDetail'
import LayananPublikPage from '../pages/LayananPublikPage'
import PengaduanPage from '../pages/PengaduanPage'
import FaqPage from '../pages/FaqPage'
import AlamatKontakPage from '../pages/AlamatKontakPage'
import NotFoundPage from '../pages/NotFoundPage'

// Import Profil Pages
import {
  VisiMisi,
  StrukturOrganisasi,
  MotoPelayanan,
  SaranaPrasarana,
  MaklumatPelayanan
} from '../components/profil/content'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'profil',
        children: [
          {
            index: true,
            element: <Navigate to="/profil/visi-misi" replace />
          },
          {
            path: 'visi-misi',
            element: <VisiMisi />
          },
          {
            path: 'struktur-organisasi',
            element: <StrukturOrganisasi />
          },
          {
            path: 'moto-pelayanan',
            element: <MotoPelayanan />
          },
          {
            path: 'sarana-prasarana',
            element: <SaranaPrasarana />
          },
          {
            path: 'maklumat-pelayanan',
            element: <MaklumatPelayanan />
          }
        ]
      },
      {
        path: 'informasi',
        children: [
          { index: true, element: <Berita /> },
          { path: ':id', element: <BeritaDetail /> }
        ]
      },
      {
        path: 'layanan-publik',
        element: <LayananPublikPage />,
      },
      {
        path: 'pengaduan',
        element: <PengaduanPage />,
      },
      {
        path: 'faq',
        element: <FaqPage />,
      },
      {
        path: 'alamat-kontak',
        element: <AlamatKontakPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])

export default router

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { AdminLayout } from '../components/layout/AdminLayout';
import { Login } from '../pages/auth/Login';
import { Dashboard } from '../pages/dashboard/Dashboard';
import { NewsList } from '../pages/news/NewsList';
import { NewsForm } from '../pages/news/NewsForm';
import { NewsDetail } from '../pages/news/NewsDetail';
import { BannerList } from '../pages/banner/BannerList';
import { BannerForm } from '../pages/banner/BannerForm';
import { GalleryList } from '../pages/gallery/GalleryList';
import { GalleryForm } from '../pages/gallery/GalleryForm';
import { GalleryDetail } from '../pages/gallery/GalleryDetail';
import { DocumentList } from '../pages/documents/DocumentList';
import { DocumentForm } from '../pages/documents/DocumentForm';
import { DocumentDetail } from '../pages/documents/DocumentDetail';
import { Settings } from '../pages/settings/Settings';
import { ChangePassword } from '../pages/account/ChangePassword';

export function AppRoutes() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes Wrapper */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            <Route path="/news" element={<NewsList />} />
            <Route path="/news/create" element={<NewsForm />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/news/:id/edit" element={<NewsForm />} />
            
            <Route path="/banner" element={<BannerList />} />
            <Route path="/banners" element={<Navigate to="/banner" replace />} />
            <Route path="/banner/create" element={<BannerForm />} />
            <Route path="/banner/:id/edit" element={<BannerForm />} />
            
            <Route path="/gallery" element={<GalleryList />} />
            <Route path="/gallery/create" element={<GalleryForm />} />
            <Route path="/gallery/:id" element={<GalleryDetail />} />
            <Route path="/gallery/:id/edit" element={<GalleryForm />} />
            
            <Route path="/documents" element={<DocumentList />} />
            <Route path="/documents/create" element={<DocumentForm />} />
            <Route path="/documents/:id" element={<DocumentDetail />} />
            <Route path="/documents/:id/edit" element={<DocumentForm />} />
            
            <Route path="/settings" element={<Settings />} />
            <Route path="/account/change-password" element={<ChangePassword />} />
          </Route>
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AuthProvider>
  );
}

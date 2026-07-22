import React, { useState } from 'react';
import { Menu, User, ChevronDown, Key, LogOut } from 'lucide-react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/cn';

export function Topbar({ onToggleSidebar }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Generate breadcrumb from path
  const pathnames = location.pathname.split('/').filter((x) => x);
  
  const handleLogout = async (e) => {
    e.preventDefault();
    setIsDropdownOpen(false);
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm sm:px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-900 lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Breadcrumb */}
        <nav className="hidden sm:flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-slate-500">
            <li>
              <span className="capitalize">
                {pathnames.length === 0 ? 'Dashboard' : pathnames[0]}
              </span>
            </li>
            {pathnames.length > 1 && (
              <>
                <li>
                  <span className="text-slate-400">/</span>
                </li>
                <li>
                  <span className="font-medium text-slate-900 capitalize">
                    {pathnames[1].replace('-', ' ')}
                  </span>
                </li>
              </>
            )}
          </ol>
        </nav>
      </div>

      {/* User Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 rounded-md py-2 pl-2 pr-1 text-sm font-medium text-slate-700 hover:bg-slate-100 focus:outline-none"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-900 text-white">
            <User className="h-5 w-5" />
          </div>
          <span className="hidden sm:block">{user?.name || 'Admin'}</span>
          <ChevronDown className="h-4 w-4 text-slate-500" />
        </button>

        {isDropdownOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsDropdownOpen(false)}
            />
            <div className="absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="border-b border-slate-100 px-4 py-2">
                <p className="text-sm font-medium text-slate-900">{user?.name || 'Administrator'}</p>
                <p className="text-xs text-slate-500 truncate">{user?.email || 'admin@disdukcapil.go.id'}</p>
              </div>
              <Link
                to="/account/change-password"
                onClick={() => setIsDropdownOpen(false)}
                className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
              >
                <Key className="mr-3 h-4 w-4 text-slate-400" />
                Ubah Password
              </Link>
              <button
                onClick={handleLogout}
                className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut className="mr-3 h-4 w-4 text-red-500" />
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

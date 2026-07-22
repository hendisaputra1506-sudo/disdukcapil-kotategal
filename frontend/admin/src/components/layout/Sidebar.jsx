import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Image as ImageIcon, 
  Images, 
  FolderOpen, 
  Settings, 
  Key, 
  LogOut 
} from 'lucide-react';
import { cn } from '../../utils/cn';

const menuItems = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard
  },
  {
    title: 'KONTEN',
    isHeader: true
  },
  {
    title: 'Berita',
    path: '/news',
    icon: FileText
  },
  {
    title: 'Banner',
    path: '/banner',
    icon: ImageIcon
  },
  {
    title: 'Galeri',
    path: '/gallery',
    icon: Images
  },
  {
    title: 'Dokumen',
    path: '/documents',
    icon: FolderOpen
  },
  {
    title: 'Pengaturan Website',
    path: '/settings',
    icon: Settings
  },
  {
    title: 'AKUN',
    isHeader: true
  },
  {
    title: 'Ubah Password',
    path: '/account/change-password',
    icon: Key
  }
];

export function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    // MOCK FLOW: Redirect to login
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-slate-900 text-slate-300 transition-transform lg:static lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo Area */}
        <div className="flex h-16 shrink-0 items-center gap-3 border-b border-slate-700 px-6">
          <img src="/logo.png" alt="Logo Disdukcapil" className="h-8 w-8 object-contain" />
          <span className="text-lg font-bold tracking-tight">Admin Panel</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {menuItems.map((item, index) => {
              if (item.isHeader) {
                return (
                  <li key={`header-${index}`} className="px-3 pb-2 pt-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {item.title}
                  </li>
                );
              }

              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={() => {
                      // Close sidebar on mobile when navigating
                      if (window.innerWidth < 1024) onClose();
                    }}
                    className={({ isActive }) =>
                      cn(
                        "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-800 hover:text-white",
                        isActive ? "bg-blue-900 text-white" : "text-slate-300"
                      )
                    }
                  >
                    <Icon className="mr-3 h-5 w-5 shrink-0" />
                    {item.title}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="border-t border-slate-800 p-4">
          <button
            onClick={handleLogout}
            className="group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
          >
            <LogOut className="mr-3 h-5 w-5 shrink-0 text-slate-400 group-hover:text-white" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

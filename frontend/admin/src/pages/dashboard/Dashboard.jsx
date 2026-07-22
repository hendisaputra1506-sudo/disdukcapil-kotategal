import React from 'react';
import { FileText, Image as ImageIcon, Images, FolderOpen, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';

const stats = [
  {
    title: 'BERITA',
    total: 24,
    detail1: '12 Publish',
    detail2: '12 Draft',
    icon: FileText,
  },
  {
    title: 'BANNER',
    total: 5,
    detail1: '4 Aktif',
    detail2: '1 Nonaktif',
    icon: ImageIcon,
  },
  {
    title: 'GALERI',
    total: 120,
    detail1: 'Foto',
    detail2: '',
    icon: Images,
  },
  {
    title: 'DOKUMEN',
    total: 18,
    detail1: 'PDF',
    detail2: '',
    icon: FolderOpen,
  },
];

const recentActivities = [
  {
    id: 1,
    action: 'Berita "Pelayanan KTP Online" diperbarui',
    time: '10:30',
  },
  {
    id: 2,
    action: 'Banner "HUT RI" ditambahkan',
    time: '09:20',
  },
  {
    id: 3,
    action: 'Foto galeri dihapus',
    time: '08:15',
  },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500">Ringkasan pengelolaan konten website</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      {stat.title}
                    </p>
                    <div className="text-3xl font-bold text-slate-900">{stat.total}</div>
                    <div className="flex gap-2 text-sm text-slate-600">
                      <span>{stat.detail1}</span>
                      {stat.detail2 && (
                        <>
                          <span className="text-slate-300">•</span>
                          <span>{stat.detail2}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="rounded-full bg-blue-50 p-3">
                    <Icon className="h-6 w-6 text-blue-900" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Aktivitas Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="flex h-2 w-2 rounded-full bg-blue-900" />
                    <p className="text-sm text-slate-700">{activity.action}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Clock className="h-3 w-3" />
                    <span>{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

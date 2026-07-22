import { useState, useEffect } from 'react';
import { bannerService } from '../../services/bannerService';

const HeroBanner = () => {
  const [mainHighlight, setMainHighlight] = useState(null);
  const [smallHighlights, setSmallHighlights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fallback Data Statis jika API gagal atau kosong
  const fallbackMain = {
    title: "Website Resmi Disdukcapil Kota Tegal",
    date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
    imageUrl: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=1200"
  };

  const fallbackSmall = [
    {
      id: 1,
      title: "Pelayanan Publik Cepat dan Mudah",
      imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: 2,
      title: "Inovasi Pelayanan Digital",
      imageUrl: "https://images.unsplash.com/photo-1531545514251-b159ce87340e?auto=format&fit=crop&q=80&w=600"
    }
  ];

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setIsLoading(true);
        const response = await bannerService.getBanners();
        
        if (response?.data && response.data.length > 0) {
          // Banner pertama sebagai highlight utama
          const firstBanner = response.data[0];
          setMainHighlight({
            title: firstBanner.title,
            date: new Date(firstBanner.created_at || firstBanner.updated_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
            imageUrl: firstBanner.image_path
          });

          // Maksimal 4 banner berikutnya sebagai small highlights
          const remainingBanners = response.data.slice(1, 5).map(banner => ({
            id: banner.id,
            title: banner.title,
            imageUrl: banner.image_path
          }));

          setSmallHighlights(remainingBanners);
        } else {
          // Gunakan fallback jika tidak ada banner aktif
          setMainHighlight(fallbackMain);
          setSmallHighlights(fallbackSmall);
        }
      } catch (error) {
        console.error('Failed to fetch banners:', error);
        setMainHighlight(fallbackMain);
        setSmallHighlights(fallbackSmall);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanners();
  }, []);

  if (isLoading) {
    return (
      <section aria-label="Sorotan Utama">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8 skeleton w-full aspect-[16/9] rounded-md"></div>
          <div className="lg:col-span-4 grid grid-cols-2 gap-4">
            <div className="skeleton w-full aspect-[16/9] rounded-md"></div>
            <div className="skeleton w-full aspect-[16/9] rounded-md"></div>
            <div className="skeleton w-full aspect-[16/9] rounded-md"></div>
            <div className="skeleton w-full aspect-[16/9] rounded-md"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section aria-label="Sorotan Utama">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Kolom Kiri: Gambar Utama (Memakan 8 Kolom di Desktop) */}
        {mainHighlight && (
          <div className="lg:col-span-8 relative group overflow-hidden rounded-md card-hoverable cursor-pointer">
            <img 
              src={mainHighlight.imageUrl} 
              alt={mainHighlight.title}
              className="w-full aspect-[16/9] object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Latar Belakang Gradasi (Aksesibilitas Kontras Teks) */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-brand-primary/50 to-transparent flex flex-col justify-end p-6 md:p-8">
              <div className="animate-fade-in-up">
                <div className="mb-3">
                   <span className="badge badge-info">HEADLINE</span>
                </div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-snug mb-2">
                  {mainHighlight.title}
                </h2>
                <p className="text-sm text-gray-300 font-medium">Dukcapil - {mainHighlight.date}</p>
              </div>
            </div>
          </div>
        )}

        {/* Kolom Kanan: 4 Thumbnail Kecil (Memakan 4 Kolom di Desktop) */}
        {smallHighlights.length > 0 && (
          <div className="lg:col-span-4 grid grid-cols-2 gap-4">
            {smallHighlights.map((item) => (
              <div key={item.id} className="relative group overflow-hidden rounded-md cursor-pointer border border-gray-700/50">
                <img 
                  src={item.imageUrl} 
                  alt={item.title}
                  className="w-full h-full object-cover aspect-[16/9] transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-brand-primary/40 to-transparent flex items-end p-3 md:p-4">
                  <h3 className="text-xs md:text-sm font-bold text-white leading-tight line-clamp-3 animate-fade-in-up">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
        
      </div>
    </section>
  );
};

export default HeroBanner;

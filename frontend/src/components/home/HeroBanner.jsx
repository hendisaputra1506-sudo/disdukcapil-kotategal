const HeroBanner = () => {
  // Data statis murni untuk keperluan estetika Hero (Bukan dari API)
  const mainHighlight = {
    title: "Penyerahan Akta Kelahiran di RSI Harapan Anda",
    date: "20 Des 2026",
    imageUrl: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=1200"
  };

  const smallHighlights = [
    {
      id: 1,
      title: "Rapat Koordinasi Pelaporan Pindah Datang",
      imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: 2,
      title: "Evaluasi Inovasi Pemerintahan",
      imageUrl: "https://images.unsplash.com/photo-1531545514251-b159ce87340e?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: 3,
      title: "Monitoring dan Evaluasi e-Simpel",
      imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: 4,
      title: "Sosialisasi Administrasi Kependudukan",
      imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600"
    }
  ];

  return (
    <section aria-label="Sorotan Utama">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Kolom Kiri: Gambar Utama (Memakan 8 Kolom di Desktop) */}
        <div className="lg:col-span-8 relative group overflow-hidden rounded-md card-hoverable cursor-pointer">
          <img 
            src={mainHighlight.imageUrl} 
            alt={mainHighlight.title}
            className="w-full aspect-[16/9] object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Latar Belakang Gradasi (Aksesibilitas Kontras Teks) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-8">
            <div className="mb-3">
               <span className="badge badge-info">HEADLINE</span>
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-snug mb-2">
              {mainHighlight.title}
            </h2>
            <p className="text-sm text-gray-300 font-medium">Dukcapil - {mainHighlight.date}</p>
          </div>
        </div>

        {/* Kolom Kanan: 4 Thumbnail Kecil (Memakan 4 Kolom di Desktop) */}
        <div className="lg:col-span-4 grid grid-cols-2 gap-4">
          {smallHighlights.map((item) => (
            <div key={item.id} className="relative group overflow-hidden rounded-md cursor-pointer border border-gray-700/50">
              <img 
                src={item.imageUrl} 
                alt={item.title}
                className="w-full h-full object-cover aspect-[16/9] transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex items-end p-3 md:p-4">
                <h3 className="text-xs md:text-sm font-bold text-white leading-tight line-clamp-3">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default HeroBanner;

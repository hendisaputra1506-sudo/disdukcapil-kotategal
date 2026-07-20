export const contactData = {
  address: {
    street: "Jl. Lele No. 14",
    area: "Tegalsari, Kec. Tegal Bar.",
    city: "Kota Tegal",
    province: "Jawa Tengah",
    postalCode: "52111"
  },
  contactLinks: {
    whatsapp: {
      platform: "WhatsApp",
      label: "CS Disdukcapil (0895-8002-21212)",
      value: "0895800221212",
      url: "https://wa.me/62895800221212",
      icon: "whatsapp.svg",
      description: "Respon pada jam pelayanan"
    },
    instagram: {
      platform: "Instagram",
      label: "@disdukkotategal",
      value: "@disdukkotategal",
      url: "https://instagram.com/disdukkotategal",
      icon: "instagram.svg",
      description: "Informasi terbaru Disdukcapil"
    },
    email: {
      platform: "Email",
      label: "disdukcapil@tegalkota.go.id",
      value: "disdukcapil@tegalkota.go.id",
      url: "mailto:disdukcapil@tegalkota.go.id",
      icon: "gmail.svg",
      description: "Untuk pertanyaan resmi"
    },
    phone: {
      platform: "Telepon",
      label: "(0283) 343262",
      value: "(0283) 343262",
      url: "tel:0283343262",
      icon: "phone.svg",
      description: "Pada jam kerja"
    },
    maps: {
      platform: "Google Maps",
      label: "Gedung Pelayanan Terpadu",
      value: "Jl. Lele No. 14, Kota Tegal",
      url: "https://www.google.com/maps/search/Dinas+Kependudukan+dan+Pencatatan+Sipil+Kota+Tegal/@-6.8577473,109.1284835,17z",
      icon: "MapPin", // Menggunakan lucide-react khusus untuk Maps
      description: "Lokasi Kantor Disdukcapil"
    },
    spanLapor: {
      platform: "SP4N LAPOR!",
      label: "Layanan Aspirasi dan Pengaduan",
      value: "www.lapor.go.id",
      url: "https://www.lapor.go.id/",
      icon: null,
      description: "Sampaikan aspirasi dan pengaduan Anda"
    }
  },
  faqs: [
    {
      question: "Apakah pelayanan buka hari Sabtu?",
      answer: "Tidak. Jam operasional tatap muka kami adalah Senin hingga Jumat. Namun, Anda tetap bisa mengajukan pelayanan secara daring (online) 24 jam melalui aplikasi Jakwir Cetem."
    },
    {
      question: "Apakah bisa konsultasi melalui WhatsApp?",
      answer: "Tentu. Anda dapat berkonsultasi seputar persyaratan atau mengecek status dokumen melalui saluran WhatsApp Layanan kami di nomor 0895-8002-21212."
    },
    {
      question: "Apakah harus mengambil nomor antrean online?",
      answer: "Sangat disarankan untuk mengambil antrean online guna menghindari penumpukan di ruang tunggu, namun kami juga tetap melayani antrean offline (langsung di tempat) dengan kuota terbatas."
    },
    {
      question: "Bagaimana jika dokumen saya belum lengkap?",
      answer: "Petugas loket kami akan memberikan catatan kekurangan dokumen. Anda dapat melengkapinya dan kembali tanpa perlu mengambil antrean baru pada hari yang sama."
    }
  ],
  mapsIframe: "https://maps.google.com/maps?q=Dinas+Kependudukan+dan+Pencatatan+Sipil+Kota+Tegal&hl=id&z=17&output=embed",
  qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://www.google.com/maps/search/Dinas+Kependudukan+dan+Pencatatan+Sipil+Kota+Tegal",
  officePhoto: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
};



const dummyHtmlContent = `
  <h3>1. Dasar Hukum</h3>
  <ul>
    <li>Undang-Undang Nomor 24 Tahun 2013 tentang Perubahan Atas Undang-Undang Nomor 23 Tahun 2006 tentang Administrasi Kependudukan.</li>
    <li>Peraturan Presiden Nomor 96 Tahun 2018 tentang Persyaratan dan Tata Cara Pendaftaran Penduduk dan Pencatatan Sipil.</li>
  </ul>
  
  <h3>2. Persyaratan Dokumen</h3>
  <ul>
    <li>Telah berusia 17 tahun, sudah kawin, atau pernah kawin.</li>
    <li>Membawa fotokopi Kartu Keluarga (KK) terbaru.</li>
    <li>Bagi penduduk WNI yang baru datang dari luar negeri, wajib membawa Surat Keterangan Datang dari Luar Negeri yang diterbitkan oleh Instansi Pelaksana.</li>
  </ul>

  <h3>3. Alur Pelayanan</h3>
  <ol>
    <li>Pemohon datang ke Kantor Disdukcapil atau Kecamatan setempat dengan membawa persyaratan lengkap.</li>
    <li>Pemohon mengambil nomor antrean.</li>
    <li>Petugas memanggil pemohon, melakukan verifikasi berkas dan memproses data.</li>
    <li>Pengambilan pas foto, sidik jari, dan iris mata.</li>
    <li>Pencetakan dokumen KTP Elektronik.</li>
  </ol>

  <h3>4. Estimasi Waktu Penyelesaian</h3>
  <p>Penyelesaian dokumen memakan waktu maksimal <strong>1 (satu) hari kerja</strong> setelah berkas dinyatakan lengkap dan jaringan SAK terhubung secara normal.</p>
  
  <h3>5. Biaya Layanan</h3>
  <p><strong>Rp 0,- (GRATIS)</strong> - Tidak dipungut biaya apapun.</p>
`;

export const servicesData = [
  {
    id: "ktp-el",
    title: "KTP Elektronik",
    slug: "ktp-el",
    iconName: "User",
    description: "Perekaman baru, pencetakan ulang KTP-el rusak atau hilang, dan perubahan data.",
    requirements: [
      "Fotokopi Kartu Keluarga (KK)",
      "Surat Pengantar RT/RW (Jika perubahan data)",
      "KTP lama (Jika rusak)"
    ],
    content: dummyHtmlContent
  },
  {
    id: "kk",
    title: "Kartu Keluarga",
    slug: "kartu-keluarga",
    iconName: "Users",
    description: "Pembuatan KK baru, penambahan/pengurangan anggota keluarga, dan pembaruan format barcode.",
    requirements: [
      "Buku Nikah / Akta Perkawinan",
      "Surat Keterangan Pindah (Jika dari luar kota)"
    ],
    content: dummyHtmlContent
  },
  {
    id: "akta-lahir",
    title: "Akta Kelahiran",
    slug: "akta-kelahiran",
    iconName: "Baby",
    description: "Penerbitan akta kelahiran anak, pengakuan anak, dan pengesahan anak.",
    requirements: [
      "Surat Keterangan Lahir dari Dokter/Bidan",
      "KTP dan KK Orang Tua",
      "Buku Nikah Orang Tua"
    ],
    content: dummyHtmlContent
  },
  {
    id: "akta-mati",
    title: "Akta Kematian",
    slug: "akta-kematian",
    iconName: "Activity",
    description: "Pencatatan peristiwa kematian penduduk untuk pembaruan data dan penetapan status.",
    requirements: [
      "Surat Keterangan Kematian dari RS/Kelurahan",
      "KTP dan KK Almarhum",
      "KTP Pelapor"
    ],
    content: dummyHtmlContent
  },
  {
    id: "kia",
    title: "Kartu Identitas Anak",
    slug: "kia",
    iconName: "FileText",
    description: "Penerbitan kartu identitas untuk anak usia 0 hingga kurang dari 17 tahun.",
    requirements: [
      "Fotokopi Akta Kelahiran Anak",
      "Fotokopi KK dan KTP Orang Tua",
      "Pas Foto Anak (Usia di atas 5 tahun)"
    ],
    content: dummyHtmlContent
  },
  {
    id: "surat-pindah",
    title: "Surat Keterangan Pindah",
    slug: "surat-pindah",
    iconName: "LayoutTemplate",
    description: "Penerbitan SKPWNI bagi penduduk yang pindah domisili antar kota, kabupaten, atau provinsi.",
    requirements: [
      "KTP asli",
      "KK asli",
      "Surat Keterangan dari Kelurahan asal"
    ],
    content: dummyHtmlContent
  }
];

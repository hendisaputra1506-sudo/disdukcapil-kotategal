import infoImage from '@assets/jam_pelayanan.png';
import pungliImage from '@assets/bebas_pungli.png';

export const sidebarData = {
  sapaHumanis: {
    title: "Sapahumanis",
    description: "Sistem Aplikasi Pelayanan Administrasi Kependudukan Humanis",
    link: "https://sapahumanis.tegalkota.go.id"
  },
  informasiPenting: [
    {
      id: 1,
      title: "Jadwal Pelayanan Keliling November",
      image: infoImage,
      link: "#"
    },
    {
      id: 2,
      title: "Waspada Calo Administrasi Kependudukan",
      image: pungliImage,
      link: "#"
    }
  ],
  beritaPilihan: [
    {
      id: 1,
      title: "Disdukcapil Tegal Raih Penghargaan Pelayanan Prima",
      date: "15 Okt 2023",
      slug: "disdukcapil-tegal-raih-penghargaan"
    },
    {
      id: 2,
      title: "Peringatan Hari Kependudukan Nasional 2023",
      date: "03 Sep 2023",
      slug: "hari-kependudukan-nasional-2023"
    }
  ],
  links: [
    { name: "Website Pemkot Tegal", url: "https://tegalkota.go.id" },
    { name: "Portal Lapor SP4N", url: "https://lapor.go.id" },
    { name: "Kemendagri", url: "https://kemendagri.go.id" }
  ],
  socialMedia: [
    {
      id: 1,
      platform: "X / Twitter",
      username: "@disdukcapiltegal",
      url: "https://x.com/disdukcapiltegal",
      icon: "X"
    },
    {
      id: 2,
      platform: "Instagram",
      username: "@disdukkotategal",
      url: "https://instagram.com/disdukkotategal",
      icon: "Instagram"
    },
    {
      id: 3,
      platform: "Facebook",
      username: "Disdukcapil Kota Tegal",
      url: "https://facebook.com/disdukcapiltegal",
      icon: "Facebook"
    },
    {
      id: 4,
      platform: "WhatsApp",
      username: "0895800221212",
      url: "https://wa.me/62895800221212",
      icon: "WhatsApp"
    }
  ]
};

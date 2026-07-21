import React from 'react';
import whatsappLogo from '@assets/icons/whatsapp.svg';
import instagramLogo from '@assets/icons/instagram.svg';
import facebookLogo from '@assets/icons/facebook.svg';
import tiktokLogo from '@assets/icons/tiktok.svg';
import xLogo from '@assets/icons/x.svg';
import { contactData } from '../../data/contact';

const FloatingSocials = () => {
  const socials = [
    { name: 'WhatsApp', url: contactData.contactLinks.whatsapp.url, icon: whatsappLogo, color: 'bg-green-500 hover:bg-green-600' },
    { name: 'Instagram', url: contactData.contactLinks.instagram.url, icon: instagramLogo, color: 'bg-pink-600 hover:bg-pink-700' },
    { name: 'Facebook', url: contactData.contactLinks.facebook.url, icon: facebookLogo, color: 'bg-blue-600 hover:bg-blue-700' },
    { name: 'TikTok', url: contactData.contactLinks.tiktok.url, icon: tiktokLogo, color: 'bg-black hover:bg-gray-800' },
    { name: 'X', url: contactData.contactLinks.x.url, icon: xLogo, color: 'bg-gray-800 hover:bg-gray-900' },
  ];

  return (
    <div className="hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 z-50 flex-col gap-2 p-2">
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.name}
          title={social.name}
          className={`flex items-center justify-center w-11 h-11 rounded-l-xl shadow-md transition-all duration-300 transform translate-x-1 hover:translate-x-0 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary bg-white hover:bg-gray-50 border border-gray-200`}
        >
          <img src={social.icon} alt={social.name} className="w-7 h-7 object-contain" />
        </a>
      ))}
    </div>
  );
};

export default FloatingSocials;

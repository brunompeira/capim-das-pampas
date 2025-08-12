'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import { useAdminSettings } from '@/hooks/useAdminSettings';

export default function Footer() {
  const { adminSettings, contactSettings, isLoading } = useAdminSettings();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="text-center lg:text-left">
            <h3 className="text-xl font-bold mb-4">{siteConfig.name}</h3>
            <p className="text-gray-300 mb-4">{siteConfig.description}</p>
                         <div className="flex justify-center lg:justify-start space-x-4">
               {siteConfig.contact.instagram && (
                <a
                  href={`https://instagram.com/${siteConfig.contact.instagram.replace('@', '')}`}
                  className="text-gray-300 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {siteConfig.contact.facebook && (
                <a
                  href={siteConfig.contact.facebook}
                  className="text-gray-300 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center lg:text-left">
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/produtos" className="text-gray-300 hover:text-white transition-colors">
                  Produtos
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-gray-300 hover:text-white transition-colors">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-300 hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center lg:text-left">
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <div className="space-y-3">
                             <div className="flex justify-center lg:justify-start items-center">
                 <Phone className="w-4 h-4 mr-2 text-gray-300" />
                {isLoading ? (
                  <div className="animate-pulse bg-gray-700 h-4 w-32 rounded"></div>
                ) : (
                  <a
                    href={`tel:${adminSettings.phone}`}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {adminSettings.phone}
                  </a>
                )}
              </div>
                             <div className="flex justify-center lg:justify-start items-center">
                 <Mail className="w-4 h-4 mr-2 text-gray-300" />
                {isLoading ? (
                  <div className="animate-pulse bg-gray-700 h-4 w-40 rounded"></div>
                ) : (
                  <a
                    href={`mailto:${adminSettings.email}`}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {adminSettings.email}
                  </a>
                )}
              </div>
              {isLoading ? (
                <div className="flex justify-center lg:justify-start items-start">
                  <MapPin className="w-4 h-4 mr-2 mt-1 text-gray-300" />
                  <div className="animate-pulse bg-gray-700 h-4 w-48 rounded"></div>
                </div>
              ) : (
                contactSettings.addresses.length > 0 ? (
                  // Mostrar todos os endereços
                  <div className="space-y-2">
                    {contactSettings.addresses.map((address, index) => (
                      <div key={address.id} className="flex justify-center lg:justify-start items-start">
                        <MapPin className="w-4 h-4 mr-2 mt-1 text-gray-300" />
                                                 <a
                           href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.address)}`}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="text-sm lg:text-base text-gray-300 hover:text-white transition-colors cursor-pointer"
                           title="Abrir no Google Maps"
                         >
                           {address.address}
                         </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  // Fallback para o endereço padrão
                  <div className="flex justify-center lg:justify-start items-start">
                    <MapPin className="w-4 h-4 mr-2 mt-1 text-gray-300" />
                                         <a
                       href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(adminSettings.address)}`}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="text-sm lg:text-base text-gray-300 hover:text-white transition-colors cursor-pointer"
                       title="Abrir no Google Maps"
                     >
                       {adminSettings.address}
                     </a>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} {siteConfig.name}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

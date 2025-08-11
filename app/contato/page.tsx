'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { siteConfig } from '@/data/siteConfig';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useAdminSettings } from '@/hooks/useAdminSettings';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import dynamic from 'next/dynamic';

// Importação dinâmica do mapa para evitar problemas de SSR
const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl h-96 flex items-center justify-center border border-gray-200 shadow-lg">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">A carregar mapa...</p>
      </div>
    </div>
  ),
});

export default function ContactPage() {
  const { favoriteProducts, removeFromFavorites } = useFavorites();
  const { adminSettings, contactSettings, isLoading } = useAdminSettings();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        favoriteProducts={favoriteProducts}
        onRemoveFavorite={removeFromFavorites}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
            <Phone className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Entre em Contacto</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Estamos aqui para ajudá-lo a encontrar o produto perfeito. Entre em contacto connosco!
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Contact Info */}
          <div className="h-full">
             <div className="bg-white rounded-xl shadow-lg p-10 border border-gray-100 flex flex-col h-full">
                             <div className="flex items-center mb-8">
                 <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                   <Phone className="w-6 h-6 text-primary-600" />
                 </div>
                 <h2 className="text-2xl font-bold text-gray-900">Informações de Contacto</h2>
               </div>
               
                              <div className="space-y-6 flex-1">
                                 <div className="flex items-start">
                   <Phone className="w-6 h-6 text-primary-600 mr-4 mt-1" />
                   <div>
                     <h3 className="font-semibold text-gray-900">Telefone</h3>
                     {isLoading ? (
                       <div className="animate-pulse bg-gray-200 h-4 w-32 rounded"></div>
                     ) : (
                                               <div className="space-y-2">
                          <a
                            href={`tel:${adminSettings.phone}`}
                            className="text-gray-600 hover:text-primary-600 font-medium block"
                          >
                            {adminSettings.phone}
                          </a>
                          <div className="flex space-x-3">
                            <a
                              href={`tel:${adminSettings.phone}`}
                              className="inline-flex items-center px-3 py-1.5 bg-primary-50 text-primary-700 text-sm rounded-md hover:bg-primary-100 transition-colors border border-primary-200"
                              title="Ligar"
                            >
                              <Phone className="w-4 h-4 mr-1.5" />
                              Ligar
                            </a>
                            <a
                              href={`https://wa.me/${adminSettings.whatsapp.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-3 py-1.5 bg-green-50 text-green-700 text-sm rounded-md hover:bg-green-100 transition-colors border border-green-200"
                              title="Enviar WhatsApp"
                            >
                              <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                              </svg>
                              WhatsApp
                            </a>
                          </div>
                        </div>
                     )}
                   </div>
                 </div>
                
                                 <div className="flex items-start">
                   <Mail className="w-6 h-6 text-primary-600 mr-4 mt-1" />
                   <div>
                     <h3 className="font-semibold text-gray-900">E-mail</h3>
                     {isLoading ? (
                       <div className="animate-pulse bg-gray-200 h-4 w-40 rounded"></div>
                     ) : (
                                               <div className="space-y-2">
                          <a
                            href={`mailto:${adminSettings.email}`}
                            className="text-gray-600 hover:text-primary-600 font-medium block"
                          >
                            {adminSettings.email}
                          </a>
                                                     <a
                             href={`mailto:${adminSettings.email}`}
                             className="inline-flex items-center px-3 py-1.5 bg-primary-50 text-primary-700 text-sm rounded-md hover:bg-primary-100 transition-colors border border-primary-200"
                             title="Enviar E-mail"
                           >
                             <Mail className="w-4 h-4 mr-1.5" />
                             Enviar E-mail
                           </a>
                        </div>
                     )}
                   </div>
                 </div>
                
                {contactSettings.addresses.length > 0 ? (
                  contactSettings.addresses.map((address, index) => (
                    <div key={address.id} className="flex items-start">
                      <MapPin className="w-6 h-6 text-primary-600 mr-4 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900">{address.name}</h3>
                                                 <div className="text-xs text-gray-500 mt-2">
                          {(() => {
                            // Agrupar horários por período
                            const scheduleGroups: { [key: string]: string[] } = {};
                            
                            Object.entries(address.openingHours)
                              .filter(([day, hours]) => !hours.closed)
                              .forEach(([day, hours]) => {
                                const timeSlot = `${hours.open} - ${hours.close}`;
                                const dayName = 
                                  day === 'monday' ? 'Segunda' :
                                  day === 'tuesday' ? 'Terça' :
                                  day === 'wednesday' ? 'Quarta' :
                                  day === 'thursday' ? 'Quinta' :
                                  day === 'friday' ? 'Sexta' :
                                  day === 'saturday' ? 'Sábado' :
                                  day === 'sunday' ? 'Domingo' : day;
                                
                                if (!scheduleGroups[timeSlot]) {
                                  scheduleGroups[timeSlot] = [];
                                }
                                scheduleGroups[timeSlot].push(dayName);
                              });
                            
                                                         return Object.entries(scheduleGroups).map(([timeSlot, days]) => (
                               <div key={timeSlot} className="flex items-center justify-between py-1">
                                 <div className="flex items-center">
                                   <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></div>
                                   <span className="font-medium text-gray-600">
                                     {days.length === 1 ? days[0] : 
                                      days.length === 2 ? `${days[0]} e ${days[1]}` :
                                      `${days[0]} a ${days[days.length - 1]}`}
                                   </span>
                                 </div>
                                 <span className="text-green-600 font-medium text-xs ml-4">
                                   {timeSlot}
                                 </span>
                               </div>
                             ));
                          })()}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 text-primary-600 mr-4 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Endereço</h3>
                      {isLoading ? (
                        <div className="animate-pulse bg-gray-200 h-4 w-48 rounded"></div>
                      ) : (
                        <p className="text-gray-600">
                          {adminSettings.address}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
              <MapPin className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">A Nossa Localização</h2>
            <p className="text-gray-600 text-lg">Encontre-nos nos nossos estabelecimentos</p>
          </div>
          <Map 
            addresses={contactSettings.addresses.length > 0 ? contactSettings.addresses : [
              {
                id: 'default',
                name: 'Capim das Pampas',
                address: adminSettings.address,
                coordinates: [38.7223, -9.1393] // Coordenadas de Lisboa
              }
            ]}
            isLoading={isLoading}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}

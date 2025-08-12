'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { siteConfig } from '@/data/siteConfig';
import { Heart, Flower, Award, Users, Phone, MessageCircle } from 'lucide-react';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useAdminSettings } from '@/hooks/useAdminSettings';

export default function AboutPage() {
  const { favoriteProducts, removeFromFavorites } = useFavorites();
  const { team, adminSettings } = useAdminSettings();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        favoriteProducts={favoriteProducts}
        onRemoveFavorite={removeFromFavorites}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Sobre Nós</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Conheça a nossa história e a nossa paixão por flores e cerâmica artesanal
          </p>
        </div>

                                                                       {/* Main Content */}
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12 items-center mb-16">
           <div className="text-center lg:text-left">
             <h2 className="text-3xl font-bold text-gray-900 mb-6">{siteConfig.about.title}</h2>
             <div className="space-y-4 text-gray-600 leading-relaxed">
               <p>{siteConfig.about.content}</p>
               <p>
                 A nossa jornada começou com uma paixão simples: trazer beleza e arte para as casas das pessoas. 
                 Ao longo dos anos, desenvolvemos uma expertise única em seleccionar as melhores flores e 
                 trabalhar com artesãos locais para criar peças de cerâmica únicas.
               </p>
               <p>
                 Cada produto no nosso catálogo é cuidadosamente escolhido, pensando na qualidade, 
                 durabilidade e, acima de tudo, na alegria que pode trazer para a sua casa.
               </p>
             </div>
           </div>
          
          <div className="relative">
            <div className="bg-white rounded-2xl h-96 flex items-center justify-center p-8">
              <img 
                src="/images/about/about.jpg" 
                alt={`${siteConfig.name} Logo`}
                className="h-80 w-auto object-contain"
              />
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-4 lg:mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Os Nossos Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Heart className="w-12 h-12 mx-auto mb-4 text-primary-600" />
              <h3 className="text-xl font-semibold mb-2">Amor pelo que fazemos</h3>
              <p className="text-gray-600">
                Cada produto é seleccionado com carinho e dedicação
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Flower className="w-12 h-12 mx-auto mb-4 text-primary-600" />
              <h3 className="text-xl font-semibold mb-2">Qualidade Premium</h3>
              <p className="text-gray-600">
                Trabalhamos apenas com os melhores fornecedores
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Award className="w-12 h-12 mx-auto mb-4 text-primary-600" />
              <h3 className="text-xl font-semibold mb-2">Artesanal</h3>
              <p className="text-gray-600">
                Cada peça é única e feita com técnicas tradicionais
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-primary-600" />
              <h3 className="text-xl font-semibold mb-2">Atendimento Personalizado</h3>
              <p className="text-gray-600">
                Estamos aqui para ajudá-lo a encontrar o produto perfeito
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">A Nossa Equipa</h2>
          <div className={`grid gap-8 ${
            team.length === 1 
              ? 'grid-cols-1 max-w-md mx-auto' 
              : team.length === 2 
                ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto' 
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}>
            {team.map((member) => (
              <div key={member.id} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  {member.photo ? (
                    <img 
                      src={member.photo} 
                      alt={member.name}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-500">Foto</span>
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center py-16 border border-gray-200 rounded-xl bg-white shadow-sm">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Vamos Conversar?</h2>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto">
            Estamos aqui para ajudá-lo a encontrar o produto perfeito
          </p>
          
                                           <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center sm:items-start">
                                                                                                               <a
                  href={`tel:${adminSettings.phone}`}
                  className="inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 bg-primary-50 text-primary-700 text-sm rounded-lg hover:bg-primary-100 transition-colors border border-primary-200 font-medium min-h-[40px] sm:min-h-[44px] w-40"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Ligar Agora
                </a>
                
                <a
                  href={`https://wa.me/${adminSettings.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 bg-green-50 text-green-700 text-sm rounded-lg hover:bg-green-100 transition-colors border border-green-200 font-medium min-h-[40px] sm:min-h-[44px] w-40"
                >
               <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.87 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.86 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
               </svg>
               WhatsApp
             </a>
           </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
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
                src="/images/logo/logo.jpg" 
                alt={`${siteConfig.name} Logo`}
                className="h-80 w-auto object-contain"
              />
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
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
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${adminSettings.phone}`}
              className="inline-flex items-center px-8 py-3 bg-primary-50 text-primary-700 text-base rounded-lg hover:bg-primary-100 transition-colors border border-primary-200 font-medium"
            >
              Ligar Agora
            </a>
            
            <a
              href={`https://wa.me/${adminSettings.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 bg-green-50 text-green-700 text-base rounded-lg hover:bg-green-100 transition-colors border border-green-200 font-medium"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

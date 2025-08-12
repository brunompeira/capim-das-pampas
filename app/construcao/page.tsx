'use client';

import { useFavorites } from '@/contexts/FavoritesContext';
import { useAdminSettings } from '@/hooks/useAdminSettings';
import { Wrench, Hammer, Clock, Phone, Mail } from 'lucide-react';

export default function ConstructionPage() {
  const { favoriteProducts, removeFromFavorites } = useFavorites();
  const { adminSettings, isLoading } = useAdminSettings();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <Wrench className="w-5 h-5 text-primary-600" />
              </div>
              <h1 className="text-xl font-bold text-primary-900">Capim das Pampas</h1>
            </div>
            <div className="text-sm text-primary-600 font-medium">
              Em construção
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
              <Hammer className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Site em Construção</h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Estamos a trabalhar para trazer-te algo incrível! Enquanto isso, contacta-nos.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 mb-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Progresso</h2>
              <div className="bg-gray-200 rounded-full h-3 mb-4">
                <div className="bg-primary-600 h-3 rounded-full w-3/4 animate-pulse"></div>
              </div>
              <p className="text-sm text-gray-600">75% concluído</p>
            </div>
          </div>

          {/* Features Coming Soon */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 mb-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                <Wrench className="w-6 h-6 text-primary-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Funcionalidades a Chegar</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <Wrench className="w-6 h-6 text-primary-600 mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Catálogo Digital</h3>
                  <p className="text-gray-600 text-sm">
                    Produtos artesanais únicos e exclusivos
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="w-6 h-6 text-primary-600 mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Experiência Premium</h3>
                  <p className="text-gray-600 text-sm">
                    Interface moderna e intuitiva
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-lg p-10 border border-gray-100">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                <Phone className="w-6 h-6 text-primary-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Informações de Contacto</h2>
            </div>
            
            <div className="space-y-6">
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
                      <a
                        href={`tel:${adminSettings.phone}`}
                        className="inline-flex items-center px-3 py-1.5 bg-primary-50 text-primary-700 text-sm rounded-md hover:bg-primary-100 transition-colors border border-primary-200"
                        title="Ligar"
                      >
                        <Phone className="w-4 h-4 mr-1.5" />
                        Ligar
                      </a>
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
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-gray-600 mb-4">
                Estamos a trabalhar arduamente para trazer-te a melhor experiência possível.
              </p>
              <p className="text-sm text-gray-500">
                Volta em breve para veres as novidades!
              </p>
            </div>
          </div>
        </div>
      </main>

             {/* Footer */}
       <footer className="bg-white border-t border-gray-200 mt-16">
         <div className="max-w-7xl mx-auto px-4 py-8">
           <div className="text-center text-gray-500">
             <p>&copy; 2025 Capim das Pampas. Todos os direitos reservados.</p>
             <p className="text-sm mt-2">Site em desenvolvimento</p>
           </div>
         </div>
       </footer>
    </div>
  );
}

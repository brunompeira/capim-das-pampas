'use client';

import { useState, useEffect } from 'react';
import { Cookie, Shield, Settings } from 'lucide-react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Verificar se o utilizador já fez uma escolha
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
    console.log('Cookies aceites');
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setIsVisible(false);
    console.log('Cookies rejeitados');
  };

  const handleCustomize = () => {
    setShowDetails(!showDetails);
    console.log('Personalização de cookies');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
          {/* Cookie Icon and Main Text */}
          <div className="flex items-start gap-3 flex-1">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <Cookie className="w-5 h-5 text-primary-600" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Utilizamos cookies para melhorar a sua experiência
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Este site utiliza cookies essenciais para funcionar corretamente e cookies opcionais para melhorar a experiência do utilizador. 
                Ao continuar a navegar, concorda com a nossa política de cookies.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <button
              onClick={handleCustomize}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Settings className="w-4 h-4 mr-2" />
              Personalizar
            </button>
            <button
              onClick={handleReject}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Rejeitar
            </button>
            <button
              onClick={handleAccept}
              className="inline-flex items-center px-6 py-2 text-sm font-medium text-white bg-primary-600 border border-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Aceitar Todos
            </button>
          </div>
        </div>

        {/* Detailed Cookie Information */}
        {showDetails && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Essential Cookies */}
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold text-green-800">Cookies Essenciais</h4>
                </div>
                <p className="text-sm text-green-700 mb-3">
                  Necessários para o funcionamento básico do site. Não podem ser desativados.
                </p>
                <div className="text-xs text-green-600">
                  <p>• Funcionamento básico do site</p>
                  <p>• Navegação entre páginas</p>
                  <p>• Carregamento de imagens</p>
                </div>
              </div>

              {/* Functional Cookies */}
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Settings className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold text-blue-800">Cookies Funcionais</h4>
                </div>
                <p className="text-sm text-blue-700 mb-3">
                  Melhoram a funcionalidade e personalização do site.
                </p>
                <div className="text-xs text-blue-600">
                  <p>• Lista de favoritos</p>
                  <p>• Preferências de visualização</p>
                  <p>• Histórico de produtos vistos</p>
                </div>
              </div>

              {/* Third-party Cookies */}
              <div className="bg-orange-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Cookie className="w-5 h-5 text-orange-600" />
                  <h4 className="font-semibold text-orange-800">Cookies de Terceiros</h4>
                </div>
                <p className="text-sm text-orange-700 mb-3">
                  Utilizados por serviços externos para melhorar a experiência.
                </p>
                <div className="text-xs text-orange-600">
                  <p>• Google Fonts (tipografia)</p>
                  <p>• Links para Google Maps</p>
                  <p>• Links para redes sociais</p>
                </div>
              </div>
            </div>

            {/* Privacy Policy Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Para mais informações, consulte a nossa{' '}
                <a href="/privacidade" className="text-primary-600 hover:text-primary-700 underline">
                  Política de Privacidade
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { Cookie, Shield, Settings } from 'lucide-react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verificar se o utilizador já fez uma escolha
    const consent = localStorage.getItem('cookieConsent');
    
    // Não mostrar na página de política de privacidade
    if (window.location.pathname === '/privacidade') {
      return;
    }
    
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
    console.log('✅ Cookies aceites');
  };



  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-6">
                 <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 w-full text-center lg:text-left">
          {/* Cookie Icon and Main Text */}
          <div className="flex items-start gap-3 flex-1">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <Cookie className="w-5 h-5 text-primary-600" />
              </div>
            </div>
                         <div className="flex-1 text-center lg:text-left">
               <h3 className="text-lg font-semibold text-gray-900 mb-2">
                 Utilizamos cookies para melhorar a sua experiência
               </h3>
                               <p className="text-sm text-gray-600 leading-relaxed">
                  Este site utiliza cookies para funcionar corretamente. 
                  Para mais detalhes sobre como utilizamos os seus dados, consulte a nossa política de privacidade.
                </p>
             </div>
          </div>

                     {/* Action Buttons */}
           <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-shrink-0 w-full sm:w-auto justify-center sm:justify-start">
             <button
               onClick={handleAccept}
               className="inline-flex items-center justify-center px-6 py-3 sm:py-2 text-sm font-medium text-white bg-primary-600 border border-primary-600 rounded-lg hover:bg-primary-700 transition-colors w-full sm:w-auto min-h-[44px]"
             >
                               Aceitar Cookies
             </button>
                                                                                   <a
                  href="/privacidade"
                  className="inline-flex items-center justify-center px-4 py-3 sm:py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors w-full sm:w-auto min-h-[44px]"
                >
                  Ver Política de Privacidade
                </a>
           </div>
        </div>

        
      </div>
    </div>
  );
}

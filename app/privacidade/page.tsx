'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useAdminSettings } from '@/hooks/useAdminSettings';
import { Shield, Cookie, Eye, Lock, Users, Calendar } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const { favoriteProducts, removeFromFavorites } = useFavorites();
  const { adminSettings, isLoading } = useAdminSettings();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        favoriteProducts={favoriteProducts}
        onRemoveFavorite={removeFromFavorites}
      />
      
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
              <Shield className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Política de Privacidade</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
              Protegemos a sua privacidade e garantimos a segurança dos seus dados pessoais
            </p>
            
            
          </div>
        </div>
      </div>

             {/* Content */}
       <div className="max-w-4xl mx-auto px-4 py-16 pb-24">
        <div className="bg-white rounded-xl shadow-lg p-8">
          
          {/* Last Updated */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Calendar className="w-4 h-4" />
            <span>Última atualização: {new Date().toLocaleDateString('pt-BR')}</span>
          </div>

          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introdução</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A Capim das Pampas está comprometida em proteger a privacidade e segurança dos seus utilizadores. 
              Esta Política de Privacidade explica como recolhemos, utilizamos e protegemos as suas informações pessoais.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Ao utilizar o nosso site, concorda com as práticas descritas nesta política.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Informações que Recolhemos</h2>
            
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Informações de Contacto
                </h3>
                <ul className="text-blue-700 space-y-2">
                  <li>• Endereço de e-mail (se contactar via e-mail)</li>
                  <li>• Número de telefone (se contactar via telefone)</li>
                  <li>• Nome (se fornecido voluntariamente)</li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Informações de Utilização
                </h3>
                <ul className="text-green-700 space-y-2">
                  <li>• Produtos visualizados (localmente no seu navegador)</li>
                  <li>• Preferências de favoritos (localmente no seu navegador)</li>
                  <li>• Histórico de navegação (localmente no seu navegador)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Como Utilizamos as Informações</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Finalidades Principais</h3>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Responder a contactos e perguntas</li>
                  <li>• Fornecer informações sobre produtos</li>
                  <li>• Melhorar a experiência do site</li>
                  <li>• Manter o site atualizado</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Melhorias do Site</h3>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Análise de utilização básica</li>
                  <li>• Correção de problemas técnicos</li>
                  <li>• Atualização de conteúdo</li>
                  <li>• Otimização de performance</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Cookies */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Utilização de Cookies</h2>
            <div className="bg-orange-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-orange-800 mb-3 flex items-center gap-2">
                <Cookie className="w-5 h-5" />
                Tipos de Cookies
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-semibold text-orange-700 mb-2">Cookies Essenciais</h4>
                  <p className="text-orange-600 text-sm">Necessários para o funcionamento básico do site</p>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-700 mb-2">Cookies Funcionais</h4>
                  <p className="text-orange-600 text-sm">Preferências de favoritos e navegação</p>
                </div>
                <div>
                  <h4 className="font-semibold text-orange-700 mb-2">Cookies de Terceiros</h4>
                  <p className="text-orange-600 text-sm">Google Fonts para tipografia</p>
                </div>
              </div>
            </div>
          </section>

          {/* Data Protection */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Proteção de Dados</h2>
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Medidas de Segurança
              </h3>
              <ul className="text-green-700 space-y-2">
                <li>• Encriptação SSL/TLS para transmissão de dados</li>
                <li>• Não armazenamos dados pessoais na nossa base de dados</li>
                <li>• Dados de favoritos ficam apenas no seu navegador</li>
                <li>• Utilização de serviços seguros (MongoDB Atlas, Cloudinary)</li>
                <li>• Acesso restrito ao painel administrativo</li>
              </ul>
            </div>
          </section>

          {/* Data Sharing */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Partilha de Dados</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Não vendemos, alugamos ou partilhamos as suas informações pessoais com terceiros. 
              O nosso site funciona como um catálogo digital e não recolhe dados pessoais para processamento.
            </p>
            <p className="text-gray-700 leading-relaxed">
              As únicas informações que podem ser partilhadas são:
            </p>
            <ul className="text-gray-700 space-y-2 ml-6">
              <li>• Com o seu consentimento explícito</li>
              <li>• Para cumprir obrigações legais</li>
              <li>• Com prestadores de serviços técnicos (hospedagem, fontes)</li>
            </ul>
          </section>

          {/* Your Rights */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Os Seus Direitos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Direitos de Acesso</h3>
                <ul className="text-blue-700 space-y-2 text-sm">
                  <li>• Aceder aos seus dados pessoais (se existirem)</li>
                  <li>• Corrigir informações incorretas</li>
                  <li>• Solicitar a eliminação de dados</li>
                  <li>• Limpar dados de favoritos no navegador</li>
                </ul>
              </div>
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Controlo de Cookies</h3>
                <ul className="text-blue-700 space-y-2 text-sm">
                  <li>• Gerir preferências de cookies</li>
                  <li>• Limpar cookies do navegador</li>
                  <li>• Configurar bloqueio de cookies</li>
                  <li>• Contactar-nos para questões</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contacto</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 mb-4">
                Para questões relacionadas com esta Política de Privacidade ou para exercer os seus direitos, 
                contacte-nos através de:
              </p>
              <div className="space-y-2 text-gray-700">
                {isLoading ? (
                  <>
                    <div className="animate-pulse bg-gray-200 h-4 w-40 rounded"></div>
                    <div className="animate-pulse bg-gray-200 h-4 w-32 rounded"></div>
                  </>
                ) : (
                  <>
                    <p><strong>E-mail:</strong> {adminSettings.email}</p>
                    <p><strong>Telefone:</strong> {adminSettings.phone}</p>
                  </>
                )}
              </div>
            </div>
          </section>

          {/* Changes to Policy */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Alterações à Política</h2>
            <p className="text-gray-700 leading-relaxed">
              Reservamo-nos o direito de atualizar esta Política de Privacidade periodicamente. 
              As alterações serão publicadas nesta página com uma nova data de atualização. 
              Recomendamos que reveja regularmente esta política para se manter informado sobre 
              como protegemos as suas informações.
            </p>
          </section>

                 </div>
       </div>

       {/* Banner fixo de cookies no fundo */}
       <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
         <div className="max-w-4xl mx-auto px-4 py-3">
           <div className="flex items-center justify-between gap-4">
             <div className="flex items-center gap-3">
               <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                 <Cookie className="w-4 h-4 text-primary-600" />
               </div>
               <div>
                 <p className="text-sm font-medium text-gray-900">Cookies</p>
                 <p className="text-xs text-gray-600">Aceite para uma melhor experiência</p>
               </div>
             </div>
             <button
               onClick={() => {
                 localStorage.setItem('cookieConsent', 'accepted');
                 // Esconder o banner
                 const banner = document.getElementById('cookie-banner-privacy-fixed');
                 if (banner) banner.style.display = 'none';
                 console.log('✅ Cookies aceites na política de privacidade');
               }}
               className="inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors whitespace-nowrap"
               id="cookie-banner-privacy-fixed"
             >
               Aceitar
             </button>
           </div>
         </div>
       </div>

       <Footer />
    </div>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Product } from '@/types';
import { siteConfig } from '@/data/siteConfig';
import { useAdminSettings } from '@/hooks/useAdminSettings';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useFavorites } from '@/contexts/FavoritesContext';
import { Flower, Heart, Phone, MapPin, Mail } from 'lucide-react';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const { favoriteProducts, removeFromFavorites } = useFavorites();
  const { adminSettings, contactSettings, isLoading } = useAdminSettings();

  // Redirecionamento automático para página de construção
  useEffect(() => {
    window.location.href = '/construcao';
  }, []);

  // Carregar produtos da API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const productsData = await response.json();
          setProducts(productsData);
        }
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      } finally {
        setIsLoadingProducts(false);
      }
    };

    loadProducts();
  }, []);

  const featuredProducts = products.filter(product => product.featured);

  return (
    <div className="min-h-screen bg-white">
      <Header 
        favoriteProducts={favoriteProducts}
        onRemoveFavorite={removeFromFavorites}
      />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Flores e Cerâmica
                <span className="block text-2xl md:text-3xl font-normal mt-2">
                  Arte e Beleza para a sua Casa
                </span>
              </h1>
              <p className="text-xl mb-8 text-primary-100">
                Descubra a nossa colecção única de flores frescas e peças de cerâmica artesanal. 
                Cada produto é cuidadosamente seleccionado para trazer beleza e elegância ao seu espaço.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/produtos"
                  className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
                >
                  Ver Produtos
                </Link>
                <Link
                  href="/contato"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors text-center"
                >
                  Fale Conosco
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 rounded-lg p-4 text-center">
                    <Flower className="w-8 h-8 mx-auto mb-2" />
                    <p className="font-semibold">Flores Frescas</p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 text-center">
                    <Heart className="w-8 h-8 mx-auto mb-2" />
                    <p className="font-semibold">Artesanal</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Produtos em Destaque</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Os nossos produtos mais populares, cuidadosamente seleccionados para si
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/produtos"
              className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Ver Todos os Produtos
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{siteConfig.about.title}</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {siteConfig.about.content}
              </p>
              <Link
                href="/sobre"
                className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Saiba Mais
              </Link>
            </div>
            <div className="relative">
              <div className="bg-gray-50 rounded-2xl h-80 flex items-center justify-center p-8">
                <img 
                  src="/images/logo/logo.jpg" 
                  alt={`${siteConfig.name} Logo`}
                  className="h-64 w-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      

       {/* Contact Section */}
       <section className="py-16 bg-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-12">
             <h2 className="text-3xl font-bold text-gray-900 mb-4">Entre em Contacto</h2>
             <p className="text-gray-600">
               Estamos aqui para ajudá-lo a encontrar o produto perfeito
             </p>
           </div>
          
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="bg-white p-6 rounded-lg shadow-md text-center">
               <Phone className="w-8 h-8 mx-auto mb-4 text-primary-600" />
               <h3 className="text-lg font-semibold mb-2">Telefone</h3>
               {isLoading ? (
                 <div className="animate-pulse bg-gray-200 h-4 rounded"></div>
               ) : (
                 <a
                   href={`tel:${adminSettings.phone}`}
                   className="text-gray-600 hover:text-primary-600"
                 >
                   {adminSettings.phone}
                 </a>
               )}
             </div>
             
             <div className="bg-white p-6 rounded-lg shadow-md text-center">
               <Mail className="w-8 h-8 mx-auto mb-4 text-primary-600" />
               <h3 className="text-lg font-semibold mb-2">E-mail</h3>
               {isLoading ? (
                 <div className="animate-pulse bg-gray-200 h-4 rounded"></div>
               ) : (
                 <a
                   href={`mailto:${adminSettings.email}`}
                   className="text-gray-600 hover:text-primary-600"
                 >
                   {adminSettings.email}
                 </a>
               )}
             </div>
             
             <div className="bg-white p-6 rounded-lg shadow-md text-center">
               <MapPin className="w-8 h-8 mx-auto mb-4 text-primary-600" />
               <h3 className="text-lg font-semibold mb-2">Endereços</h3>
               {isLoading ? (
                 <div className="animate-pulse bg-gray-200 h-4 rounded"></div>
               ) : (
                 contactSettings.addresses.length > 0 ? (
                   <div className="space-y-2">
                     {contactSettings.addresses.map((address, index) => (
                       <p key={address.id} className="text-gray-600 text-sm">
                         {address.address}
                       </p>
                     ))}
                   </div>
                 ) : (
                   <p className="text-gray-600">
                     {adminSettings.address}
                   </p>
                 )
               )}
             </div>
           </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

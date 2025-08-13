'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { useAdminSettings } from '@/hooks/useAdminSettings';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageGallery from '@/components/ImageGallery';
import { useFavorites } from '@/contexts/FavoritesContext';
import { ArrowLeft, ShoppingBag, Phone, MessageCircle, Heart, Star } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function ProductDetailPage() {
  const { addToFavorites, removeFromFavorites, isFavorite, favoriteProducts } = useFavorites();
  const { contactSettings } = useAdminSettings();
  const params = useParams();
  const productId = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  // Carregar produtos da API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/admin/products', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
          const foundProduct = data.find((p: Product) => p.id === productId);
          setProduct(foundProduct || null);
        } else {
    
        }
      } catch (error) {
  
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [productId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">A carregar produto...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Produto não encontrado</h1>
            <p className="text-gray-600 mb-8">O produto que está a procurar não existe.</p>
            <Link 
              href="/produtos"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Voltar aos produtos
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        favoriteProducts={favoriteProducts}
        onRemoveFavorite={removeFromFavorites}
      />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary-600">Início</Link>
            <span>/</span>
            <Link href="/produtos" className="hover:text-primary-600">Produtos</Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <ImageGallery 
              images={[product.image]} 
              alt={product.name} 
            />
            {product.featured && (
              <div className="flex items-center justify-center">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                  <Star className="w-4 h-4 mr-1" />
                  Destaque
                </span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                  {product.category === 'flores' ? 'Flores' : 'Cerâmica'}
                </span>
                {product.available ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    Disponível
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                    Indisponível
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className={`font-bold ${
                    formatPrice(product.price ?? 0).isConsultation 
                      ? 'text-lg text-gray-500 font-normal' 
                      : 'text-2xl text-primary-600'
                  }`}>
                    {formatPrice(product.price ?? 0).text}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => {
                      if (product) {
                        if (isFavorite(product.id)) {
                          removeFromFavorites(product.id);
                        } else {
                          addToFavorites(product);
                        }
                      }
                    }}
                    className={`p-2 transition-colors duration-200 ${
                      product && isFavorite(product.id)
                        ? 'text-red-500 hover:text-red-600'
                        : 'text-gray-400 hover:text-red-500'
                    }`}
                    title={product && isFavorite(product.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                  >
                    <Heart className={`w-6 h-6 ${product && isFavorite(product.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href={`tel:${contactSettings.phone}`}
                  className="inline-flex items-center justify-center px-4 py-2.5 bg-primary-50 text-primary-700 text-sm rounded-md hover:bg-primary-100 transition-colors border border-primary-200 font-medium"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Ligar agora
                </a>
                <a
                  href={`https://wa.me/${contactSettings.phone.replace(/\D/g, '')}?text=Olá! Gostaria de saber mais sobre o produto: ${product.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2.5 bg-green-50 text-green-700 text-sm rounded-md hover:bg-green-100 transition-colors border border-green-200 font-medium"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.86 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Product Details */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Detalhes do Produto</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Categoria:</span>
                  <span className="font-medium">{product.category === 'flores' ? 'Flores' : 'Cerâmica'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Disponibilidade:</span>
                  <span className="font-medium">{product.available ? 'Disponível' : 'Indisponível'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Preço:</span>
                  <span className={`font-medium ${
                    formatPrice(product.price ?? 0).isConsultation 
                      ? 'text-sm text-gray-500' 
                      : 'text-primary-600'
                  }`}>
                    {formatPrice(product.price ?? 0).text}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Produtos Relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/produto/${relatedProduct.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="aspect-square relative">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{relatedProduct.name}</h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{relatedProduct.description}</p>
                    <div className="flex items-center justify-between">
                      <span className={`font-bold ${
                        formatPrice(relatedProduct.price ?? 0).isConsultation 
                          ? 'text-sm text-gray-500 font-normal' 
                          : 'text-primary-600'
                      }`}>
                        {formatPrice(relatedProduct.price ?? 0).text}
                      </span>
                      {relatedProduct.featured && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          <Star className="w-3 h-3 mr-1" />
                          Destaque
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

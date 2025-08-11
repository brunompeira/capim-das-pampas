'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { siteConfig } from '@/data/siteConfig';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageGallery from '@/components/ImageGallery';
import { useFavorites } from '@/contexts/FavoritesContext';
import { ArrowLeft, ShoppingBag, Phone, MessageCircle, Heart, Star } from 'lucide-react';

export default function ProductDetailPage() {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
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
        const response = await fetch('/api/products', {
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
          console.error('Erro ao carregar produtos');
        }
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        favoriteProducts={[]}
        onRemoveFavorite={() => {}}
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
                  <span className="text-2xl font-bold text-primary-600">
                    {formatPrice(product.price)}
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
                  href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, '')}?text=Olá! Gostaria de saber mais sobre o produto: ${product.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Perguntar no WhatsApp
                </a>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Ligar agora
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
                  <span className="font-medium">{formatPrice(product.price)}</span>
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
                      <span className="font-bold text-primary-600">
                        {formatPrice(relatedProduct.price)}
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

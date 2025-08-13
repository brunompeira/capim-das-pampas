'use client';

import { useState } from 'react';
import { ShoppingBag, X, Heart, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { Product } from '@/types';
import { useAdminSettings } from '@/hooks/useAdminSettings';
import { formatPrice } from '@/lib/utils';

interface CartButtonProps {
  favoriteProducts: Product[];
  onRemoveFavorite: (productId: string) => void;
}

export default function CartButton({ favoriteProducts, onRemoveFavorite }: CartButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { adminSettings } = useAdminSettings();

  const totalPrice = favoriteProducts.reduce((sum, product) => {
    // Se o produto tem preço 0, não adicionar ao total
    if (product.price === 0 || product.price === null || product.price === undefined) {
      return sum;
    }
    return sum + product.price;
  }, 0);

  const createWhatsAppMessage = () => {
    const productsList = favoriteProducts
      .map(product => {
        const priceInfo = formatPrice(product.price);
        return `• ${product.name} - ${priceInfo.text}`;
      })
      .join('\n');
    
    const totalText = totalPrice === 0 ? 'Total: Preço sob consulta' : `Total: ${formatPrice(totalPrice).text}`;
    const message = `Olá! Gostaria de fazer um pedido com os seguintes produtos:\n\n${productsList}\n\n${totalText}\n\nPoderia ajudar-me?`;
    
    return encodeURIComponent(message);
  };

  return (
    <>
      {/* Cart Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200"
      >
        <ShoppingBag className="w-6 h-6" />
        {favoriteProducts.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {favoriteProducts.length}
          </span>
        )}
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                Produtos de Interesse ({favoriteProducts.length})
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 overflow-y-auto max-h-96">
              {favoriteProducts.length === 0 ? (
                <div className="text-center py-8">
                  <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Nenhum produto adicionado</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Adicione produtos aos favoritos para fazer um pedido
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {favoriteProducts.map((product) => (
                    <div key={product.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">{product.name}</h4>
                        <p className="text-sm text-gray-600 truncate">{product.description}</p>
                        <p className={`font-semibold ${
                          formatPrice(product.price).isConsultation 
                            ? 'text-sm text-gray-500 font-normal' 
                            : 'text-primary-600'
                        }`}>
                          {formatPrice(product.price).text}
                        </p>
                      </div>
                      <button
                        onClick={() => onRemoveFavorite(product.id)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {favoriteProducts.length > 0 && (
              <div className="p-4 border-t bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold text-gray-900">Total:</span>
                  <span className={`text-xl font-bold ${
                    totalPrice === 0 
                      ? 'text-sm text-gray-500 font-normal' 
                      : 'text-primary-600'
                  }`}>
                    {totalPrice === 0 ? 'Preço sob consulta' : formatPrice(totalPrice).text}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <a
                    href={`https://wa.me/${adminSettings.whatsapp.replace(/\D/g, '')}?text=${createWhatsAppMessage()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-green-50 text-green-700 text-sm rounded-lg hover:bg-green-100 transition-colors border border-green-200 font-medium"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.86 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    Enviar Pedido via WhatsApp
                  </a>
                  
                  <a
                    href={`tel:${adminSettings.phone}`}
                    className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-primary-50 text-primary-700 text-sm rounded-lg hover:bg-primary-100 transition-colors border border-primary-200 font-medium"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Ligar para Fazer Pedido
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

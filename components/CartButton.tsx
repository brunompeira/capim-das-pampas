'use client';

import { useState } from 'react';
import { ShoppingBag, X, Heart, MessageCircle } from 'lucide-react';
import { Product } from '@/types';
import { siteConfig } from '@/data/siteConfig';

interface CartButtonProps {
  favoriteProducts: Product[];
  onRemoveFavorite: (productId: string) => void;
}

export default function CartButton({ favoriteProducts, onRemoveFavorite }: CartButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const totalPrice = favoriteProducts.reduce((sum, product) => sum + product.price, 0);

  const createWhatsAppMessage = () => {
    const productsList = favoriteProducts
      .map(product => `• ${product.name} - ${formatPrice(product.price)}`)
      .join('\n');
    
    const message = `Olá! Gostaria de fazer um pedido com os seguintes produtos:\n\n${productsList}\n\nTotal: ${formatPrice(totalPrice)}\n\nPoderia me ajudar?`;
    
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
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">{product.name}</h4>
                        <p className="text-sm text-gray-600 truncate">{product.description}</p>
                        <p className="text-primary-600 font-semibold">{formatPrice(product.price)}</p>
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
                  <span className="text-xl font-bold text-primary-600">{formatPrice(totalPrice)}</span>
                </div>
                
                <div className="space-y-2">
                  <a
                    href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, '')}?text=${createWhatsAppMessage()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Enviar Pedido via WhatsApp
                  </a>
                  
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="flex items-center justify-center w-full px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                  >
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

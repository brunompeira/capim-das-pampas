'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { ShoppingBag, Eye, Heart } from 'lucide-react';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useAdminSettings } from '@/hooks/useAdminSettings';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
  isCompact?: boolean;
}

export default function ProductCard({ product, onViewDetails, isCompact = false }: ProductCardProps) {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { adminSettings } = useAdminSettings();
  
  const handleFavoriteToggle = () => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link href={`/produto/${product.id}`} className="block">
        <div className="relative aspect-square bg-gray-50 p-4">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-2"
          />
          {product.featured && (
            <div className="absolute top-2 left-2 bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium">
              Destaque
            </div>
          )}
        </div>
      </Link>
      
      <div className={`${isCompact ? 'p-3' : 'p-5'}`}>
        <Link href={`/produto/${product.id}`} className="block">
          <h3 className={`font-semibold text-gray-900 hover:text-primary-600 transition-colors duration-200 text-center lg:text-left ${
            isCompact ? 'text-sm mb-1' : 'text-lg mb-2'
          }`}>{product.name}</h3>
        </Link>
        <p className={`text-gray-600 text-center lg:text-left ${
          isCompact ? 'text-xs mb-2 line-clamp-1' : 'text-sm mb-4 line-clamp-2'
        }`}>{product.description}</p>
        
                  <div className="flex items-center justify-between">
                    <span className={`font-bold ${
                      formatPrice(product.price ?? 0).isConsultation 
                        ? 'text-xs text-gray-500 font-normal' 
                        : isCompact ? 'text-base text-primary-600' : 'text-xl text-primary-600'
                    }`}>
                      {formatPrice(product.price ?? 0).text}
                    </span>
            
            <div className="flex space-x-0.5">
              <button
                onClick={handleFavoriteToggle}
                className={`${isCompact ? 'p-1' : 'p-2'} rounded-full transition-colors ${
                  isFavorite(product.id)
                    ? 'text-red-500 hover:text-red-600'
                    : 'text-gray-400 hover:text-red-500'
                }`}
                title={isFavorite(product.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
              >
                <Heart className={`${isCompact ? 'w-3 h-3' : 'w-4 h-4'} ${isFavorite(product.id) ? 'fill-current' : ''}`} />
              </button>
              
              <Link
                href={`/produto/${product.id}`}
                className={`${isCompact ? 'p-1' : 'p-2'} text-gray-600 hover:text-primary-600 transition-colors`}
                title="Ver detalhes"
              >
                <Eye className={`${isCompact ? 'w-3 h-3' : 'w-4 h-4'}`} />
              </Link>
              
              <a
                href={`https://wa.me/${adminSettings.whatsapp.replace(/\D/g, '')}?text=Olá! Gostaria de saber mais sobre ${product.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`${isCompact ? 'p-1' : 'p-2'} bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors`}
                title="Consultar no WhatsApp"
              >
                <ShoppingBag className={`${isCompact ? 'w-3 h-3' : 'w-4 h-4'}`} />
              </a>
            </div>
          </div>
        
        <div className={`${isCompact ? 'mt-2' : 'mt-3'} text-center lg:text-left`}>
          <span className={`inline-block rounded-full font-medium ${
            product.category === 'flores' 
              ? 'bg-pink-100 text-pink-800' 
              : 'bg-orange-100 text-orange-800'
          } ${isCompact ? 'px-1.5 py-0.5 text-xs' : 'px-2 py-1 text-xs'}`}>
            {product.category === 'flores' ? 'Flores' : 'Cerâmica'}
          </span>
        </div>
      </div>
    </div>
  );
}

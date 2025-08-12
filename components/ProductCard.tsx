import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { ShoppingBag, Eye, Heart } from 'lucide-react';
import { useFavorites } from '@/contexts/FavoritesContext';

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
}

export default function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

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
      
      <div className="p-5">
        <Link href={`/produto/${product.id}`} className="block">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors duration-200 text-center lg:text-left">{product.name}</h3>
        </Link>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 text-center lg:text-left">{product.description}</p>
        
                  <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-primary-600">
              {formatPrice(product.price)}
            </span>
            
            <div className="flex space-x-2">
              <button
                onClick={handleFavoriteToggle}
                className={`p-2 rounded-full transition-colors ${
                  isFavorite(product.id)
                    ? 'text-red-500 hover:text-red-600'
                    : 'text-gray-400 hover:text-red-500'
                }`}
                title={isFavorite(product.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
              >
                <Heart className={`w-4 h-4 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
              </button>
              
              <Link
                href={`/produto/${product.id}`}
                className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
                title="Ver detalhes"
              >
                <Eye className="w-4 h-4" />
              </Link>
              
                              <a
                href={`https://wa.me/351912345678?text=Olá! Gostaria de saber mais sobre ${product.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors"
                title="Consultar no WhatsApp"
              >
                <ShoppingBag className="w-4 h-4" />
              </a>
            </div>
          </div>
        
        <div className="mt-3 text-center lg:text-left">
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
            product.category === 'flores' 
              ? 'bg-pink-100 text-pink-800' 
              : 'bg-orange-100 text-orange-800'
          }`}>
            {product.category === 'flores' ? 'Flores' : 'Cerâmica'}
          </span>
        </div>
      </div>
    </div>
  );
}

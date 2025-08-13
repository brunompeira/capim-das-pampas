'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import SearchAndFilter from '@/components/SearchAndFilter';
import { useFavorites } from '@/contexts/FavoritesContext';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const { favoriteProducts, removeFromFavorites } = useFavorites();
  const [selectedCategory, setSelectedCategory] = useState<'todos' | 'flores' | 'ceramica'>('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [gridView, setGridView] = useState<'grid-cols-1' | 'grid-cols-2'>('grid-cols-1');

  // Carregar produtos da API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch('/api/admin/products');
        if (response.ok) {
          const productsData = await response.json();
          setProducts(productsData);
        }
      } catch (error) {
  
      } finally {
        setIsLoadingProducts(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'todos' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        favoriteProducts={favoriteProducts}
        onRemoveFavorite={removeFromFavorites}
      />
      
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center lg:text-left">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Os Nossos Produtos</h1>
          <p className="text-gray-600">Descubra a nossa selecção de flores e cerâmica artesanal</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filter Component */}
        <SearchAndFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          totalProducts={products.length}
          filteredProducts={filteredProducts.length}
        />

        {/* Grid View Toggle - Only visible on mobile */}
        <div className="lg:hidden flex items-center justify-center mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2 flex items-center space-x-1">
            <span className="text-sm font-medium text-gray-700 mr-3">Visualização:</span>
                         <button
               onClick={() => setGridView('grid-cols-1')}
               className={`p-2 rounded-lg transition-all duration-200 ${
                 gridView === 'grid-cols-1'
                   ? 'bg-primary-600 text-white shadow-sm'
                   : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
               }`}
               title="Ver 1 produto por linha"
             >
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
               </svg>
             </button>
             <button
               onClick={() => setGridView('grid-cols-2')}
               className={`p-2 rounded-lg transition-all duration-200 ${
                 gridView === 'grid-cols-2'
                   ? 'bg-primary-600 text-white shadow-sm'
                   : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
               }`}
               title="Ver 2 produtos por linha"
             >
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
               </svg>
             </button>
          </div>
        </div>

                 {/* Products Grid */}
         {filteredProducts.length > 0 ? (
           <div className={`grid gap-6 ${
             // Em mobile usa o estado gridView, em desktop mantém o layout original
             gridView === 'grid-cols-1' ? 'grid-cols-1' : 'grid-cols-2'
           } md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`}>
             {filteredProducts.map((product) => (
               <ProductCard 
                 key={product.id} 
                 product={product} 
                 isCompact={gridView === 'grid-cols-2'}
               />
             ))}
           </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum produto encontrado</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm 
                ? `Não encontrámos produtos para "${searchTerm}"`
                : 'Tente ajustar os filtros para encontrar o que procura'
              }
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('todos');
              }}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

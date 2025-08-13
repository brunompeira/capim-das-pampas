'use client';

import { useState } from 'react';
import { Search, Filter, X, ChevronUp, RotateCcw } from 'lucide-react';

interface SearchAndFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: 'todos' | 'flores' | 'ceramica';
  setSelectedCategory: (category: 'todos' | 'flores' | 'ceramica') => void;
  totalProducts: number;
  filteredProducts: number;
}

export default function SearchAndFilter({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  totalProducts,
  filteredProducts,
}: SearchAndFilterProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = [
    { value: 'todos', label: 'Todos os Produtos' },
    { value: 'flores', label: 'Flores' },
    { value: 'ceramica', label: 'Cerâmica' }
  ];

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('todos');
  };

  const hasActiveFilters = searchTerm || selectedCategory !== 'todos';

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Procurar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-12 py-3.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white focus:bg-white"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

                 {/* Filter Button */}
         <div className="flex items-center space-x-3">
           <button
             onClick={() => setIsFilterOpen(!isFilterOpen)}
             className={`flex items-center px-4 py-2.5 rounded-lg transition-all duration-200 font-medium ${
               isFilterOpen 
                 ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' 
                 : 'bg-primary-50 text-primary-700 border border-primary-200 hover:bg-primary-100 hover:border-primary-300'
             }`}
           >
             <Filter className="w-4 h-4 mr-2" />
             Filtros
           </button>

           {hasActiveFilters && (
             <button
               onClick={clearFilters}
               className="flex items-center px-5 py-3 text-gray-500 hover:text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-lg transition-all duration-200 text-sm font-medium"
             >
               <RotateCcw className="w-4 h-4 mr-2" />
               Limpar
             </button>
           )}
         </div>
      </div>

      {/* Filter Panel */}
      {isFilterOpen && (
        <div className="mt-6 pt-6 border-t border-gray-100">
          {/* Header do painel de filtros com botão de minimizar */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-50 text-primary-600 hover:bg-primary-100 hover:text-primary-700 border border-primary-200 transition-all duration-200"
              title="Minimizar filtros"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Categoria
              </label>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category.value} className="flex items-center cursor-pointer group">
                    <div className="relative">
                      <input
                        type="radio"
                        name="category"
                        value={category.value}
                        checked={selectedCategory === category.value}
                        onChange={(e) => setSelectedCategory(e.target.value as 'todos' | 'flores' | 'ceramica')}
                        className="sr-only"
                      />
                                             <div className={`w-4 h-4 border-2 rounded-full flex items-center justify-center ${
                         selectedCategory === category.value 
                           ? 'border-amber-800 bg-amber-800' 
                           : 'border-gray-300'
                       }`}>
                        {selectedCategory === category.value && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                    </div>
                    <span className="ml-3 text-sm text-gray-700 group-hover:text-primary-600 transition-colors">
                      {category.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Resultados
              </label>
              <div className="text-sm text-gray-600 space-y-2">
                <p className="font-medium">A mostrar {filteredProducts} de {totalProducts} produtos</p>
                {hasActiveFilters && (
                  <p className="text-primary-600 font-medium">
                    Filtros activos
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Ações Rápidas
              </label>
                             <div className="space-y-1">
                 <button
                   onClick={() => setSelectedCategory('flores')}
                   className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 rounded-lg transition-all duration-200 border border-transparent hover:border-primary-200"
                 >
                   Ver apenas flores
                 </button>
                 <button
                   onClick={() => setSelectedCategory('ceramica')}
                   className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 rounded-lg transition-all duration-200 border border-transparent hover:border-primary-200"
                 >
                   Ver apenas cerâmica
                 </button>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-gray-700">Filtros activos:</span>
            {searchTerm && (
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                Procura: "{searchTerm}"
                <button
                  onClick={() => setSearchTerm('')}
                  className="ml-2 hover:text-blue-800 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedCategory !== 'todos' && (
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                Categoria: {selectedCategory === 'flores' ? 'Flores' : 'Cerâmica'}
                <button
                  onClick={() => setSelectedCategory('todos')}
                  className="ml-2 hover:text-green-800 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

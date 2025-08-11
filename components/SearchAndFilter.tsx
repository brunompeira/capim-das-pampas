'use client';

import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';

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
  filteredProducts
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
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Procurar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Filter Button */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <Filter className="w-5 h-5 mr-2" />
            Filtros
          </button>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center px-4 py-3 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              <X className="w-4 h-4 mr-1" />
              Limpar
            </button>
          )}
        </div>
      </div>

      {/* Filter Panel */}
      {isFilterOpen && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoria
              </label>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category.value} className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value={category.value}
                      checked={selectedCategory === category.value}
                      onChange={(e) => setSelectedCategory(e.target.value as 'todos' | 'flores' | 'ceramica')}
                      className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{category.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resultados
              </label>
              <div className="text-sm text-gray-600">
                <p>A mostrar {filteredProducts} de {totalProducts} produtos</p>
                {hasActiveFilters && (
                  <p className="text-primary-600 mt-1">
                    Filtros activos
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ações Rápidas
              </label>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory('flores')}
                  className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
                >
                  Ver apenas flores
                </button>
                <button
                  onClick={() => setSelectedCategory('ceramica')}
                  className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
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
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-600">Filtros activos:</span>
            {searchTerm && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Procura: "{searchTerm}"
                <button
                  onClick={() => setSearchTerm('')}
                  className="ml-1 hover:text-blue-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedCategory !== 'todos' && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Categoria: {selectedCategory === 'flores' ? 'Flores' : 'Cerâmica'}
                <button
                  onClick={() => setSelectedCategory('todos')}
                  className="ml-1 hover:text-green-600"
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

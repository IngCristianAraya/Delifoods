'use client';

import React, { useState } from 'react';
import { ProductCard } from './ProductCard';
import { CategoryFilter } from './CategoryFilter';
import { useApp } from '@/contexts/AppContext';

export function ProductGrid() {
  const { products } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) || product.description.toLowerCase().includes(search.toLowerCase());
    return product.available && matchesCategory && matchesSearch;
  });

  // PAGINACIÓN
  const [currentPage, setCurrentPage] = useState(1);
  // SSR-safe: productos por página fijo en SSR, se adapta en cliente
  const [productsPerPage, setProductsPerPage] = useState(8);
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setProductsPerPage(window.innerWidth < 768 ? 4 : 8);
    }
  }, []);

  // Reiniciar página cuando cambia productsPerPage
  React.useEffect(() => {
    setCurrentPage(1);
  }, [productsPerPage]);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIdx = (currentPage - 1) * productsPerPage;
  const endIdx = startIdx + productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIdx, endIdx);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestro Menú</h2>
          <p className="text-gray-600 text-lg">Explora nuestro menú</p>
        </div>
        
        {/* Bloque de búsqueda y categorías SOLO en móvil */}
        <div className="flex flex-col gap-3 mb-6 sticky top-2 z-20 bg-white/60 backdrop-blur-sm rounded-xl p-3 shadow-md block md:hidden">
          <input
            type="text"
            placeholder="Buscar por nombre o descripción..."
            value={search || ''}
            onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <CategoryFilter 
            selectedCategory={selectedCategory}
            onCategorySelect={cat => { setSelectedCategory(cat); setCurrentPage(1); }}
          />
        </div>
        {/* Desktop: solo categorías, sin buscador */}
        <div className="hidden md:block">
          <CategoryFilter 
            selectedCategory={selectedCategory}
            onCategorySelect={cat => { setSelectedCategory(cat); setCurrentPage(1); }}
          />
        </div>
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🍽️</div>
            <p className="text-gray-500 text-lg">No hay productos disponibles en esta categoría</p>
          </div>
        ) : (
          <>
            {/* Grid SOLO en móvil, igual que revistadigital-next */}
            <div className="grid grid-cols-2 gap-2 px-1 md:hidden">
              {paginatedProducts.map((product) => (
                <div className="min-w-0 w-full">
                  <ProductCard key={product.id} product={product} />
                </div>
              ))}
            </div>
            {/* Grid desktop original */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {/* Controles de paginación */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                  Anterior
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => goToPage(i + 1)}
                    className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-green-500 text-white' : 'bg-gray-100'}`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                  Siguiente
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
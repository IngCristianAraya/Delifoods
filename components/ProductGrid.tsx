'use client';

import React, { useState } from 'react';
import { ProductCard } from './ProductCard';
import { CategoryFilter } from './CategoryFilter';
import { useApp } from '@/contexts/AppContext';

export function ProductGrid() {
  const { products } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = selectedCategory 
    ? products.filter(product => product.category === selectedCategory && product.available)
    : products.filter(product => product.available);

  // PAGINACIÓN
  const [currentPage, setCurrentPage] = useState(1);
  // Cambia productos por página según el tamaño de pantalla
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const productsPerPage = isMobile ? 4 : 8;
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
        
        <CategoryFilter 
          selectedCategory={selectedCategory}
          onCategorySelect={cat => { setSelectedCategory(cat); setCurrentPage(1); }}
        />
        
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🍽️</div>
            <p className="text-gray-500 text-lg">No hay productos disponibles en esta categoría</p>
          </div>
        ) : (
          <>
            <div
              className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
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
'use client';

import React from 'react';
import { ProductCard } from './ProductCard';
import { useApp } from '@/contexts/AppContext';

export function FeaturedProducts() {
  const { products } = useApp();
  
  const featuredProducts = products.filter(product => product.featured && product.available);

  if (featuredProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Productos destacados</h2>
          <p className="text-gray-600 text-lg">Nuestros artículos más populares y deliciosos.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useApp } from '@/contexts/AppContext';

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
}

export function CategoryFilter({ selectedCategory, onCategorySelect }: CategoryFilterProps) {
  const { categories, products } = useApp();

  const getProductCount = (categoryId: string) => {
    return products.filter(product => product.category === categoryId && product.available).length;
  };

  const totalAvailableProducts = products.filter(product => product.available).length;

  return (
    <div className="w-full mb-6">
      {/* Grid SOLO en móvil */}
      <div className="grid grid-cols-2 gap-2 p-1 bg-white/80 rounded-lg shadow-sm block md:hidden">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          onClick={() => onCategorySelect(null)}
          className="flex items-center gap-2 whitespace-nowrap"
        >
          🍽️ Todo
          <Badge variant="secondary" className="ml-1">
            {totalAvailableProducts}
          </Badge>
        </Button>
        {categories
          .filter(category => category.active)
          .sort((a, b) => a.order - b.order)
          .map((category) => {
            const count = getProductCount(category.id);
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => onCategorySelect(category.id)}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                {category.icon} {category.name}
                <Badge variant="secondary" className="ml-1">
                  {count}
                </Badge>
              </Button>
            );
          })}
      </div>
      {/* Flex SOLO en desktop */}
      <div className="hidden md:flex gap-2 p-1 bg-white/80 rounded-lg shadow-sm">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          onClick={() => onCategorySelect(null)}
          className="flex items-center gap-2 whitespace-nowrap"
        >
          🍽️ Todo
          <Badge variant="secondary" className="ml-1">
            {totalAvailableProducts}
          </Badge>
        </Button>
        {categories
          .filter(category => category.active)
          .sort((a, b) => a.order - b.order)
          .map((category) => {
            const count = getProductCount(category.id);
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => onCategorySelect(category.id)}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                {category.icon} {category.name}
                <Badge variant="secondary" className="ml-1">
                  {count}
                </Badge>
              </Button>
            );
          })}
      </div>
    </div>
  );
}
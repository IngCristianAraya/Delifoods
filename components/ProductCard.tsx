'use client';

import React, { useState } from 'react';
import { Plus, Edit2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useApp } from '@/contexts/AppContext';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, isAdminMode } = useApp();
  const [notes, setNotes] = useState('');
  const [showNotes, setShowNotes] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, 1, notes);
    setNotes('');
    setShowNotes(false);
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] bg-white min-h-[370px] sm:min-h-[400px] flex flex-col justify-between p-0 md:p-0">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.featured && (
          <Badge className="absolute top-2 left-2 bg-red-500 text-white">
            Destacados
          </Badge>
        )}
        {/* Precio como Badge abajo a la derecha */}
        <Badge className="absolute bottom-2 right-2 bg-green-500 text-white shadow font-bold text-base px-3 py-1">
          S/{product.price}
        </Badge>
        {!product.available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="secondary" className="bg-gray-800 text-white">
              Agotado
            </Badge>
          </div>
        )}
        {isAdminMode && (
          <div className="absolute top-2 right-2 flex gap-1">
            <Button size="icon" variant="secondary" className="h-8 w-8">
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="secondary" className="h-8 w-8">
              {product.available ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </Button>
          </div>
        )}
      </div>
      
      <CardContent className="p-4 flex flex-col flex-1 justify-between">
        <div className="mb-2">
          <div className="flex flex-col items-start gap-1 md:flex-row md:items-center md:justify-between">
            <h3 className="font-semibold text-lg leading-tight md:text-left text-left w-full">{product.name}</h3>
          </div>
          <p className="text-gray-600 text-sm line-clamp-2 mt-1 text-left min-h-[42px] md:min-h-0">{product.description}</p>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex flex-col flex-1 justify-end">
        {product.available ? (
          <div className="w-full space-y-2">
            {showNotes && (
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-sm">Special instructions (optional)</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Extra cheese, no onions, etc."
                  className="min-h-[60px]"
                />
              </div>
            )}
            <div className="flex gap-2">
              <Button
                onClick={() => setShowNotes(!showNotes)}
                variant="outline"
                size="sm"
                className="w-1/2 md:flex-1"
              >
                {showNotes ? 'Ocultar notas' : '+ notas'}
              </Button>
              <Button
                onClick={handleAddToCart}
                className="w-1/2 md:flex-1 bg-green-500 hover:bg-green-600"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar
              </Button>
            </div>
          </div>
        ) : (
          <Button disabled className="w-full">
            Agotado
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
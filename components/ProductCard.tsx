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
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.featured && (
          <Badge className="absolute top-2 left-2 bg-red-500 text-white">
            Featured
          </Badge>
        )}
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
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg leading-tight">{product.name}</h3>
          <span className="text-2xl font-bold text-green-600">S/{product.price}</span>
        </div>
        <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
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
                className="flex-1"
              >
                {showNotes ? 'Ocultar notas' : 'Agregar notas'}
              </Button>
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-green-500 hover:bg-green-600"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar al carrito
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
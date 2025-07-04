'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product, Category, AppConfig, CartItem } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { defaultConfig, defaultCategories, defaultProducts } from '@/lib/data';

interface AppContextType {
  // Configuration
  config: AppConfig;
  setConfig: (config: AppConfig) => void;
  
  // Products
  products: Product[];
  setProducts: (products: Product[]) => void;
  
  // Categories
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, notes?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartItem: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  // UI State
  isAdminMode: boolean;
  setIsAdminMode: (mode: boolean) => void;
  
  // Utilities
  getCartTotal: () => number;
  getCartItemCount: () => number;
  generateWhatsAppMessage: () => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useLocalStorage<AppConfig>('ecommerce-config', defaultConfig);
  const [products, setProducts] = useLocalStorage<Product[]>('ecommerce-products', defaultProducts);
  const [categories, setCategories] = useLocalStorage<Category[]>('ecommerce-categories', defaultCategories);
  const [cart, setCart] = useLocalStorage<CartItem[]>('ecommerce-cart', []);
  const [isAdminMode, setIsAdminMode] = useState(false);

  const addToCart = (product: Product, quantity: number = 1, notes?: string) => {
    const existingItem = cart.find(item => item.product.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + quantity, notes: notes || item.notes }
          : item
      ));
    } else {
      setCart([...cart, { product, quantity, notes }]);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.product.id !== productId));
  };

  const updateCartItem = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(cart.map(item =>
      item.product.id === productId
        ? { ...item, quantity }
        : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const generateWhatsAppMessage = () => {
    const businessName = config.business.name;
    const items = cart.map(item => 
      `• ${item.product.name} x${item.quantity} - $${(item.product.price * item.quantity).toFixed(2)}${item.notes ? ` (${item.notes})` : ''}`
    ).join('\n');
    
    const total = getCartTotal();
    
    return `¡Hola! 👋 Me gustaría hacer un pedido en ${businessName}:

${items}

*Total: $${total.toFixed(2)}*

¿Podrían confirmar disponibilidad y tiempo de entrega?
¡Muchas gracias! 😊`;
  };

  return (
    <AppContext.Provider
      value={{
        config,
        setConfig,
        products,
        setProducts,
        categories,
        setCategories,
        cart,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
        isAdminMode,
        setIsAdminMode,
        getCartTotal,
        getCartItemCount,
        generateWhatsAppMessage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
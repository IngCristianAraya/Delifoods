'use client';

import { Hero } from '@/components/Hero';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { ProductGrid } from '@/components/ProductGrid';
import { BusinessInfo } from '@/components/BusinessInfo';
import { Header } from '@/components/Header';
import { AdminPanel } from '@/components/AdminPanel';
import { AppProvider, useApp } from '@/contexts/AppContext';

function AppContent() {
  const { isAdminMode } = useApp();

  if (isAdminMode) {
    return (
      <>
        <Header />
        <AdminPanel />
      </>
    );
  }

  return (
    <>
      <Header />
      <Hero />
      <FeaturedProducts />
      <div id="menu">
        <ProductGrid />
      </div>
      <BusinessInfo />
    </>
  );
}

export default function Home() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
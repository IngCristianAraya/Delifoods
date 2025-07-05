'use client';

import React from 'react';
import { ShoppingCart, Settings, Phone, MapPin, Clock, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet'; // SheetClose sigue siendo útil para otros cierres manuales si los necesitas
import { useApp } from '@/contexts/AppContext';
import { CartDrawer } from './CartDrawer';

export function Header() {
  const { config, getCartItemCount, isAdminMode, setIsAdminMode } = useApp();
  const cartCount = getCartItemCount();
  const [open, setOpen] = React.useState(false);
  const handleAdminClick = () => {
    setOpen(false); // Cierra el Sheet
    setTimeout(() => setIsAdminMode(!isAdminMode), 200); // Espera animación de cierre
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Business Name */}
          <div className="flex items-center gap-3">
            <img 
              src={config.business.logo} 
              alt={config.business.name}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="hidden sm:flex flex-col items-center">
              <h1 className="text-xl font-bold flex items-end">
                <span
                  style={{ color: config.theme.primaryColor }}
                  className="text-2xl sm:text-3xl font-extrabold mr-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.10)]"
                >
                  Deli
                </span>
                <span className="text-gray-900 text-xl sm:text-2xl font-bold">Foods</span>
              </h1>
              <p className="text-sm text-gray-600 -mt-1 leading-tight">Sabor en minutos.</p>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center gap-2 sm:hidden">
            <CartDrawer />
            {/* Sheet controlado para cierre automático al activar admin */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="p-0 max-w-full w-full h-full block md:hidden">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between px-4 pt-4 pb-2 border-b border-gray-100">
                    <img src={config.business.logo} alt={config.business.name} className="h-12 w-12 rounded-full object-cover" />
                  </div>
                  <div className="flex flex-col gap-4 px-6 py-8 flex-1 overflow-y-auto">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4" />
                      <span>{config.business.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4" />
                      <span>{config.business.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4" />
                      <span>{config.business.hours}</span>
                    </div>
                    <Button
                      onClick={handleAdminClick}
                      className="w-full bg-green-100 text-green-800 hover:bg-green-200 border-0 shadow-none font-semibold"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      {isAdminMode ? "Salir de administrador" : "Administrador Panel"}
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone className="h-4 w-4" />
              <span>+51 906684284</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>Abierto ahora</span>
            </div>
            <CartDrawer />
            <Button
              variant={isAdminMode ? "default" : "outline"}
              size="sm"
              onClick={() => setIsAdminMode(!isAdminMode)}
            >
              <Settings className="h-4 w-4 mr-2" />
              {isAdminMode ? "Salir de administrador" : "Administrador"}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
'use client';

import React from 'react';
import { MessageCircle, Truck, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/contexts/AppContext';

export function Hero() {
  const { config } = useApp();
  const { business } = config;

  const handleWhatsAppOrder = () => {
    const message = `¡Hola! 👋 Me gustaría hacer un pedido en ${business.name}. ¿Podrían ayudarme con el menú?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${business.whatsapp.replace(/\D/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="relative min-h-[80vh] bg-gradient-to-br from-green-50 via-blue-50 to-white flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full bg-gray-100 bg-opacity-20"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">
              🎉 ¡Ahora con delivery!
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Comida deliciosa
              <span className="text-green-600 block">Entregada fresca</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              {business.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button 
                onClick={handleWhatsAppOrder}
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Pedir por WhatsApp
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-4 text-lg"
                onClick={() => {
                  document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Ver Menú
              </Button>
            </div>
            
            {/* Features */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Truck className="h-5 w-5 text-green-600" />
                <span>Delivery gratis por compras mayores a S/50</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="h-5 w-5 text-green-600" />
                <span>30-60 min</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Star className="h-5 w-5 text-green-600" />
                <span>Calificación 4.9</span>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4 transform rotate-6 scale-110">
              <img 
                src="https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2"
                alt="Hamburguesa deliciosa"
                className="rounded-2xl shadow-2xl transform -rotate-6 hover:rotate-0 transition-transform duration-300"
              />
              <img 
                src="https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2"
                alt="Pizza fresca"
                className="rounded-2xl shadow-2xl transform rotate-6 hover:rotate-0 transition-transform duration-300 mt-8"
              />
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-lg p-3 transform rotate-12 hover:rotate-0 transition-transform duration-300">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Frescura diaria</span>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-3 transform -rotate-12 hover:rotate-0 transition-transform duration-300">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-sm font-medium">Caliente y listo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
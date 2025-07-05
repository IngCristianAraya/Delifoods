'use client';

import React from 'react';
import { Phone, MapPin, Clock, Facebook, Instagram, Twitter, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/contexts/AppContext';

export function BusinessInfo() {
  const { config } = useApp();
  const { business, delivery } = config;

  const handleWhatsAppContact = () => {
    const message = `¡Hola! 👋 Me gustaría obtener más información sobre ${business.name}. ¡Gracias!`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${business.whatsapp.replace(/\D/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Business Information */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <img 
                  src={business.logo} 
                  alt={business.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                Sobre nosotros
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-600 text-lg leading-relaxed">
                {business.description}
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-green-800" />
                  <span className="font-medium">{business.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-green-800" />
                  <span>{business.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-green-800" />
                  <span>{business.hours}</span>
                </div>
              </div>

              <div className="mb-4 flex items-center gap-2">
                <span className="text-3xl font-extrabold text-green-800 drop-shadow-md">Deli</span>
                <span className="text-3xl font-extrabold text-black">Foods</span>
              </div>
              <div className="flex gap-3">
                <Button 
                  onClick={handleWhatsAppContact}
                  className="bg-green-500 hover:bg-green-600"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contacto
                </Button>
                {business.socialMedia.facebook && (
                  <Button variant="outline" asChild>
                    <a 
                      href={business.socialMedia.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Ir a Facebook Delifoods"
                      title="Facebook Delifoods"
                    >
                      <Facebook className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                {business.socialMedia.instagram && (
                  <Button variant="outline" asChild>
                    <a 
                      href={business.socialMedia.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Ir a Instagram Delifoods"
                      title="Instagram Delifoods"
                    >
                      <Instagram className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Delivery Information */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                🚚 Delivery
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-2">
                <Badge className="bg-green-500 text-white">Disponible</Badge>
                <span className="text-gray-600">Tiempo estimado: {delivery.estimatedTime}</span>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Zonas de delivery:</h4>
                {delivery.zones.map((zone) => (
                  <div key={zone.id} className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
                    <div>
                      <p className="font-medium">{zone.name}</p>
                      <p className="text-sm text-gray-600">{zone.description}</p>
                    </div>
                    <Badge variant="outline" className="text-green-800">
                      S/{zone.cost}
                    </Badge>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  💡 <strong>Consejo:</strong> ¡Delivery gratis por compras mayores a S/50!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
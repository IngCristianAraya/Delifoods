'use client';

import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/contexts/AppContext';
import { Product } from '@/types';

export function AdminPanel() {
  const { products, setProducts, categories, config, setConfig } = useApp();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    price: 0,
    image: '',
    description: '',
    category: '',
    available: true,
    featured: false,
  });
  // Estado para tab activo (responsive)
  const [tab, setTab] = useState<string>('products');

  const handleSaveProduct = () => {
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
      setEditingProduct(null);
    } else {
      const product: Product = {
        ...newProduct as Product,
        id: Date.now().toString(),
      };
      setProducts([...products, product]);
      setNewProduct({
        name: '',
        price: 0,
        image: '',
        description: '',
        category: '',
        available: true,
        featured: false,
      });
    }
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const toggleProductAvailability = (id: string) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, available: !p.available } : p
    ));
  };

  if (!config) return null;

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
          <p className="text-gray-600">Gestionar tus productos y configuración</p>
        </div>

        {/* Responsive Tabs: Select en móvil, Tabs horizontales en desktop */}
        <Tabs value={tab} onValueChange={setTab} className="space-y-8">
          {/* Desktop: Tabs horizontales */}
          <TabsList className="hidden md:grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="products">Productos</TabsTrigger>
            <TabsTrigger value="business">Información de la Empresa</TabsTrigger>
            <TabsTrigger value="settings">Configuración</TabsTrigger>
          </TabsList>
          {/* Mobile: Select */}
          <div className="block md:hidden mb-4">
            <Select value={tab} onValueChange={setTab}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="products">Productos</SelectItem>
                <SelectItem value="business">Información de la Empresa</SelectItem>
                <SelectItem value="settings">Configuración</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <TabsContent value="products">
            {/* Contenedor principal para el formulario y la lista de productos */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Product Form */}
              <Card className="w-full max-w-sm mx-auto md:max-w-md lg:max-w-none lg:mx-0">
                <CardHeader>
                  <CardTitle>
                    {editingProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-4 md:p-6 flex flex-col items-center">
                  <div className="w-full max-w-sm space-y-4"> {/* Contenedor interno para el formulario */}
                    <div className="space-y-1 w-full">
                      <Label htmlFor="name">Nombre del Producto</Label>
                      <Input
                        id="name"
                        className="w-full"
                        value={editingProduct?.name || newProduct.name}
                        onChange={(e) => {
                          if (editingProduct) {
                            setEditingProduct({...editingProduct, name: e.target.value});
                          } else {
                            setNewProduct({...newProduct, name: e.target.value});
                          }
                        }}
                      />
                    </div>

                    <div className="space-y-1 w-full">
                      <Label htmlFor="price">Precio</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        className="w-full"
                        value={editingProduct?.price || newProduct.price}
                        onChange={(e) => {
                          const price = parseFloat(e.target.value) || 0;
                          if (editingProduct) {
                            setEditingProduct({...editingProduct, price});
                          } else {
                            setNewProduct({...newProduct, price});
                          }
                        }}
                      />
                    </div>

                    <div className="space-y-1 w-full">
                      <Label htmlFor="image">URL de la imagen</Label>
                      <Input
                        id="image"
                        className="w-full"
                        value={editingProduct?.image || newProduct.image}
                        onChange={(e) => {
                          if (editingProduct) {
                            setEditingProduct({...editingProduct, image: e.target.value});
                          } else {
                            setNewProduct({...newProduct, image: e.target.value});
                          }
                        }}
                      />
                    </div>

                    <div className="space-y-1 w-full">
                      <Label htmlFor="category">Categoría</Label>
                      <Select
                        value={editingProduct?.category || newProduct.category}
                        onValueChange={(value) => {
                          if (editingProduct) {
                            setEditingProduct({...editingProduct, category: value});
                          } else {
                            setNewProduct({...newProduct, category: value});
                          }
                        }}
                      >
                        <SelectTrigger id="category" className="w-full">
                          <SelectValue placeholder="Selecciona una categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1 w-full">
                      <Label htmlFor="description">Descripción</Label>
                      <Textarea
                        id="description"
                        className="w-full"
                        value={editingProduct?.description || newProduct.description}
                        onChange={(e) => {
                          if (editingProduct) {
                            setEditingProduct({...editingProduct, description: e.target.value});
                          } else {
                            setNewProduct({...newProduct, description: e.target.value});
                          }
                        }}
                      />
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="available"
                          checked={editingProduct?.available || newProduct.available}
                          onCheckedChange={(checked) => {
                            if (editingProduct) {
                              setEditingProduct({...editingProduct, available: checked});
                            } else {
                              setNewProduct({...newProduct, available: checked});
                            }
                          }}
                        />
                        <Label htmlFor="available">Disponible</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="featured"
                          checked={editingProduct?.featured || newProduct.featured}
                          onCheckedChange={(checked) => {
                            if (editingProduct) {
                              setEditingProduct({...editingProduct, featured: checked});
                            } else {
                              setNewProduct({...newProduct, featured: checked});
                            }
                          }}
                        />
                        <Label htmlFor="featured">Destacado</Label>
                      </div>
                    </div>

                    <div className="flex gap-2 w-full">
                      <Button onClick={handleSaveProduct} className="flex-1">
                        <Save className="h-4 w-4 mr-2" />
                        {editingProduct ? 'Actualizar' : 'Agregar'} Producto
                      </Button>
                      {editingProduct && (
                        <Button
                          variant="outline"
                          onClick={() => setEditingProduct(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Products List */}
              <div className="lg:col-span-2">
                <Card className="w-full max-w-sm mx-auto md:max-w-md lg:max-w-none lg:mx-0"> {/* Añado clases para centrar */}
                  <CardHeader>
                    <CardTitle className="text-center md:text-left">Admin Panel</CardTitle>
                    <p className="text-center md:text-left text-gray-500 text-sm">Gestionar tus productos y configuración</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {products.map((product) => (
                        <div key={product.id} className="p-4 border rounded-lg bg-white flex flex-col md:flex-row md:items-center md:gap-4">
                          {/* Imagen arriba en móvil, a la izquierda en desktop */}
                          <div className="flex flex-row md:flex-col items-start md:items-center gap-4 w-full">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded-lg mb-2 md:mb-0"
                            />
                            <div className="flex flex-col flex-1">
                              <div className="flex flex-row items-center gap-2 mb-1">
                                <h3 className="font-medium text-base">{product.name}</h3>
                                <Badge variant={product.available ? "default" : "secondary"}>
                                  {product.available ? "Available" : "Out of Stock"}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-1">{product.description}</p>
                              <p className="text-lg font-semibold text-green-600">S/ {product.price}</p>
                            </div>
                          </div>
                          {/* Acciones abajo en móvil, a la derecha en desktop */}
                          <div className="flex justify-between md:flex-col gap-2 mt-4 md:mt-0 w-full md:w-auto">
                            <Button variant="ghost" size="icon" title="Ocultar" onClick={() => toggleProductAvailability(product.id)}>
                              <EyeOff className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon" title="Editar" onClick={() => setEditingProduct(product)}>
                              <Edit2 className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon" title="Eliminar" onClick={() => handleDeleteProduct(product.id)}>
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="business">
            <Card className="w-full max-w-md mx-auto"> {/* Centrar la tarjeta de información de la empresa */}
              <CardHeader>
                <CardTitle>Información de la Empresa</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="businessName">Nombre de la Empresa</Label>
                    <Input
                      id="businessName"
                      value={config.business.name}
                      onChange={(e) => setConfig({
                        ...config,
                        business: {...config.business, name: e.target.value}
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Número de Telefono</Label>
                    <Input
                      id="phone"
                      value={config.business.phone}
                      onChange={(e) => setConfig({
                        ...config,
                        business: {...config.business, phone: e.target.value}
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="whatsapp">Número de WhatsApp</Label>
                    <Input
                      id="whatsapp"
                      value={config.business.whatsapp}
                      onChange={(e) => setConfig({
                        ...config,
                        business: {...config.business, whatsapp: e.target.value}
                      })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Correo Electronico</Label>
                    <Input
                      id="email"
                      value={config.business.email}
                      onChange={(e) => setConfig({
                        ...config,
                        business: {...config.business, email: e.target.value}
                      })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Dirección</Label>
                  <Input
                    id="address"
                    value={config.business.address}
                    onChange={(e) => setConfig({
                      ...config,
                      business: {...config.business, address: e.target.value}
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="hours">Horario de Atención</Label>
                  <Input
                    id="hours"
                    value={config.business.hours}
                    onChange={(e) => setConfig({
                      ...config,
                      business: {...config.business, hours: e.target.value}
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    value={config.business.description}
                    onChange={(e) => setConfig({
                      ...config,
                      business: {...config.business, description: e.target.value}
                    })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="w-full max-w-md mx-auto"> {/* Centrar la tarjeta de configuración */}
              <CardHeader>
                <CardTitle>Configuración de la App</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Colores del Tema</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="primaryColor">Color Primario</Label>
                        <Input
                          id="primaryColor"
                          type="color"
                          value={config.theme.primaryColor}
                          onChange={(e) => setConfig({
                            ...config,
                            theme: {...config.theme, primaryColor: e.target.value}
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="secondaryColor">Color Secundario</Label>
                        <Input
                          id="secondaryColor"
                          type="color"
                          value={config.theme.secondaryColor}
                          onChange={(e) => setConfig({
                            ...config,
                            theme: {...config.theme, secondaryColor: e.target.value}
                          })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="accentColor">Accent Color</Label>
                        <Input
                          id="accentColor"
                          type="color"
                          value={config.theme.accentColor}
                          onChange={(e) => setConfig({
                            ...config,
                            theme: {...config.theme, accentColor: e.target.value}
                          })}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Configuración de Delivery</h3>
                    <div className="flex items-center space-x-2 mb-4">
                      <Switch
                        id="deliveryEnabled"
                        checked={config.delivery.enabled}
                        onCheckedChange={(checked) => setConfig({
                          ...config,
                          delivery: {...config.delivery, enabled: checked}
                        })}
                      />
                      <Label htmlFor="deliveryEnabled">Habilitar Servicio de Entrega</Label>
                    </div>
                    <div>
                      <Label htmlFor="estimatedTime">Tiempo de Entrega</Label>
                      <Input
                        id="estimatedTime"
                        value={config.delivery.estimatedTime}
                        onChange={(e) => setConfig({
                          ...config,
                          delivery: {...config.delivery, estimatedTime: e.target.value}
                        })}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
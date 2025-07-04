'use client';

import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
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
          <p className="text-gray-600">Manage your products and business settings</p>
        </div>

        <Tabs defaultValue="products" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="business">Business Info</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Product Form */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
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

                  <div>
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
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

                  <div>
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
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

                  <div>
                    <Label htmlFor="category">Category</Label>
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
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.icon} {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
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
                      <Label htmlFor="available">Available</Label>
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
                      <Label htmlFor="featured">Featured</Label>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleSaveProduct} className="flex-1">
                      <Save className="h-4 w-4 mr-2" />
                      {editingProduct ? 'Update' : 'Add'} Product
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
                </CardContent>
              </Card>

              {/* Products List */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Products ({products.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {products.map((product) => (
                        <div key={product.id} className="flex items-center gap-4 p-4 border rounded-lg">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium">{product.name}</h3>
                              {product.featured && (
                                <Badge className="bg-red-500 text-white">Featured</Badge>
                              )}
                              <Badge variant={product.available ? "default" : "secondary"}>
                                {product.available ? "Available" : "Out of Stock"}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{product.description}</p>
                            <p className="text-lg font-semibold text-green-600">${product.price}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleProductAvailability(product.id)}
                            >
                              {product.available ? 'Hide' : 'Show'}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingProduct(product)}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              <Trash2 className="h-4 w-4" />
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
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="businessName">Business Name</Label>
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
                    <Label htmlFor="phone">Phone Number</Label>
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
                    <Label htmlFor="whatsapp">WhatsApp Number</Label>
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
                    <Label htmlFor="email">Email</Label>
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
                  <Label htmlFor="address">Address</Label>
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
                  <Label htmlFor="hours">Business Hours</Label>
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
                  <Label htmlFor="description">Description</Label>
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
            <Card>
              <CardHeader>
                <CardTitle>App Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Theme Colors</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="primaryColor">Primary Color</Label>
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
                        <Label htmlFor="secondaryColor">Secondary Color</Label>
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
                    <h3 className="text-lg font-semibold mb-4">Delivery Settings</h3>
                    <div className="flex items-center space-x-2 mb-4">
                      <Switch
                        id="deliveryEnabled"
                        checked={config.delivery.enabled}
                        onCheckedChange={(checked) => setConfig({
                          ...config,
                          delivery: {...config.delivery, enabled: checked}
                        })}
                      />
                      <Label htmlFor="deliveryEnabled">Enable Delivery Service</Label>
                    </div>
                    <div>
                      <Label htmlFor="estimatedTime">Estimated Delivery Time</Label>
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
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  available: boolean;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  active: boolean;
  order: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  notes?: string;
}

export interface BusinessInfo {
  name: string;
  logo: string;
  description: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  hours: string;
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}

export interface DeliveryInfo {
  enabled: boolean;
  zones: DeliveryZone[];
  estimatedTime: string;
}

export interface DeliveryZone {
  id: string;
  name: string;
  cost: number;
  description: string;
}

export interface AppConfig {
  business: BusinessInfo;
  delivery: DeliveryInfo;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    backgroundPattern: string;
  };
}
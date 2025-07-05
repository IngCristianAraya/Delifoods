import { Product, Category, AppConfig } from '@/types';

export const defaultConfig: AppConfig = {
  business: {
    name: "DeliFoods",
    logo: "/logo.svg",
    description: "Los mejores sabores para tu hogar, preparados con amor y ingredientes frescos.",
    phone: "+51 906 684 284",
    whatsapp: "+51 906 684 284",
    email: "info@delifoods.com",
    address: "Santa paula 470",
    hours: "Lunes a Domingo: 7:00 PM - 11:00 PM",
    socialMedia: {
      facebook: "https://facebook.com/delifoods",
      instagram: "https://instagram.com/delifoods",
    }
  },
  delivery: {
    enabled: true,
    zones: [
      { id: "1", name: "Pando Tercera Etapa", cost: 5, description: "Entrega en 30-45 min" },
      { id: "2", name: "Palomino", cost: 5, description: "Entrega en 45-60 min" },
      { id: "3", name: "Santa Emma", cost: 5, description: "Entrega en 45-60 min" },
    ],
    estimatedTime: "30-60 minutos"
  },
  theme: {
    primaryColor: "#22C55E",
    secondaryColor: "#F97316",
    accentColor: "#3B82F6",
    backgroundPattern: "subtle-prism"
  }
};

export const defaultCategories: Category[] = [
  { id: "1", name: "Hamburguesas", icon: "🍔", active: true, order: 1 },
  { id: "2", name: "BBQ", icon: "🍕", active: true, order: 2 },
  { id: "3", name: "Combos", icon: "🍽️", active: true, order: 3 },
  { id: "4", name: "Bebidas", icon: "🥤", active: true, order: 4 },
  { id: "5", name: "Al Plato", icon: "🍽️", active: true, order: 5 },
  { id: "6", name: "Ensaladas", icon: "🥗", active: true, order: 6 },
  { id: "7", name: "Broaster", icon: "🍗", active: true, order: 7 },
];

export const defaultProducts: Product[] = [
  // Hamburguesas
  {
    id: "1",
    name: "Hamburg. Clásica",
    price: 18,
    image: "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&fit=crop&w=400&q=80",
    description: "Carne de res, lechuga, tomate, queso cheddar y salsa.",
    category: "1",
    available: true,
    featured: true,
  },
  {
    id: "2",
    name: "Hamburg. BBQ",
    price: 20,
    image: "https://images.pexels.com/photos/1639566/pexels-photo-1639566.jpeg?auto=compress&fit=crop&w=400&q=80",
    description: "Hamburguesa con salsa BBQ y queso cheddar.",
    category: "1",
    available: true,
    featured: false,
  },
  // BBQ
  {
    id: "3",
    name: "Alitas BBQ",
    price: 14,
    image: "https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2",
    description: "Alitas BBQ (papas fritas + ensalada)",
    category: "2",
    available: true,
    featured: false,
  },
  {
    id: "4",
    name: "Deditos BBQ",
    price: 14,
    image: "https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2",
    description: "Deditos BBQ (papas fritas + ensalada)",
    category: "2",
    available: true,
  },
  // Combos
  {
    id: "5",
    name: "Combo Familiar",
    price: 55,
    image: "https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&fit=crop&w=400&q=80",
    description: "2 hamburguesas + papas grandes + 2 bebidas + postre para compartir.",
    category: "3",
    available: true,
  },
  // Bebidas
  {
    id: "6",
    name: "Chicha 1/2L",
    price: 4,
    image: "https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2",
    description: "Chicha de 1/2 litro",
    category: "4",
    available: true,
  },
  {
    id: "7",
    name: "Maracuya 1/2L",
    price: 4,
    image: "https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2",
    description: "Maracuya 1/2 litro",
    category: "4",
    available: true,
    featured: false,
  },
  {
    id: "8",
    name: "CocaCola 1/2L",
    price: 3.5,
    image: "https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2",
    description: "Coca Cola 1/2 litro",
    category: "4",
    available: true,
  },
  // Al Plato
  {
    id: "9",
    name: "Salchipapa Clás.",
    price: 9,
    image: "https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&fit=crop&w=400&q=80",
    description: "Salchipapa clásica 400 gramos",
    category: "5",
    available: true,
  },
  {
    id: "10",
    name: "Salchipapa Royal",
    price: 11,
    image: "https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&fit=crop&w=400&q=80",
    description: "Salchipapa royal 400 gramos (hot dog, huevo, queso)",
    category: "5",
    available: true,
  },
  // Ensaladas
  {
    id: "11",
    name: "Ensalada César",
    price: 18,
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&fit=crop&w=400&q=80",
    description: "Lechuga romana, crutones, queso parmesano y aderezo césar casero.",
    category: "6",
    available: true,
  },
  // Broaster
  {
    id: "12",
    name: "Alita Broaster",
    price: 10,
    image: "https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2",
    description: "Alita broaster con papas fritas.",
    category: "7",
    available: true,
  },
];
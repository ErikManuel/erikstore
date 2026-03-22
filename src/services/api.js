import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock de productos para desarrollo (hasta tener Strapi)
export const mockProducts = [
  {
    id: 1,
    name: 'Laptop Ultrabook Pro',
    price: 1299.99,
    description: 'Laptop de última generación con procesador Intel i7, 16GB RAM, 512GB SSD',
    image: 'https://picsum.photos/id/0/400/400',
    category: 'Electrónica',
    stock: 10,
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Smartphone X Pro',
    price: 899.99,
    description: 'Smartphone con cámara de 108MP, pantalla AMOLED 6.7"',
    image: 'https://picsum.photos/id/1/400/400',
    category: 'Electrónica',
    stock: 15,
    rating: 4.6,
  },
  {
    id: 3,
    name: 'Auriculares Bluetooth',
    price: 79.99,
    description: 'Auriculares inalámbricos con cancelación de ruido',
    image: 'https://picsum.photos/id/2/400/400',
    category: 'Audio',
    stock: 25,
    rating: 4.5,
  },
  {
    id: 4,
    name: 'Smartwatch Fitness',
    price: 199.99,
    description: 'Reloj inteligente con monitoreo de actividad física',
    image: 'https://picsum.photos/id/3/400/400',
    category: 'Wearables',
    stock: 20,
    rating: 4.7,
  },
  {
    id: 5,
    name: 'Tablet Pro',
    price: 499.99,
    description: 'Tablet con pantalla de 11", 128GB almacenamiento',
    image: 'https://picsum.photos/id/4/400/400',
    category: 'Electrónica',
    stock: 12,
    rating: 4.4,
  },
  {
    id: 6,
    name: 'Cámara Mirrorless',
    price: 799.99,
    description: 'Cámara sin espejo con lente intercambiable',
    image: 'https://picsum.photos/id/5/400/400',
    category: 'Fotografía',
    stock: 8,
    rating: 4.9,
  },
];

export const getProducts = async (filters = {}) => {
  // Simular delay de API
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let products = [...mockProducts];
  
  // Filtrar por categoría
  if (filters.category) {
    products = products.filter(p => p.category === filters.category);
  }
  
  // Filtrar por precio
  if (filters.minPrice) {
    products = products.filter(p => p.price >= filters.minPrice);
  }
  if (filters.maxPrice) {
    products = products.filter(p => p.price <= filters.maxPrice);
  }
  
  // Buscar por nombre
  if (filters.search) {
    products = products.filter(p => 
      p.name.toLowerCase().includes(filters.search.toLowerCase())
    );
  }
  
  // Ordenar
  if (filters.sort) {
    switch(filters.sort) {
      case 'price_asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        products.sort((a, b) => b.rating - a.rating);
        break;
    }
  }
  
  return products;
};

export const getProductById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockProducts.find(p => p.id === parseInt(id));
};

export default api;
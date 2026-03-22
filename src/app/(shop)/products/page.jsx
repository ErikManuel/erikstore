'use client';
import { useState } from 'react';
import { useProducts } from '@/hooks/useProducts';
import ProductGrid from '@/components/products/ProductGrid/ProductGrid';
import ProductFilters from '@/components/products/ProductFilters/ProductFilters';
import './products.scss';

export default function ProductsPage() {
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    sort: '',
    search: ''
  });

  const { products, loading, error } = useProducts(filters);

  return (
    <div className="products-page">
      <div className="container">
        <div className="products-header">
          <h1>Nuestros Productos</h1>
          <p>Descubre la mejor selección de productos tecnológicos</p>
        </div>

        <div className="products-layout">
          <aside className="products-sidebar">
            <ProductFilters filters={filters} setFilters={setFilters} />
          </aside>
          
          <main className="products-main">
            <div className="products-toolbar">
              <span className="results-count">
                {products.length} productos encontrados
              </span>
            </div>
            
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}
            
            <ProductGrid products={products} loading={loading} />
          </main>
        </div>
      </div>
    </div>
  );
}

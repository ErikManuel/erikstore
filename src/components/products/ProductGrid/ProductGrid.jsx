'use client';
import ProductCard from '../ProductCard/ProductCard';
import Skeleton from '@/components/common/Skeleton/Skeleton';
import './ProductGrid.scss';

export default function ProductGrid({ products, loading }) {
  if (loading) {
    return (
      <div className="product-grid">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} height={300} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="empty-products">
        <p>No se encontraron productos</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
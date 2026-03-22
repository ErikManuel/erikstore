'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import Button from '@/components/common/Button/Button';
import './ProductCard.scss';

export default function ProductCard({ product }) {
  const { addItem } = useCartStore();

  return (
    <div className="product-card fade-in">
      <Link href={`/products/${product.id}`}>
        <div className="product-image">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            loading="lazy"
          />
          {product.rating && (
            <div className="product-rating">
              <i className="fas fa-star"></i> {product.rating}
            </div>
          )}
        </div>
      </Link>
      
      <div className="product-info">
        <Link href={`/products/${product.id}`} className="product-title-link">
          <h3 className="product-title">{product.name}</h3>
        </Link>
        <p className="product-category">{product.category}</p>
        <p className="product-price">
          ${product.price.toLocaleString('es-MX')}
        </p>
        <Button
          variant="primary"
          size="small"
          fullWidth
          onClick={() => addItem(product)}
        >
          <i className="fas fa-cart-plus"></i> Agregar
        </Button>
      </div>
    </div>
  );
}
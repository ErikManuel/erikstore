'use client';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useProduct } from '@/hooks/useProducts';
import { useCartStore } from '@/store/cartStore';
import Button from '@/components/common/Button/Button';
import Skeleton from '@/components/common/Skeleton/Skeleton';
import './product-detail.scss';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { product, loading, error } = useProduct(id);
  const { addItem } = useCartStore();

  if (loading) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <div className="product-detail-grid">
            <Skeleton height={500} />
            <div>
              <Skeleton height={40} width="80%" />
              <Skeleton height={30} width="30%" />
              <Skeleton height={100} />
              <Skeleton height={50} width="50%" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container">
        <div className="error-container">
          <i className="fas fa-exclamation-triangle"></i>
          <h2>Producto no encontrado</h2>
          <Link href="/products" className="back-link">
            <i className="fas fa-arrow-left"></i> Volver a productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="container">
        <div className="breadcrumb">
          <Link href="/"><i className="fas fa-home"></i> Inicio</Link>
          <span>/</span>
          <Link href="/products">Productos</Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>

        <div className="product-detail-grid">
          <div className="product-gallery">
            <div className="main-image">
              <Image
                src={product.image}
                alt={product.name}
                width={600}
                height={600}
                priority
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>

          <div className="product-info-detail">
            <h1 className="product-name">{product.name}</h1>
            <div className="product-meta">
              <span className="product-category">
                <i className="fas fa-tag"></i> {product.category}
              </span>
              {product.rating && (
                <span className="product-rating">
                  <i className="fas fa-star"></i> {product.rating}
                </span>
              )}
            </div>
            
            <p className="product-description">{product.description}</p>
            
            <div className="product-price-detail">
              ${product.price.toLocaleString('es-MX')}
            </div>
            
            <div className="product-stock">
              {product.stock > 0 ? (
                <span className="in-stock">
                  <i className="fas fa-check-circle"></i> En stock ({product.stock} unidades)
                </span>
              ) : (
                <span className="out-stock">
                  <i className="fas fa-times-circle"></i> Agotado
                </span>
              )}
            </div>
            
            <Button
              variant="primary"
              size="large"
              fullWidth
              onClick={() => addItem(product)}
              disabled={product.stock === 0}
            >
              <i className="fas fa-cart-plus"></i> Agregar al Carrito
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
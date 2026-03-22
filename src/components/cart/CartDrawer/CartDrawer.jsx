'use client';
import { useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';
import CartItem from '../CartItem/CartItem';
import Button from '@/components/common/Button/Button';
import Link from 'next/link';
import './CartDrawer.scss';

export default function CartDrawer() {
  const { items, isOpen, closeCart, getTotal, clearCart } = useCartStore();
  const total = getTotal();

  // Cerrar con tecla ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeCart();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={closeCart} />
      
      <div className="cart-drawer open">
        <div className="cart-header">
          <h2>Mi Carrito</h2>
          <button className="close-btn" onClick={closeCart}>×</button>
        </div>
        
        <div className="cart-content">
          {items.length === 0 ? (
            <div className="empty-cart">
              <p>Tu carrito está vacío</p>
              <Button onClick={closeCart} variant="primary">
                Seguir comprando
              </Button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {items.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
              
              <div className="cart-footer">
                <div className="cart-total">
                  <span>Total:</span>
                  <strong>${total.toLocaleString('es-MX')}</strong>
                </div>
                
                <div className="cart-actions">
                  <Button variant="outline" onClick={clearCart}>
                    Vaciar carrito
                  </Button>
                  <Link href="/checkout" onClick={closeCart}>
                    <Button variant="primary" fullWidth>
                      Proceder al pago
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
'use client';
import { useCartStore } from '@/store/cartStore';
import './OrderSummary.scss';

export default function OrderSummary() {
  const { items, getTotal } = useCartStore();
  const subtotal = getTotal();
  const shipping = subtotal > 1000 ? 0 : 99.99;
  const total = subtotal + shipping;

  return (
    <div className="order-summary">
      <h3>Resumen del Pedido</h3>
      
      <div className="summary-items">
        {items.map(item => (
          <div key={item.id} className="summary-item">
            <div className="item-info">
              <span className="item-name">{item.name}</span>
              <span className="item-quantity">x{item.quantity}</span>
            </div>
            <span className="item-price">
              ${(item.price * item.quantity).toLocaleString('es-MX')}
            </span>
          </div>
        ))}
      </div>
      
      <div className="summary-totals">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>${subtotal.toLocaleString('es-MX')}</span>
        </div>
        
        <div className="summary-row">
          <span>Envío</span>
          <span>{shipping === 0 ? 'Gratis' : `$${shipping.toLocaleString('es-MX')}`}</span>
        </div>
        
        <div className="summary-row total">
          <span>Total</span>
          <strong>${total.toLocaleString('es-MX')}</strong>
        </div>
      </div>
    </div>
  );
}
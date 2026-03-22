'use client';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import './CartItem.scss';

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <Image
          src={item.image}
          alt={item.name}
          width={80}
          height={80}
          style={{ objectFit: 'cover' }}
        />
      </div>
      
      <div className="cart-item-info">
        <h4>{item.name}</h4>
        <p className="item-price">${item.price.toLocaleString('es-MX')}</p>
        
        <div className="item-quantity">
          <button
            className="qty-btn"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            <i className="fas fa-minus"></i>
          </button>
          <span className="qty-number">{item.quantity}</span>
          <button
            className="qty-btn"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>
        
        <div className="item-subtotal">
          <i className="fas fa-tag"></i> Subtotal: ${(item.price * item.quantity).toLocaleString('es-MX')}
        </div>
        
        <button
          className="remove-item"
          onClick={() => removeItem(item.id)}
        >
          <i className="fas fa-trash-alt"></i> Eliminar
        </button>
      </div>
    </div>
  );
}
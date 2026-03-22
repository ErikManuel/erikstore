'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { useAuth } from '@/context/AuthContext';
import CheckoutForm from '@/components/checkout/CheckoutForm/CheckoutForm';
import OrderSummary from '@/components/checkout/OrderSummary/OrderSummary';
import CelebrationModal from '@/components/common/SuccessModal/SuccessModal';
import './checkout.scss';

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { items, clearCart, getTotal } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [isCheckingCart, setIsCheckingCart] = useState(true);
  const [showCelebration, setShowCelebration] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Verificar carrito
  useEffect(() => {
    if (items.length === 0 && !showCelebration) {
      router.push('/products');
    } else if (items.length > 0) {
      setIsCheckingCart(false);
    }
  }, [items.length, router, showCelebration]);

  if (isCheckingCart && !showCelebration) {
    return (
      <div className="checkout-loading">
        <div className="container">
          <div className="loading-spinner">
            <i className="fas fa-spinner fa-spin"></i>
            <p>Verificando carrito...</p>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = (values) => {
    setLoading(true);
    
    const newOrderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    setOrderNumber(newOrderNumber);
    
    clearCart();
    setShowCelebration(true);
    
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  const handleCloseCelebration = () => {
    setShowCelebration(false);
    router.push('/');
  };

  return (
    <>
      <div className="checkout-page">
        <div className="container">
          <h1 className="checkout-title">Finalizar Compra</h1>
          
          <div className="checkout-grid">
            <div className="checkout-form-container">
              <CheckoutForm onSubmit={handleSubmit} loading={loading} />
            </div>
            
            <div className="order-summary-container">
              <OrderSummary />
            </div>
          </div>
        </div>
      </div>
      
      {showCelebration && (
        <CelebrationModal
          orderNumber={orderNumber}
          onClose={handleCloseCelebration}
        />
      )}
    </>
  );
}
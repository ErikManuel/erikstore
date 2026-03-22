'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './SuccessModal.scss';

export default function CelebrationModal({ orderNumber, onClose }) {
  const [countdown, setCountdown] = useState(3);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setTimeout(() => {
            router.push('/products');
          }, 500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className={`celebration-overlay ${isVisible ? 'visible' : ''}`}>
      <div className="celebration-modal">
        {/* Confeti animado */}
        <div className="confetti-background">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="confetti-piece"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                backgroundColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
              }}
            />
          ))}
        </div>

        {/* Fuegos artificiales */}
        <div className="fireworks">
          <div className="firework firework-1"></div>
          <div className="firework firework-2"></div>
          <div className="firework firework-3"></div>
        </div>

        <div className="modal-icon">
          <div className="checkmark-circle">
            <i className="fas fa-check-circle"></i>
          </div>
        </div>

        <h1 className="celebration-title">¡Felicidades!</h1>
        
        <p className="celebration-message">
          Tu compra ha sido realizada con éxito
        </p>
        
        <div className="order-info-celebration">
          <div className="order-badge">
            <i className="fas fa-receipt"></i>
            <span>NÚMERO DE ORDEN</span>
            <strong>{orderNumber}</strong>
          </div>
        </div>
        
        <div className="countdown-info">
          <div className="countdown-timer">
            <div className="timer-circle">
              <span>{countdown}</span>
            </div>
            <p>Redirigiendo al catálogo en {countdown} segundos...</p>
          </div>
        </div>
        
        <div className="modal-actions">
          <button 
            onClick={() => router.push('/products')} 
            className="btn-primary-celebration"
          >
            <i className="fas fa-shopping-bag"></i> Seguir comprando
          </button>
          
          <button 
            onClick={onClose} 
            className="btn-secondary-celebration"
          >
            <i className="fas fa-home"></i> Ir al inicio
          </button>
        </div>

        <div className="celebration-footer">
          <i className="fas fa-gift"></i>
          <span>¡Disfruta tu nueva compra!</span>
          <i className="fas fa-star"></i>
        </div>
      </div>
    </div>
  );
}
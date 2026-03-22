'use client';
import Link from 'next/link';
import Button from '@/components/common/Button/Button';

export default function HomePage() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1>Bienvenido a ErikStore</h1>
            <p>Descubre los mejores productos tecnológicos al mejor precio</p>
            <Link href="/products">
              <Button variant="primary" size="large">
                Ver Productos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Envío Gratis</h3>
              <p>En compras mayores a $1,000 MXN</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Pago Seguro</h3>
              <p>Transacciones 100% protegidas</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <h3>30 Días de Garantía</h3>
              <p>Devoluciones sin complicaciones</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⭐</div>
              <h3>Productos Premium</h3>
              <p>Calidad garantizada</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
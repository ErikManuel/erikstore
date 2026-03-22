'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCartStore } from '@/store/cartStore';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import CartDrawer from '@/components/cart/CartDrawer/CartDrawer';
import './Navbar.scss';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { getTotalItems, toggleCart } = useCartStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = mounted ? getTotalItems() : 0;

  return (
    <>
      <nav className="navbar">
        <div className="container navbar-container">
          <Link href="/" className="navbar-logo">
            <i className="fas fa-store"></i> ErikStore
          </Link>

          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menú"
          >
            <i className="fas fa-bars"></i>
          </button>

          <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
            <Link href="/products" className="nav-link">
              <i className="fas fa-grid"></i> Productos
            </Link>
            
            {user ? (
              <>
                <span className="user-greeting">
                  <i className="fas fa-user"></i> Hola, {user.name}
                </span>
                <button onClick={logout} className="nav-link btn-logout">
                  <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
                </button>
              </>
            ) : (
              <Link href="/login" className="nav-link btn-login">
                <i className="fas fa-sign-in-alt"></i> Iniciar Sesión
              </Link>
            )}
            
            <ThemeToggle />
            
            <button className="cart-icon" onClick={toggleCart} aria-label="Carrito">
              <i className="fas fa-shopping-cart"></i>
              {mounted && totalItems > 0 && (
                <span className="cart-badge">{totalItems}</span>
              )}
            </button>
          </div>
        </div>
      </nav>
      
      <CartDrawer />
    </>
  );
}
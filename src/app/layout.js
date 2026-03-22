import './globals.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Providers } from './providers';
import Navbar from '@/components/common/Navbar/Navbar';

export const metadata = {
  title: 'ErikStore - Tu tienda moderna',
  description: 'Descubre los mejores productos en ErikStore',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes pulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.05); }
            }
          `
        }} />
      </head>
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <footer className="footer">
            <div className="container">
              <p>© 2025 ErikStore. Desarrollado con ❤️ por Erik Manuel</p>
              <p className="footer-signature">
                <i className="fas fa-code"></i> Código con pasión | 
                <i className="fas fa-layer-group"></i> Arquitectura limpia | 
                <i className="fas fa-star"></i> Mejores prácticas
              </p>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
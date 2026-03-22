'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/common/Button/Button';
import Input from '@/components/common/Input/Input';
import './login.scss';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      router.push('/');
    } else {
      setError('Credenciales incorrectas. Usuario: demo@ErikStore.com / Contraseña: Demo123456');
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card fade-in">
        <div className="login-header">
          <h1>Bienvenido a ErikStore</h1>
          <p>Inicia sesión para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <Input
            type="email"
            label="Email"
            placeholder="demo@ErikStore.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <Input
            type="password"
            label="Contraseña"
            placeholder="Demo123456"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />

          {error && <div className="error-message">{error}</div>}

          <Button 
            type="submit" 
            variant="primary" 
            fullWidth
            loading={loading}
          >
            Iniciar Sesión
          </Button>

          <div className="demo-info">
            <p>🔐 Credenciales de demo:</p>
            <p>Email: <strong>demo@ErikStore.com</strong></p>
            <p>Contraseña: <strong>Demo123456</strong></p>
          </div>
        </form>
      </div>
    </div>
  );
}
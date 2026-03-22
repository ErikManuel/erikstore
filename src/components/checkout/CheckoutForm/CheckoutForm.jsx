'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import './CheckoutForm.scss';

const validationSchema = Yup.object({
  firstName: Yup.string().required('Nombre es requerido'),
  lastName: Yup.string().required('Apellido es requerido'),
  email: Yup.string().email('Email inválido').required('Email es requerido'),
  phone: Yup.string().required('Teléfono es requerido'),
  address: Yup.string().required('Dirección es requerida'),
  city: Yup.string().required('Ciudad es requerida'),
  state: Yup.string().required('Estado es requerido'),
  zipCode: Yup.string().required('Código postal es requerido'),
  cardNumber: Yup.string()
    .matches(/^\d{16}$/, 'Número de tarjeta inválido (16 dígitos)')
    .required('Número de tarjeta es requerido'),
  cardExpiry: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Formato MM/AA inválido')
    .required('Fecha de expiración es requerida'),
  cardCvc: Yup.string()
    .matches(/^\d{3,4}$/, 'CVC inválido (3-4 dígitos)')
    .required('CVC es requerido'),
});

export default function CheckoutForm({ onSubmit, loading }) {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      cardNumber: '',
      cardExpiry: '',
      cardCvc: '',
    },
    validationSchema,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="checkout-form">
      <div className="form-section">
        <h3>
          <i className="fas fa-user"></i> Información Personal
        </h3>
        
        <div className="form-row">
          <Input
            label="Nombre"
            name="firstName"
            placeholder="Juan"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && formik.errors.firstName}
            required
          />
          
          <Input
            label="Apellido"
            name="lastName"
            placeholder="Pérez"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && formik.errors.lastName}
            required
          />
        </div>
        
        <div className="form-row">
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="juan@ejemplo.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email}
            required
          />
          
          <Input
            label="Teléfono"
            name="phone"
            placeholder="55 1234 5678"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && formik.errors.phone}
            required
          />
        </div>
        
        <Input
          label="Dirección"
          name="address"
          placeholder="Calle 123, Colonia Centro"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.address && formik.errors.address}
          required
        />
        
        <div className="form-row">
          <Input
            label="Ciudad"
            name="city"
            placeholder="Ciudad de México"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.city && formik.errors.city}
            required
          />
          
          <Input
            label="Estado"
            name="state"
            placeholder="CDMX"
            value={formik.values.state}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.state && formik.errors.state}
            required
          />
          
          <Input
            label="Código Postal"
            name="zipCode"
            placeholder="12345"
            value={formik.values.zipCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.zipCode && formik.errors.zipCode}
            required
          />
        </div>
      </div>
      
      <div className="form-section">
        <h3>
          <i className="fas fa-credit-card"></i> Información de Pago
        </h3>
        
        <Input
          label="Número de Tarjeta"
          name="cardNumber"
          placeholder="4242 4242 4242 4242"
          value={formik.values.cardNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.cardNumber && formik.errors.cardNumber}
          required
        />
        
        <div className="form-row">
          <Input
            label="Fecha Expiración (MM/AA)"
            name="cardExpiry"
            placeholder="12/25"
            value={formik.values.cardExpiry}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.cardExpiry && formik.errors.cardExpiry}
            required
          />
          
          <Input
            label="CVC"
            name="cardCvc"
            placeholder="123"
            value={formik.values.cardCvc}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.cardCvc && formik.errors.cardCvc}
            required
          />
        </div>
        
        <div className="payment-info">
          <p>
            <i className="fas fa-info-circle"></i> Modo de prueba
          </p>
          <p>Tarjeta de prueba: <strong>4242 4242 4242 4242</strong></p>
          <p>Cualquier fecha futura | Cualquier CVC de 3 dígitos</p>
        </div>
      </div>
      
      <Button
        type="submit"
        variant="primary"
        size="large"
        fullWidth
        loading={loading}
        disabled={loading}
      >
        {loading ? (
          <>
            <i className="fas fa-spinner fa-spin"></i> Procesando...
          </>
        ) : (
          <>
            <i className="fas fa-check-circle"></i> Realizar Pedido
          </>
        )}
      </Button>
    </form>
  );
}
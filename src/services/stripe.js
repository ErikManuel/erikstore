import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

// Simular creación de sesión de pago (para desarrollo)
export const createCheckoutSession = async (items, total) => {
  // En producción, esto llamaría a tu API endpoint
  // que crearía la sesión en Stripe
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 'cs_test_' + Math.random().toString(36).substr(2, 9),
        url: '/checkout/success'
      });
    }, 1000);
  });
};
export const fetchProductsFromStrapi = async () => {
  const response = await api.get('/products?populate=*');
  return response.data.data;
};
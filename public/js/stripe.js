import axios from 'axios';
import { showAlert } from './alert.js';
const stripe = Stripe(
  'pk_test_51OYuZ3SD9ClMI67SX3jOKTCnbPbC7bGVaFoA7zVxuQTKk4Jb1U9VaI8RWNWQvK7ghFMLytBRfOHhEjA2uarQXi1000L3i7w7dF',
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from server
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`,
    );
    console.log(session.data);
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });

    // 2) Create checkout form + charge credit card
  } catch (error) {
    console.log(error);
    showAlert('error', error);
  }
};

// import '../data/card-class.js';
// import '../data/backend.js';
import { loadProducts } from '../data/products.js';
import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymetSummary } from './checkout/paymentSummary.js';

loadProducts(() => {
  renderOrderSummary();
  renderPaymetSummary();
});

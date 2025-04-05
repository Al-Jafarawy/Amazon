import { cart } from '../../data/cart.js';
import { getDeliveryOption } from '../../data/deliveryOption.js';
import { getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';

export function renderPaymetSummary() {
  let productsPrice = 0;
  let shippingPrice = 0;
  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productsPrice += product.priceCents * cartItem.quantity;

    const deliveryShipping = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPrice += deliveryShipping.priceCents;
  });
  const totalBeforeTaxCents = productsPrice + shippingPrice;
  const totalTaxCents = totalBeforeTaxCents * 0.1;
  const orderTotal = totalBeforeTaxCents + totalTaxCents;

  const paymetHtml = `
  <div class="payment-summary-title ">Order Summary</div>
  <div class="payment-summary-row">
            <div>Items (${cart.length}):</div>
            <div class="payment-summary-money">$${formatCurrency(
              productsPrice
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(
              shippingPrice
            )}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(
              totalBeforeTaxCents
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(
              totalTaxCents
            )}</div>
          </div>

                    <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(
              orderTotal
            )}</div>
          </div>


          <button class="place-order-button button-primary">
            Place your order
          </button>
            `;

  document.querySelector('.js-order-summary').innerHTML = paymetHtml;
}

import dayjs from 'https://cdn.jsdelivr.net/npm/dayjs@1.11.13/+esm'; // How can I know that link is useuble
import {
  calcCardQuntity,
  cart,
  removeItemFromCart,
  updateDeliveryOptionDate,
} from '../../data/cart.js';
import {
  deliveryOptions,
  getDeliveryOption,
} from '../../data/deliveryOption.js';
import { getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import { renderPaymetSummary } from './paymentSummary.js';

export function renderOrderSummary() {
  let HtmlComponant = '';
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingItem = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;
    let deliveryOption = getDeliveryOption(deliveryOptionId);
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    HtmlComponant += `<div class="cart-item-container 
      js-product-quantity${matchingItem.id}
      js-cart-item-container-${matchingItem.id}">
                <div class="delivery-date">
                  Delivery date: ${dateString}
                </div>

                <div class="cart-item-details-grid">
                  <img class="product-image"
                    src="${matchingItem.image}">

                  <div class="cart-item-details">
                    <div class="product-name">
                      ${matchingItem.name}
                    </div>
                    <div class="product-price">
                      $${matchingItem.getPriceCents()}
                    </div>
                    <div class="product-quantity">
                      <span>
                        Quantity: <span class="quantity-label">${
                          cartItem.quantity
                        }</span>
                      </span>
                      <span class="update-quantity-link link-primary" data-product-id="${
                        matchingItem.id
                      }">
                        Update
                      </span>
                      <span class="delete-quantity-link link-primary js-delete-link js-test-remove-link-${
                        matchingItem.id
                      }" data-product-id="${matchingItem.id}">
                        Delete
                      </span>
                    </div>
                  </div>

                  <div class="delivery-options">
                    <div class="delivery-options-title">
                      Choose a delivery option:
                    </div>
                    ${deliveryOptionHtml(matchingItem, cartItem)}
                  </div>
                </div>
              </div>
    `;
    document.querySelector('.js-checkout-page').innerHTML = HtmlComponant;
  });

  function deliveryOptionHtml(matchingItem, cartItem) {
    let html = '';
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');
      const priceString =
        deliveryOption.priceCents === 0
          ? 'FREE'
          : `$${formatCurrency(deliveryOption.priceCents)}`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `<div class="delivery-option js-delivery-option-selected" 
                  data-product-id=${matchingItem.id}
                  data-delivery-option-id=${deliveryOption.id}>
                      <input type="radio"
                      ${isChecked ? 'checked' : ''}
                        class="delivery-option-input"
                        name="delivery-option-${matchingItem.id}">
                      <div>
                        <div class="delivery-option-date">
                          ${dateString}
                        </div>
                        <div class="delivery-option-price">
                          ${priceString} - Shipping
                        </div>
                      </div>
                    </div>`;
    });
    return html;
  }

  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productIdWilDelete = link.dataset.productId;
      removeItemFromCart(productIdWilDelete);
      const container = document.querySelector(
        `.js-cart-item-container-${productIdWilDelete}`
      );
      container.remove();
      renderPaymetSummary();
    });
  });

  //now this code delete product like delete button

  ///////////////////////////////////////
  document.querySelectorAll('.update-quantity-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productIdWilUpdate = link.dataset.productId;
      removeItemFromCart(productIdWilUpdate);
      const container = document.querySelector(
        `.js-cart-item-container-${productIdWilUpdate}`
      );
      container.remove();
      // renderPaymetSummary();
    });
  });
  ///////////////////////////////////////

  document
    .querySelectorAll('.js-delivery-option-selected')
    .forEach((element) => {
      // const productId =element.dataset.productId;
      // const deliveryOptionId=element.dataset.deliveryOptionId;
      const { productId, deliveryOptionId } = element.dataset;
      element.addEventListener('click', () => {
        updateDeliveryOptionDate(productId, deliveryOptionId);
        renderOrderSummary();
        renderPaymetSummary();
      });
    });

  س;
  document.addEventListener('click', updateCartQuantity);

  function updateCartQuantity() {
    document.querySelector('.js-cart-quantity-customize').innerHTML =
      calcCardQuntity();
  }
  updateCartQuantity();
}

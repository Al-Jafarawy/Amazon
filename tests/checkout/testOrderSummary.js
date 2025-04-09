import { cart, loadFromStorge } from '../../data/cart.js';
import { renderOrderSummary } from '../../scripts/checkout/orderSummary.js';

describe('test suite:renderOrderSummary', () => {
  const productId1 = '3ebe75dc-64d2-4137-8860-1f5a963e534b';
  const productId2 = '8c9c52b5-5a19-4bcb-a5d1-158a74287c53';

  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    document.querySelector('.js-test-continer').innerHTML = `
          <div class="js-checkout-page"></div> 
          <div class="js-order-summary"></div>
          <a class="js-cart-quantity-customize"></a>
          `;
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: '2',
        },
        {
          productId: productId2,
          quantity: 4,
          deliveryOptionId: '1',
        },
      ]);
    });
    loadFromStorge();
    renderOrderSummary();
  });

  it('display the cart on the page', () => {
    expect(document.querySelectorAll('.cart-item-container').length).toEqual(2);

    expect(
      document.querySelector(`.js-product-quantity${productId1}`).innerText
    ).toContain('Quantity: 2');
    expect(
      document.querySelector(`.js-product-quantity${productId2}`).innerText
    ).toContain('Quantity: 4');
  });

  it('Check delete link', () => {
    document.querySelector(`.js-test-remove-link-${productId1}`).click();
    expect(document.querySelectorAll('.cart-item-container').length).toEqual(1);
    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);
  });

  afterEach(() => {
    document.querySelector('.js-test-continer').innerHTML = '';
  });
});

export let cart;
loadFromStorge();
export function loadFromStorge() {
  cart = JSON.parse(localStorage.getItem('cart'));

  if (!cart) {
    cart = [
      {
        productId: '3ebe75dc-64d2-4137-8860-1f5a963e534b',
        quantity: 2,
        deliveryOptionId: '2',
      },
      {
        productId: '8c9c52b5-5a19-4bcb-a5d1-158a74287c53',
        quantity: 4,
        deliveryOptionId: '1',
      },
    ];
  }
}

function addToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addTocart(productId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });
  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: '3',
    });
  }
  addToLocalStorage();
}

export function removeItemFromCart(productIdWilDelete) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productIdWilDelete) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  addToLocalStorage();
}

export function updateDeliveryOptionDate(productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  matchingItem.deliveryOptionId = deliveryOptionId;
  addToLocalStorage();
}

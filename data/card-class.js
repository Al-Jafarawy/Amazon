class Cart {
  cartItemTest;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorge();
  }

  #loadFromStorge() {
    this.cartItemTest = JSON.parse(localStorage.getItem(this.#localStorageKey));
    if (!this.cartItemTest) {
      this.cartItemTest = [
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

  addToLocalStorage() {
    localStorage.setItem(
      this.#localStorageKey,
      JSON.stringify(this.cartItemTest)
    );
  }

  addTocart(productId) {
    let matchingItem;
    this.cartItemTest.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        matchingItem = cartItem;
      }
    });
    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      this.cartItemTest.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: '1',
      });
    }
    this.addToLocalStorage();
  }

  removeItemFromCart(productIdWilDelete) {
    const newCart = [];
    this.cartItemTest.forEach((cartItem) => {
      if (cartItem.productId !== productIdWilDelete) {
        newCart.push(cartItem);
      }
    });
    this.cartItemTest = newCart;

    this.addToLocalStorage();
  }

  updateDeliveryOptionDate(productId, deliveryOptionId) {
    let matchingItem;
    this.cartItemTest.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;
    this.addToLocalStorage();
  }

  calcCardQuntity() {
    let total = 0;
    this.cartItemTest.forEach((item) => {
      total += item.quantity;
    });
    return total;
  }
}

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

// console.log(cart);
// console.log(businessCart);
// console.log(businessCart instanceof Cart);

export let cart =JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId, selectorValue) {
  const matchingItem = cart.find((item) => item.productId === productId);

  if (matchingItem) {
    matchingItem.quantity += Number(selectorValue);
  } else {
    cart.push({
      productId,
      quantity: Number(selectorValue),
    });
  }
  saveCart();
}

export function removeItem(productId) {
  cart = cart.filter((item) => item.productId !== productId)
  saveCart();
}

export function updateItem(productId, quantity) {
  const product = cart.find((item) => item.productId === productId)
  product.quantity = quantity;
  saveCart();
}

export function calcCartQuantity() {
  const totalCartQuantity = cart.reduce(
    (total, elem) => total + Number(elem.quantity),
    0
  )
  return totalCartQuantity;
}
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

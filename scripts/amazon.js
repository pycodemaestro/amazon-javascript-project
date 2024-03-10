import { addToCart, cart, calcCartQuantity} from "../data/cart.js";
import { products } from "../data/products.js";
import {formatCurrency} from "./utils/money.js";


let totalCartQuantity = calcCartQuantity();
;
let timeOutIds = [];

const productHTML = htmlGenerator();
document.querySelector(".js-product-grid").innerHTML = productHTML;

updateCartQuantity();

products.forEach((product) => {
  const quantitySelector = document.querySelector(
    `.js-quantity-selector-${product.id}`
  );
  for (let i = 1; i <= 10; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.text = i;
    quantitySelector.add(option);
  }
});

document.querySelectorAll(".js-add-to-cart-button").forEach((button) => {
  button.addEventListener("click", () => {
    const { productId } = button.dataset;
    const quantitySelector = document.querySelector(
      `.js-quantity-selector-${productId}`
    );

    const selectorValue = quantitySelector.value;
    addToCart(productId, selectorValue);

    totalCartQuantity += Number(selectorValue);
    updateCartQuantity();

    showMessageAdded(productId);
    clearTimeout(timeOutIds[productId]);
    timeOutIds[productId] = setTimeout(() => hideMessageAdded(productId), 2000);

    console.log(cart);
  });
});

function htmlGenerator() {
  const productHTML = products
    .map(
      (product) => `
  <div class="product-container">
    <div class="product-image-container">
      <img src="${product.image}" class="product-image"/>
    </div>

    <div class="product-name limit-text-to-2-lines">
      ${product.name}
    </div>

    <div class="product-rating-container">
      <img src="images/ratings/rating-${
        product.rating.stars * 10
      }.png" class="rating-image"/>
      <div class="product-rating-count">${product.rating.count}</div>
    </div>

    <div class="product-price">$${formatCurrency(product.priceCents)}</div>

    <div class="product-quantity-container">
      <select class="js-quantity-selector-${product.id}"></select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart js-added-to-cart-${product.id}">
      <img src="icons/checkmark.png" />
      Added
    </div>

    <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id="${
      product.id
    }">
      Add to cart
    </button>
  </div>
`
    )
    .join("");
  return productHTML;
}

function updateCartQuantity() {
  document.querySelector(".js-cart-quantity").innerHTML = totalCartQuantity;
}

function showMessageAdded(productId) {
  const addedElement = document.querySelector(`.js-added-to-cart-${productId}`);
  addedElement.classList.add("show-added-to-cart");
}

function hideMessageAdded(productId) {
  const addedElement = document.querySelector(`.js-added-to-cart-${productId}`);
  addedElement.classList.remove("show-added-to-cart");
  console.log(timeOutIds);
}

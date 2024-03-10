import { formatCurrency } from "./utils/money.js";
import { cart, removeItem, calcCartQuantity} from "../data/cart.js";
import { products } from "../data/products.js";

const html = generateHtml();
document.querySelector(".js-order-summery").innerHTML = html;

let numberOfItem = calcCartQuantity();
updateCartQuantity(numberOfItem);

document
  .querySelector(".js-order-summery")
  .addEventListener("click", (event) => {
    const deleteLink = event.target.closest(".js-delete-link");

    if (deleteLink) {
      const productId = deleteLink.dataset.productId;
      removeItem(productId);

      document.querySelector(`.js-cart-item-container-${productId}`)
      .remove();
    }
    
    numberOfItem = Number(numberOfItem) - 1;
    updateCartQuantity(numberOfItem);
  });

function generateHtml() {
  let html = "";

  cart.forEach((product) => {
    const matchingItem = products.find((item) => item.id === product.productId);

    html += `
      <div class="cart-item-container js-cart-item-container-${
        matchingItem.id
      }">
        <div class="delivery-date">Delivery date: Tuesday, June 21</div>

        <div class="cart-item-details-grid">
          <img class="product-image" src="${matchingItem.image}">

          <div class="cart-item-details">
            <div class="product-name">${matchingItem.name}</div>
            <div class="product-price">$${formatCurrency(
              matchingItem.priceCents
            )}</div>
            <div class="product-quantity">
              <span>Quantity: <span class="quantity-label">${
                product.quantity
              }</span></span>
              <span class="update-quantity-link link-primary">Update</span>
              <span data-product-id="${
                matchingItem.id
              }" class="delete-quantity-link link-primary js-delete-link">Delete</span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">Choose a delivery option:</div>
            ${generateDeliveryOptions(matchingItem.id)}
          </div>
        </div>
      </div>
    `;
  });

  return html;
}

function generateDeliveryOptions(itemId) {
  return `
    <div class="delivery-option">
      <input type="radio" checked class="delivery-option-input" name="delivery-option-${itemId}">
      <div>
        <div class="delivery-option-date">Tuesday, June 21</div>
        <div class="delivery-option-price">FREE Shipping</div>
      </div>
    </div>
    <div class="delivery-option">
      <input type="radio" class="delivery-option-input" name="delivery-option-${itemId}">
      <div>
        <div class="delivery-option-date">Wednesday, June 15</div>
        <div class="delivery-option-price">$4.99 - Shipping</div>
      </div>
    </div>
    <div class="delivery-option">
      <input type="radio" class="delivery-option-input" name="delivery-option-${itemId}">
      <div>
        <div class="delivery-option-date">Monday, June 13</div>
        <div class="delivery-option-price">$9.99 - Shipping</div>
      </div>
    </div>
  `;
}


function updateCartQuantity(numberOfItem){
  document.querySelector(".js-return-to-home-link")
  .innerHTML = numberOfItem;
}
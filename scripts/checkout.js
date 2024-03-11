import { formatCurrency } from "./utils/money.js";
import {
  cart,
  removeItem,
  calcCartQuantity,
  updateItem,
} from "../data/cart.js";
import { products } from "../data/products.js";

const html = generateHtml();
document.querySelector(".js-order-summery").innerHTML = html;

// Update the initial quantity of items in the cart
updateCartQuantity();

// Event listener for handling click events on the delete link
document
  .querySelector(".js-order-summery")
  .addEventListener("click", (event) => {
    const deleteLink = event.target.closest(".js-delete-link");

    // Check if the clicked element is a delete link
    if (deleteLink) {
      const productId = deleteLink.dataset.productId;
      removeItem(productId);
      document.querySelector(`.js-cart-item-container-${productId}`).remove();
      updateCartQuantity();
    }
  });

// Event listener for handling click events on the update link
document.querySelectorAll(".js-update-link").forEach((link) => {
  link.addEventListener("click", () => {
    const { productId } = link.dataset;

    // Show the edit container and hide the update link
    document
      .querySelector(`.js-edit-container-${productId}`)
      .classList.add("show-edit-container");

    document
      .querySelector(`.js-update-link-${productId}`)
      .classList.add("hide-update-link");
  });
});

// Event listener for handling click events on the save link
document.querySelectorAll(".js-edit-container").forEach((container) => {
  container.addEventListener("click", (event) => {
    const saveLink = event.target.closest(".save-quantity-link");
    const { productId } = container.dataset;

    if (saveLink) {
      const inputElement = document.querySelector(
        `.js-quantity-input-${productId}`
      );
      const inputValue = Number(inputElement.value);

      if (inputValue > 0 && inputValue < 100) {
        // Update the item quantity in the cart
        updateItem(productId, inputValue);

        // Update the overall cart quantity and display
        updateCartQuantity();

        // Update the displayed quantity label for the specific product
        updateQuantityLabel(productId, inputValue);
      }

      // Hide the edit container and show the update link
      container.classList.remove("show-edit-container");
      document
        .querySelector(`.js-update-link-${productId}`)
        .classList.remove("hide-update-link");
    }
  });
});

// Function to generate HTML based on the cart and product data
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
              <span>Quantity: <span class="quantity-label js-quantity-label-${
                matchingItem.id
              }">${product.quantity}</span></span>
              <span data-product-id="${
                matchingItem.id
              }" class="update-quantity-link link-primary js-update-link js-update-link-${
      matchingItem.id
    }">Update</span>
              
              <div data-product-id=${
                matchingItem.id
              } class="edit-container js-edit-container js-edit-container-${
      matchingItem.id
    }">
                <input type="number" class="quantity-input js-quantity-input-${
                  matchingItem.id
                }">
                <span class="save-quantity-link link-primary">Save</span>
              </div>
              
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

// Function to generate delivery options HTML based on the item ID
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

// Calculate and update the initial quantity of items in the cart
function updateCartQuantity() {
  const numberOfItem = calcCartQuantity();
  document.querySelector(".js-return-to-home-link").innerHTML = numberOfItem;
}

// Function to update the displayed quantity label for a specific product
function updateQuantityLabel(productId, numberOfItem) {
  document.querySelector(`.js-quantity-label-${productId}`).innerHTML =
    numberOfItem;
}

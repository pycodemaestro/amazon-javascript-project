import { formatCurrency } from "../utils/money.js";
import {
  cart,
  removeItem,
  calcCartQuantity,
  updateItem,
  updateDeliveryOption,
} from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOptions.js";
import {renderPaymentSummary} from "./paymentSummary.js";

export function renderOrderSummary() {
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
        const { productId } = deleteLink.dataset;
        removeItem(productId);
        document.querySelector(`.js-cart-item-container-${productId}`).remove();
        updateCartQuantity();
        renderPaymentSummary();
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
          renderPaymentSummary();
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

    cart.forEach((cartItem) => {
      const matchingItem = getProduct(cartItem.productId);

      const { deliveryOptionId } = cartItem;
      const deliveryOption = getDeliveryOption(deliveryOptionId);

      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
      const dateString = deliveryDate.format("dddd, MMMM D");

      html += `
        <div class="cart-item-container js-cart-item-container-${
          matchingItem.id
        }">
          <div class="delivery-date js-delivery-date-${
            matchingItem.id
          }">Delivery date: ${dateString}</div>

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
                }">${cartItem.quantity}</span></span>
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
                  }" value=${cartItem.quantity}>
                  <span class="save-quantity-link link-primary">Save</span>
                </div>
                
                <span data-product-id="${
                  matchingItem.id
                }" class="delete-quantity-link link-primary js-delete-link">Delete</span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">Choose a delivery option:</div>
              ${generateDeliveryOptions(matchingItem.id, cartItem)}
            </div>
          </div>
        </div>
      `;
    });

    return html;
  }

  // Function to generate delivery options HTML based on the item ID
  function generateDeliveryOptions(itemId, cartItem) {
    let html = "";

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
      const dateString = deliveryDate.format("dddd, MMMM D");

      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = cartItem.deliveryOptionId === deliveryOption.id;

      html += `   
      <div class="delivery-option">
        <input data-delivery-option-id=${
          deliveryOption.id
        } data-product-id="${itemId}" type="radio" ${
        isChecked ? "checked" : ""
      } class="delivery-option-input js-delivery-option-input" value='${dateString}' name="delivery-option-${itemId}">
        <div>
          <div class="delivery-option-date">${dateString}</div>
          <div class="delivery-option-price">${priceString} Shipping</div>
        </div>
      </div>
    `;
    });

    return html;
  }

  document
    .querySelectorAll(".js-delivery-option-input")
    .forEach((deliveryOption) => {
      deliveryOption.addEventListener("click", () => {
        const { productId, deliveryOptionId } = deliveryOption.dataset;

        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
      });
    });

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
}

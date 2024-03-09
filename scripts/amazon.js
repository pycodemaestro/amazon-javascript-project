let totalCartQuantity = 0;

const productHTML = htmlGenerator();
document.querySelector(".js-product-grid").innerHTML = productHTML;

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
    const productId = button.dataset.productId;
    const quantitySelector = document.querySelector(
      `.js-quantity-selector-${productId}`
    );
    const selectorValue = quantitySelector.value;

    const matchingItem = cart.find((item) => item.productId === productId);

    if (matchingItem) {
      matchingItem.quantity += Number(selectorValue);
    } else {
      cart.push({
        productId: productId,
        quantity: Number(selectorValue),
      });
    }

    totalCartQuantity += Number(selectorValue);
    updateCartQuantity();
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

    <div class="product-name">
      ${product.name}
    </div>

    <div class="product-rating-container">
      <img src="images/ratings/rating-${
        product.rating.stars * 10
      }.png" class="rating-image"/>
      <div class="product-rating-count">${product.rating.count}</div>
    </div>

    <div class="product-price">$${(product.priceCents / 100).toFixed(2)}</div>

    <div class="product-quantity-container">
      <select class="js-quantity-selector-${product.id}"></select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart">
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

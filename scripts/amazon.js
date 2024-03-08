let productHTML = "";

products.forEach((product) => {
  productHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img
            src="${product.image}"
            class="product-image"
          />
        </div>

        <div class="product-name">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img
            src="images/ratings/rating-${product.rating.stars * 10}.png"
            class="rating-image"
          />
          <div class="product-rating-count">${product.rating.count}</div>
        </div>
        
        <div class="product-price">$${(product.priceCents / 100).toFixed(
          2
        )}</div>

        <div class="product-quantity-container">
          <select>
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart">
          <img src="icons/checkmark.png" />
          Added
        </div>

        <button class="add-to-cart-button
        button-primary js-add-to-cart-button"
        data-product-id="${product.id}"
        >
          Add to cart
        </button>
    </div>
      
  `;
});

document.querySelector(".js-product-grid").innerHTML = productHTML;

document.querySelectorAll(".js-add-to-cart-button").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    console.log(productId);
    let matchingItem;
    cart.forEach((item) => {
      if (item.productId === productId) {
        matchingItem = item;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      cart.push({
        productId: productId,
        quantity: 1,
      });
    }
    
    /*cart.forEach((item) => {
      if (productId === item.productId) {
        matchingItem = item;
      }

      console.log(matchingItem);
      if (matchingItem) {
        matchingItem.quantity += 1;
      } else {
        cart.push({
          productId: productId,
          quantity: 1,
        });
      }
    });
*/
    console.log(cart);
  });
});

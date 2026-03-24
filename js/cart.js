// =============================================
// SRG MART - Cart System
// =============================================

function cartStorageKey() {
  const user = getCurrentUser && getCurrentUser();
  if (!user || !user.email) return null;
  return `srgCart:${user.email.toLowerCase()}`;
}

function redirectToLoginForCart() {
  showToast("Please login to use cart", "error");
  const baseToPages = window.location.pathname.includes("/pages/") ? "" : "pages/";
  window.location.href = `${baseToPages}login.html`;
}

function getCart() {
  if (!isLoggedIn || !isLoggedIn()) return [];
  const key = cartStorageKey();
  if (!key) return [];
  return JSON.parse(localStorage.getItem(key) || "[]");
}

function saveCart(cart) {
  const key = cartStorageKey();
  if (!key) return;
  localStorage.setItem(key, JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(productId, qty = 1) {
  if (!isLoggedIn || !isLoggedIn()) {
    redirectToLoginForCart();
    return;
  }
  const product = getProductById(productId);
  if (!product) return;

  const cart = getCart();
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.qty += qty;
    showToast(`${product.name} quantity updated!`);
  } else {
    cart.push({ id: productId, qty });
    showToast(`${product.name} added to cart!`);
  }

  saveCart(cart);
  animateCartIcon();
}

function removeFromCart(productId) {
  const cart = getCart().filter(item => item.id !== productId);
  saveCart(cart);
}

function updateCartQty(productId, qty) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (item) {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    item.qty = qty;
    saveCart(cart);
  }
}

function getCartTotal() {
  const cart = getCart();
  return cart.reduce((sum, item) => {
    const product = getProductById(item.id);
    return product ? sum + product.price * item.qty : sum;
  }, 0);
}

function getCartItemCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function clearCart() {
  const key = cartStorageKey();
  if (key) localStorage.removeItem(key);
  updateCartBadge();
}

function animateCartIcon() {
  const cartIcon = document.querySelector(".cart-icon-wrap");
  if (cartIcon) {
    cartIcon.classList.add("cart-bump");
    setTimeout(() => cartIcon.classList.remove("cart-bump"), 400);
  }
}

// =============================================
// Cart Page Renderer
// =============================================
function renderCartPage() {
  if (!isLoggedIn || !isLoggedIn()) {
    redirectToLoginForCart();
    return;
  }
  const cart = getCart();
  const container = document.getElementById("cart-items-container");
  const summaryContainer = document.getElementById("cart-summary");
  const emptyState = document.getElementById("cart-empty");
  const cartContent = document.getElementById("cart-content");

  if (!container) return;

  if (cart.length === 0) {
    if (emptyState) emptyState.style.display = "flex";
    if (cartContent) cartContent.style.display = "none";
    return;
  }

  if (emptyState) emptyState.style.display = "none";
  if (cartContent) cartContent.style.display = "grid";

  let subtotal = 0;
  let savings = 0;

  container.innerHTML = cart.map(item => {
    const product = getProductById(item.id);
    if (!product) return "";
    const lineTotal = product.price * item.qty;
    const lineSavings = (product.originalPrice - product.price) * item.qty;
    subtotal += lineTotal;
    savings += lineSavings;

    return `
      <div class="cart-item" data-id="${product.id}">
        <div class="cart-item-img">
          <img src="${product.image}" alt="${product.name}" />
        </div>
        <div class="cart-item-details">
          <span class="cart-item-category">${product.category}</span>
          <h3 class="cart-item-name">${product.name}</h3>
          <div class="cart-item-pricing">
            <span class="cart-item-price">${formatPrice(product.price)}</span>
            <span class="cart-item-original">${formatPrice(product.originalPrice)}</span>
          </div>
        </div>
        <div class="cart-item-controls">
          <div class="qty-control">
            <button class="qty-btn" onclick="changeQty(${product.id}, -1)">−</button>
            <span class="qty-value">${item.qty}</span>
            <button class="qty-btn" onclick="changeQty(${product.id}, 1)">+</button>
          </div>
          <div class="cart-item-total">${formatPrice(lineTotal)}</div>
          <button class="btn-remove" onclick="removeItem(${product.id})">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="3,6 5,6 21,6"/><path d="M19,6l-1,14H6L5,6M10,11v6M14,11v6M9,6V4h6v2"/></svg>
          </button>
        </div>
      </div>
    `;
  }).join("");

  const shipping = subtotal > 50000 ? 0 : 499;
  const total = subtotal + shipping;

  if (summaryContainer) {
    summaryContainer.innerHTML = `
      <div class="summary-card">
        <h2 class="summary-title">Order Summary</h2>
        <div class="summary-row"><span>Subtotal (${getCartItemCount()} items)</span><span>${formatPrice(subtotal)}</span></div>
        <div class="summary-row savings"><span>Your Savings</span><span>−${formatPrice(savings)}</span></div>
        <div class="summary-row"><span>Shipping</span><span>${shipping === 0 ? '<span class="free-ship">FREE</span>' : formatPrice(shipping)}</span></div>
        <div class="summary-divider"></div>
        <div class="summary-row total"><span>Total</span><span>${formatPrice(total)}</span></div>
        ${shipping > 0 ? `<p class="shipping-notice">Add ${formatPrice(50000 - subtotal)} more for FREE shipping</p>` : '<p class="shipping-notice free">🎉 You qualify for FREE shipping!</p>'}
        <a href="checkout.html" class="btn-checkout">Proceed to Checkout →</a>
        <a href="products.html" class="btn-continue-shop">← Continue Shopping</a>
      </div>
    `;
  }
}

function changeQty(productId, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  const newQty = item.qty + delta;
  if (newQty <= 0) {
    if (confirm("Remove this item from cart?")) {
      removeFromCart(productId);
      renderCartPage();
    }
    return;
  }
  updateCartQty(productId, newQty);
  renderCartPage();
}

function removeItem(productId) {
  const product = getProductById(productId);
  removeFromCart(productId);
  showToast(`${product ? product.name : "Item"} removed from cart`, "error");
  renderCartPage();
}

// Initialize cart page
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("cart-items-container")) {
    renderCartPage();
  }
});

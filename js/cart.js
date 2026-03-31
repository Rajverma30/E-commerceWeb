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

  container.innerHTML = `<div class="cart-items-header">Your Cart Items</div>` + cart.map(item => {
    const product = getProductById(item.id);
    if (!product) return "";
    const lineTotal = product.price * item.qty;
    const lineSavings = (product.originalPrice - product.price) * item.qty;
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    subtotal += lineTotal;
    savings += lineSavings;

    return `
      <div class="cart-item" data-id="${product.id}">
        <img class="cart-item-img" src="${product.image}" alt="${product.name}" />
        <div class="cart-item-info">
          <div class="cart-item-name">${product.name}</div>
          <div class="cart-item-meta">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
          <div style="display:flex;gap:8px;align-items:baseline;margin-top:4px;">
            <span class="cart-item-price-main">${formatPrice(product.price)}</span>
            <span class="cart-item-price-old">${formatPrice(product.originalPrice)}</span>
            <span class="cart-item-savings">-${discount}%</span>
          </div>
          <div class="cart-item-savings" style="margin-top:2px;">You save ${formatPrice(lineSavings)} on this item</div>
        </div>
        <div class="cart-item-controls">
          <span class="item-total">${formatPrice(lineTotal)}</span>
          <div class="qty-control">
            <button class="qty-btn" onclick="changeQty(${product.id}, -1)">−</button>
            <span class="qty-display">${item.qty}</span>
            <button class="qty-btn" onclick="changeQty(${product.id}, 1)">+</button>
          </div>
          <button class="cart-remove-btn" onclick="removeItem(${product.id})">Remove</button>
        </div>
      </div>
    `;
  }).join("");

  const shipping = subtotal > 50000 ? 0 : 499;
  const total = subtotal + shipping;

  if (summaryContainer) {
    summaryContainer.innerHTML = `
      <div class="summary-card">
        <div class="summary-title">Price Details</div>
        <div class="summary-row"><span>Price (${getCartItemCount()} items)</span><span>${formatPrice(subtotal + savings)}</span></div>
        <div class="summary-row discount"><span>Discount</span><span style="color:var(--success)">− ${formatPrice(savings)}</span></div>
        <div class="summary-row"><span>Delivery Charges</span><span>${shipping === 0 ? '<span style="color:var(--success);font-weight:600">FREE</span>' : formatPrice(shipping)}</span></div>
        <div class="summary-row total"><span>Total Amount</span><span>${formatPrice(total)}</span></div>
        ${savings > 0 ? `<div class="summary-savings-note">🎉 You will save ${formatPrice(savings)} on this order!</div>` : ""}
        <a href="checkout.html" class="btn-checkout">Proceed to Checkout →</a>
        <div class="secure-badges">🔒 Safe and Secure Payments. Easy Returns.</div>
        <div style="text-align:center;margin-top:10px;"><a href="products.html" style="font-size:0.8rem;color:var(--accent);">← Continue Shopping</a></div>
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

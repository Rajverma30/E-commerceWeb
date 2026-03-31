// =============================================
// SRG MART - Products Page & Product Detail JS
// =============================================

// ---- Products Page ----
let filteredProducts = [...getAllProducts()];
let currentCategory = "all";
let currentSort = "popular";
let currentMinPrice = 0;
let currentMaxPrice = 250000;
let searchQuery = "";

function applyFilters() {
  filteredProducts = getAllProducts().filter(p => {
    const catMatch = currentCategory === "all" || p.category === currentCategory;
    const priceMatch = p.price >= currentMinPrice && p.price <= currentMaxPrice;
    const text = (p.name + " " + (p.description || "")).toLowerCase();
    const searchMatch = !searchQuery || text.includes(searchQuery);
    return catMatch && priceMatch && searchMatch;
  });
  applySorting();
  renderProductGrid();
  updateProductCount();
}

function applySorting() {
  switch (currentSort) {
    case "price-low":
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      filteredProducts.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      filteredProducts.sort((a, b) => b.id - a.id);
      break;
    default: // popular
      filteredProducts.sort((a, b) => b.reviews - a.reviews);
  }
}

function renderProductGrid() {
  const grid = document.getElementById("products-grid");
  if (!grid) return;

  if (filteredProducts.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">🔍</div>
        <h3>No products found</h3>
        <p>Try adjusting your filters or browse all products.</p>
        <button class="btn-primary" onclick="resetFilters()">Clear Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filteredProducts.map(p => renderProductCard(p, "../")).join("");

  // Stagger animation
  grid.querySelectorAll(".product-card").forEach((card, i) => {
    card.style.animationDelay = `${i * 0.05}s`;
    card.classList.add("card-animate");
  });
}

function updateProductCount() {
  const countEl = document.getElementById("product-count");
  if (countEl) countEl.textContent = `${filteredProducts.length} Products`;
}

function resetFilters() {
  currentCategory = "all";
  currentSort = "popular";
  currentMinPrice = 0;
  currentMaxPrice = 250000;

  const catBtns = document.querySelectorAll(".filter-cat-btn");
  catBtns.forEach(btn => btn.classList.remove("active"));
  const allBtn = document.querySelector(".filter-cat-btn[data-cat='all']");
  if (allBtn) allBtn.classList.add("active");

  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) sortSelect.value = "popular";

  const priceRange = document.getElementById("price-range");
  if (priceRange) priceRange.value = 250000;
  const priceDisplay = document.getElementById("price-display");
  if (priceDisplay) priceDisplay.textContent = formatPrice(250000);

  applyFilters();
}

function initProductsPage() {
  const grid = document.getElementById("products-grid");
  if (!grid) return;

  // Pre-check URL for category param
  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get("category");
  if (catParam) currentCategory = catParam;

  // Dynamic category filter buttons
  const catWrap = document.getElementById("dynamic-category-filters");
  if (catWrap) {
    const cats = ["all", ...getAllCategories()];
    catWrap.innerHTML = cats.map(c => {
      const label = c === "mobiles" ? "📱 Mobiles" : c === "laptops" ? "💻 Laptops" : c === "accessories" ? "🎧 Accessories" : c.charAt(0).toUpperCase() + c.slice(1);
      const active = c === currentCategory ? "active" : (c === "all" && currentCategory === "all") ? "active" : "";
      return `<button class="filter-cat-btn ${active}" data-cat="${c}">${c === "all" ? "All" : label}</button>`;
    }).join("");
    catWrap.querySelectorAll(".filter-cat-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        catWrap.querySelectorAll(".filter-cat-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentCategory = btn.dataset.cat;
        applyFilters();
      });
    });
  }

  // Sort select
  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", e => {
      currentSort = e.target.value;
      applyFilters();
    });
  }

  // Price range
  const priceRange = document.getElementById("price-range");
  const priceDisplay = document.getElementById("price-display");
  if (priceRange && priceDisplay) {
    priceRange.addEventListener("input", e => {
      currentMaxPrice = parseInt(e.target.value);
      priceDisplay.textContent = formatPrice(currentMaxPrice);
      applyFilters();
    });
  }

  const searchInput = document.getElementById("search-products");
  if (searchInput) {
    searchInput.addEventListener("input", e => {
      searchQuery = (e.target.value || "").trim().toLowerCase();
      applyFilters();
    });
  }

  applyFilters();
}

// ---- Product Detail Page ----
function renderStarsHTMLDetail(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  let html = "";
  for(let i=0;i<full;i++) html += '<span class="detail-star">★</span>';
  if(half) html += '<span class="detail-star">½</span>';
  for(let i=0;i<empty;i++) html += '<span class="detail-star empty">★</span>';
  return html;
}

function initProductDetailPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  const container = document.getElementById("product-detail");
  if (!container) return;

  const product = getProductById(productId);
  if (!product) {
    container.innerHTML = `<div class="error-state"><h2>Product not found</h2><a href="products.html" class="btn-primary">Browse Products</a></div>`;
    return;
  }

  document.title = `${product.name} - SRG Mart`;

  let currentImgIndex = 0;
  let selectedQty = 1;
  const discount = getDiscount(product.originalPrice, product.price);

  container.innerHTML = `
    <div class="breadcrumb">
      <a href="../index.html">Home</a> <span>/</span>
      <a href="products.html?category=${product.category}">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</a> <span>/</span>
      <span>${product.name}</span>
    </div>
    <div class="product-detail-grid">
      <div class="product-gallery">
        <img id="main-product-img" class="product-main-img" src="${product.images[0]}" alt="${product.name}" />
        <div class="product-thumbnails">
          ${product.images.map((img, i) => `
            <img src="${img}" class="product-thumb ${i === 0 ? 'active' : ''}" alt="View ${i+1}" onclick="switchImage(${i})" />
          `).join("")}
        </div>
      </div>
      <div class="product-detail-right">
        <h1 class="product-detail-name">${product.name}</h1>
        <div class="detail-rating-row">
          <div class="detail-stars">${renderStarsHTMLDetail(product.rating)}</div>
          <span class="detail-rating-num">${product.rating} ★</span>
          <span class="detail-reviews">${product.reviews.toLocaleString()} ratings</span>
        </div>

        <div class="product-detail-desc">${product.description}</div>
        <div class="detail-price-block">
          <div class="detail-price-row">
            <span class="detail-price">${formatPrice(product.price)}</span>
            <span class="detail-original">${formatPrice(product.originalPrice)}</span>
            <span class="detail-discount">-${discount}% OFF</span>
          </div>
          <div class="savings-text">You save ${formatPrice(product.originalPrice - product.price)} on this order</div>
        </div>
        <div class="stock-status">In Stock</div>
        <div class="product-specs">
          <h4>Key Specifications</h4>
          <table class="specs-table">
            ${Object.entries(product.specs).map(([key, val]) => `
              <tr><td>${key}</td><td>${val}</td></tr>
            `).join("")}
          </table>
        </div>
        <div class="product-detail-actions">
          <div class="qty-selector">
            <span>Qty:</span>
            <div class="qty-control">
              <button class="qty-btn" onclick="changeDetailQty(-1)">−</button>
              <span class="qty-value" id="detail-qty">1</span>
              <button class="qty-btn" onclick="changeDetailQty(1)">+</button>
            </div>
          </div>
          <button class="btn-add-cart-lg" onclick="addToCartFromDetail()">
            🛒 Add to Cart
          </button>
          <a href="../pages/cart.html" class="btn-buy-now" onclick="addToCartFromDetail()">⚡ Buy Now</a>
        </div>
        <div class="product-perks">
          <div class="perk"><span>🚚</span><span>Free delivery on orders above ₹50,000</span></div>
          <div class="perk"><span>🔄</span><span>10-day easy returns</span></div>
          <div class="perk"><span>🛡️</span><span>1-year manufacturer warranty</span></div>
          <div class="perk"><span>⚡</span><span>Ships within 24 hours</span></div>
        </div>
      </div>
    </div>
  `;

  // Inject functions into window scope for onclick handlers
  window.switchImage = function(index) {
    currentImgIndex = index;
    document.getElementById("main-product-img").src = product.images[index];
    document.querySelectorAll(".product-thumb").forEach((t, i) => t.classList.toggle("active", i === index));
  };

  window.changeDetailQty = function(delta) {
    selectedQty = Math.max(1, Math.min(10, selectedQty + delta));
    document.getElementById("detail-qty").textContent = selectedQty;
  };

  window.addToCartFromDetail = function() {
    addToCart(product.id, selectedQty);
    selectedQty = 1;
    document.getElementById("detail-qty").textContent = 1;
  };

  // Related products
  const relatedSection = document.getElementById("related-products");
  if (relatedSection) {
    const related = getRelatedProducts(product);
    if (related.length > 0) {
      relatedSection.innerHTML = `
        <h2 class="section-title">Related Products</h2>
        <div class="products-grid">
          ${related.map(p => renderProductCard(p, "../")).join("")}
        </div>
      `;
    }
  }
}

// ---- Checkout Page ----
function initCheckoutPage() {
  const orderContainer = document.getElementById("checkout-order-summary");
  if (!orderContainer) return;

  if (!isLoggedIn || !isLoggedIn()) {
    showToast("Please login to checkout", "error");
    window.location.href = "login.html";
    return;
  }

  const cart = getCart();
  if (cart.length === 0) {
    window.location.href = "cart.html";
    return;
  }

  let subtotal = 0;
  orderContainer.innerHTML = `
    <div class="checkout-items">
      ${cart.map(item => {
        const product = getProductById(item.id);
        if (!product) return "";
        const total = product.price * item.qty;
        subtotal += total;
        return `
          <div class="checkout-item">
            <img src="${product.image}" alt="${product.name}" />
            <div class="checkout-item-info">
              <span class="checkout-item-name">${product.name}</span>
              <span class="checkout-item-qty">Qty: ${item.qty}</span>
            </div>
            <span class="checkout-item-price">${formatPrice(total)}</span>
          </div>
        `;
      }).join("")}
    </div>
    <div class="checkout-totals">
      <div class="checkout-row"><span>Subtotal</span><span>${formatPrice(subtotal)}</span></div>
      <div class="checkout-row"><span>Shipping</span><span>${subtotal > 50000 ? '<span class="free-ship">FREE</span>' : formatPrice(499)}</span></div>
      <div class="checkout-row total-row"><span>Total</span><span>${formatPrice(subtotal + (subtotal > 50000 ? 0 : 499))}</span></div>
    </div>
  `;

  const form = document.getElementById("checkout-form");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const name = document.getElementById("checkout-name").value.trim();
      const email = document.getElementById("checkout-email").value.trim().toLowerCase();
      const phone = document.getElementById("checkout-phone").value.trim();
      const address = document.getElementById("checkout-address").value.trim();
      const city = document.getElementById("checkout-city").value.trim();
      const state = document.getElementById("checkout-state").value;
      const pincode = document.getElementById("checkout-pincode").value.trim();
      const paymentMethod = (document.querySelector('input[name="payment"]:checked')?.value || "cod").toLowerCase();
      const status = paymentMethod === "cod" ? "Pending (COD)" : "Paid";
      const shipping = subtotal > 50000 ? 0 : 499;
      const total = subtotal + shipping;
      const order = saveOrder({
        name, email, phone,
        address, city, state, pincode,
        paymentMethod, status,
        subtotal,
        shipping,
        total,
        items: cart.map(item => ({ ...item }))
      });
      clearCart();
      document.getElementById("checkout-page").innerHTML = `
        <div class="order-success">
          <div class="success-icon">✓</div>
          <h2>Order Placed Successfully!</h2>
          <p>Thank you, <strong>${name}</strong>! Your order has been confirmed.</p>
          <p class="order-id">Order ID: ${order.id}</p>
          <p style="color:var(--text-secondary);">Payment: ${paymentMethod.toUpperCase()} • Status: ${status}</p>
          <p>You'll receive a confirmation on your WhatsApp/Email shortly.</p>
          <a href="../index.html" class="btn-primary">Continue Shopping</a>
        </div>
      `;
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initProductsPage();
  initProductDetailPage();
  initCheckoutPage();
});

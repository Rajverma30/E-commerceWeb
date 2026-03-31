// =============================================
// SRG MART - Main JavaScript
// =============================================

const DEFAULT_PRODUCTS = [
  {
    id: 1,
    name: "Samsung Galaxy S24 Ultra",
    category: "mobiles",
    price: 124999,
    originalPrice: 134999,
    rating: 4.8,
    reviews: 2341,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&q=80",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80"
    ],
    badge: "Bestseller",
    description: "The Samsung Galaxy S24 Ultra redefines smartphone excellence with its titanium frame, built-in S Pen, and revolutionary 200MP camera system. Powered by the Snapdragon 8 Gen 3, it delivers unmatched performance for power users.",
    specs: { RAM: "12GB", Storage: "256GB", Display: "6.8\" QHD+", Battery: "5000mAh", Camera: "200MP" },
    featured: true
  },
  {
    id: 2,
    name: "Apple MacBook Pro M3 Pro",
    category: "laptops",
    price: 209900,
    originalPrice: 229900,
    rating: 4.9,
    reviews: 1876,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&q=80"
    ],
    badge: "New",
    description: "Experience the power of Apple Silicon with the M3 Pro chip. The MacBook Pro delivers exceptional performance for creative professionals, with a stunning Liquid Retina XDR display and all-day battery life.",
    specs: { Chip: "M3 Pro", RAM: "18GB", Storage: "512GB SSD", Display: "14\" Liquid Retina XDR", Battery: "18hr" },
    featured: true
  },
  {
    id: 3,
    name: "Sony WH-1000XM5 Headphones",
    category: "accessories",
    price: 29990,
    originalPrice: 34990,
    rating: 4.7,
    reviews: 5621,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&q=80",
      "https://images.unsplash.com/photo-1545127398-14699f92334b?w=600&q=80"
    ],
    badge: "Hot Deal",
    description: "Industry-leading noise cancellation meets exceptional audio quality. The WH-1000XM5 features 8 microphones, Auto NC Optimizer, and up to 30 hours of battery life for the ultimate listening experience.",
    specs: { Type: "Over-ear", ANC: "Yes", Battery: "30hrs", Codec: "LDAC/AAC", Connectivity: "Bluetooth 5.2" },
    featured: true
  },
  {
    id: 4,
    name: "OnePlus 12 5G",
    category: "mobiles",
    price: 64999,
    originalPrice: 69999,
    rating: 4.6,
    reviews: 3210,
    image: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&q=80"
    ],
    badge: "Sale",
    description: "The OnePlus 12 5G brings flagship performance at a compelling price. Hasselblad camera tuning, 100W SUPERVOOC charging, and Snapdragon 8 Gen 3 make it a powerhouse device.",
    specs: { RAM: "12GB", Storage: "256GB", Display: "6.82\" LTPO AMOLED", Battery: "5400mAh", Camera: "50MP Hasselblad" },
    featured: false
  },
  {
    id: 5,
    name: "Dell XPS 15 OLED",
    category: "laptops",
    price: 189990,
    originalPrice: 199990,
    rating: 4.7,
    reviews: 987,
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&q=80"
    ],
    badge: null,
    description: "The Dell XPS 15 OLED is a creative powerhouse. With its stunning 3.5K OLED display, Intel Core i9 processor, and NVIDIA RTX 4070 graphics, it handles everything from content creation to gaming.",
    specs: { CPU: "Intel i9-13900H", RAM: "32GB", Storage: "1TB SSD", Display: "15.6\" 3.5K OLED", GPU: "RTX 4070" },
    featured: false
  },
  {
    id: 6,
    name: "Apple AirPods Pro 2nd Gen",
    category: "accessories",
    price: 24900,
    originalPrice: 26900,
    rating: 4.8,
    reviews: 8934,
    image: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=600&q=80",
      "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=600&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&q=80"
    ],
    badge: "Popular",
    description: "AirPods Pro deliver up to 2x more Active Noise Cancellation, Adaptive Transparency, and Personalized Spatial Audio. The H2 chip creates a remarkable audio experience.",
    specs: { Type: "In-ear", ANC: "Adaptive", Battery: "6hrs + 30hrs case", Chip: "Apple H2", Water: "IPX4" },
    featured: true
  },
  {
    id: 7,
    name: "iPhone 15 Pro Max",
    category: "mobiles",
    price: 159900,
    originalPrice: 169900,
    rating: 4.9,
    reviews: 12450,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&q=80",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&q=80",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&q=80"
    ],
    badge: "Premium",
    description: "Forged in titanium and featuring the A17 Pro chip, the iPhone 15 Pro Max introduces a new level of performance. The 48MP Main camera with 5x Tetraprism zoom captures incredible detail.",
    specs: { Chip: "A17 Pro", RAM: "8GB", Storage: "256GB", Display: "6.7\" Super Retina XDR", Camera: "48MP ProRAW" },
    featured: true
  },
  {
    id: 8,
    name: "Logitech MX Master 3S",
    category: "accessories",
    price: 9995,
    originalPrice: 12995,
    rating: 4.8,
    reviews: 7823,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80",
      "https://images.unsplash.com/photo-1615750185825-ffc7e2e6ccba?w=600&q=80",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80"
    ],
    badge: "Deal",
    description: "The MX Master 3S sets a new standard for mouse precision and ergonomics. With 8,000 DPI, ultra-quiet clicks, and MagSpeed electromagnetic scrolling, it's built for productivity perfectionists.",
    specs: { DPI: "8000", Buttons: "7", Battery: "70 days", Connectivity: "Bluetooth/USB-C", Scrolling: "MagSpeed" },
    featured: false
  },
  {
    id: 9,
    name: "ASUS ROG Zephyrus G14",
    category: "laptops",
    price: 119990,
    originalPrice: 129990,
    rating: 4.7,
    reviews: 2134,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&q=80",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80",
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80"
    ],
    badge: "Gaming",
    description: "The ROG Zephyrus G14 is the ultimate compact gaming laptop. AMD Ryzen 9 and RTX 4060 deliver raw gaming power, while the AniMe Matrix LED lid makes a bold style statement.",
    specs: { CPU: "AMD Ryzen 9", RAM: "16GB", Storage: "512GB SSD", Display: "14\" 165Hz QHD", GPU: "RTX 4060" },
    featured: false
  },
  {
    id: 10,
    name: "Samsung 65\" QLED 4K TV",
    category: "accessories",
    price: 89990,
    originalPrice: 99990,
    rating: 4.6,
    reviews: 1567,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=600&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"
    ],
    badge: "Sale",
    description: "Samsung QLED 4K TV delivers breathtaking picture quality with Quantum Dot technology. The Neural Quantum Processor 4K, Object Tracking Sound, and Anti-Reflection panel create a cinematic home experience.",
    specs: { Size: "65 inch", Resolution: "4K UHD", HDR: "HDR10+", SmartTV: "Tizen OS", Sound: "Object Tracking" },
    featured: false
  },
  {
    id: 11,
    name: "Google Pixel 8 Pro",
    category: "mobiles",
    price: 89999,
    originalPrice: 99999,
    rating: 4.7,
    reviews: 3421,
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80",
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80"
    ],
    badge: "AI Powered",
    description: "Google Pixel 8 Pro is the smartest Pixel yet. Powered by Google Tensor G3 chip and advanced AI features like Magic Eraser, Best Take, and Real Tone, it captures and creates like never before.",
    specs: { Chip: "Google Tensor G3", RAM: "12GB", Storage: "128GB", Display: "6.7\" LTPO OLED", Camera: "50MP Pro" },
    featured: false
  },
  {
    id: 12,
    name: "Anker 65W GaN Charger",
    category: "accessories",
    price: 3499,
    originalPrice: 4999,
    rating: 4.6,
    reviews: 15230,
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80",
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80"
    ],
    badge: "Value Pick",
    description: "Anker's 65W GaN charger packs incredible power into a compact form. Charge a MacBook, phone, and tablet simultaneously with intelligent power distribution and GaN II technology.",
    specs: { Power: "65W", Ports: "2x USB-C + 1x USB-A", Technology: "GaN II", Size: "Compact", Safety: "MultiProtect" },
    featured: false
  }
];

const ADMIN_EMAILS = ["vermaraj@gmail.com", "vermaraj01110@gmail.com", "vermaraj01110@gmail"];
const PRODUCTS_STORAGE_KEY = "srgProducts";
const USERS_STORAGE_KEY = "srgUsers";
const CURRENT_USER_KEY = "srgCurrentUser";
const ORDERS_STORAGE_KEY = "srgOrders";
const VISITOR_COUNT_KEY = "srgVisitorCount";
const VISITOR_SESSION_KEY = "srgVisitorCounted";

function loadProducts() {
  const saved = localStorage.getItem(PRODUCTS_STORAGE_KEY);
  if (!saved) return DEFAULT_PRODUCTS.map(product => ({ ...product }));
  try {
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return DEFAULT_PRODUCTS.map(product => ({ ...product }));
    }
    return parsed;
  } catch (error) {
    return DEFAULT_PRODUCTS.map(product => ({ ...product }));
  }
}

let PRODUCTS = loadProducts();

function saveProducts(products) {
  PRODUCTS = products;
  localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
}

function resetProductsToDefault() {
  saveProducts(DEFAULT_PRODUCTS.map(product => ({ ...product })));
}

function getAllProducts() {
  return PRODUCTS;
}

function getAllCategories() {
  const base = ["mobiles", "laptops", "accessories"];
  const fromProducts = getAllProducts()
    .map(product => (product.category || "").trim().toLowerCase())
    .filter(Boolean);
  return [...new Set([...base, ...fromProducts])];
}

function upsertProduct(productData, existingId = null) {
  const products = getAllProducts();
  if (existingId) {
    const nextProducts = products.map(product =>
      product.id === existingId ? { ...productData, id: existingId } : product
    );
    saveProducts(nextProducts);
    return existingId;
  }

  const nextId = products.length ? Math.max(...products.map(product => product.id)) + 1 : 1;
  saveProducts([...products, { ...productData, id: nextId }]);
  return nextId;
}

function deleteProductById(productId) {
  const numericId = parseInt(productId, 10);
  const nextProducts = getAllProducts().filter(product => product.id !== numericId);
  saveProducts(nextProducts);
}

// Utility Functions
function formatPrice(price) {
  return "₹" + price.toLocaleString("en-IN");
}

function getDiscount(original, current) {
  return Math.round(((original - current) / original) * 100);
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return "★".repeat(full) + (half ? "½" : "") + "☆".repeat(empty);
}

function getProductById(id) {
  return getAllProducts().find(p => p.id === parseInt(id, 10));
}

function getProductsByCategory(category) {
  const products = getAllProducts();
  if (category === "all") return products;
  return products.filter(p => p.category === category);
}

function getFeaturedProducts() {
  return getAllProducts().filter(p => p.featured);
}

function getRelatedProducts(product, count = 4) {
  return getAllProducts().filter(p => p.category === product.category && p.id !== product.id).slice(0, count);
}

function getVisitorCount() {
  return parseInt(localStorage.getItem(VISITOR_COUNT_KEY) || "0", 10);
}

function trackVisitorCount() {
  if (sessionStorage.getItem(VISITOR_SESSION_KEY) === "1") return;
  const current = getVisitorCount();
  localStorage.setItem(VISITOR_COUNT_KEY, String(current + 1));
  sessionStorage.setItem(VISITOR_SESSION_KEY, "1");
}

// ==========================
// Auth (LocalStorage-based)
// ==========================
function getUsers() {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

function seedDefaultAdmin() {
  const users = getUsers();
  let changed = false;
  ADMIN_EMAILS.forEach(email => {
    const norm = (email || "").toLowerCase();
    if (!norm) return;
    const exists = users.some(u => (u.email || "").toLowerCase() === norm);
    if (!exists) {
      users.push({
        email: norm,
        password: "admin@69",
        role: "admin",
        createdAt: Date.now()
      });
      changed = true;
    }
  });
  if (changed) saveUsers(users);
}

function getCurrentUser() {
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setCurrentUser(user) {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
}

function logoutUser() {
  setCurrentUser(null);
}

function isLoggedIn() {
  return !!getCurrentUser();
}

function isAdminLoggedIn() {
  const user = getCurrentUser();
  return !!user && user.role === "admin";
}

function getOrders() {
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

function getOrdersByUser(email) {
  const normalized = (email || "").trim().toLowerCase();
  return getOrders().filter(order => (order.email || "").toLowerCase() === normalized);
}

function saveOrder(orderPayload) {
  const currentOrders = getOrders();
  const order = {
    id: `SRG${Date.now().toString().slice(-8)}`,
    createdAt: Date.now(),
    ...orderPayload
  };
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify([order, ...currentOrders]));
  return order;
}

function updateOrderStatus(orderId, nextStatus) {
  const orders = getOrders();
  const updated = orders.map(order =>
    order.id === orderId ? { ...order, status: nextStatus, updatedAt: Date.now() } : order
  );
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
}

function getUserShoppingStats(email) {
  const normalizedEmail = (email || "").trim().toLowerCase();
  const orders = getOrders().filter(order => (order.email || "").toLowerCase() === normalizedEmail);
  const totalSpent = orders.reduce((sum, order) => sum + (order.total || 0), 0);
  return { ordersCount: orders.length, totalSpent };
}

function getUsersWithStats() {
  return getUsers().map(user => {
    const stats = getUserShoppingStats(user.email);
    return { ...user, ...stats };
  });
}

function renderAuthControls() {
  const navActions = document.querySelector(".nav-actions");
  if (!navActions) return;

  const existingContainer = document.getElementById("admin-actions");
  if (existingContainer) existingContainer.remove();

  // Remove old static account/login block from page templates to avoid duplicate auth UI.
  const staticAccountLink = navActions.querySelector('a.nav-action-btn[href*="login.html"]');
  if (staticAccountLink) staticAccountLink.remove();

  // Ensure wishlist icon exists (before admin/user controls)
  if (!document.querySelector(".wish-icon-wrap")) {
    const wish = document.createElement("a");
    wish.href = (window.location.pathname.includes("/pages/") ? "" : "pages/") + "wishlist.html";
    wish.className = "wish-icon-wrap";
    wish.title = "Wishlist";
    wish.innerHTML = `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
    navActions.prepend(wish);
  }

  const adminWrap = document.createElement("div");
  adminWrap.id = "admin-actions";
  adminWrap.className = "admin-actions";

  const baseToPages = window.location.pathname.includes("/pages/") ? "" : "pages/";

  if (isLoggedIn()) {
    if (isAdminLoggedIn()) {
      const user = getCurrentUser();
      adminWrap.innerHTML = `
        <a href="${baseToPages}admin.html" class="admin-btn admin-dashboard-btn">Dashboard</a>
        <div class="user-avatar" id="user-avatar"></div>
        <div class="user-menu" id="user-menu" style="display:none;">
          <div class="user-menu-email">${user?.email || ""}</div>
          <div class="user-menu-email">Role: Admin</div>
          <a href="${baseToPages}orders.html">My Orders</a>
          <button type="button" class="admin-logout-btn" id="admin-logout-btn">Logout</button>
        </div>
      `;
    } else {
      const user = getCurrentUser();
      adminWrap.innerHTML = `
        <div class="user-avatar" id="user-avatar"></div>
        <div class="user-menu" id="user-menu" style="display:none;">
          <div class="user-menu-email">${user?.email || ""}</div>
          <div class="user-menu-email">Role: Customer</div>
          <a href="${baseToPages}orders.html">My Orders</a>
          <a href="${baseToPages}wishlist.html">Wishlist</a>
          <button type="button" class="admin-logout-btn" id="admin-logout-btn">Logout</button>
        </div>
      `;
    }
  } else {
    adminWrap.innerHTML = `<a href="${baseToPages}login.html" class="admin-btn admin-login-btn" id="admin-login-btn">Login</a>`;
  }

  navActions.prepend(adminWrap);

  // Add account shortcuts inside the 3-line mobile menu.
  const navMenu = document.getElementById("nav-menu");
  if (navMenu) {
    const existingMobileLinks = navMenu.querySelector(".mobile-user-links");
    if (existingMobileLinks) existingMobileLinks.remove();

    const mobileLinks = document.createElement("div");
    mobileLinks.className = "mobile-user-links";
    if (isLoggedIn()) {
      mobileLinks.innerHTML = `
        <a href="${baseToPages}orders.html" class="nav-link">Orders</a>
        <a href="${baseToPages}wishlist.html" class="nav-link">Wishlist</a>
      `;
      if (isAdminLoggedIn()) {
        mobileLinks.innerHTML += `<a href="${baseToPages}admin.html" class="nav-link">Dashboard</a>`;
      }
    } else {
      mobileLinks.innerHTML = `<a href="${baseToPages}login.html" class="nav-link">Login</a>`;
    }
    navMenu.appendChild(mobileLinks);
  }

  // Initialize avatar initial and dropdown toggling
  const avatarEl = document.getElementById("user-avatar");
  const menuEl = document.getElementById("user-menu");
  if (avatarEl && menuEl) {
    const user = getCurrentUser();
    const initial = (user?.email || "U").trim().charAt(0).toUpperCase();
    avatarEl.textContent = initial;
    const toggleMenu = (e) => {
      e.stopPropagation();
      menuEl.style.display = menuEl.style.display === "none" ? "block" : "none";
    };
    avatarEl.addEventListener("click", toggleMenu);
    document.addEventListener("click", (e) => {
      if (!menuEl.contains(e.target) && e.target !== avatarEl) {
        menuEl.style.display = "none";
      }
    });
  }

  const logoutBtn = document.getElementById("admin-logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      logoutUser();
      showToast("Logged out");
      updateCartBadge();
      if (window.location.pathname.includes("admin.html")) {
        window.location.href = "../index.html";
        return;
      }
      renderAuthControls();
    });
  }
}

// Navbar Active Link
function setActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") && path.includes(link.getAttribute("href").replace("../", "").replace("./", ""))) {
      link.classList.add("active");
    }
  });
  if (path.endsWith("index.html") || path.endsWith("/")) {
    const homeLink = document.querySelector('.nav-link[href*="index"]') || document.querySelectorAll('.nav-link')[0];
    if (homeLink) homeLink.classList.add("active");
  }
}

// Cart badge update
function getCartItemCountForBadge() {
  try {
    if (!isLoggedIn()) return 0;
    const user = getCurrentUser();
    const key = `srgCart:${(user.email || "").toLowerCase()}`;
    const cart = JSON.parse(localStorage.getItem(key) || "[]");
    return cart.reduce((sum, item) => sum + (item.qty || 0), 0);
  } catch {
    return 0;
  }
}

function updateCartBadge() {
  const total = getCartItemCountForBadge();
  document.querySelectorAll(".cart-badge").forEach(badge => {
    badge.textContent = total;
    badge.style.display = total > 0 ? "flex" : "none";
  });
}

// Wishlist
const WISHLIST_KEY = "srgWishlist";
function getWishlist() {
  try {
    const raw = localStorage.getItem(WISHLIST_KEY) || "[]";
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list : [];
  } catch { return []; }
}
function saveWishlist(ids) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(ids));
}
function isInWishlist(productId) {
  return getWishlist().includes(productId);
}
function toggleWishlist(productId) {
  const list = getWishlist();
  const idx = list.indexOf(productId);
  if (idx >= 0) {
    list.splice(idx, 1);
    saveWishlist(list);
    showToast("Removed from wishlist", "error");
  } else {
    list.push(productId);
    saveWishlist(list);
    showToast("Added to wishlist");
  }
  // Re-render quick if present
  document.querySelectorAll(`.product-card[data-id="${productId}"] .btn-add-cart + .btn-add-cart`).forEach(btn => {
    btn.textContent = isInWishlist(productId) ? "♥ In Wishlist" : "♡ Add to Wishlist";
  });
}

// Toast notification
function showToast(message, type = "success") {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${type === "success" ? "✓" : "✕"}</span>
    <span>${message}</span>
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add("show"), 10);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Render product card
function renderProductCard(product, basePath = "") {
  const discount = getDiscount(product.originalPrice, product.price);
  const badgeColor = product.badge === "Hot Deal" || product.badge === "Sale" ? "orange" : (product.badge === "New" ? "green" : "");
  const starsHtml = renderStarsHTML(product.rating);
  return `
    <div class="product-card" data-id="${product.id}" onclick="window.location='${basePath}pages/product.html?id=${product.id}'">
      <div class="product-img-wrap">
        ${product.badge ? `<span class="product-badge ${badgeColor}">${product.badge}</span>` : ""}
        <button class="product-wish-btn" onclick="event.stopPropagation(); toggleWishlist(${product.id})" title="Add to Wishlist">♡</button>
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
      </div>
      <div class="product-info">
        <div class="product-name">${product.name}</div>
        <div class="product-rating">
          <div class="stars">${starsHtml}</div>
          <span class="rating-num">${product.rating}</span>
          <span class="review-count">(${product.reviews.toLocaleString()})</span>
        </div>
        <div class="product-price-block">
          <span class="product-price">${formatPrice(product.price)}</span>
          <span class="product-original-price">${formatPrice(product.originalPrice)}</span>
          <span class="product-discount">-${discount}%</span>
        </div>
      </div>
      <div class="product-card-footer">
        <button class="btn-card-add" onclick="event.stopPropagation(); addToCart(${product.id})">
          🛒 Add to Cart
        </button>
      </div>
    </div>
  `;
}

function renderStarsHTML(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  let html = "";
  for(let i=0;i<full;i++) html += '<span class="star">★</span>';
  if(half) html += '<span class="star">½</span>';
  for(let i=0;i<empty;i++) html += '<span class="star empty">★</span>';
  return html;
}

// Mobile menu toggle
function initMobileMenu() {
  const toggle = document.querySelector(".mobile-menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  if (toggle && navMenu) {
    toggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
      toggle.classList.toggle("open");
    });
  }
}

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  trackVisitorCount();
  seedDefaultAdmin();
  PRODUCTS = loadProducts();
  updateCartBadge();
  setActiveNav();
  initMobileMenu();
  renderAuthControls();
});

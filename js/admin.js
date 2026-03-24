function ensureAdminAccess() {
  if (!isAdminLoggedIn()) {
    alert("Admin access required. Pehle admin login kijiye.");
    window.location.href = "../index.html";
    return false;
  }
  return true;
}

let uploadedImageDataUrl = null;

function getProductPayloadFromForm() {
  const image = document.getElementById("product-image").value.trim();
  const categorySelect = document.getElementById("product-category");
  const newCategory = document.getElementById("product-new-category").value.trim().toLowerCase();
  const finalCategory = categorySelect.value === "__new__" ? newCategory : categorySelect.value;
  const resolvedImage = uploadedImageDataUrl || image;
  return {
    name: document.getElementById("product-name").value.trim(),
    category: finalCategory,
    price: parseInt(document.getElementById("product-price").value, 10),
    originalPrice: parseInt(document.getElementById("product-original-price").value, 10),
    rating: parseFloat(document.getElementById("product-rating").value),
    reviews: parseInt(document.getElementById("product-reviews").value, 10),
    image: resolvedImage,
    images: [resolvedImage, resolvedImage, resolvedImage],
    badge: document.getElementById("product-badge").value.trim() || null,
    description: document.getElementById("product-description").value.trim(),
    specs: { Info: "Admin added product" },
    featured: document.getElementById("product-featured").value === "true"
  };
}

function refreshCategoryOptions() {
  const select = document.getElementById("product-category");
  if (!select) return;
  const current = select.value;
  const categories = getAllCategories();
  select.innerHTML = "";
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    select.appendChild(option);
  });
  const addNewOption = document.createElement("option");
  addNewOption.value = "__new__";
  addNewOption.textContent = "+ Add New Category";
  select.appendChild(addNewOption);
  if (categories.includes(current)) select.value = current;
}

function fillFormForEdit(product) {
  document.getElementById("product-id").value = product.id;
  document.getElementById("product-name").value = product.name;
  const select = document.getElementById("product-category");
  if (![...select.options].some(option => option.value === product.category)) {
    const option = document.createElement("option");
    option.value = product.category;
    option.textContent = product.category;
    select.insertBefore(option, select.querySelector('option[value="__new__"]'));
  }
  select.value = product.category;
  document.getElementById("new-category-wrap").style.display = "none";
  document.getElementById("product-price").value = product.price;
  document.getElementById("product-original-price").value = product.originalPrice;
  document.getElementById("product-rating").value = product.rating;
  document.getElementById("product-reviews").value = product.reviews;
  document.getElementById("product-image").value = product.image;
  document.getElementById("product-badge").value = product.badge || "";
  document.getElementById("product-description").value = product.description;
  document.getElementById("product-featured").value = product.featured ? "true" : "false";
  document.getElementById("form-title").textContent = "Edit Product";
  document.getElementById("save-btn").textContent = "Update Product";
}

function resetAdminForm() {
  document.getElementById("product-form").reset();
  document.getElementById("product-id").value = "";
  document.getElementById("new-category-wrap").style.display = "none";
  uploadedImageDataUrl = null;
  document.getElementById("form-title").textContent = "Add Product";
  document.getElementById("save-btn").textContent = "Save Product";
}

function renderAdminProducts() {
  const q = (document.getElementById("admin-product-search")?.value || "").trim().toLowerCase();
  const products = getAllProducts().filter(p => {
    if (!q) return true;
    return (p.name + " " + (p.description || "") + " " + (p.category || "")).toLowerCase().includes(q);
  });
  const body = document.getElementById("admin-products-body");
  const count = document.getElementById("product-count-admin");
  if (!body || !count) return;

  count.textContent = String(products.length);
  body.innerHTML = products.map(product => `
    <tr>
      <td>${product.name}</td>
      <td>${product.category}</td>
      <td>${formatPrice(product.price)}</td>
      <td>
        <button class="table-btn edit-btn" data-id="${product.id}">Edit</button>
        <button class="table-btn delete-btn" data-id="${product.id}">Delete</button>
      </td>
    </tr>
  `).join("");

  body.querySelectorAll(".edit-btn").forEach(button => {
    button.addEventListener("click", () => {
      const product = getProductById(button.dataset.id);
      if (product) fillFormForEdit(product);
    });
  });

  body.querySelectorAll(".delete-btn").forEach(button => {
    button.addEventListener("click", () => {
      if (!confirm("Product delete karna hai?")) return;
      deleteProductById(button.dataset.id);
      showToast("Product deleted", "error");
      renderAdminProducts();
      resetAdminForm();
    });
  });
}

function renderUsersShopping() {
  const usersBody = document.getElementById("admin-users-body");
  const usersCount = document.getElementById("users-count-admin");
  const ordersCount = document.getElementById("orders-count-admin");
  if (!usersBody || !usersCount || !ordersCount) return;

  const users = getUsersWithStats();
  const orders = getOrders();
  usersCount.textContent = String(users.length);
  ordersCount.textContent = String(orders.length);

  if (!users.length) {
    usersBody.innerHTML = `<tr><td colspan="4">No users registered yet.</td></tr>`;
    return;
  }

  usersBody.innerHTML = users.map(user => `
    <tr>
      <td>${user.email}</td>
      <td>${user.role}</td>
      <td>${user.ordersCount}</td>
      <td>${formatPrice(user.totalSpent)}</td>
    </tr>
  `).join("");
}

function initAdminDashboard() {
  if (!ensureAdminAccess()) return;
  const visitorCount = document.getElementById("visitor-count");
  if (visitorCount) visitorCount.textContent = String(getVisitorCount());

  const form = document.getElementById("product-form");
  const cancelBtn = document.getElementById("cancel-edit-btn");
  const categorySelect = document.getElementById("product-category");
  const newCategoryWrap = document.getElementById("new-category-wrap");
  const imageFileInput = document.getElementById("product-image-file");

  refreshCategoryOptions();

  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const existingId = parseInt(document.getElementById("product-id").value || "0", 10) || null;
      const payload = getProductPayloadFromForm();
      if (!payload.category) {
        showToast("Please enter new category", "error");
        return;
      }
      upsertProduct(payload, existingId);
      showToast(existingId ? "Product updated" : "Product added");
      refreshCategoryOptions();
      renderAdminProducts();
      renderUsersShopping();
      renderOrders();
      resetAdminForm();
    });
  }

  if (cancelBtn) {
    cancelBtn.addEventListener("click", resetAdminForm);
  }
  const searchInput = document.getElementById("admin-product-search");
  if (searchInput) {
    searchInput.addEventListener("input", renderAdminProducts);
  }
  if (imageFileInput) {
    imageFileInput.addEventListener("change", () => {
      const file = imageFileInput.files && imageFileInput.files[0];
      if (!file) { uploadedImageDataUrl = null; return; }
      const reader = new FileReader();
      reader.onload = e => {
        uploadedImageDataUrl = e.target?.result || null;
        showToast("Image ready for upload");
      };
      reader.readAsDataURL(file);
    });
  }
  if (categorySelect) {
    categorySelect.addEventListener("change", () => {
      if (!newCategoryWrap) return;
      newCategoryWrap.style.display = categorySelect.value === "__new__" ? "grid" : "none";
    });
  }

  renderAdminProducts();
  renderUsersShopping();
  renderOrders();
}

function formatDateTime(ts) {
  try {
    const d = new Date(ts);
    return d.toLocaleString();
  } catch {
    return "";
  }
}

function renderOrders() {
  const body = document.getElementById("admin-orders-body");
  if (!body) return;
  const orders = getOrders();
  if (!orders.length) {
    body.innerHTML = `<tr><td colspan="9">No orders yet.</td></tr>`;
    return;
  }
  body.innerHTML = orders.map(order => `
    <tr>
      <td>${order.id}</td>
      <td>${formatDateTime(order.createdAt)}</td>
      <td>${order.name || "-"}</td>
      <td>${order.email || "-"}</td>
      <td>${(order.paymentMethod || "").toUpperCase()}</td>
      <td>
        <select class="status-select" data-oid="${order.id}">
          ${["Pending (COD)", "Paid", "Out for Delivery", "Delivered", "Cancelled"]
            .map(status => `<option value="${status}" ${order.status === status ? "selected" : ""}>${status}</option>`)
            .join("")}
        </select>
      </td>
      <td>${order.items ? order.items.length : 0}</td>
      <td>${formatPrice(order.total || 0)}</td>
      <td><button class="table-btn edit-btn" data-oid="${order.id}">View</button></td>
    </tr>
  `).join("");

  body.querySelectorAll(".edit-btn").forEach(btn => {
    btn.addEventListener("click", () => openOrderModal(btn.getAttribute("data-oid")));
  });
  body.querySelectorAll(".status-select").forEach(select => {
    select.addEventListener("change", () => {
      updateOrderStatus(select.getAttribute("data-oid"), select.value);
      showToast("Order status updated");
      renderOrders();
    });
  });
}

function openOrderModal(orderId) {
  const modal = document.getElementById("order-modal");
  const modalBody = document.getElementById("order-modal-body");
  const closeBtn = document.getElementById("order-modal-close");
  if (!modal || !modalBody || !closeBtn) return;
  const order = getOrders().find(o => o.id === orderId);
  if (!order) return;
  modalBody.innerHTML = `
    <h3>Order ${order.id}</h3>
    <div class="order-detail-grid">
      <div><div class="label">Date</div><div>${formatDateTime(order.createdAt)}</div></div>
      <div><div class="label">Payment</div><div>${(order.paymentMethod || "").toUpperCase()}</div></div>
      <div><div class="label">Status</div><div>${order.status || "-"}</div></div>
      <div><div class="label">Total</div><div>${formatPrice(order.total || 0)}</div></div>
      <div><div class="label">Name</div><div>${order.name || "-"}</div></div>
      <div><div class="label">Email</div><div>${order.email || "-"}</div></div>
      <div><div class="label">Phone</div><div>${order.phone || "-"}</div></div>
      <div><div class="label">PIN</div><div>${order.pincode || "-"}</div></div>
      <div style="grid-column:1 / -1;">
        <div class="label">Address</div>
        <div>${order.address || "-"}, ${order.city || "-"}, ${order.state || "-"}</div>
      </div>
    </div>
    <div class="order-items">
      <h4>Items</h4>
      <div>
        ${(order.items || []).map(it => {
          const p = getProductById(it.id);
          const line = p ? `${p.name} x ${it.qty} — ${formatPrice(p.price * it.qty)}` : `#${it.id} x ${it.qty}`;
          return `<div style="padding:6px 0;border-bottom:1px dashed var(--border);">${line}</div>`;
        }).join("")}
      </div>
    </div>
  `;
  modal.style.display = "flex";
  closeBtn.onclick = () => { modal.style.display = "none"; };
  modal.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; };
}

document.addEventListener("DOMContentLoaded", initAdminDashboard);

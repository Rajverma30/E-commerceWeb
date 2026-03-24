function requireUserLogin() {
  if (!isLoggedIn()) {
    showToast("Please login first", "error");
    window.location.href = "login.html";
    return false;
  }
  return true;
}

function renderUserOrders() {
  if (!requireUserLogin()) return;
  const user = getCurrentUser();
  const container = document.getElementById("orders-list");
  if (!container) return;
  const orders = getOrdersByUser(user.email);
  if (!orders.length) {
    container.innerHTML = `<div class="admin-panel"><p>No orders found yet.</p></div>`;
    return;
  }
  container.innerHTML = orders.map(order => `
    <div class="admin-panel" style="margin-bottom:14px;">
      <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;">
        <strong>Order ${order.id}</strong>
        <span>${new Date(order.createdAt).toLocaleString()}</span>
      </div>
      <div style="margin-top:8px;color:var(--text-secondary);">
        Payment: ${(order.paymentMethod || "").toUpperCase()} | Status: <strong>${order.status || "-"}</strong> | Total: ${formatPrice(order.total || 0)}
      </div>
      <div style="margin-top:8px;">
        ${(order.items || []).map(item => {
          const p = getProductById(item.id);
          return `<div style="padding:4px 0;">${p ? p.name : `#${item.id}`} x ${item.qty}</div>`;
        }).join("")}
      </div>
    </div>
  `).join("");
}

document.addEventListener("DOMContentLoaded", renderUserOrders);

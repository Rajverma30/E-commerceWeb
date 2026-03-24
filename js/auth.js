function switchAuthTab(showLogin) {
  const loginTab = document.getElementById("tab-login");
  const regTab = document.getElementById("tab-register");
  const loginForm = document.getElementById("login-form");
  const regForm = document.getElementById("register-form");
  if (!loginTab || !regTab || !loginForm || !regForm) return;
  loginTab.classList.toggle("active", showLogin);
  regTab.classList.toggle("active", !showLogin);
  loginForm.style.display = showLogin ? "grid" : "none";
  regForm.style.display = showLogin ? "none" : "grid";
}

function normalizeEmail(email) {
  return (email || "").trim().toLowerCase();
}

function registerUser(email, password) {
  const users = getUsers();
  const normalized = normalizeEmail(email);
  if (users.some(u => normalizeEmail(u.email) === normalized)) {
    throw new Error("Email already registered");
  }
  const role = (typeof ADMIN_EMAILS !== "undefined" && ADMIN_EMAILS.includes(normalized)) ? "admin" : "user";
  const user = { email: normalized, password, role, createdAt: Date.now() };
  users.push(user);
  saveUsers(users);
  setCurrentUser({ email: user.email, role: user.role });
  return user;
}

function loginUser(email, password) {
  const users = getUsers();
  const normalized = normalizeEmail(email);
  const user = users.find(u => normalizeEmail(u.email) === normalized && u.password === password);
  if (!user) throw new Error("Invalid email or password");
  setCurrentUser({ email: user.email, role: user.role });
  return user;
}

document.addEventListener("DOMContentLoaded", () => {
  // Render nav auth controls on this page too
  renderAuthControls();

  const loginTab = document.getElementById("tab-login");
  const regTab = document.getElementById("tab-register");
  if (loginTab && regTab) {
    loginTab.addEventListener("click", () => switchAuthTab(true));
    regTab.addEventListener("click", () => switchAuthTab(false));
  }

  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", e => {
      e.preventDefault();
      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;
      try {
        const user = loginUser(email, password);
        showToast("Login successful");
        if (user.role === "admin") {
          window.location.href = "admin.html";
        } else {
          window.location.href = "../index.html";
        }
      } catch (err) {
        showToast(err.message || "Login failed", "error");
      }
    });
  }

  const regForm = document.getElementById("register-form");
  if (regForm) {
    regForm.addEventListener("submit", e => {
      e.preventDefault();
      const email = document.getElementById("reg-email").value;
      const pass1 = document.getElementById("reg-password").value;
      const pass2 = document.getElementById("reg-password2").value;
      if (pass1 !== pass2) {
        showToast("Passwords do not match", "error");
        return;
      }
      if (pass1.length < 6) {
        showToast("Password must be at least 6 characters", "error");
        return;
      }
      try {
        const user = registerUser(email, pass1);
        showToast("Account created");
        if (user.role === "admin") {
          window.location.href = "admin.html";
        } else {
          window.location.href = "../index.html";
        }
      } catch (err) {
        showToast(err.message || "Registration failed", "error");
      }
    });
  }
});

// ================= MODULE AUTHENTICATION (auth.js) =================

// 1. Tiện ích mã hóa (Web Crypto API: PBKDF2/SHA-256 + Salt)
async function generateSalt() {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function hashPassword(password, salt) {
    const encoder = new TextEncoder();
    const data = encoder.encode(salt + password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// 2. Quản lý Storage & Session
function getUsers() {
    return JSON.parse(localStorage.getItem('vr_users')) || {};
}

function saveUsers(users) {
    localStorage.setItem('vr_users', JSON.stringify(users));
}

function getCurrentUser() {
    const username = localStorage.getItem('vr_session');
    if (!username) return null;
    const users = getUsers();
    const user = users[username];
    if (!user) {
        localStorage.removeItem('vr_session');
        return null;
    }
    return { username, name: user.name };
}

function setSession(username) {
    localStorage.setItem('vr_session', username);
    updateUserDisplay();
}

function clearSession() {
    localStorage.removeItem('vr_session');
    updateUserDisplay();
}

function updateUserDisplay() {
    const user = getCurrentUser();
    const displayNameEl = document.getElementById('user-display-name');
    if (displayNameEl) {
        displayNameEl.innerText = user ? user.name : 'Người Yêu Cổ Phục';
    }
}

// 3. Hiển thị & Chuyển đổi màn hình xác thực
function showAuthScreen(type) {
    clearAuthErrors();
    if (type === 'register') {
        const regScreen = document.getElementById('register-screen');
        if (regScreen) {
            document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
            regScreen.classList.add('active');
        }
    } else {
        const loginScreen = document.getElementById('login-screen');
        if (loginScreen) {
            document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
            loginScreen.classList.add('active');
        }
    }
}

function clearAuthErrors() {
    const loginErr = document.getElementById('login-error');
    const regErr = document.getElementById('register-error');
    if (loginErr) loginErr.innerText = '';
    if (regErr) regErr.innerText = '';
}

// 4. Xử lý Đăng ký
async function handleRegister(event) {
    event.preventDefault();
    const nameInput = document.getElementById('reg-name');
    const usernameInput = document.getElementById('reg-username');
    const passwordInput = document.getElementById('reg-password');
    const confirmInput = document.getElementById('reg-confirm');
    const errorEl = document.getElementById('register-error');

    if (errorEl) errorEl.innerText = '';

    const name = nameInput ? nameInput.value.trim() : '';
    const username = usernameInput ? usernameInput.value.trim().toLowerCase() : '';
    const password = passwordInput ? passwordInput.value : '';
    const confirm = confirmInput ? confirmInput.value : '';

    if (!name) {
        if (errorEl) errorEl.innerText = 'Vui lòng nhập họ và tên của bạn.';
        return;
    }

    const usernameRegex = /^[a-z0-9_]{3,20}$/;
    if (!usernameRegex.test(username)) {
        if (errorEl) errorEl.innerText = 'Tên đăng nhập phải dài 3–20 ký tự (chỉ gồm a-z, 0-9 và dấu gạch dưới).';
        return;
    }

    if (password.length < 6) {
        if (errorEl) errorEl.innerText = 'Mật khẩu phải có độ dài tối thiểu 6 ký tự.';
        return;
    }

    if (password !== confirm) {
        if (errorEl) errorEl.innerText = 'Mật khẩu xác nhận không trùng khớp.';
        return;
    }

    const users = getUsers();
    if (users[username]) {
        if (errorEl) errorEl.innerText = 'Tên đăng nhập này đã tồn tại trên hệ thống.';
        return;
    }

    const salt = await generateSalt();
    const hash = await hashPassword(password, salt);

    users[username] = {
        name,
        salt,
        hash,
        createdAt: new Date().toISOString()
    };
    saveUsers(users);

    // Tự động đăng nhập
    setSession(username);

    // Reset form
    const regForm = document.getElementById('register-form');
    if (regForm) regForm.reset();

    // Điều hướng vào màn hình chính
    window.navigateTo('collections-screen');
}

// 5. Xử lý Đăng nhập
async function handleLogin(event) {
    event.preventDefault();
    const usernameInput = document.getElementById('login-username');
    const passwordInput = document.getElementById('login-password');
    const errorEl = document.getElementById('login-error');

    if (errorEl) errorEl.innerText = '';

    const username = usernameInput ? usernameInput.value.trim().toLowerCase() : '';
    const password = passwordInput ? passwordInput.value : '';

    if (!username || !password) {
        if (errorEl) errorEl.innerText = 'Vui lòng điền đầy đủ tên đăng nhập và mật khẩu.';
        return;
    }

    const users = getUsers();
    const user = users[username];

    if (!user) {
        if (errorEl) errorEl.innerText = 'Sai tên đăng nhập hoặc mật khẩu.';
        return;
    }

    const inputHash = await hashPassword(password, user.salt);
    if (inputHash !== user.hash) {
        if (errorEl) errorEl.innerText = 'Sai tên đăng nhập hoặc mật khẩu.';
        return;
    }

    setSession(username);

    const loginForm = document.getElementById('login-form');
    if (loginForm) loginForm.reset();

    window.navigateTo('collections-screen');
}

// 6. Đăng xuất
function logout() {
    clearSession();
    const loginForm = document.getElementById('login-form');
    const regForm = document.getElementById('register-form');
    if (loginForm) loginForm.reset();
    if (regForm) regForm.reset();
    clearAuthErrors();
    window.navigateTo('login-screen');
}

// 7. Bảo vệ Router / Chặn truy cập trái phép
(function protectNavigation() {
    const originalNavigateTo = window.navigateTo;
    window.navigateTo = function(screenId) {
        const user = getCurrentUser();
        const authScreens = ['login-screen', 'register-screen'];

        // Nếu chưa đăng nhập mà truy cập màn hình ngoài login/register -> buộc về login
        if (!user && !authScreens.includes(screenId)) {
            if (typeof originalNavigateTo === 'function') {
                originalNavigateTo('login-screen');
            } else {
                document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
                const ls = document.getElementById('login-screen');
                if (ls) ls.classList.add('active');
            }
            return;
        }

        if (typeof originalNavigateTo === 'function') {
            originalNavigateTo(screenId);
        }
    };
})();

// 8. Khởi tạo & Gắn sự kiện khi DOM sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
    // Gắn sự kiện form submit
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Nút đăng xuất
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    }

    // Kiểm tra phiên đăng nhập hiện tại
    const user = getCurrentUser();
    if (user) {
        updateUserDisplay();
        window.navigateTo('collections-screen');
    } else {
        window.navigateTo('login-screen');
    }
});

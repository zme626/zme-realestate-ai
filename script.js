document.addEventListener('DOMContentLoaded', function() {
    // 1. حارس حالة المصادقة (يعمل في كل الصفحات)
    const navbarRight = document.querySelector('.navbar-right');
    if (navbarRight && window.authFunctions) {
        window.authFunctions.onAuthStateChanged(window.authFunctions.auth, (user) => {
            if (user) {
                const userName = user.displayName || user.email.split('@')[0];
                navbarRight.innerHTML = `<div class="user-profile-menu"><button id="user-menu-button" class="user-avatar-button"><span>مرحباً، ${userName}</span><img src="${user.photoURL || 'images/avatar.png'}" alt="الصورة الرمزية"><i class="fa-solid fa-chevron-down"></i></button><div id="user-dropdown" class="user-dropdown"><a href="dashboard.html"><i class="fa-solid fa-table-columns"></i> لوحة التحكم</a><a href="profile.html"><i class="fa-solid fa-user"></i> ملفي الشخصي</a><a href="#" id="logout-button"><i class="fa-solid fa-right-from-bracket"></i> تسجيل الخروج</a></div></div>`;
                const userMenuButton = document.getElementById('user-menu-button');
                const userDropdown = document.getElementById('user-dropdown');
                if (userMenuButton && userDropdown) {
                    userMenuButton.addEventListener('click', (e) => { e.stopPropagation(); userDropdown.classList.toggle('active'); });
                    document.addEventListener('click', () => { if (userDropdown.classList.contains('active')) { userDropdown.classList.remove('active'); } });
                }
                const logoutButton = document.getElementById('logout-button');
                if (logoutButton) { logoutButton.addEventListener('click', (e) => { e.preventDefault(); window.authFunctions.userSignOut(); }); }
            } else {
                navbarRight.innerHTML = `<div class="nav-actions"><a href="login.html" class="btn btn-secondary">تسجيل الدخول</a><a href="login.html" class="btn btn-primary">إنشاء حساب</a></div>`;
            }
        });
    }

    // 2. الكود المُصحح لتفعيل قائمة الهمبرغر
    const hamburgerButton = document.getElementById('hamburger-menu');
    const navbarCenter = document.querySelector('.navbar-center');
    const mobileNavRight = document.querySelector('.navbar-right'); 
    if (hamburgerButton && navbarCenter && mobileNavRight) {
        hamburgerButton.addEventListener('click', () => {
            navbarCenter.classList.toggle('active');
            mobileNavRight.classList.toggle('active');
        });
    }
});

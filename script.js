// script.js - الملف الرئيسي للتفاعلات العامة

document.addEventListener('DOMContentLoaded', function() {

    // =================================================================
    // 1. حارس حالة المصادقة (يعمل في كل الصفحات)
    // =================================================================
    const navbarRight = document.querySelector('.navbar-right');

    // التأكد من وجود حاوية شريط التنقل قبل تنفيذ أي شيء
    if (navbarRight && window.authFunctions) {
        window.authFunctions.onAuthStateChanged(window.authFunctions.auth, (user) => {
            if (user) {
                // المستخدم مسجل الدخول
                const userName = user.displayName || user.email.split('@')[0]; // اعرض الاسم أو جزء من الإيميل
                navbarRight.innerHTML = `
                    <div class="user-profile-menu">
                        <button id="user-menu-button" class="user-avatar-button">
                            <span>مرحباً، ${userName}</span>
                            <img src="${user.photoURL || 'images/avatar.png'}" alt="الصورة الرمزية">
                            <i class="fa-solid fa-chevron-down"></i>
                        </button>
                        <div id="user-dropdown" class="user-dropdown">
                            <a href="dashboard.html"><i class="fa-solid fa-table-columns"></i> لوحة التحكم</a>
                            <a href="profile.html"><i class="fa-solid fa-user"></i> ملفي الشخصي</a>
                            <a href="#" id="logout-button"><i class="fa-solid fa-right-from-bracket"></i> تسجيل الخروج</a>
                        </div>
                    </div>
                `;
                
                // تفعيل زر القائمة المنسدلة للمستخدم
                const userMenuButton = document.getElementById('user-menu-button');
                const userDropdown = document.getElementById('user-dropdown');
                if (userMenuButton && userDropdown) {
                    userMenuButton.addEventListener('click', (e) => {
                        e.stopPropagation();
                        userDropdown.classList.toggle('active');
                    });
                    document.addEventListener('click', () => {
                        if (userDropdown.classList.contains('active')) {
                            userDropdown.classList.remove('active');
                        }
                    });
                }

                // تفعيل زر تسجيل الخروج
                const logoutButton = document.getElementById('logout-button');
                if (logoutButton) {
                    logoutButton.addEventListener('click', (e) => {
                        e.preventDefault();
                        window.authFunctions.userSignOut();
                    });
                }

            } else {
                // المستخدم غير مسجل الدخول
                navbarRight.innerHTML = `
                    <div class="nav-actions">
                        <a href="login.html" class="btn btn-secondary">تسجيل الدخول</a>
                        <a href="login.html" class="btn btn-primary">إنشاء حساب</a>
                    </div>
                `;
            }
        });
    }

    // =================================================================
    // 2. تفعيل قائمة الهمبرغر (للشاشات الصغيرة)
    // =================================================================
    const hamburgerButton = document.getElementById('hamburger-menu');
    const navbarCenter = document.querySelector('.navbar-center');
    const mobileNavRight = document.querySelector('.navbar-right');
    if (hamburgerButton && navbarCenter && mobileNavRight) {
        hamburgerButton.addEventListener('click', () => {
            navbarCenter.classList.toggle('active');
            mobileNavRight.classList.toggle('active');
        });
    }

    // =================================================================
    // 3. كود خاص بصفحة تسجيل الدخول (التبديل بين النماذج)
    // =================================================================
    if (document.getElementById('login') && document.getElementById('signup')) {
        const loginForm = document.getElementById('login');
        const signupForm = document.getElementById('signup');
        const switchToSignup = document.querySelector('a[href="#signup"]');
        const switchToLogin = document.querySelector('a[href="#login"]');

        if (switchToSignup) {
            switchToSignup.addEventListener('click', (e) => {
                e.preventDefault();
                loginForm.style.display = 'none';
                signupForm.style.display = 'block';
            });
        }
        if (switchToLogin) {
            switchToLogin.addEventListener('click', (e) => {
                e.preventDefault();
                signupForm.style.display = 'none';
                loginForm.style.display = 'block';
            });
        }
    }
});

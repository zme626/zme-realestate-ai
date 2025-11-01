document.addEventListener('DOMContentLoaded', function() {

    // =================================================================
    // 1. حارس حالة المصادقة (يتحكم في أزرار تسجيل الدخول/الخروج)
    // =================================================================
    const navbarRight = document.querySelector('.navbar-right');
    if (navbarRight && window.authFunctions) {
        window.authFunctions.onAuthStateChanged(window.authFunctions.auth, (user) => {
            if (user) {
                // المستخدم مسجل الدخول: نعرض قائمة المستخدم
                const userName = user.displayName || user.email.split('@')[0];
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
                    </div>`;
                
                // تفعيل قائمة المستخدم المنسدلة
                const userMenuButton = document.getElementById('user-menu-button');
                const userDropdown = document.getElementById('user-dropdown');
                if (userMenuButton && userDropdown) {
                    userMenuButton.addEventListener('click', (e) => {
                        e.stopPropagation();
                        userDropdown.classList.toggle('active');
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
                // المستخدم غير مسجل الدخول: نعرض الأزرار الافتراضية
                navbarRight.innerHTML = `
                    <div class="nav-actions">
                        <a href="login.html" class="btn btn-secondary">تسجيل الدخول</a>
                        <a href="login.html" class="btn btn-primary">إنشاء حساب</a>
                    </div>`;
            }
        });
    }

    // =================================================================
    // 2. الكود المُصحح والنهائي لتفعيل قائمة الهمبرغر (الثلاث شرط)
    // =================================================================
    const hamburgerButton = document.getElementById('hamburger-menu');
    const navbarCenter = document.querySelector('.navbar-center');
    // ملاحظة: نحن نتحكم في navbarCenter فقط، و CSS سيتولى الباقي
    
    if (hamburgerButton && navbarCenter && navbarRight) {
        hamburgerButton.addEventListener('click', () => {
            // عند الضغط، نقوم بتبديل حالة 'active' على قائمة الروابط الرئيسية وقائمة الأزرار
            navbarCenter.classList.toggle('active');
            navbarRight.classList.toggle('active'); // هذا هو السطر الذي كان يسبب المشكلة وتم تصحيحه
        });
    }

    // لإغلاق القائمة المنسدلة عند الضغط في أي مكان آخر في الصفحة
    document.addEventListener('click', (e) => {
        const userDropdown = document.getElementById('user-dropdown');
        const userMenuButton = document.getElementById('user-menu-button');
        if (userDropdown && userDropdown.classList.contains('active')) {
            // تأكد من أن الضغطة لم تكن على زر القائمة نفسه
            if (userMenuButton && !userMenuButton.contains(e.target)) {
                userDropdown.classList.remove('active');
            }
        }
    });
});

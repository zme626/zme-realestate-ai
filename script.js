document.addEventListener('DOMContentLoaded', function() {

    // الجزء الأول: التحكم في قائمة الهمبرغر (الثلاث شرط)
    const hamburgerButton = document.getElementById('hamburger-menu');
    const navbarCenter = document.querySelector('.navbar-center');
    const navbarRight = document.querySelector('.navbar-right');

    if (hamburgerButton && navbarCenter && navbarRight) {
        hamburgerButton.addEventListener('click', () => {
            // ببساطة، قم بتبديل كلاس 'active' على القائمتين
            navbarCenter.classList.toggle('active');
            navbarRight.classList.toggle('active');
        });
    }

    // الجزء الثاني: التحكم في حالة تسجيل الدخول
    if (window.authFunctions) {
        window.authFunctions.onAuthStateChanged(window.authFunctions.auth, (user) => {
            const userNav = document.querySelector('.navbar-right');
            if (!userNav) return;

            if (user) {
                // المستخدم مسجل الدخول
                const userName = user.displayName || user.email.split('@')[0];
                userNav.innerHTML = `
                    <div class="user-profile-menu">
                        <button id="user-menu-button" class="user-avatar-button">
                            <span>مرحباً، ${userName}</span>
                            <img src="${user.photoURL || 'images/avatar.png'}" alt="Avatar">
                        </button>
                        <div id="user-dropdown" class="user-dropdown">
                            <a href="dashboard.html">لوحة التحكم</a>
                            <a href="profile.html">ملفي الشخصي</a>
                            <a href="#" id="logout-button">تسجيل الخروج</a>
                        </div>
                    </div>`;
                
                document.getElementById('user-menu-button').addEventListener('click', (e) => {
                    e.stopPropagation();
                    document.getElementById('user-dropdown').classList.toggle('active');
                });

                document.getElementById('logout-button').addEventListener('click', (e) => {
                    e.preventDefault();
                    window.authFunctions.userSignOut();
                });

            } else {
                // المستخدم غير مسجل الدخول
                userNav.innerHTML = `
                    <div class="nav-actions">
                        <a href="login.html" class="btn btn-secondary">تسجيل الدخول</a>
                        <a href="login.html" class="btn btn-primary">إنشاء حساب</a>
                    </div>`;
            }
        });
    }

    // لإغلاق القائمة المنسدلة عند الضغط في أي مكان آخر
    document.addEventListener('click', (e) => {
        const dropdown = document.getElementById('user-dropdown');
        if (dropdown && dropdown.classList.contains('active') && !e.target.closest('.user-profile-menu')) {
            dropdown.classList.remove('active');
        }
    });
});

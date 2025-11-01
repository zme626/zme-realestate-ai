document.addEventListener('DOMContentLoaded', function() {

    // --- الجزء الأول: التحقق من حالة تسجيل الدخول ---
    const loggedInUser = localStorage.getItem('loggedInUser');
    const navbarRight = document.querySelector('.navbar-right');

    if (loggedInUser && navbarRight) {
        // إذا كان المستخدم مسجلاً، أظهر قائمة المستخدم
        navbarRight.innerHTML = `
            <div class="user-profile-menu">
                <button id="user-menu-button" class="user-avatar-button">
                    <span>مرحباً، ${loggedInUser}</span>
                    <img src="images/avatar.png" alt="الصورة الرمزية">
                    <i class="fa-solid fa-chevron-down"></i>
                </button>
                <div id="user-dropdown" class="user-dropdown">
                    <a href="profile.html"><i class="fa-solid fa-user"></i> ملفي الشخصي</a>
                    <a href="#"><i class="fa-solid fa-heart"></i> المفضلة</a>
                    <a href="index.html" id="logout-button"><i class="fa-solid fa-right-from-bracket"></i> تسجيل الخروج</a>
                </div>
            </div>
        `;
    }

    // --- الجزء الثاني: تفعيل الوظائف التفاعلية ---

    // تفعيل قائمة الهمبرغر
    const hamburgerButton = document.getElementById('hamburger-menu');
    const navbarCenter = document.querySelector('.navbar-center');
    const mobileNavRight = document.querySelector('.navbar-right'); // نفس العنصر
    if (hamburgerButton && navbarCenter && mobileNavRight) {
        hamburgerButton.addEventListener('click', () => {
            navbarCenter.classList.toggle('active');
            mobileNavRight.classList.toggle('active');
        });
    }

    // تفعيل قائمة المستخدم المنسدلة
    const userMenuButton = document.getElementById('user-menu-button');
    const userDropdown = document.getElementById('user-dropdown');
    if (userMenuButton && userDropdown) {
        userMenuButton.addEventListener('click', (e) => {
            e.stopPropagation();
            userDropdown.classList.toggle('active');
            userMenuButton.querySelector('i').style.transform = userDropdown.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
        });
        document.addEventListener('click', () => {
            userDropdown.classList.remove('active');
            userMenuButton.querySelector('i').style.transform = 'rotate(0deg)';
        });
    }

    // تفعيل زر تسجيل الخروج
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('loggedInUser');
            window.location.href = 'index.html';
        });
    }

    // تفعيل نموذج تسجيل الدخول (للتجربة فقط)
    const loginForm = document.querySelector('#login form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // سنفترض أن اسم المستخدم هو "محمد" للتجربة
            localStorage.setItem('loggedInUser', 'محمد');
            window.location.href = 'profile.html';
        });
    }

    // تفعيل خريطة صفحة "اتصل بنا"
    if (document.getElementById('contact-map')) {
        try {
            const map = L.map('contact-map').setView([30.033333, 31.233334], 14); // القاهرة
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
            L.marker([30.033333, 31.233334]).addTo(map).bindPopup('مقر شركة Nova HOME').openPopup();
        } catch (e) {
            console.error("خطأ في تهيئة خريطة اتصل بنا:", e);
        }
    }
    
    // باقي الأكواد من قبل...
    // (يمكنك إضافة أكواد المفضلة والخريطة الأخرى هنا إذا أردت)
});

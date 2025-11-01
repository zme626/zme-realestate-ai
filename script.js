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
            const icon = userMenuButton.querySelector('i');
            if (icon) {
                icon.style.transform = userDropdown.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
            }
        });
        document.addEventListener('click', () => {
            if (userDropdown.classList.contains('active')) {
                userDropdown.classList.remove('active');
                const icon = userMenuButton.querySelector('i');
                if (icon) {
                    icon.style.transform = 'rotate(0deg)';
                }
            }
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

    // تفعيل نموذج تسجيل الدخول (للتجربة فقط مع منع الخطأ 405)
    const loginForm = document.querySelector('#login form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            // هذا السطر يمنع المتصفح من إرسال النموذج بالطريقة التقليدية ويمنع خطأ 405
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
    
    // تفعيل خريطة صفحة تفاصيل العقار
    if (document.getElementById('map')) {
        try {
            const mapCoordinates = [30.0444, 31.2357]; // إحداثيات القاهرة
            const map = L.map('map').setView(mapCoordinates, 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
            L.marker(mapCoordinates).addTo(map).bindPopup('موقع العقار').openPopup();
        } catch (e) {
            console.error("خطأ في تهيئة الخريطة:", e);
        }
    }

    // تفعيل زر المفضلة
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault(); 
            event.stopPropagation();
            this.classList.toggle('active');
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-regular')) {
                icon.classList.remove('fa-regular');
                icon.classList.add('fa-solid');
            } else {
                icon.classList.remove('fa-solid');
                icon.classList.add('fa-regular');
            }
        });
    });
});

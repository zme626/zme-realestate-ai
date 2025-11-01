document.addEventListener('DOMContentLoaded', function() {
    
    // --- التفاعلية لزر المفضلة (القلب) ---
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

    // --- التفاعلية لزر البحث ---
    const searchButton = document.querySelector('.btn-search');
    if (searchButton) {
        searchButton.addEventListener('click', () => alert('جاري تنفيذ البحث...'));
    }

    // --- كود خاص بصفحة تفاصيل العقار ---
    if (document.querySelector('.property-details-page')) {
        // 1. تفعيل الخريطة التفاعلية
        try {
            const mapCoordinates = [30.0444, 31.2357]; // إحداثيات القاهرة
            const map = L.map('map').setView(mapCoordinates, 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
            L.marker(mapCoordinates).addTo(map).bindPopup('موقع العقار').openPopup();
        } catch (e) {
            console.error("خطأ في تهيئة الخريطة:", e);
            const mapDiv = document.getElementById('map');
            if(mapDiv) mapDiv.innerHTML = '<p style="text-align:center; color:red;">عفواً، لم نتمكن من تحميل الخريطة.</p>';
        }

        // 2. تفعيل معرض الصور
        const mainImage = document.getElementById('main-gallery-image');
        const thumbnails = document.querySelectorAll('.thumbnail-images img');
        if (mainImage && thumbnails.length > 0) {
            thumbnails.forEach(thumb => {
                thumb.addEventListener('click', function() {
                    // هذا الكود لتغيير الصورة الكبيرة بناءً على الصورة المصغرة
                    // يجب أن تكون أسماء الصور متناسقة (مثال: property-large.jpg و property-thumb.jpg)
                    mainImage.src = this.src; // أبسط طريقة هي جعل الصورة المصغرة هي نفسها الكبيرة مؤقتًا
                    
                    // إزالة كلاس 'active' من الصورة النشطة حاليًا
                    document.querySelector('.thumbnail-images img.active').classList.remove('active');
                    // إضافة كلاس 'active' للصورة التي تم الضغط عليها
                    this.classList.add('active');
                });
            });
        }
    }

    // --- تفعيل قائمة الهمبرغر (النسخة الصحيحة) ---
    const hamburgerButton = document.getElementById('hamburger-menu');
    const navbarCenter = document.querySelector('.navbar-center');
    const navbarRight = document.querySelector('.navbar-right');

    if (hamburgerButton && navbarCenter && navbarRight) {
        hamburgerButton.addEventListener('click', () => {
            navbarCenter.classList.toggle('active');
            navbarRight.classList.toggle('active');
        });
    }
});

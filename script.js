document.addEventListener('DOMContentLoaded', function() {
    console.log('الموقع جاهز وجاري تشغيل السكريبتات!');

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
                console.log('تمت الإضافة إلى المفضلة');
            } else {
                icon.classList.remove('fa-solid');
                icon.classList.add('fa-regular');
                console.log('تمت الإزالة من المفضلة');
            }
        });
    });

    // --- التفاعلية لزر البحث ---
    const searchButton = document.querySelector('.btn-search');
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            alert('جاري تنفيذ البحث...');
        });
    }

    // --- كود خاص بصفحة تفاصيل العقار ---
    if (document.querySelector('.property-details-page')) {

        // 1. تفعيل الخريطة التفاعلية (Leaflet.js)
        try {
            const mapCoordinates = [24.7136, 46.6753]; // إحداثيات الرياض
            const map = L.map('map').setView(mapCoordinates, 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
            L.marker(mapCoordinates).addTo(map).bindPopup('موقع العقار').openPopup();
        } catch (e) {
            console.error("خطأ في تهيئة الخريطة: ", e);
        }

        // 2. تفعيل معرض الصور
        const mainImage = document.getElementById('main-gallery-image');
        const thumbnails = document.querySelectorAll('.thumbnail-images img');
        if (mainImage && thumbnails.length > 0) {
            thumbnails.forEach(thumb => {
                thumb.addEventListener('click', function() {
                    // استبدال src للصورة الرئيسية
                    mainImage.src = this.src.replace('-thumb', '-large').replace('thumb', 'large');
                    
                    // تحديث الحالة النشطة
                    document.querySelector('.thumbnail-images .active').classList.remove('active');
                    this.classList.add('active');
                });
            });
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    console.log('الموقع جاهز وجاري تشغيل السكريبتات!');

    // --- التفاعلية لزر المفضلة (القلب) ---
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            // منع الرابط الأب من العمل عند الضغط على الزر
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
    // تأكد من أننا في صفحة التفاصيل قبل تشغيل الكود
    if (document.querySelector('.property-details-page')) {

        // 1. تفعيل الخريطة التفاعلية مع معالجة الأخطاء
        try {
            // استبدل الإحداثيات بإحداثيات موقعك
            const mapCoordinates = [24.7136, 46.6753]; // إحداثيات الرياض كمثال
            const map = L.map('map').setView(mapCoordinates, 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            L.marker(mapCoordinates).addTo(map)
                .bindPopup('موقع العقار')
                .openPopup();
        } catch (e) {
            console.error("حدث خطأ أثناء تهيئة الخريطة. تأكد من اتصالك بالإنترنت ومن صحة تضمين مكتبة Leaflet.", e);
            const mapDiv = document.getElementById('map');
            if(mapDiv) {
                mapDiv.innerHTML = '<p style="text-align:center; color:red;">عفواً، لم نتمكن من تحميل الخريطة.</p>';
            }
        }

        // 2. تفعيل معرض الصور (بشكل أكثر أمانًا)
        const mainImage = document.getElementById('main-gallery-image');
        const thumbnails = document.querySelectorAll('.thumbnail-images img');

        if (mainImage && thumbnails.length > 0) {
            thumbnails.forEach(thumb => {
                thumb.addEventListener('click', function() {
                    // **تصحيح:** افترض أن الصورة الكبيرة لها اسم مشابه للمصغرة
                    // مثال: "property1-thumb1.jpg" -> "property1-large.jpg"
                    // هذا الكود يفترض أنك تسمي الصور الكبيرة باسم مختلف قليلاً
                    // سأقوم بتغييره ليكون أكثر مرونة
                    const largeImageSrc = this.src.replace('-thumb1', '-large').replace('-thumb2', '-large').replace('-thumb3', '-large');
                    mainImage.src = largeImageSrc;
                    
                    // تحديث الحالة النشطة
                    document.querySelector('.thumbnail-images .active').classList.remove('active');
                    this.classList.add('active');
                });
            });
        }
    }
});

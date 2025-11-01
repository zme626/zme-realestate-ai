document.addEventListener('DOMContentLoaded', function() {
    console.log('الموقع جاهز وجاري تشغيل السكريبتات!');

    // --- التفاعلية لزر المفضلة (القلب) ---
    const favoriteButtons = document.querySelectorAll('.favorite-btn');

    favoriteButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            // منع انتقال الرابط إذا كان الزر داخل رابط
            event.preventDefault(); 
            event.stopPropagation();

            // تبديل حالة الزر (نشط / غير نشط)
            this.classList.toggle('active');

            // تبديل أيقونة القلب (ممتلئ / فارغ)
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-regular')) {
                icon.classList.remove('fa-regular');
                icon.classList.add('fa-solid'); // أيقونة القلب الممتلئ
                console.log('تمت الإضافة إلى المفضلة');
            } else {
                icon.classList.remove('fa-solid');
                icon.classList.add('fa-regular'); // أيقونة القلب الفارغ
                console.log('تمت الإزالة من المفضلة');
            }
        });
    });

    // --- التفاعلية لزر البحث ---
    const searchButton = document.querySelector('.btn-search');
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            alert('جاري تنفيذ البحث...');
            // هنا يمكنك كتابة الكود الخاص بإرسال طلب البحث
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const PROPS_KEY = 'smart_properties_v1';

    // بيانات تجريبية أكثر تفصيلاً
    const seedData = [
        { id: 1, title: 'فيلا فاخرة بإطلالة على البحر', city: 'جدة', price: 5000000, type: 'sale', rooms: 5, baths: 6, area: 450, image: 'https://via.placeholder.com/400x250.png/005A9C/FFFFFF?text=Villa' },
        { id: 2, title: 'شقة مودرن في قلب الرياض', city: 'الرياض', price: 1800000, type: 'sale', rooms: 3, baths: 2, area: 180, image: 'https://via.placeholder.com/400x250.png/333333/FFFFFF?text=Apartment' },
        { id: 3, title: 'شقة للإيجار السنوي في الدمام', city: 'الدمام', price: 45000, type: 'rent', rooms: 2, baths: 1, area: 120, image: 'https://via.placeholder.com/400x250.png/777777/FFFFFF?text=Rent' },
        { id: 4, title: 'دوبلكس للبيع في حي الياسمين', city: 'الرياض', price: 2500000, type: 'sale', rooms: 4, baths: 4, area: 320, image: 'https://via.placeholder.com/400x250.png/005A9C/FFFFFF?text=Duplex' },
    ];

    // تهيئة البيانات
    function initData() {
        if (!localStorage.getItem(PROPS_KEY)) {
            localStorage.setItem(PROPS_KEY, JSON.stringify(seedData));
        }
    }

    function getProperties() {
        return JSON.parse(localStorage.getItem(PROPS_KEY) || '[]');
    }

    // دالة لإنشاء كارت العقار
    function createPropertyCard(property) {
        const priceFormatted = property.price.toLocaleString('ar-EG');
        const priceLabel = property.type === 'sale' ? 'ريال سعودي' : 'ريال/سنة';

        return `
            <div class="property-card" data-id="${property.id}">
                <img src="${property.image}" alt="${property.title}">
                <div class="property-info">
                    <h3 class="property-title">${property.title}</h3>
                    <p class="property-location">${property.city}</p>
                    <p class="property-price">${priceFormatted} ${priceLabel}</p>
                    <div class="property-details">
                        <span><i class="fas fa-bed"></i> ${property.rooms} غرف</span>
                        <span><i class="fas fa-bath"></i> ${property.baths} حمامات</span>
                        <span><i class="fas fa-ruler-combined"></i> ${property.area} م²</span>
                    </div>
                </div>
            </div>
        `;
    }

    // عرض العقارات في الشبكة
    function displayProperties(properties, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = properties.map(createPropertyCard).join('');
    }

    // نظام توصيات بسيط (يقترح عقارات من نفس النوع)
    function displayRecommendations(properties) {
        const recommendationsContainer = document.getElementById('recommendations-grid');
        if (!recommendationsContainer) return;
        
        // لنفترض أننا نوصي بعقارات للبيع
        const saleProperties = properties.filter(p => p.type === 'sale').slice(0, 3);
        recommendationsContainer.innerHTML = saleProperties.map(createPropertyCard).join('');
    }

    // البحث
    function handleSearch() {
        const query = document.getElementById('main-search').value.toLowerCase();
        const allProperties = getProperties();
        const filtered = allProperties.filter(p => 
            p.title.toLowerCase().includes(query) ||
            p.city.toLowerCase().includes(query)
        );
        displayProperties(filtered, 'property-grid');
    }

    // تهيئة الصفحة
    initData();
    const allProps = getProperties();
    displayProperties(allProps, 'property-grid');
    displayRecommendations(allProps);

    document.getElementById('search-btn')?.addEventListener('click', handleSearch);
    document.getElementById('main-search')?.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
});

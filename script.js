// عناصر الصفحة
const addBtn = document.getElementById("addBtn");
const addSection = document.getElementById("addPropertySection");
const listSection = document.getElementById("propertyList");
const form = document.getElementById("addForm");

// إنشاء شريط البحث
const searchBar = document.createElement("input");
searchBar.type = "text";
searchBar.placeholder = "ابحث عن عقار بالاسم أو الموقع...";
searchBar.id = "searchBar";
searchBar.style.width = "95%";
searchBar.style.padding = "10px";
searchBar.style.margin = "15px";
searchBar.style.border = "1px solid #ccc";
searchBar.style.borderRadius = "8px";
listSection.prepend(searchBar);

// تحميل العقارات عند فتح الصفحة
document.addEventListener("DOMContentLoaded", loadProperties);

// الانتقال إلى صفحة الإضافة
addBtn.addEventListener("click", () => {
  listSection.classList.add("hidden");
  addSection.classList.remove("hidden");
});

// عند إضافة عقار جديد
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const location = document.getElementById("location").value;
  const type = document.getElementById("type").value;

  const property = { name, price, location, type };

  // حفظ في التخزين المحلي
  let properties = JSON.parse(localStorage.getItem("properties")) || [];
  properties.push(property);
  localStorage.setItem("properties", JSON.stringify(properties));

  // عرض العقار الجديد
  displayProperty(property);

  form.reset();
  addSection.classList.add("hidden");
  listSection.classList.remove("hidden");
});

// تحميل العقارات
function loadProperties() {
  const properties = JSON.parse(localStorage.getItem("properties")) || [];
  listSection.querySelectorAll(".property").forEach(el => el.remove());
  properties.forEach(displayProperty);
}

// عرض عقار
function displayProperty(property) {
  const newDiv = document.createElement("div");
  newDiv.classList.add("property");
  newDiv.innerHTML = `
    <h3>${property.name}</h3>
    <p>السعر: ${property.price}</p>
    <p>الموقع: ${property.location}</p>
    <p>النوع: ${property.type}</p>
  `;
  listSection.appendChild(newDiv);
}

// البحث داخل العقارات
searchBar.addEventListener("input", () => {
  const query = searchBar.value.toLowerCase();
  const properties = JSON.parse(localStorage.getItem("properties")) || [];
  const filtered = properties.filter(
    p =>
      p.name.toLowerCase().includes(query) ||
      p.location.toLowerCase().includes(query)
  );

  // تحديث العرض
  listSection.querySelectorAll(".property").forEach(el => el.remove());
  filtered.forEach(displayProperty);
});

const properties = [
  { name: "شقة فاخرة", city: "القاهرة", price: "1,200,000 جنيه", type: "sale" },
  { name: "فيلا حديثة", city: "الأسكندرية", price: "3,000,000 جنيه", type: "sale" },
  { name: "شقة للإيجار", city: "الجيزة", price: "6,000 جنيه/شهر", type: "rent" },
  { name: "مكتب إداري", city: "القاهرة", price: "12,000 جنيه/شهر", type: "rent" }
];

function displayProperties(list) {
  const container = document.getElementById("propertyList");
  container.innerHTML = "";
  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "property-card";
    card.innerHTML = `
      <h3>${p.name}</h3>
      <p>📍 ${p.city}</p>
      <p>💰 ${p.price}</p>
      <p>🏷️ النوع: ${p.type === "sale" ? "بيع" : "إيجار"}</p>
    `;
    container.appendChild(card);
  });
}

function searchProperties() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const type = document.getElementById("typeSelect").value;
  const filtered = properties.filter(p => 
    (p.city.toLowerCase().includes(input) || 
     p.name.toLowerCase().includes(input) || 
     p.price.includes(input)) &&
    (type === "all" || p.type === type)
  );
  displayProperties(filtered);
}

window.onload = () => displayProperties(properties);

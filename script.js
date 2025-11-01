// تسجيل الدخول وإنشاء حساب بسيط باستخدام localStorage

function signup() {
  const username = document.getElementById('signup-username').value;
  const password = document.getElementById('signup-password').value;

  if (!username || !password) {
    alert('من فضلك أدخل اسم المستخدم وكلمة المرور');
    return;
  }

  if (localStorage.getItem(username)) {
    alert('اسم المستخدم مسجل بالفعل!');
  } else {
    localStorage.setItem(username, password);
    alert('تم إنشاء الحساب بنجاح!');
  }
}

function login() {
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  const storedPassword = localStorage.getItem(username);

  if (storedPassword && storedPassword === password) {
    alert('تم تسجيل الدخول بنجاح');
    window.location.href = 'dashboard.html';
  } else {
    alert('اسم المستخدم أو كلمة المرور غير صحيحة');
  }
}

function logout() {
  window.location.href = 'index.html';
}

// إضافة عقار
function addProperty() {
  const title = document.getElementById('title').value;
  const price = document.getElementById('price').value;
  const description = document.getElementById('description').value;

  if (!title || !price || !description) {
    alert('من فضلك أدخل كل البيانات');
    return;
  }

  const property = { title, price, description };
  let properties = JSON.parse(localStorage.getItem('properties')) || [];
  properties.push(property);
  localStorage.setItem('properties', JSON.stringify(properties));

  alert('تم إضافة العقار بنجاح');
  displayProperties();
}

function displayProperties() {
  const propertyList = document.getElementById('propertyList');
  propertyList.innerHTML = '';

  const properties = JSON.parse(localStorage.getItem('properties')) || [];
  properties.forEach((p, index) => {
    const li = document.createElement('li');
    li.textContent = `${p.title} - ${p.price} جنيه`;
    propertyList.appendChild(li);
  });
}

window.onload = () => {
  if (document.getElementById('propertyList')) {
    displayProperties();
  }
};

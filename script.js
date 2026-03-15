/* ================= FARMER REGISTER ================= */

const farmerForm = document.getElementById("farmerForm");
if (farmerForm) {
  farmerForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const farmer = {
      name: name.value,
      email: email.value,
      phone: phone.value,
      location: location.value
    };

    let farmers = JSON.parse(localStorage.getItem("farmers")) || [];
    farmers.push(farmer);
    localStorage.setItem("farmers", JSON.stringify(farmers));

    alert("Farmer Registered Successfully!");
    farmerForm.reset();
  });
}

/* ================= ADD PRODUCT ================= */

/* ================= ADD PRODUCT ================= */

/* ================= ADD PRODUCT ================= */

const productForm = document.getElementById("productForm");

if (productForm) {
  productForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const file = productImage.files[0];
    if (!file) {
      alert("Please select an image");
      return;
    }

    const reader = new FileReader();

    reader.onload = function () {
      const product = {
        farmerName: farmerName.value,
        farmerPhone: farmerPhone.value,
        productName: productName.value,
        price: price.value,
        quantity: quantity.value,
        image: reader.result // ⭐ base64 image
      };

      let products = JSON.parse(localStorage.getItem("products")) || [];
      products.push(product);
      localStorage.setItem("products", JSON.stringify(products));

      alert("✅ Product Added Successfully!");
      productForm.reset();
    };

    reader.readAsDataURL(file); // ⭐ convert image
  });
}/* ================= ADD PRODUCT ================= */



/* ================= LOAD PRODUCTS ================= */


function loadProducts(filteredList = null) {
  const container = document.getElementById("products");
  if (!container) return;

  let products =
    filteredList ||
    JSON.parse(localStorage.getItem("products")) ||
    [];

  container.innerHTML = "";

  if (products.length === 0) {
    container.innerHTML = `
      <h3 style="color:#888;">❌ No product found</h3>
    `;
    return;
  }

  products.forEach((p, index) => {
    container.innerHTML += `
      <div class="card">
        <img src="${p.image}" class="product-img">
        <h3>${p.productName}</h3>
        <p><b>Farmer:</b> ${p.farmerName}</p>
        <p><b>Price:</b> ₹${p.price}</p>
        <button onclick="orderProduct(${index})">🛒 Order Now</button>
        <button onclick="deleteProduct(${index})" class="delete-btn">❌ Remove</button>
      </div>
    `;
  });
}
/* ================= ORDER PRODUCT ================= */

function orderProduct(index) {
  const customer = JSON.parse(localStorage.getItem("currentCustomer"));

  if (!customer) {
    alert("Please register as customer first");
    window.location.href = "customer.html";
    return;
  }

  let products = JSON.parse(localStorage.getItem("products")) || [];
  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  const paymentMethod = prompt("Payment method: COD");

  const order = {
    customerName: customer.name,
    customerPhone: customer.phone,
    address: customer.address,
    payment: paymentMethod,
    product: products[index],
    date: new Date().toLocaleString()
  };

  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));

  alert("✅ Order placed successfully!");
}
/* ================= LOAD ORDERS ================= */

function loadOrders() {
  const container = document.getElementById("orders");
  if (!container) return;

  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  container.innerHTML = "";

  orders.forEach(o => {
    container.innerHTML += `
      <div class="card">
        <img src="${o.product.image}" class="product-img">
        <h3>${o.product.productName}</h3>
        <p><b>Customer:</b> ${o.customerName}</p>
        <p><b>Phone:</b> ${o.customerPhone}</p>
        <p><b>Farmer:</b> ${o.product.farmerName}</p>
        <p><b>Qty:</b> ${o.quantity}</p>
      </div>
    `;
  });
}
/* ================= DELETE PRODUCT ================= */

function deleteProduct(index) {
  if (!confirm("Are you sure you want to remove this product?")) return;

  let products = JSON.parse(localStorage.getItem("products")) || [];

  products.splice(index, 1); // remove selected product

  localStorage.setItem("products", JSON.stringify(products));

  loadProducts(); // refresh UI
}
/* ================= CUSTOMER REGISTER ================= */

const customerForm = document.getElementById("customerForm");

if (customerForm) {
  customerForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const customer = {
      name: custName.value,
      phone: custPhone.value,
      address: custAddress.value
    };

    localStorage.setItem("currentCustomer", JSON.stringify(customer));

    alert("✅ Customer Registered!");
    window.location.href = "customer-profile.html";
  });
}
/* ================= LOAD CUSTOMER PROFILE ================= */

function loadCustomerProfile() {
  const box = document.getElementById("profileBox");
  if (!box) return;

  const customer = JSON.parse(localStorage.getItem("currentCustomer"));

  if (!customer) {
    box.innerHTML = "<p>No customer logged in</p>";
    return;
  }

  box.innerHTML = `
    <h3>${customer.name}</h3>
    <p><b>Phone:</b> ${customer.phone}</p>
    <p><b>Address:</b> ${customer.address}</p>
  `;
}
/* ================= LOAD CUSTOMER ORDERS ================= */

function loadCustomerOrders() {
  const container = document.getElementById("orders");
  if (!container) return;

  const customer = JSON.parse(localStorage.getItem("currentCustomer"));
  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  container.innerHTML = "";

  orders
    .filter(o => o.customerPhone === customer.phone)
    .forEach(o => {
      container.innerHTML += `
        <div class="card">
          <img src="${o.product.image}" class="product-img">
          <h3>${o.product.productName}</h3>
          <p><b>Farmer:</b> ${o.product.farmerName}</p>
          <p><b>Payment:</b> ${o.payment}</p>
          <p><b>Date:</b> ${o.date}</p>
        </div>
      `;
    });
}
/* ================= GO TO PROFILE ================= */

function goToProfile() {
  const customer = JSON.parse(localStorage.getItem("currentCustomer"));

  if (customer) {
    window.location.href = "customer-profile.html";
  } else {
    window.location.href = "customer.html";
  }
}
/* ================= SEARCH PRODUCTS ================= */

function searchProducts() {
  const text = document.getElementById("searchInput").value.toLowerCase();

  let products = JSON.parse(localStorage.getItem("products")) || [];

  const filtered = products.filter(p =>
    p.productName.toLowerCase().includes(text)
  );

  loadProducts(filtered);
}
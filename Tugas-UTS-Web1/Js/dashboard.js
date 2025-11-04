// js/dashboard.js

// Cek apakah user login
let user = JSON.parse(localStorage.getItem("userLogin"));
const role = localStorage.getItem("role");

if (role === "Admin") {
  document.querySelector("#btnTambahBuku").style.display = "block";
}


if (!user) {
  alert("Silakan login terlebih dahulu!");
  window.location.href = "index.html";
}

// Greeting
let greetingElement = document.getElementById("greeting");
let now = new Date();
let hour = now.getHours();
let greet = "";

if(hour < 11) greet = "Selamat Pagi,";
else if(hour < 15) greet = "Selamat Siang,";
else if(hour < 18) greet = "Selamat Sore,";
else greet = "Selamat Malam,";

document.getElementById("greetBox").textContent = `${greet} ${user.nama}`;

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("userLogin");
  alert("Logout berhasil!");
  window.location.href = "index.html";
});

// Navigasi
function goTo(page){
  window.location.href = page;
}

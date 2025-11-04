// js/login.js

// buka modal
const modalForgot = document.getElementById('modalForgot');
const modalRegister = document.getElementById('modalRegister');

document.getElementById('btnForgot').addEventListener('click', () => modalForgot.showModal());
document.getElementById('closeForgot').addEventListener('click', () => modalForgot.close());

document.getElementById('btnRegister').addEventListener('click', () => modalRegister.showModal());
document.getElementById('closeRegister').addEventListener('click', () => modalRegister.close());

// fungsi login
function doLogin() {
    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value;

    const user = dataPengguna.find(u => u.email.toLowerCase() === email && u.password === password);

    const msgEl = document.getElementById('message');

    if (!user) {
        // alert sesuai soal: munculkan pop-up/alert
        alert("email/password yang anda masukkan salah");
        msgEl.textContent = "Login gagal. Cek email/password.";
        msgEl.style.color = "red";
        return;
    }

    // simpan session sederhana di localStorage
    localStorage.setItem('userLogin', JSON.stringify(user));
    msgEl.textContent = `Selamat datang, ${user.nama}`;
    msgEl.style.color = "green";

    // redirect ke dashboard (simulasi)
    setTimeout(() => {
        window.location.href = "dashboard.html";
    }, 700);
}

// fungsi register (simpan ke dataPengguna di runtime)
function doRegister() {
    const nama = document.getElementById('regNama').value.trim();
    const email = document.getElementById('regEmail').value.trim().toLowerCase();
    const password = document.getElementById('regPassword').value;

    // cek email sudah ada atau belum
    if (dataPengguna.some(u => u.email.toLowerCase() === email)) {
        alert('Email sudah terdaftar!');
        return;
    }

    const newId = dataPengguna.length ? Math.max(...dataPengguna.map(u=>u.id)) + 1 : 1;
    const newUser = { id: newId, nama, email, password, role: "User" };
    dataPengguna.push(newUser);

    alert('Pendaftaran berhasil! Silakan login.');
    modalRegister.close();
}

// lupa password (simulasi kirim)
document.getElementById('sendReset').addEventListener('click', () => {
    const email = document.getElementById('forgotEmail').value.trim().toLowerCase();
    if (!email) { alert('Masukkan email terlebih dahulu.'); return; }

    const exists = dataPengguna.some(u => u.email.toLowerCase() === email);
    if (!exists) {
        alert('Email tidak ditemukan.');
        return;
    }
    alert('Instruksi reset password telah dikirim (simulasi).');
    modalForgot.close();
});

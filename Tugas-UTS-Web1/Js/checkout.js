let userLogin = JSON.parse(localStorage.getItem("userLogin"));
if (!userLogin) {
  alert("Harap login terlebih dahulu!");
  window.location.href = "index.html";
}

// Cek user login
let user = JSON.parse(localStorage.getItem("userLogin"));
if (!user) {
  alert("Harap login terlebih dahulu!");
  window.location.href = "index.html";
}

// Dropdown opsi buku
let selectBuku = document.getElementById("pilihBuku");
dataKatalogBuku.forEach(b => {
  let opt = document.createElement("option");
  opt.value = b.kodeBarang;
  opt.textContent = `${b.namaBarang} (${b.harga})`;
  selectBuku.appendChild(opt);
});

let keranjang = [];
let tbody = document.querySelector("#tabelPesanan tbody");

// Format harga ke angka
function hargaToNumber(h) {
  return parseInt(h.replace(/[^\d]/g, ""));
}

// Render tabel keranjang
function renderKeranjang() {
  tbody.innerHTML = "";
  let total = 0;

  keranjang.forEach((item, index) => {
    let buku = dataKatalogBuku.find(b => b.kodeBarang === item.kode);
    let harga = hargaToNumber(buku.harga);
    let subtotal = harga * item.qty;
    total += subtotal;

    tbody.innerHTML += `
      <tr>
        <td>${buku.namaBarang}</td>
        <td>${item.qty}</td>
        <td>Rp ${subtotal.toLocaleString()}</td>
        <td><button onclick="hapusItem(${index})">Hapus</button></td>
      </tr>
    `;
  });

  document.getElementById("totalHarga").textContent = "Rp " + total.toLocaleString();
}

// Tambah item ke keranjang
function tambahItem() {
  let kode = selectBuku.value;
  let qty = parseInt(document.getElementById("qtyBuku").value);

  if (qty <= 0) {
    alert("Qty harus lebih dari 0");
    return;
  }

  keranjang.push({ kode, qty });
  renderKeranjang();
}

// Hapus item
function hapusItem(i) {
  keranjang.splice(i, 1);
  renderKeranjang();
}

// Konfirmasi Pesanan
function konfirmasiPesanan() {
  if (keranjang.length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }

  let nama = document.getElementById("namaPemesan").value;
  let total = totalHarga;
  let tanggal = new Date().toLocaleString();

  // ambil history lama
  let history = JSON.parse(localStorage.getItem("historyPemesanan")) || [];

  // data baru
  let newData = {
    nama: nama,
    total: total,
    tanggal: tanggal,
    items: keranjang
  };

  // simpan
  history.push(newData);
  localStorage.setItem("historyPemesanan", JSON.stringify(history));

  alert("Pesanan berhasil! Riwayat tersimpan ✅");
  window.location.href = "history.html";
}

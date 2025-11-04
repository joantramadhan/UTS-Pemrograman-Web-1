// Ambil data history dari localStorage
let history = JSON.parse(localStorage.getItem("historyPemesanan")) || [];

// Target tabel
let tbody = document.querySelector("#tabelHistory tbody");

// Tampilkan ke tabel
function renderHistory() {
  tbody.innerHTML = "";

  if (history.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4" style="text-align:center; color:#777;">
          Belum ada riwayat pemesanan
        </td>
      </tr>`;
    return;
  }

  history.forEach((item, index) => {
    let row = `
      <tr>
        <td>${item.nama}</td>
        <td>${item.total}</td>
        <td>${item.tanggal}</td>
        <td>
          <button class="btn" style="padding:4px 8px;font-size:13px" 
            onclick="lihatDetail(${index})">Detail</button>
        </td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

renderHistory();

// Lihat detail pesanan
function lihatDetail(index) {
  let data = history[index];
  let detailHTML = `
    Nama: <b>${data.nama}</b><br>
    Total: <b>${data.total}</b><br>
    Tanggal: <b>${data.tanggal}</b><br><br>
    <b>Item dibeli:</b><br>
    <ul>
      ${data.items.map(i => `<li>${i.nama} (x${i.qty}) = ${i.subtotal}</li>`).join("")}
    </ul>
  `;

  document.getElementById("detailContent").innerHTML = detailHTML;
  document.getElementById("modalDetail").showModal();
}

// Hapus semua history
function hapusHistory() {
  if(!confirm("Hapus semua riwayat pemesanan?")) return;
  localStorage.removeItem("historyPemesanan");
  history = [];
  renderHistory();
}

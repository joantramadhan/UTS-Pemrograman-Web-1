// Ambil tbody
const tbody = document.querySelector("#tabelBuku tbody");
let role = localStorage.getItem("role"); // "admin" atau "user"

// Fungsi render data ke tabel
function renderTabel(){
    tbody.innerHTML = "";
    
    dataKatalogBuku.forEach(buku => {
        const row = `
        <tr>
            <td>${buku.kodeBarang}</td>
            <td>${buku.namaBarang}</td>
            <td>${buku.jenisBarang}</td>
            <td>${buku.edisi}</td>
            <td>${buku.stok}</td>
            <td>${buku.harga}</td>
            <td><img src="${buku.cover}" width="60"></td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

// Fungsi tambah buku baru
function tambahBuku(){

    // ❌ Cegah user nambah data lewat console / inspect
    if (role !== "admin") {
        alert("Akses ditolak! Anda bukan admin.");
        return;
    }

    const kode = document.getElementById("kodeInput").value;
    const nama = document.getElementById("namaInput").value;
    const jenis = document.getElementById("jenisInput").value;
    const edisi = document.getElementById("edisiInput").value;
    const stok = document.getElementById("stokInput").value;
    const harga = document.getElementById("hargaInput").value;
    const cover = document.getElementById("coverInput").value;

    if(!kode || !nama || !jenis || !edisi || !stok || !harga || !cover){
        alert("Semua field wajib diisi!");
        return;
    }

    dataKatalogBuku.push({
        kodeBarang: kode,
        namaBarang: nama,
        jenisBarang: jenis,
        edisi: edisi,
        stok: stok,
        harga: harga,
        cover: cover
    });

    alert("Data buku berhasil ditambahkan!");
    document.getElementById('modalTambah').close();
    renderTabel();
}

// Jalankan saat halaman load
renderTabel();

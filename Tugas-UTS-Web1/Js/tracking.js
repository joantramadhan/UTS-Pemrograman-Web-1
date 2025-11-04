function cekTracking() {
    let noDo = document.getElementById("noDo").value.trim();
    
    if (!noDo) {
        alert("Masukkan nomor DO dahulu!");
        return;
    }

    let data = dataTracking[noDo];

    if (!data) {
        alert("Nomor DO tidak ditemukan!");
        return;
    }

    document.getElementById("result").style.display = "block";

    document.getElementById("nama").textContent = data.nama;
    document.getElementById("statusText").textContent = data.status;
    document.getElementById("ekspedisi").textContent = data.ekspedisi;
    document.getElementById("tanggal").textContent = data.tanggalKirim;
    document.getElementById("paket").textContent = data.paket;
    document.getElementById("total").textContent = data.total;

    // Hitung progress bar berdasarkan jumlah perjalanan
    let totalStep = data.perjalanan.length;
    let completed = 0;

    if (data.status.includes("Selesai") || data.status.includes("Dikirim")) {
        completed = totalStep;
    } else {
        completed = Math.floor(totalStep * 0.6);
    }

    let percentage = Math.min((completed / totalStep) * 100, 100);
    document.getElementById("progressBar").style.width = percentage + "%";

    // Tampilkan riwayat perjalanan
    let list = document.getElementById("riwayat");
    list.innerHTML = "";

    data.perjalanan.forEach(item => {
        let li = document.createElement("li");
        li.textContent = `${item.waktu} - ${item.keterangan}`;
        list.appendChild(li);
    });
}

---
title: "One Gate Monitoring System"
category: improvement
order: 2
period: "Jun – Okt 2025"
slides: "/case-studies/one-gate-monitoring-system.pdf"
role: "Project lead"
method: "SGA 8 langkah PDCA"
summary: "Mengganti report delivery manual dengan platform Power BI otomatis yang terhubung ke SAP. Monitoring harian turun dari tiga kali 30 menit menjadi satu menit, dan OTIF serta pemerataan stuffing sama-sama membaik di bulan pertama."
metric: "90 → 1 mnt"
metricLabel: "monitoring delivery harian"
tags: [SGA, PDCA, Power BI, SAP S/4HANA, Otomasi, OTIF]
kpis:
  - label: "Waktu monitoring harian"
    before: 90
    after: 1
    unit: " mnt"
    lower: true
    note: "3 × 30 menit report manual vs 1 menit di dashboard"
  - label: "OTIF shipment"
    before: 88
    after: 90
    unit: "%"
    note: "Rata-rata Jan–Sep 2025 vs Okt 2025"
  - label: "Pemerataan stuffing"
    before: 74
    after: 78
    unit: "%"
    note: "Rata-rata Jan–Sep 2025 vs Okt 2025"
  - label: "Otomasi monitoring"
    before: 0
    after: 100
    unit: "%"
    note: "Target yang ditetapkan di awal proyek"
---

## Kondisi awal

Monitoring delivery berjalan dengan report manual. Data dikumpulkan dan dibersihkan dengan tangan dari beberapa sumber, tiga kali sehari, sekitar 30 menit setiap putaran. Begitu report selesai, gambarannya sudah basi.

Dampaknya terlihat di performa pengiriman: **OTIF shipment belum pernah mencapai 90%**.

Targetnya:

- **Specific:** monitoring delivery yang otomatis dan berkelanjutan
- **Measurable:** tingkat otomasi dari 0% ke 100%
- **Achievable:** tim internal sudah menguasai Power BI
- **Reasonable:** OTIF shipment belum pernah mencapai 90%
- **Time-bound:** lima bulan, Juni sampai Oktober 2025

## Akar masalah

Analisis 4M menemukan empat penyebab, dan tiga di antaranya bermuara pada informasi yang datang terlambat:

1. **Machine: monitoring terlambat dan tidak responsif.** Pengolahan data manual dan tidak ada platform untuk monitoring berkelanjutan.
2. **Method: proyeksi delivery kurang akurat.** Tanggal keberangkatan (ETD) tidak di-update di sistem cukup awal.
3. **Method: non-OTIF terdeteksi terlambat.** Tidak ada perhitungan OTIF real-time untuk menandai selisih ETD selagi masih sempat bertindak.
4. **Method: rencana stuffing tidak merata.** Jadwal tidak diselaraskan dengan kapasitas loading, dan beban tidak pernah diproyeksikan.

## Solusi

One Gate adalah satu platform Power BI yang otomatis mengambil data dari SAP S/4HANA, dengan satu countermeasure untuk setiap penyebab:

1. **Monitoring berkelanjutan.** Data feed otomatis menggantikan pengumpulan dan pembersihan data manual.
2. **ETD matching.** Tanggal keberangkatan disinkronkan lebih awal sehingga proyeksi akurat.
3. **OTIF dan goods in transit real-time.** OTIF dihitung live, dan delivery non-OTIF serta goods in transit ditandai lebih awal.
4. **Proyeksi beban stuffing.** Tren proyeksi meratakan beban terhadap kapasitas loading.

Pengerjaan dibagi lima fase, dengan **100% tugas yang direncanakan selesai**: inisiasi (Juni), perencanaan (Juni sampai Juli), build dan validasi (Juli sampai September), monitoring (September sampai Oktober), lalu go-live dan roll-out (Oktober).

## Hasil

Oktober 2025, bulan penuh pertama platform berjalan, dibanding rata-rata Januari sampai September 2025:

- **Waktu monitoring harian:** dari tiga kali 30 menit menjadi sekitar satu menit.
- **OTIF shipment:** dari 88% ke 90%, pertama kalinya mencapai 90%.
- **Pemerataan stuffing:** dari 74% ke 78%.
- **Volume penjualan dan export delivery:** sama-sama naik 12,6%.

Ini baru data satu bulan, jadi trennya masih perlu dibuktikan. Penghematan waktu monitoring tidak bergantung pada kondisi pasar, jadi berlaku setiap bulan.

## Standarisasi dan roll-out

Cara kerja baru didokumentasikan dalam panduan pengguna dashboard, SOP pengaturan delivery dan shipment, serta instruksi expedite ke jadwal tercepat. Platform ini dibagikan ke **semua tim logistik mill dan logistik korporat**.

Langkah berikutnya: memperluas cakupan setelah DN-out, memantau alokasi vendor, dan menghitung dampak biaya dari keterlambatan.

## Pelajaran

Tim tidak kekurangan usaha. Yang kurang adalah waktu: masalah baru terlihat setelah kesempatan untuk memperbaikinya lewat. Membangun monitoring lebih dulu membuka jalan bagi semua perbaikan berikutnya.

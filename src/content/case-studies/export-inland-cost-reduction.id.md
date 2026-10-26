---
title: "Penurunan Biaya Export Inland"
category: improvement
order: 1
period: "Jan – Jun 2024"
role: "Co-leader, tim lintas fungsi 12 orang"
method: "SGA 8 langkah PDCA"
award: "Medali emas SGA"
summary: "Mengalihkan trucking ekspor ke vendor dengan tarif terendah dengan membereskan empat alasan kenapa mereka jarang terpakai. Pemakaian vendor Top 1 naik lebih dari dua kali lipat dan biaya inland trucking per MT turun 21%."
metric: "−21%"
metricLabel: "biaya inland trucking per MT"
tags: [SGA, PDCA, Analisis 4M, Manajemen vendor, Penurunan biaya]
kpis:
  - label: "Pemakaian vendor Top 1"
    before: 25
    after: 53.5
    unit: "%"
    note: "Baseline 2023 vs rata-rata 2024 (target 53%)"
  - label: "Biaya inland trucking per MT"
    before: 100
    after: 79
    unit: ""
    lower: true
    note: "Indeks, 2023 = 100"
---

## Kondisi awal

Export inland trucking mengangkut kontainer dari mill ke pelabuhan lewat beberapa vendor transporter. Vendor dengan tarif terendah, **tier Top 1**, hanya membawa **25%** volume di 2023. Setiap kontainer yang jatuh ke vendor bertarif lebih tinggi menambah biaya tanpa menambah layanan.

Targetnya SMART:

- **Specific:** menaikkan pemakaian vendor tarif terendah (Top 1)
- **Measurable:** porsi Top 1 dari 25% ke 53%
- **Achievable:** masih di dalam alokasi budget dari HQ
- **Reasonable:** langsung mendukung KPI biaya logistik
- **Time-bound:** enam bulan, Januari sampai Juni 2024

## Akar masalah

Analisis 4M menunjukkan masalahnya bukan soal kemauan vendor, tapi cara alokasi, kesiapan kargo, dan proses stuffing saling memengaruhi:

1. **Method: hanya dua vendor di tier Top 1.** Alokasi bergantung pada kesepakatan dengan dua perusahaan saja, jadi porsinya tidak bisa tumbuh.
2. **Material: truk Top 1 terbatas dan tidak selalu siap.** Kebijakan mereka, truk tidak boleh menunggu kargo yang terlambat, jadi setiap keterlambatan melempar pekerjaan ke vendor yang lebih mahal.
3. **Method: beban stuffing tidak merata.** Order dikonfirmasi mendadak, gudang penuh, dan stuffing makan waktu lebih lama dari rencana.
4. **Method: tanggal ready yang direncanakan sering berubah.** Pembayaran yang belum jelas dan kargo yang dialihkan ke order prioritas membuat rencana tidak bisa diandalkan.

## Solusi

Enam countermeasure, masing-masing dipetakan ke akar masalah yang dibereskan:

| # | Countermeasure | Membereskan |
|---|---|---|
| 1 | **Tambah vendor Top 1.** Negosiasi truk tambahan dari vendor Top 1 yang ada dan memperluas pool dari 2 jadi 5. | Penyebab 1, 2 |
| 2 | **Cek utilisasi harian.** Bandingkan pemakaian aktual tiap vendor dengan alokasinya setiap hari. | Penyebab 1 |
| 3 | **Forecast lebih awal, booking lebih awal.** Customer service membagikan forecast lebih awal, dan dummy booking mengamankan slot sebelum order masuk. | Penyebab 4 |
| 4 | **Cut-off pembayaran.** Customer membayar paling lambat tanggal 10 supaya pengiriman bisa diatur paling lambat tanggal 15. | Penyebab 4 |
| 5 | **Prioritaskan order yang siap.** Order dengan jadwal pasti didahulukan, dan review harian menarik ke depan jadwal kapal yang lebih cepat. | Penyebab 3, 4 |
| 6 | **Seimbangkan kapasitas stuffing.** Manpower shift mengikuti kedatangan kontainer, dan gate control tower mempercepat turnaround. | Penyebab 3 |

Tiga dari 22 proyek otomasi logistik yang berjalan saat itu mendukung proyek ini secara langsung. Auto-warning kedatangan kontainer dan tracking kontainer real-time memberi tim visibilitas lebih awal, sehingga stuffing jadi lebih lancar.

## Hasil

Diukur Januari sampai Oktober 2024 terhadap target 53%:

- **Pemakaian vendor Top 1 rata-rata 53,5%**, naik dari 25%, melampaui target.
- **Biaya inland trucking per MT turun 21%** dibanding 2023.
- Proyek ini meraih **medali emas** di kompetisi SGA perusahaan.

## Standarisasi dan roll-out

Countermeasure dijadikan work instruction supaya hasilnya tidak bergantung pada tim proyek: cek utilisasi vendor harian, expedite ke jadwal tercepat, dummy booking sebelum order, gate queue control tower, dan perencanaan manpower stuffing.

Pendekatan ini lalu direplikasi ke **domestic trucking dan sister mill**. Langkah berikutnya: konfirmasi booking online dan sistem monitoring alokasi vendor.

## Pelajaran

Solusi yang paling kelihatan adalah "suruh tim pakai vendor yang lebih murah". Itu tidak akan berhasil, karena vendor yang lebih murah tidak bisa menunggu kargo yang terlambat. Hasilnya datang dari membereskan kesiapan kargo dan perencanaan di hulu, sehingga opsi yang murah juga menjadi opsi yang andal.

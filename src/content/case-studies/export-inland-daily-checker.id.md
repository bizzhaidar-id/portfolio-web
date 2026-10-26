---
title: "Export Inland Daily Checker"
category: digital
order: 3
period: "Q4 2026"
role: "Perancang dan pembuat"
method: "Dibangun dengan AI (Claude)"
summary: "Tool berbasis browser yang membandingkan daftar outstanding delivery dengan rencana trucking dan menandai setiap delivery yang belum direncanakan, supaya tidak ada yang terlewat."
metric: "0 terlewat"
metricLabel: "delivery tanpa rencana, sasaran setiap cek harian"
tags: [Tool buatan AI, Claude, Kontrol harian, Manajemen eksepsi]
tool: daily-checker
---

## Kondisi awal

Setiap hari tim export trucking harus memastikan setiap outstanding delivery sudah masuk rencana trucking (DCR). Pengecekannya manual: daftar outstanding di satu sisi, rencana di sisi lain, lalu Supervisor dan Manager memeriksa booking confirmation (BOC) dan DCR baris demi baris.

Dengan ratusan delivery terbuka, cek manual itu lambat dan rawan salah. Kalau satu delivery lolos, ada risiko delivery itu **terlewat**, padahal seharusnya bisa dikirim lebih awal.

## Akar masalah

Informasinya sebenarnya ada, tapi di dua file terpisah yang tidak bisa dibandingkan sekilas:

- Daftar outstanding berisi apa yang masih harus dikirim.
- Daftar rencana berisi apa yang sudah diatur.
- Selisih keduanya, yaitu delivery yang **outstanding tapi belum direncanakan**, tidak pernah ditampilkan di mana pun. Selisih itu harus dicari dengan mata.

## Solusi

Tool kecil yang melakukan perbandingan itu dalam hitungan detik. Upload daftar outstanding dan file rencana, lalu tool ini menampilkan:

- jumlah delivery yang sudah dan belum direncanakan, dalam jumlah dan tonase
- shipping point mana yang menanggung beban yang belum direncanakan
- entri rencana yang tidak cocok dengan outstanding delivery mana pun (sudah terkirim, batal, atau salah data)
- tabel yang bisa diurutkan, lengkap dengan kapal, jam opening dan closing terminal, serta ekspor daftar yang belum direncanakan

Cara pengerjaannya:

1. **Identifikasi dan brainstorm** celahnya bersama tim.
2. **Bangun tool dengan AI.** Dibuat dengan Claude, tanpa software developer.
3. **Uji tool** dengan file harian yang asli.
4. **Uji coba dan perbaiki** bersama pengguna.
5. **Luncurkan dan terapkan** dalam rutinitas harian.
6. **Standarisasi** sebagai bagian dari cek harian.

File hanya diproses di browser. Tidak ada data yang dikirim ke server.

## Sebelum dan sesudah

- **Sebelum:** tidak ada platform, pengecekan manual, dan delivery bisa terlewat.
- **Sesudah:** daily checker menandai delivery yang belum direncanakan ke Supervisor, sehingga selisih terlihat sekilas dan cek BOC/DCR jadi lebih cepat.

## Coba sendiri

Demo di halaman Tools menjalankan logika yang sama dengan data dummy. Ubah daftar rencananya dan lihat delivery berpindah antara sudah dan belum direncanakan.

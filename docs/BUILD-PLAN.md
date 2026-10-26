# Build Plan: Portfolio Web Ibnu Haidar

## Status

- [x] CV dengan nomor HP disamarkan
- [x] Home, Portfolio (4 case study EN + ID), Tools (2 demo live + 1 showcase), About
- [x] Draft disimpan: Transit Fee Avoidance, Market Outlook, Learning Modules
- [x] Slide PDF di case study One Gate dan Daily Checker (screenshot asli diganti data dummy, thumbnail dashboard diblur)
- [ ] Artikel 1: membangun tool operasional dengan AI (ditunda; halaman Articles menampilkan pesan "sedang ditulis")
- [ ] Artikel 2: visibility first lewat One Gate (ditunda)
- [ ] Merge ke branch utama supaya live di Vercel

Hasil wawancara sebelum build. Melengkapi brief project (masalah, pemakai, fitur, batasan tetap berlaku).

## Aturan data

- Angka default: persentase dan perbandingan relatif. "$2.5/MT" tidak ditampilkan di situs.
- Screenshot asli tidak dipasang. Visual dibuat ulang dengan data dummy.
- Disamarkan di semua demo dan visual: logo perusahaan, nama perusahaan dan mill, shipping point, nomor delivery, kapal, EMKL, nama lini produksi.
- CV: nomor HP disamarkan (teks dan link WhatsApp tersembunyi dihapus). Sudah di `public/resume.pdf`.

## Home

- Eyebrow: LOGISTICS · OPERATIONAL EXCELLENCE · CONTINUOUS IMPROVEMENT
- Headline: "I fix logistics processes with data, and the numbers show it."
- Subheadline: "Data-driven logistics professional with 4+ years across corporate and operational logistics. I find the root cause, fix the process, and lock in the standard. I work daily in SAP S/4HANA, TMS, Excel and Power BI, and I use AI tools like Claude to build the tools my team runs on."
- Angka dampak (3): −21% trucking cost per MT · 2,000+ containers / month · 90 min → 1 min daily monitoring
- Tombol: See case studies, Download CV

## Portfolio (case study di Markdown, alur: kondisi awal, akar masalah, solusi, before/after)

Tampil:
1. Export Inland Cost Reduction (SGA 2024, gold medal). Gabungan proyek lama "Export Inland Cost Reduction" dan "Transporter Vendor Allocation". Top 1 vendor 25% → 53.5%, trucking cost per MT −21%. Sumber: deck SGA-2024-Top1-Vendor-Optimization.
2. One Gate Monitoring System (SGA 2025). Otomasi 0% → 100%, OTIF 88% → 90%, even stuffing 74% → 78%, monitoring 3x30 min → 1 min, sales volume dan export delivery +12.6%. Sumber: portfolio_haidar.pptx slide 3-5.
3. Export Inland Daily Checker. Sumber: portfolio_haidar.pptx slide 1 dan DeliveryPlanChecker.html.
4. Export Inland Trucking Manual Book. Sumber: portfolio_haidar.pptx slide 2.

Draft (disimpan, tidak tampil, `draft: true`): Transit Fee Avoidance, Container & Shipping Market Outlook, Logistics Learning Modules.

Dihapus: High-Volume Export Trucking.

## Tools (showcase card: masalah, cara kerja 3 langkah, dampak, visual dummy, link case study)

1. Daily Checker: showcase + demo live dengan data dummy. Link ke case study.
2. Follow-Up Converter (Report → WhatsApp): showcase + demo live dengan sampel siap pakai. Bagian baca gambar oleh Claude diganti data sampel, dengan catatan bahwa versi kerjanya membaca screenshot otomatis.
3. One Gate Monitoring System: showcase card, link ke case study.
4. Kalkulator Cost per MT dan Savings Estimator: tetap, di bagian bawah.

## Articles (English dulu, versi Indonesia menyusul)

Contoh bawaan prototype dihapus. Dua artikel baru, digali lewat wawancara lalu didraf:
1. Membangun tool operasional dengan AI tanpa background programmer (Daily Checker, Follow-Up Converter).
2. Visibility first: kenapa membangun platform monitoring sebelum mengejar OTIF (One Gate).

## About

CV yang bisa diunduh. Tombol email dan LinkedIn di About, akhir case study, dan akhir artikel.

## Catatan untuk CV (di luar scope situs)

Ejaan "continues improvement" sebaiknya diperbaiki jadi "continuous improvement".

# Ibnu Haidar — Portfolio

Portfolio built with Vite, React, Tailwind CSS (class-based dark mode), i18next (EN/ID), framer-motion, recharts and react-markdown.

## Run locally

```bash
npm install
npm run dev
```

## Pages

| Menu | URL | File |
| --- | --- | --- |
| Home | `/` | `src/pages/HomePage.jsx` |
| Portfolio | `/portfolio`, `/portfolio/:slug` | `src/pages/PortfolioPage.jsx`, `CaseStudyPage.jsx` |
| Tools | `/tools` | `src/pages/ToolsPage.jsx` |
| Articles | `/articles`, `/articles/:slug` | `src/pages/ArticlesPage.jsx`, `ArticleDetailPage.jsx` |
| About | `/about` | `src/pages/AboutPage.jsx` (the original landing page sections) |

Any other URL shows `src/pages/NotFoundPage.jsx`. The old `/services` and `/contact` pages redirect to `/`.

## Panduan mengelola konten

Semua langkah di bawah bisa dilakukan langsung di github.com (tanpa install apa pun) atau di komputer lokal.
Setiap perubahan baru tampil di situs setelah di-commit ke branch `main` dan di-deploy (lihat [Deploy](#deploy)).

### Aturan umum (berlaku untuk artikel dan case study)

1. **Nama file = alamat halaman.** Pakai huruf kecil dan tanda hubung, tanpa spasi.
   `src/content/articles/biaya-trucking.md` tampil di `/articles/biaya-trucking`.
2. **Bahasa.** `nama-file.md` adalah versi English (wajib). `nama-file.id.md` adalah versi Indonesia (opsional).
   Kalau versi `.id.md` tidak ada, pengunjung yang memilih ID tetap melihat versi English.
3. **Front matter** adalah blok di antara dua baris `---` di paling atas file. Tulis nilai teks di dalam tanda kutip `"..."`,
   terutama kalau teksnya mengandung titik dua (`:`), supaya tidak error.
4. **`draft: true`** menyembunyikan file dari situs live. File tetap terlihat saat `npm run dev`, jadi cocok untuk tulisan yang belum selesai.
   Hapus baris itu (atau ganti ke `false`) saat siap terbit.
5. **Isi** di bawah front matter ditulis dalam Markdown: `## Judul bagian`, `**tebal**`, `- poin`, `1. poin bernomor`, `[teks](https://link)`.
   Tabel Markdown belum didukung.
6. **Gambar** (opsional): upload ke `public/images/`, lalu tulis `![keterangan](/images/nama-gambar.png)` di isi.

### Menambah artikel

1. Buka folder `src/content/articles/`.
2. Salin `example-article.md` menjadi file baru, misalnya `biaya-trucking.md`.
   Di GitHub: buka `example-article.md`, salin isinya, lalu **Add file → Create new file** dan ketik `src/content/articles/biaya-trucking.md` sebagai nama.
3. Isi front matter:
   ```yaml
   ---
   title: "Judul Artikel"
   date: "2026-11-01"
   summary: "Satu kalimat yang tampil di kartu artikel."
   ---
   ```
   `date` ditulis dengan format `TAHUN-BULAN-TANGGAL`. Artikel diurutkan dari tanggal terbaru, dan 3 teratas tampil di Home.
4. Tulis isi artikel di bawah `---` kedua.
5. (Opsional) Buat `biaya-trucking.id.md` dengan front matter dan isi berbahasa Indonesia. Nama file harus sama persis, hanya ditambah `.id`.
6. Commit. Cek hasilnya di `/articles/biaya-trucking`.

### Menambah case study (Portfolio)

1. Siapkan slide (opsional): export PowerPoint ke PDF, beri nama huruf kecil dengan tanda hubung, misalnya `optimasi-gudang.pdf`,
   lalu upload ke `public/portfolio/` (di GitHub: buka folder itu → **Add file → Upload files**).
2. Buka folder `src/content/case-studies/` dan salin `example-case-study.md` menjadi `optimasi-gudang.md`.
3. Isi front matter:
   ```yaml
   ---
   title: "Optimasi Gudang"
   order: 7
   category: "improvement"
   context: "Sinar Mas APP · 2026"
   summary: "Masalah, apa yang dilakukan, dan hasilnya dalam satu-dua kalimat."
   metric: "−15%"
   metricLabel: "Waktu loading"
   tags: ["Lean", "Warehouse"]
   file: "/portfolio/optimasi-gudang.pdf"
   ---
   ```
   - `order`: urutan di halaman Portfolio, angka kecil tampil lebih dulu.
   - `category`: harus salah satu dari `improvement`, `operations`, `research`, `learning`. Nilai lain tidak muncul di filter.
   - `file`: alamat PDF dari langkah 1, diawali `/portfolio/`. Kosongkan (`file: ""`) kalau tidak ada slide; tombol "View slides" otomatis hilang.
   - Hapus baris `draft: true` dari hasil salinan.
4. (Opsional) Tulis cerita lengkap di bawah `---` kedua, misalnya bagian `## Latar belakang`, `## Yang dilakukan`, `## Hasil`.
   Teks ini tampil di halaman detail `/portfolio/optimasi-gudang`, di atas slide.
5. (Opsional) Buat `optimasi-gudang.id.md` untuk versi Indonesia. Isi `category`, `order`, dan `file` sama dengan versi English; terjemahkan sisanya.
6. Commit. Cek di `/portfolio` dan `/portfolio/optimasi-gudang`.

### Mengganti CV

1. Export CV terbaru ke PDF.
2. Ganti namanya menjadi persis `resume.pdf` (huruf kecil semua).
3. Upload ke folder `public/` dan timpa file lama.
   Di GitHub: buka folder `public` → **Add file → Upload files** → pilih `resume.pdf` → commit. File dengan nama sama otomatis tertimpa.
4. Setelah deploy, cek tombol **Download CV** di halaman About. Kalau yang terunduh masih versi lama, buka situs di jendela incognito (browser kadang menyimpan cache).

### Mengecek sebelum terbit (opsional, di komputer lokal)

```bash
npm install      # sekali saja
npm run dev      # buka http://localhost:5173, draft ikut tampil di sini
npm run build    # memastikan tidak ada error sebelum di-push
```

### Konten lain

- **Teks antarmuka EN / ID** (menu, judul halaman, daftar toolkit): `src/i18n/en.js` dan `src/i18n/id.js`
- **Tools / resources:** `src/content/tools/`, polanya sama dengan artikel (lihat `example-tool.md`, isi `url` untuk link unduhan)
- **Skor skill:** `COMPETENCIES` dan `TOOLS` di `src/sections/Skills.jsx`
- **Link sertifikasi:** `src/sections/Certifications.jsx`

## Deploy

If the Vercel project is connected to this GitHub repo, every push to `main` deploys automatically. Otherwise deploy manually:

```bash
npx vercel login
npx vercel --prod
```

Or on Netlify: `npx netlify-cli deploy --prod --dir=dist` after `npm run build`.

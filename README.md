# Pixlape Blog Page

Proyek website blog berbasis **Static Site Generator (SSG)** menggunakan **Eleventy (11ty)** dan **Tailwind CSS**. Proyek ini dirancang untuk menghasilkan situs web blog yang cepat, ringan, bersih, mudah dikustomisasi, dan optimal untuk SEO.

---

## 📌 Definisi Proyek

**Pixlape Blog Page** adalah template blog statis modern yang menggabungkan kemudahan penulisan konten menggunakan format **Markdown** dengan kecepatan dan fleksibilitas mesin templating **Nunjucks (`.njk`)**, serta styling utilitas dari **Tailwind CSS**.

### Fitur Utama
- **Static Site Generation (11ty v2)**: Menghasilkan berkas HTML, CSS, dan JavaScript statis murni yang cepat dimuat dan aman saat dihosting.
- **Tailwind CSS v3 & Typography**: Styling responsif dan modern dengan dukungan `@tailwindcss/typography` (`prose`) untuk artikel berformat Markdown yang rapi.
- **Sistem Paginasi & Tag Otomatis**: Menangani pembagian halaman artikel (*pagination*) baik di halaman utama maupun berdasarkan kategori/label tag.
- **Pencarian Sisi Klien (Client-Side Search)**: Pencarian artikel interaktif secara real-time yang membaca indeks data dari berkas `index.json`.
- **Optimalisasi Performa**:
  - *Lazy loading* gambar bawaan.
  - Minifikasi HTML (`html-minifier`) dan JS (`terser`) otomatis pada saat *build* produksi.
  - Header adaptif (*auto-hide on scroll down*, *show on scroll up*).
- **SEO & Feed Siap Pakai**: Mendukung sitemap XML, robots.txt, canonical URLs, dan integrasi opsional komentar Disqus.

---

## 📂 Struktur Direktori & Fungsi Komponen

Berikut adalah arsitektur direktori proyek beserta peran masing-masing komponen:

```text
pixlblog-page/
├── eleventy.config.js       # Konfigurasi utama Eleventy (11ty)
├── tailwind.config.js       # Konfigurasi Tailwind CSS
├── package.json             # Daftar skrip perintah dan dependensi proyek
├── netlify.toml             # Konfigurasi deployment untuk Netlify
├── dist/                    # Folder output hasil kompilasi/build (production ready)
├── lib/                     # Utilitas pendukung (Collections, Filters, Transforms)
│   ├── collections/         # Logika pengelompokan data artikel & tag
│   │   ├── pagedPosts.js        # Membagi artikel ke dalam halaman (paginasi)
│   │   ├── pagedPostsByTag.js   # Membagi artikel per tag ke dalam halaman paginasi
│   │   ├── posts.js             # Mengumpulkan seluruh postingan artikel blog
│   │   └── tagList.js           # Mengumpulkan daftar seluruh tag dan jumlah artikelnya
│   ├── filters/             # Filter kustom untuk manipulasi data di template Nunjucks
│   │   ├── minifyJs.js          # Minifikasi kode JS menggunakan Terser
│   │   └── readableDate.js      # Format tanggal menggunakan Day.js
│   └── transforms/          # Transformasi output berkas saat proses build
│       └── minifyHtml.js        # Minifikasi berkas HTML pada mode production
└── src/                     # Source code utama website
    ├── _data/               # Data global yang dapat diakses di semua template
    │   ├── author.json          # Informasi data penulis/author blog
    │   ├── menu.json            # Struktur navigasi/menu utama
    │   ├── process.js           # Penentu status environment (production/development)
    │   └── site.js              # Konfigurasi global situs (judul, deskripsi, URL, paginasi)
    ├── _includes/           # Berkas template Nunjucks yang dapat digunakan ulang
    │   ├── layouts/         # Kerangka layout halaman
    │   │   ├── default.njk      # Layout dasar (HTML shell, head, header, main, footer)
    │   │   └── post.njk         # Layout khusus untuk halaman artikel blog
    │   ├── partials/        # Komponen UI modular
    │   │   ├── header.njk       # Komponen navbar/header navigasi
    │   │   ├── footer.njk       # Komponen footer situs
    │   │   ├── post-grid.njk    # Grid tampilan daftar kartu postingan artikel
    │   │   ├── paginator.njk    # Komponen navigasi pagination (Prev / Next / Nomor halaman)
    │   │   └── disqus.njk       # Komponen kolom komentar Disqus (opsional)
    │   └── icons/           # Ikon-ikon format SVG yang di-*include* ke komponen
    ├── assets/              # Berkas aset mentah
    │   ├── css/main.css         # Titik masuk file CSS utama Tailwind (@tailwind directives)
    │   ├── js/                  # Skrip logika frontend (interaksi DOM, pencarian, menu mobile)
    │   └── img/                 # Gambar umum, logo, favicon, dan placeholder
    ├── posts/               # Konten artikel blog
    │   ├── *.md                 # Berkas-berkas artikel blog dalam format Markdown
    │   ├── img/                 # Gambar thumbnail dan ilustrasi untuk artikel
    │   └── posts.11tydata.js    # Konfigurasi frontmatter default dan pemroses slug/thumbnail
    ├── misc/                # Template generator untuk berkas non-HTML
    │   ├── bundle.js.njk        # Menggabungkan dan meminifikasi file JS menjadi satu bundle
    │   ├── index.json.njk       # Menghasilkan indeks data pencarian dalam format JSON
    │   ├── sitemap.xml.njk      # Menghasilkan peta situs (sitemap.xml) untuk SEO
    │   └── robots.txt.njk       # Menghasilkan instruksi perayap web (robots.txt)
    ├── index.njk            # Halaman utama (beranda dengan list artikel dan paginasi)
    ├── about.njk            # Halaman statis tentang pemilik/blog
    ├── search.njk           # Halaman antarmuka pencarian artikel
    ├── tag.njk              # Halaman hasil filter artikel berdasarkan tag tertentu
    ├── tags.njk             # Halaman daftar seluruh kategori/tag
    └── 404.njk              # Halaman kustom penanganan Error 404 (Not Found)
```

---

## 🛠️ Alur Kerja & Fungsi Komponen Inti

### 1. Komponen Layouts & Partials (`src/_includes/`)
- **`layouts/default.njk`**: Layout induk yang memuat tag `<head>`, memuat font eksternal, stylesheet, wrapper layout fleksibel, serta menyematkan `header.njk` dan `footer.njk`.
- **`layouts/post.njk`**: Mewarisi layout `default`, menambahkan metadata artikel (judul, tanggal publikasi, tagar, gambar utama) dan menerapkan kelas CSS `prose` untuk merender isi Markdown artikel dengan tipografi rapi.
- **`partials/post-grid.njk`**: Menampilkan daftar kartu ringkasan artikel (gambar *lazy-load*, judul, tanggal, deskripsi/excerpt ringkas) yang fleksibel digunakan di halaman utama maupun halaman tag.
- **`partials/paginator.njk`**: Menghasilkan tautan perpindahan halaman (Halaman Sebelumnya, Halaman Selanjutnya, dan indikator posisi halaman saat ini).

### 2. Pengelolaan Konten Artikel (`src/posts/`)
Setiap artikel ditulis dalam format Markdown (`.md`) dengan *frontmatter* di bagian awal:
```markdown
---
title: "Judul Artikel Anda"
description: "Ringkasan singkat artikel untuk preview dan SEO"
date: 2026-09-03
tags: ["teknologi", "web"]
thumb: "nama-gambar.jpg"
---

Tulis isi konten artikel Anda di sini...
```
Berkas `posts.11tydata.js` secara otomatis memetakan tata letak ke `post.njk`, membentuk URL slug permanen, dan mengarahkan path thumbnail ke folder aset.

### 3. Konfigurasi Sistem (`eleventy.config.js` & `tailwind.config.js`)
- **`eleventy.config.js`**:
  - Mengatur direktori sumber (`src`) dan direktori hasil build (`dist`).
  - Mengatur *passthrough copy* untuk gambar.
  - Mendaftarkan *collections* (`posts`, `tagList`, `pagedPosts`, `pagedPostsByTag`).
  - Menghubungkan *filters* (format tanggal dan minifikasi JS) dan *transforms* (minifikasi HTML).
- **`tailwind.config.js`**: Menentukan berkas mana saja yang dipindai kelas CSS-nya (`content`), memperluas konfigurasi tema, serta mengaktifkan plugin tipografi.

---

## 🚀 Panduan Memulai

### Prasyarat
- Pastikan **Node.js** (versi 16 atau lebih baru) dan **npm** sudah terpasang di sistem Anda.

### Instalasi Dependensi
```bash
npm install
```

### Menjalankan Server Pengembangan (Local Development)
Untuk menjalankan server lokal dengan fitur *live reload* dan kompilasi otomatis Tailwind CSS:
```bash
npm start
# atau
npm run serve
```
Buka browser dan akses alamat yang ditampilkan pada terminal (biasanya `http://localhost:8080/`).

### Membangun Proyek untuk Produksi (Production Build)
Untuk menghasilkan seluruh aset statis siap rilis ke dalam direktori `dist/`:
```bash
npm run build
```
Hasil build pada direktori `dist/` dapat langsung diunggah ke layanan hosting statis seperti Netlify, Vercel, GitHub Pages, Cloudflare Pages, atau web server Apache/Nginx.
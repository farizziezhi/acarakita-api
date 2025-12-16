# 📅 AcaraKita (API v3)

**AcaraKita** adalah platform manajemen acara sosial modern yang dibangun dengan estetika "Dark Mode" yang premium (terinspirasi oleh X/Twitter) dan fungsionalitas backend yang kuat. Aplikasi ini memungkinkan pengguna untuk membuat, mengelola, mencari, dan berbagi acara dengan pengalaman pengguna yang mulus di perangkat Desktop maupun Mobile.

---

## ✨ Fitur Utama

### 🎨 Antarmuka Modern & Responsif

- **X-Style Dark Mode**: Desain antarmuka premium dengan warna _high-contrast_ (Hitam/Abu-abu gelap) yang nyaman di mata.
- **Fully Responsive**: Tampilan beradaptasi sempurna dari layar Desktop besar hingga Mobile.
  - **Desktop**: Layout 3 kolom (Sidebar Navigasi, Feed Utama, Widget Kanan).
  - **Mobile**: Navigasi bar bawah, widget cuaca & rekomendasi yang disesuaikan.
- **Toast Notifications**: Sistem notifikasi real-time yang elegan untuk setiap aksi pengguna.

### 🚀 Fitur Inti

- **Manajemen Acara (CRUD)**:
  - Buat, Edit, dan Hapus acara dengan mudah via modal overlay.
  - Catatan, lokasi, dan tanggal acara terintegrasi.
- **Kalender Interaktif**:
  - Lihat jadwal acara dalam tampilan kalender bulanan.
  - Indikator hari libur nasional otomatis.
  - _Mobile Optimized_: Tampilan kalender yang ringkas dan mudah dibaca di layar kecil.
- **Pencarian Canggih (GraphQL)**:
  - Cari acara berdasarkan Judul, Tanggal, Lokasi, atau Catatan.
  - Filter spesifik bulan dan tahun.
- **Profil Pengguna**:
  - Halaman profil lengkap dengan statistik post/follower.
  - Edit profil (Nama, Bio, Lokasi).
  - Manajemen keamanan (Ganti Password, Hapus Akun).

### ☀️ Widget Pintar

- **Cuaca Real-time**: Widget cuaca terintegrasi yang menampilkan kondisi cuaca berdasarkan lokasi acara atau lokasi pengguna (Default: Palu).
- **Rekomendasi Acara**: Widget rekomendasi cerdas untuk menemukan acara menarik lainnya.

---

## 🛠️ Tech Stack

Proyek ini dibangun menggunakan teknologi modern yang efisien:

### Backend

- **Framework**: [AdonisJS v5/v6] (Node.js Framework) - Kuat, aman, dan terstruktur MVC.
- **Bahasa**: TypeScript - Untuk kode yang lebih aman dan terprediksi.
- **Database**: MongoDB (via Mongoose) - Database NoSQL yang fleksibel untuk data acara dan user.

### Frontend

- **Core**: Vanilla JavaScript (ES6+) - Performa maksimal tanpa overhead framework frontend berat.
- **Styling**: [Tailwind CSS] (via CDN) - Utilitas CSS-first untuk desain cepat dan kustom.
- **Markup**: HTML5 Semantik.
- **Icons**: FontAwesome 6.

---

## ⚙️ Persyaratan Sistem

Sebelum memulai, pastikan komputer Anda telah terinstal:

1.  **Node.js**: Versi 18.x atau terbaru.
2.  **NPM**: Biasanya terinstal otomatis bersama Node.js.
3.  **MongoDB**: Database server lokal atau akses ke MongoDB Atlas.

---

## 📦 Panduan Instalasi

Ikuti langkah-langkah ini untuk menjalankan proyek di komputer lokal Anda:

### 1. Clone Repository (Atau Extract File)

```bash
git init
git add .
git commit -m "Initial commit"
```

### 2. Instalasi Dependensi

Jalankan perintah berikut di terminal root folder proyek:

```bash
npm install
```

_Ini akan mengunduh semua library backend AdonisJS dan dependensi lainnya._

### 3. Konfigurasi Environment (.env)

Buat file format `.env` di root folder (jika belum ada, copy dari `.env.example`). Pastikan konfigurasi database sesuai:

```env
PORT=3333
HOST=0.0.0.0
NODE_ENV=development
APP_KEY=rahasia_app_key_anda
DRIVE_DISK=local

# Konfigurasi Database (Sesuaikan dengan MongoDB lokal Anda)
DB_CONNECTION=mongodb
MONGO_URL=mongodb://localhost:27017/acarakita_v3
```

### 4. Menjalankan Aplikasi

Untuk mode pengembangan (dengan fitur _hot-reload_ backend):

```bash
npm run dev
```

Aplikasi akan berjalan di: **http://localhost:3333** Buka alamat tersebut di browser Anda (Chrome/Edge/Firefox).

### 5. Akses Halaman

- **Landing Page**: `http://localhost:3333/index.html`
- **Login**: `http://localhost:3333/login.html`
- **Register**: `http://localhost:3333/register.html`
- **Dashboard**: `http://localhost:3333/dashboard.html` (Perlu login)

---

## 📂 Struktur Proyek

```
acarakita-api-v3/
├── app/                  # Kode Logika Backend (Controllers, Models)
│   ├── Controllers/      # Http Controllers (Auth, Events, Profile, dll)
│   └── Models/           # Database Models (User, Event)
├── config/               # Konfigurasi AdonisJS (Database, Auth, App)
├── database/             # Migrasi & Seeder Database (jika ada)
├── frontend-vanilla/     # 🎨 FILE FRONTEND (Disini UI berada)
│   ├── js/
│   │   └── api.js        # Client-side API Handler (Jantung koneksi ke Backend)
│   ├── dashboard.html    # Halaman Utama (Feed & Kalender)
│   ├── index.html        # Landing Page
│   ├── login.html        # Halaman Masuk
│   ├── register.html     # Halaman Daftar
│   ├── profile.html      # Halaman Profil User
│   └── graphql.html      # Halaman Pencarian Event
├── start/                # Definisi Routes Backend (routes.ts)
├── .env                  # Variabel Lingkungan (JANGAN DI-PUSH ke Git)
├── package.json          # Daftar Dependensi Proyek
└── README.md             # Dokumentasi ini
```

---

## 🔍 Detail API (Singkat)

Backend menyediakan API RESTful yang dikonsumsi oleh folder `frontend-vanilla/`.

- **Auth**: `/register`, `/login`, `/logout`, `/me`
- **Events**: `GET /api/events`, `POST /api/events`, `PUT /api/events/:id`, `DELETE /api/events/:id`
- **Profile**: `PUT /api/profile`, `PUT /api/profile/password`
- **Features**: `/api/calendar`, `/api/stats`, `/api/weather`, `/api/graphql`

---

## 👨‍💻 Kredit

Dikembangkan dengan ❤️ untuk menghadirkan pengalaman manajemen acara yang **Simpel**, **Cepat**, dan **Elegan**.

_Copyright © 2025 AcaraKita Corp._

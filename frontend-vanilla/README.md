# Frontend Vanilla - AcaraKita

Frontend sederhana menggunakan **HTML, Tailwind CSS, dan Vanilla JavaScript** (tanpa framework).

## 📁 Struktur File

```
frontend-vanilla/
├── index.html          # Landing page
├── login.html          # Halaman login
├── register.html       # Halaman register
├── dashboard.html      # Dashboard dengan CRUD events
├── profile.html        # Profile management
└── js/
    └── api.js          # API service layer
```

## 🚀 Cara Menjalankan

### Opsi 1: Langsung Buka File HTML
1. Buka `index.html` di browser
2. Atau klik kanan → Open with → Browser

### Opsi 2: Menggunakan Live Server (Recommended)
1. Install extension "Live Server" di VS Code
2. Klik kanan pada `index.html`
3. Pilih "Open with Live Server"

### Opsi 3: Menggunakan Python HTTP Server
```bash
cd frontend-vanilla
python -m http.server 8080
```
Buka: http://localhost:8080

### Opsi 4: Menggunakan Node.js HTTP Server
```bash
cd frontend-vanilla
npx http-server -p 8080
```
Buka: http://localhost:8080

## ✨ Fitur

### 1. Landing Page (index.html)
- Hero section
- Features section
- CTA buttons
- Responsive design

### 2. Authentication
- **Login** (login.html)
  - Form validation
  - Error handling
  - Auto redirect setelah login
  
- **Register** (register.html)
  - Password confirmation
  - Form validation
  - Auto redirect ke login

### 3. Dashboard (dashboard.html)
- Stats cards (total events, today, this week)
- List upcoming events
- CRUD operations:
  - ✅ Create event (modal)
  - ✅ Read events (list)
  - ✅ Update event (modal)
  - ✅ Delete event (confirmation)
- Grouped by date
- Real-time updates

### 4. Profile (profile.html)
- View profile information
- Edit profile (name, birthday, phone, address)
- Change password (modal)
- Form validation

## 🔒 Authentication

- JWT token disimpan di `localStorage`
- Auto attach token di setiap request
- Auto redirect ke login jika unauthorized (401)
- Protected routes dengan `requireAuth()`
- Guest routes dengan `requireGuest()`

## 🎨 Styling

- **Tailwind CSS** via CDN
- Responsive design (mobile & desktop)
- Consistent color scheme (red/orange)
- Hover effects & transitions
- Modal overlays

## 📡 API Integration

File `js/api.js` berisi:
- `fetchAPI()` - Helper function dengan auto token
- `authAPI` - Login & register
- `eventsAPI` - CRUD events
- `dashboardAPI` - Get stats
- `profileAPI` - Profile management
- `requireAuth()` - Route guard
- `requireGuest()` - Guest guard

## 🔄 Flow Aplikasi

```
Landing Page (index.html)
    ↓
Register (register.html) → Login (login.html)
    ↓
Dashboard (dashboard.html)
    ├── Add Event (modal)
    ├── Edit Event (modal)
    ├── Delete Event
    └── Profile (profile.html)
        ├── Edit Profile
        └── Change Password (modal)
```

## 🆚 Perbedaan dengan React Version

| Aspek | React | Vanilla JS |
|-------|-------|------------|
| **Framework** | React + Vite | Pure HTML/JS |
| **Routing** | React Router | Multiple HTML files |
| **State** | useState/useEffect | Global variables |
| **Components** | JSX Components | DOM manipulation |
| **Build** | npm run build | No build needed |
| **Size** | ~500KB (bundled) | ~20KB |
| **Learning Curve** | Medium | Easy |

## ✅ Keuntungan Vanilla Version

1. ✅ **Lebih ringan** - No framework overhead
2. ✅ **Lebih cepat** - No build process
3. ✅ **Lebih simple** - Easy to understand
4. ✅ **No dependencies** - Just HTML/CSS/JS
5. ✅ **SEO friendly** - Static HTML

## ⚠️ Catatan

- Backend harus running di `http://localhost:3333`
- CORS harus enabled di backend
- Tailwind CSS loaded via CDN (butuh internet)
- Tidak ada routing library (pakai multiple HTML files)

## 🎯 Testing

1. Jalankan backend: `npm run dev` (di root project)
2. Buka frontend vanilla di browser
3. Test flow:
   - Register user baru
   - Login
   - Create event
   - Edit event
   - Delete event
   - Update profile
   - Change password
   - Logout

## 📝 Maintenance

Untuk update:
1. Edit file HTML langsung
2. Refresh browser (no build needed)
3. Check console untuk errors
4. Test di multiple browsers

Selamat mencoba! 🚀

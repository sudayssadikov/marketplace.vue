# Bozor — Zamonaviy iOS Liquid Glass Onlayn Marketplace (Frontend)

To'liq moslashuvchan (mobile-first, 360px dan 1440px+ gacha), ishlab chiqarish sifatidagi zamonaviy elektron tijorat (marketplace) veb-platformasi (1 va 2-bosqichlar to'liq yakunlangan).

Dizayn eng so'nggi **Apple iOS "Liquid Glass"** uslubida yaratilgan: `backdrop-filter: blur(24px)`, shaffof shisha elementlar, yumshoq soyalar, `spring-ease` animatsiyalari, press-scale (0.97) effektlari va to'liq Dark/Light mavzu tizimi.

---

## 🚀 Texnologiyalar to'plami (Strict Tech Stack)
- **Vite 5** + **JavaScript ES6** (TypeScript ishlatilmagan)
- **Vue 3** — Qat'iy **Options API** (`data()`, `computed`, `methods`, `watch`; `<script setup>` va Composition API ishlatilmagan)
- **Vue Router 4** (Lazy-loaded marshrutlar, dinamik sarlavhalar, URL query parametrlar bilan sinxronizatsiya)
- **Vuex 4** (Modulli arxitektura: `products`, `ui`, `auth` + `localStorage` persistensiyasi)
- **vue-i18n 9** (3 ta til: O'zbekcha [default], Ruscha, Inglizcha — barcha matnlar kalitlar orqali boshqariladi)
- **Bootstrap 5.x Grid** — Faqat grid: `container-fluid`, `row`, `col-*`
- **Maxalliy Inline-SVG Icon tizimi (`AppIcon.vue`)** — Tashqi CDN yoki shriftlarga bog'liqlik yo'q, SF-Symbols / Lucide 1.75px uslubi
- **Maxsus SCSS & CSS Variables** (iOS Light & Dark Mode tizimi)
- **ESLint & Prettier** (0 ta xatolik va ogohlantirish)

---

## 📱 Yaratilgan Sahifalar va Funksionallik (Stage 2 Scope)

1. **Bosh sahifa (`/`)**:
   - Hero slider (mobil qurilmada swipe, desktopda glass strelkalar)
   - Mashhur toifalar chiplari va to'ri
   - "Ommabop", "Katta chegirmalar", "Yangi kelganlar" bo'limlari
   - Mahsulotlar to'ri va sahifalash (Pagination)

2. **Katalog va Qidiruv (`/catalog`)**:
   - Desktopda chap yon panel filtrlari, mobilda pastdan chiquvchi iOS Bottom-Sheet
   - Kategoriya, narx oralig'i (min/max), reyting va faqat mavjudlarini filtrlash
   - Saralash: arzondan qimmatga, qimmatdan arzonga, reyting, yangilar, chegirma
   - Qidiruv so'zi va URL query parametrlar (`?page=`, `?sort=`, `?category=`) bilan to'liq sinxron
   - Bo'sh holat (Empty state) va Skeleton yuklanish animatsiyasi

3. **Mahsulot tafsilotlari (`/product/:id`)**:
   - Galereya: katta rasm, miniatyuralar (thumbnails), mobilda sensorli surish (swipe) va nuqtali indikator
   - Rasmni to'liq ekranda kattalashtirish (Fullscreen Lightbox & Zoom)
   - Narx bloki, aksiya chegirmasi, qoldiq miqdori (stock badge) va miqdor tanlagich (`+` / `-`)
   - "Savatga qo'shish", "Hozir xarid qilish", Sevimlilar va Ulashish (clipboard copy)
   - iOS Segmented Control tablari: Tavsif, Xususiyatlar jadvali, Sharhlar (Reviews)
   - Sotuvchi kartasi (Seller card) va O'xshash mahsulotlar (Related products) tavsiyalari

4. **Xaridlar savati (`/cart`)**:
   - Mahsulot miqdorini o'zgartirish, mahsulotni o'chirish, savatni tozalash
   - Buyurtma hisob-kitobi (Subtotal, chegirma, bepul yetkazib berish, yakuniy summa)
   - Promokod kiritish va qo'llash
   - Buyurtmani rasmiylashtirish (Checkout) va iOS Glass xabarnomasi (Toast)
   - Bo'sh savat holati va katalogga yo'naltiruvchi tugma

5. **Sevimlilar ro'yxati (`/favorites`)**:
   - Saqlangan barcha tovarlar to'ri (`ProductCard`)
   - "Barchasini savatga qo'shish" tugmasi
   - Bo'sh sevimlilar holati

6. **Profil va Sozlamalar (`/profile`)**:
   - iOS Inset Grouped List settings uslubi
   - Foydalanuvchi ma'lumotlari kartasi (avata bosh harflari, ism, email, a'zolik sanasi)
   - Buyurtmalar tarixi, Saqlangan manzillar
   - Tilni almashtirish (UZ, RU, EN) va Dark/Light rejimini almashtirish
   - Tizimdan chiqish (Logout)

7. **Avtorizatsiya (`/login`, `/register`)**:
   - iOS shisha kartasi shaklidagi chiroyli formalar
   - Klient tekshiruvi (frontend validation): email formati, parollar mosligi, kamida 6 ta belgi
   - Vuex `auth` moduli orqali holatni saqlash (`marketplace_user`, `marketplace_token`)
   - Demo rejim haqida eslatma

8. **Global imkoniyatlar**:
   - Tepadagi suzuvchi iOS Glass Toast xabarnomalari
   - Header va pastki Tab Bar (Mobile Bottom Nav) da jonli savat va sevimli hisoblagichlari
   - Desktopda Breadcrumbs (Non ushoqlari navigatsiyasi)
   - 404 — Sahifa topilmadi sahifasi

---

## 📁 Loyiha tuzilmasi
```
src/
├── api/                      # Mock xizmatlar qatlami (Real backend bilan almashtirish oson)
│   ├── categories.js         # Toifalar ro'yxati va piktogrammalari
│   └── products.js           # 48 ta to'liq parametrli mahsulot va filtrlash xizmati
├── assets/                   # Statik resurslar
├── components/
│   ├── common/               # Qayta ishlatiluvchi komponentlar
│   │   ├── AppIcon.vue       # Mahalliy inline SVG ikonlar
│   │   ├── Breadcrumbs.vue   # iOS uslubidagi navigatsiya zanjiri
│   │   ├── LanguageSwitcher.vue # Til almashtirgich
│   │   ├── Pagination.vue    # Sahifalash
│   │   ├── ProductLightbox.vue  # Rasmni kattalashtirish modali
│   │   └── ThemeToggle.vue   # Dark/Light rejim tugmasi
│   ├── layout/               # Asosiy sayt karkasi
│   │   ├── AppFooter.vue     # Sayt futeeri
│   │   ├── AppHeader.vue     # Yopishqoq shaffof shisha heder
│   │   ├── MobileBottomNav.vue # Pastki suzuvchi tab bar (iOS pill)
│   │   └── MobileOffcanvas.vue # Mobil yon menyu
│   └── product/              # Mahsulot komponentlari
│       ├── ProductCard.vue   # 4:3 nisbatli mahsulot kartasi
│       └── SkeletonCard.vue  # Yuklanish skeleti
├── locales/                  # Xalqarolashtirish (i18n)
│   ├── en.json
│   ├── i18n.js
│   ├── ru.json
│   └── uz.json
├── router/                   # Vue Router marshrutlari va sarlavhalari
│   └── index.js
├── store/                    # Vuex do'koni
│   ├── index.js
│   └── modules/
│       ├── auth.js           # Avtorizatsiya holati
│       ├── products.js       # Katalog va filtrlash holati
│       └── ui.js             # Savat, sevimlilar, mavzu va toast holati
├── styles/                   # iOS Liquid Glass SCSS dizayn tizimi
│   ├── _mixins.scss
│   ├── _reset.scss
│   ├── _variables.scss
│   └── main.scss
├── utils/                    # Utilitlar
│   ├── formatters.js         # Raqam va sana formatlash
│   └── storage.js            # Xavfsiz localStorage boshqaruvi
├── views/                    # Sahifalar
│   ├── CartView.vue          # Savat
│   ├── CatalogView.vue       # Katalog va qidiruv
│   ├── FavoritesView.vue     # Sevimlilar
│   ├── HomeView.vue          # Bosh sahifa
│   ├── LoginView.vue         # Kirish
│   ├── NotFoundView.vue      # 404 sahifasi
│   ├── ProductDetailView.vue # Mahsulot tafsilotlari
│   ├── ProfileView.vue       # Profil va sozlamalar
│   └── RegisterView.vue      # Ro'yxatdan o'tish
├── App.vue                   # Ilova asosi va Toast konteyneri
└── main.js                   # Asosiy kirish nuqtasi
```

---

## 🔌 Mock API o'rniga Real Backendni ulash yo'riqnomasi

Ilova arxitekturasi shunday tuzilganki, tashqi real serverni (Node.js, Laravel, Django, FastAPI, Go va h.k.) ulash uchun faqatgina `src/api/` papkasidagi funksiyalarni `axios` yoki `fetch` so'rovlariga almashtirish kifoya:

1. **`src/api/products.js` faylida**:
   - `fetchProducts(params)`:
     ```javascript
     import axios from 'axios';
     export const fetchProducts = async (params) => {
       const response = await axios.get('/api/v1/products', { params });
       return response.data; // { products, total, totalPages, currentPage }
     };
     ```
   - `fetchProductById(id)`:
     ```javascript
     export const fetchProductById = async (id) => {
       const response = await axios.get(`/api/v1/products/${id}`);
       return response.data;
     };
     ```
   - `fetchRelatedProducts(categoryId, excludeId)`:
     ```javascript
     export const fetchRelatedProducts = async (categoryId, excludeId) => {
       const response = await axios.get('/api/v1/products/related', {
         params: { categoryId, excludeId }
       });
       return response.data;
     };
     ```

2. **`src/api/categories.js` faylida**:
   - `fetchCategories()` funksiyasini real `/api/v1/categories` endpointiga yo'naltiring.

3. **`src/store/modules/auth.js` faylida**:
   - `login` va `register` amallarida mock `setTimeout` o'rniga real `/api/v1/auth/login` va `/api/v1/auth/register` API chaqiruvlarini joylashtiring va olingan haqiqiy JWT tokenni saqlang.

Boshqa hech qaysi komponent yoki sahifani o'zgartirish talab etilmaydi!

---

## 🛠 O'rnatish va Ishga tushirish

1. **Bog'liqliklarni o'rnatish:**
   ```bash
   npm install
   ```

2. **Dasturchi rejimida ishga tushirish (Dev Server):**
   ```bash
   npm run dev
   ```
   Brauzerda quyidagi manzilni oching: `http://localhost:3000` *(agar boshqa port ko'rsatilsa, konsoldagi havola orqali kiring)*.
   > **Eslatma:** Agar brauzeringizda avvalgi kesh saqlanib qolgan bo'lsa, `Ctrl + F5` (Hard Refresh) bosing.

3. **Ishlab chiqarish uchun yig'ish (Production Build):**
   ```bash
   npm run build
   ```

4. **Kodni tekshirish (ESLint):**
   ```bash
   npm run lint
   ```

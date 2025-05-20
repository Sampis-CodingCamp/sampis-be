# Sampis Backend

Backend untuk aplikasi Sampis menggunakan Hapi Framework dan MongoDB.

## Teknologi yang Digunakan

- Node.js
- Hapi Framework
- MongoDB (Mongoose)
- JWT untuk autentikasi
- Bcrypt untuk enkripsi password
- Joi untuk validasi
- Helmet & CORS untuk keamanan
- Nodemon & Jest untuk development/testing

## Fitur Utama

- Autentikasi User (Register, Login, JWT)
- Manajemen User (profile, role, poin)
- Transaksi Jual Sampah
- Penukaran Poin
- Artikel (CRUD)
- Approval Poin & Transaksi oleh Admin
- Middleware Role (user/admin)
- Validasi (Joi)

## Persyaratan Sistem

- Node.js v14 atau lebih tinggi
- NPM v6 atau lebih tinggi

## Instalasi

1. Clone repository
```bash
git clone <repository-url>
cd backend
```

2. Install dependensi
```bash
npm install
```

3. Buat file .env
```bash
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/sampis
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

4. Jalankan server
```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints (Ringkasan)

### Autentikasi

#### Register
- Method: POST
- URL: /auth/register
- Body:
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```

#### Login
- Method: POST
- URL: /auth/login
- Body:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

### User

- GET /users/profile
- PUT /users/profile
- GET /users (admin)

### Jual Sampah

- POST /sampah
- GET /sampah/user
- GET /sampah (admin)
- PUT /sampah/{id}/status (admin)

### Artikel

- POST /artikel (admin)
- GET /artikel
- GET /artikel/{id}
- PUT /artikel/{id} (admin)
- DELETE /artikel/{id} (admin)

### Penukaran Poin

- POST /poin/tukar
- GET /poin/user
- GET /poin (admin)
- PUT /poin/{id}/approve (admin)

## Catatan

- Endpoint yang membutuhkan autentikasi harus mengirimkan header Authorization: Bearer <token>
- Endpoint dengan (admin) hanya bisa diakses oleh user dengan role admin

## Testing

```bash
npm test
```

## Deployment

1. Pastikan semua environment variables sudah dikonfigurasi
2. Build aplikasi
```bash
npm run build
```
3. Jalankan di production
```
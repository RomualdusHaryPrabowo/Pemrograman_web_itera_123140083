# Proyek Website To-Do List Sederhana

Ini adalah sebuah mini proyek website to-do list yang dibangun menggunakan HTML, CSS, dan JavaScript. Aplikasi ini memungkinkan pengguna untuk mencatat, mengelola, dan melacak daftar tugas harian mereka dengan antarmuka yang minimalis.

---

## 📸 Screenshot Aplikasi

Berikut adalah beberapa tampilan dari aplikasi:

**1. Tampilan Awal Aplikasi**
*Menunjukkan halaman utama saat pertama kali dibuka.*
![Tampilan Awal](images/Tampilan-utama.png.png)

**2. Menambahkan Tugas Baru**
*Menunjukkan saat pengguna sedang mengetik tugas baru di form input.*
![Menambahkan Tugas](images/menambah-tugas.png.png)


**3. Pencarian tugas**
*Menunjukkan pencarian tugas.*
![Tugas Selesai](images/pencarian-tugas.png.png)


**4. Tugas Selesai Ditandai**
*Menunjukkan beberapa tugas yang sudah ditandai sebagai selesai.*
![Tugas Selesai](images/menandai-tugas-selesai.png.png)

---


## 🚀 Cara Menjalankan Aplikasi

1.  **Clone repository ini:**
    ```bash
    git clone [https://github.com/RomualdusHaryPrabowo/todolist-pengweb.git](https://github.com/RomualdusHaryPrabowo/todolist-pengweb.git)
    ```
2.  **Buka file `index.html`:**
    * Masuk ke folder hasil clone, lalu klik dua kali pada file `index.html`. File tersebut akan otomatis terbuka di browser default Anda.

---

## ✨ Fitur-fitur

Beberapa fitur yang sudah diimplementasikan:
* **Menambah Tugas Baru:** Pengguna dapat menambahkan tugas baru melalui form input.
* **Menandai Tugas Selesai:** Tugas dapat ditandai sebagai selesai dengan mengklik checkbox pada tugas.
* **Menghapus Tugas:** Setiap tugas memiliki tombol hapus untuk menghapusnya dari daftar.
* **Mengedit Tugas:** Setiap tugas memiliki tombol edit (Simbol pena) untuk mengedit tugas.
* **Mencari Tugas:** Pengguna dapat melakukan pencarian tugas sesuai status (Semua status, selesai, belum selesai) pada kolom pencarian dengan menginputkan nama tugas atau nama mata kuliah.
* **Penyimpanan Lokal:** Daftar tugas tidak akan hilang meskipun halaman di-refresh, karena data disimpan di `localStorage` browser.
* **Validasi Form:** Pengguna tidak bisa menambahkan tugas kosong.

---

## 🛠️ Penjelasan Teknis

### Penggunaan `localStorage`
Aplikasi ini memanfaatkan **Web Storage API**, khususnya `localStorage`, untuk menyimpan data tugas. Setiap kali ada perubahan pada daftar tugas (menambah, menghapus, mengedit, atau menandai selesai), seluruh daftar tugas akan diubah menjadi format string JSON dan disimpan di `localStorage`.

### Validasi Form
Untuk memastikan integritas data, form input memiliki validasi sederhana. Sebelum sebuah tugas ditambahkan, skrip akan memeriksa apakah nilai dari input field kosong atau tidak. Jika kosong, proses penambahan tugas akan dihentikan.
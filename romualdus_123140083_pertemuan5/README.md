# Sistem Manajemen Perpustakaan

**Nama**: Romualdus Hary Prabowo
**NIM**: 123140083
**Kelas**: RA

## Deskripsi Program
Program ini adalah sistem manajemen perpustakaan sederhana yang dibuat dengan menggunakan konsep Object-Oriented Programming (OOP) pada Python. Program dapat mengelola koleksi buku dengan fitur peminjaman dan pengembalian.

## Fitur Program
1. Menambah Buku
2. Menampilkan semua item perpustakaan
3. Menampilkan item yang tersedia
4. Mencari item berdasarkan judul
5. Mencari item berdasarkan ID
6. Peminjaman item
7. Pengembalian item
8. Melihat statistik 

## Konsep OOP yang Diterapkan

### 1. Abstract Class dan Inheritance
- `BaseItem` sebagai kelas abstrak untuk item perpustakaan
- `Book` dan `Magazine` turunan dari `BaseItem`
- Implementasi abstract methods: `info()` untuk menampilkan detail item dan `category()` untuk mengembalikan jenis item

### 2. Encapsulation
Pengamanan atribut menggunakan private dan protected attribut:
**Private** → `__code`, dan `__name`
**Protected**  → `_release_year`, `_available`, dan `_borrow_time`

### 3. Property Decorators
Program menggunakan @property untuk membuat getter/setter yang aman dengan validasi.

Contoh:
**Getter-only**
@property
def item_code(self):
    return self.__code

**Getter + Setter dengan validasi**
@property
def title(self):
    return self.__name

@title.setter
def title(self, val):
    if not val.strip():
        raise ValueError("Judul tidak boleh kosong!")
    self.__name = val


### 4. Polymorphism
- Perbedaan implementasi method info() di Book dan Magazine
- Method __str__() di setiap subclass memberikan format output berbeda

- Library menggunakan duck typing, tidak peduli apakah objek itu Book atau Magazine, asalkan punya method yang sama (category(), is_available, dll)

## Struktur File
```
├── library_item.py    
├── book.py           
├── magazine.py       
├── library.py        
├── main.py           
└── README.md       
```

## Cara Menjalankan Program

1. Pastikan Python 3.x sudah terinstall
2. Buka terminal/command prompt
3. Jalankan program:
```bash
python main.py
```

## Screenshot Program
![](image/foto1.png)

![](image/foto2.png)

## Contoh Penggunaan

### Menambah Buku
```
ID: A123
Judul: Belajar Pemrograman
Penulis: Hypo
ISBN: 978-111-222-12
Tahun: 2021
```

### Mencari Item
```
Judul: MTK
Hasil: Menampilkan semua item yang mengandung kata "MTK"
```

### Meminjam Item
```
ID: A123
Output: Berhasil meminjam: Belajar Pemrograman
```

## Konsep Teknis

### Encapsulation
1. Encapsulation

Program menggunakan encapsulation untuk melindungi atribut dan menjaga integritas data.

Private attribute (__) pada BaseItem:

__code → ID item

__name → nama/judul item
Atribut ini tidak dapat diakses langsung dari luar kelas.

Protected attribute (_) seperti:

_release_year

_available

_borrow_time
Atribut ini hanya boleh digunakan oleh subclass (Book, Magazine) atau internal class.

Contoh dari kode:
self.__code = code
self._available = True

Pada Library, pencarian item disembunyikan menggunakan method internal:
def _find(self, code):
    ...
Method _find() tidak dimaksudkan diakses langsung dari luar class, sehingga mendukung konsep encapsulation.

### Inheritance
Kelas Book dan Magazine mewarisi semua atribut dan method dari BaseItem.

Contohnya:
class Book(BaseItem):
    def __init__(...):
        super().__init__(code, name, year)
Kedua subclass menambahkan atribut spesifik:

Book

_writer

_isbn

Magazine

_publisher

_edition

Semua method dasar seperti borrow(), return_item(), info(), dan category() di-override untuk menyesuaikan jenis item.

### Polymorphism
Polimorfisme diterapkan melalui:

a. Override method info()

Setiap subclass menampilkan informasi dengan format berbeda:

Book.info() menampilkan judul, penulis, ISBN, dan status.

Magazine.info() menampilkan judul, penerbit, edisi, dan status.

b. Override __str__()

Setiap item punya representasi string berbeda meskipun dipanggil dengan cara yang sama:
print(item)  # otomatis memanggil __str__()
c. Polimorfisme pada Library

Kelas Library tidak peduli apakah objek adalah Book atau Magazine, asalkan memiliki method:

category()

is_available

title

item_code

Ini merupakan bentuk duck typing, karena objek dianggap valid jika memiliki method yang dibutuhkan, bukan berdasarkan tipenya.
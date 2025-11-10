# data mahasiswa
mahasiswa_list = [
    {"nama": "Andi", "nim": "12314001", "nilai_uts": 80, "nilai_uas": 85, "nilai_tugas": 90},
    {"nama": "Budi", "nim": "12314002", "nilai_uts": 70, "nilai_uas": 75, "nilai_tugas": 65},
    {"nama": "Citra", "nim": "12314003", "nilai_uts": 60, "nilai_uas": 55, "nilai_tugas": 70},
    {"nama": "Dewi", "nim": "12314004", "nilai_uts": 90, "nilai_uas": 95, "nilai_tugas": 85},
    {"nama": "Eko", "nim": "12314005", "nilai_uts": 50, "nilai_uas": 60, "nilai_tugas": 55},
]

# fungsi mengihitung nilai akhir
def hitung_nilai_akhir(mhs):
    return (0.3 * mhs["nilai_uts"]) + (0.4 * mhs["nilai_uas"]) + (0.3 * mhs["nilai_tugas"])


# fungsi menentukan grade
def tentukan_grade(nilai):
    if nilai >= 80:
        return "A"
    elif nilai >= 70:
        return "B"
    elif nilai >= 60:
        return "C"
    elif nilai >= 50:
        return "D"
    else:
        return "E"


# fungsi menampilkan data mahasiswa
def tampilkan_data(mahasiswa_list):
    print("="*70) #garis pemisah
    print(f"{'Nama':<15}{'NIM':<12}{'UTS':<8}{'UAS':<8}{'Tugas':<8}{'Akhir':<8}{'Grade':<6}")
    print("="*70) #garis pemisah
    for mhs in mahasiswa_list:
        nilai_akhir = hitung_nilai_akhir(mhs)
        grade = tentukan_grade(nilai_akhir)
        print(f"{mhs['nama']:<15}{mhs['nim']:<12}{mhs['nilai_uts']:<8}{mhs['nilai_uas']:<8}{mhs['nilai_tugas']:<8}{nilai_akhir:<8.2f}{grade:<6}")
    print("="*70)


# fungsi mencari nilai tertinggi dan terendah
def cari_tertinggi_terendah(mahasiswa_list):
    sorted_list = sorted(mahasiswa_list, key=lambda x: hitung_nilai_akhir(x), reverse=True)
    tertinggi = sorted_list[0]
    terendah = sorted_list[-1]
    print(f"Nilai tertinggi: {tertinggi['nama']} ({hitung_nilai_akhir(tertinggi):.2f})")
    print(f"Nilai terendah : {terendah['nama']} ({hitung_nilai_akhir(terendah):.2f})")

# fungsi menambah data mahasiswa
def tambah_mahasiswa(mahasiswa_list):
    nama = input("Nama: ")
    nim = input("NIM: ")
    uts = float(input("Nilai UTS: "))
    uas = float(input("Nilai UAS: "))
    tugas = float(input("Nilai Tugas: "))
    mahasiswa_baru = {"nama": nama, "nim": nim, "nilai_uts": uts, "nilai_uas": uas, "nilai_tugas": tugas}
    mahasiswa_list.append(mahasiswa_baru)
    print("✅ Data mahasiswa berhasil ditambahkan!\n")
    
    
# fungsi filter berdasarkan grade
def filter_grade(mahasiswa_list, grade_dicari):
    print(f"Daftar mahasiswa dengan grade {grade_dicari}:")
    print("="*60)
    for mhs in mahasiswa_list:
        nilai_akhir = hitung_nilai_akhir(mhs)
        grade = tentukan_grade(nilai_akhir)
        if grade == grade_dicari:
            print(f"- {mhs['nama']} ({mhs['nim']}) -> {nilai_akhir:.2f}")
    print("="*60)


# fungsi menghitung rata-rata kelas
def rata_rata_kelas(mahasiswa_list):
    total = sum(hitung_nilai_akhir(mhs) for mhs in mahasiswa_list)
    rata2 = total / len(mahasiswa_list)
    print(f"Rata-rata nilai kelas: {rata2:.2f}")


# menu utama
while True:
    print("\n=== MENU DATA MAHASISWA ===")
    print("1. Tampilkan Data Mahasiswa")
    print("2. Tambah Data Mahasiswa")
    print("3. Cari Nilai Tertinggi & Terendah")
    print("4. Filter Berdasarkan Grade")
    print("5. Hitung Rata-rata Kelas")
    print("0. Keluar")

    pilihan = input("Pilih menu: ")

    if pilihan == "1":
        tampilkan_data(mahasiswa_list)
    elif pilihan == "2":
        tambah_mahasiswa(mahasiswa_list)
    elif pilihan == "3":
        cari_tertinggi_terendah(mahasiswa_list)
    elif pilihan == "4":
        grade_dicari = input("Masukkan grade (A/B/C/D/E): ").upper()
        filter_grade(mahasiswa_list, grade_dicari)
    elif pilihan == "5":
        rata_rata_kelas(mahasiswa_list)
    elif pilihan == "0":
        print("Terima kasih! Program selesai.")
        break
    else:
        print("Pilihan tidak valid, coba lagi.")

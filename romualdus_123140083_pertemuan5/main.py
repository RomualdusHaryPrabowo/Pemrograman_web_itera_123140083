# main.py
# Program utama CLI perpustakaan

from book import Book
from magazine import Magazine
from library import Library


def menu():
    print("\n=== MENU ===")
    print("1. Tambah Buku")
    print("2. Tambah Majalah")
    print("3. Tampilkan Semua Item")
    print("4. Tampilkan Item Tersedia")
    print("5. Cari Judul")
    print("6. Cari ID")
    print("7. Pinjam")
    print("8. Kembalikan")
    print("9. Statistik")
    print("0. Keluar")


def add_book(lib: Library):
    print("\n=== INPUT BUKU ===")
    try:
        code = input("ID: ")
        title = input("Judul: ")
        writer = input("Penulis: ")
        isbn = input("ISBN: ")
        year = int(input("Tahun: "))

        obj = Book(code, title, year, writer, isbn)
        if lib.add_item(obj):
            print("Buku berhasil ditambahkan!")
        else:
            print("ID sudah dipakai.")
    except Exception as e:
        print("Error:", e)


def add_mag(lib: Library):
    print("\n=== INPUT MAJALAH ===")
    try:
        code = input("ID: ")
        title = input("Judul: ")
        pub = input("Penerbit: ")
        edition = int(input("Edisi: "))
        year = int(input("Tahun: "))

        obj = Magazine(code, title, year, pub, edition)
        if lib.add_item(obj):
            print("Majalah berhasil ditambahkan!")
        else:
            print("ID sudah dipakai.")
    except Exception as e:
        print("Error:", e)


def init_data(lib: Library):
    lib.add_item(Book("B01", "Dasar Python", 2023, "Budi", "978-1111"))
    lib.add_item(Book("B02", "Pemrograman Web", 2024, "Siti", "978-2222"))
    lib.add_item(Magazine("M01", "Tech Now", 2024, "Gramedia", 10))


def main():
    lib = Library("Perpustakaan ITERA")
    init_data(lib)

    print("\n=== SISTEM PERPUSTAKAAN ===")
    while True:
        menu()
        choose = input("Pilih: ")

        if choose == "1": add_book(lib)
        elif choose == "2": add_mag(lib)
        elif choose == "3": lib.show_all()
        elif choose == "4": lib.show_available()
        elif choose == "5":
            t = input("Judul: ")
            res = lib.search_title(t)
            for r in res: print(r)
        elif choose == "6":
            cid = input("ID: ")
            obj = lib.search_id(cid)
            obj.info() if obj else print("Tidak ditemukan!")
        elif choose == "7":
            cid = input("ID: ")
            lib.borrow(cid)
        elif choose == "8":
            cid = input("ID: ")
            lib.return_back(cid)
        elif choose == "9":
            lib.stats()
        elif choose == "0":
            print("Keluar...")
            break
        else:
            print("Pilihan tidak valid!")


if __name__ == "__main__":
    main()

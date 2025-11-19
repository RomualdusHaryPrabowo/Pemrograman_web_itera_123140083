# library.py
# Menyimpan koleksi item dan menyediakan fitur pencarian & peminjaman

from typing import List, Optional
from library_item import BaseItem


class Library:

    def __init__(self, name: str):
        self._name = name
        self._collection: List[BaseItem] = []
        self._borrow_counter = 0

    @property
    def total_items(self):
        return len(self._collection)

    @property
    def available_count(self):
        return sum(1 for i in self._collection if i.is_available)

    @property
    def borrowed_count(self):
        return sum(1 for i in self._collection if not i.is_available)

    def add_item(self, item: BaseItem):
        if self._find(item.item_code):
            return False
        self._collection.append(item)
        return True

    def _find(self, code: str) -> Optional[BaseItem]:
        for obj in self._collection:
            if obj.item_code.lower() == code.lower():
                return obj
        return None

    def search_title(self, text: str) -> List[BaseItem]:
        return [i for i in self._collection if text.lower() in i.title.lower()]

    def search_id(self, code: str):
        return self._find(code)

    def show_all(self):
        if not self._collection:
            print("\nPerpustakaan kosong.")
            return

        print(f"\n=== {self._name.upper()} ===")
        print(f"Total: {self.total_items} | Tersedia: {self.available_count} | Dipinjam: {self.borrowed_count}\n")

        for idx, item in enumerate(self._collection, 1):
            print(f"{idx}. {item}")

    def show_available(self):
        items = [i for i in self._collection if i.is_available]
        if not items:
            print("\nTidak ada item tersedia.")
            return

        print("\n=== ITEM TERSEDIA ===")
        for idx, obj in enumerate(items, 1):
            print(f"{idx}. {obj}")

    def borrow(self, code: str):
        item = self._find(code)
        if not item:
            print("Item tidak ditemukan.")
            return False

        if item.borrow():
            self._borrow_counter += 1
            print(f"Berhasil meminjam: {item.title}")
            return True

        print(f"{item.title} sedang dipinjam.")
        return False

    def return_back(self, code: str):
        item = self._find(code)
        if not item:
            print("Item tidak ditemukan.")
            return False

        if item.return_item():
            print(f"Berhasil mengembalikan: {item.title}")
            return True

        print(f"{item.title} tidak sedang dipinjam.")
        return False

    def stats(self):
        books = sum(1 for i in self._collection if i.category() == "Buku")
        mags = sum(1 for i in self._collection if i.category() == "Majalah")

        print("\n=== STATISTIK ===")
        print(f"Total Item: {self.total_items}")
        print(f"Tersedia: {self.available_count} | Dipinjam: {self.borrowed_count}")
        print(f"Buku: {books} | Majalah: {mags}")

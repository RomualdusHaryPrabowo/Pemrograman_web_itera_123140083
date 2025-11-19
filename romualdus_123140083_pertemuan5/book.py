# book.py
# Representasi buku sebagai turunan dari BaseItem

from library_item import BaseItem


class Book(BaseItem):

    def __init__(self, code: str, name: str, year: int, writer: str, isbn: str):
        super().__init__(code, name, year)
        self._writer = writer
        self._isbn = isbn

    @property
    def author(self):
        return self._writer

    @author.setter
    def author(self, val):
        if not val.strip():
            raise ValueError("Penulis tidak boleh kosong!")
        self._writer = val

    def info(self):
        status = "Tersedia" if self.is_available else "Dipinjam"
        print(f"ID: {self.item_code} | {self.title} | {self._writer} | {self.year} | {status}")

    def category(self):
        return "Buku"

    def __str__(self):
        status = "Tersedia" if self.is_available else "Dipinjam"
        return f"[{self.item_code}] {self.title} - {self._writer} ({self.year}) - {status}"

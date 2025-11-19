# magazine.py
# Representasi majalah sebagai turunan dari BaseItem

from library_item import BaseItem


class Magazine(BaseItem):

    def __init__(self, code: str, name: str, year: int, publisher: str, edition: int):
        super().__init__(code, name, year)
        self._publisher = publisher
        self._edition = edition

    @property
    def publish_by(self):
        return self._publisher

    @publish_by.setter
    def publish_by(self, val):
        if not val.strip():
            raise ValueError("Penerbit tidak boleh kosong!")
        self._publisher = val

    @property
    def issue(self):
        return self._edition

    @issue.setter
    def issue(self, val):
        if val <= 0:
            raise ValueError("Nomor edisi harus > 0")
        self._edition = val

    def info(self):
        status = "Tersedia" if self.is_available else "Dipinjam"
        print(f"ID: {self.item_code} | {self.title} | {self._publisher} | Edisi #{self._edition} | {self.year} | {status}")

    def category(self):
        return "Majalah"

    def __str__(self):
        status = "Tersedia" if self.is_available else "Dipinjam"
        return f"[{self.item_code}] {self.title} - Edisi #{self._edition} ({self.year}) - {status}"

# library_item.py
# Kelas abstrak dasar untuk semua item perpustakaan

from abc import ABC, abstractmethod
from datetime import datetime


class BaseItem(ABC):

    def __init__(self, code: str, name: str, release_year: int):
        self.__code = code
        self.__name = name
        self._release_year = release_year
        self._available = True
        self._borrow_time = None

    # --- PROPERTY ID ---
    @property
    def item_code(self):
        return self.__code

    # --- PROPERTY TITLE ---
    @property
    def title(self):
        return self.__name

    @title.setter
    def title(self, val: str):
        if not val.strip():
            raise ValueError("Judul tidak boleh kosong!")
        self.__name = val

    # --- PROPERTY YEAR ---
    @property
    def year(self):
        return self._release_year

    @year.setter
    def year(self, new_year: int):
        current = datetime.now().year
        if not (1000 <= new_year <= current):
            raise ValueError("Tahun tidak valid!")
        self._release_year = new_year

    @property
    def is_available(self):
        return self._available

    # --- ABSTRACT METHODS ---
    @abstractmethod
    def info(self):
        pass

    @abstractmethod
    def category(self):
        pass

    # --- BORROWING MECHANISM ---
    def borrow(self):
        if self._available:
            self._available = False
            self._borrow_time = datetime.now()
            return True
        return False

    def return_item(self):
        if not self._available:
            self._available = True
            self._borrow_time = None
            return True
        return False

    def __str__(self):
        status = "Tersedia" if self._available else "Dipinjam"
        return f"[{self.__code}] {self.__name} ({self._release_year}) - {status}"

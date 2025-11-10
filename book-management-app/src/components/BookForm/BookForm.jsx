// src/components/BookForm/BookForm.jsx
import React, { useState, useEffect } from 'react';
import './BookForm.css';

function BookForm({ onSubmit, initialBook }) {
  const [book, setBook] = useState({ title: '', author: '', status: 'Dimiliki' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialBook) {
      setBook(initialBook);
    }
  }, [initialBook]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!book.title || !book.author) {
      setError('Judul dan Penulis tidak boleh kosong.');
      return;
    }
    setError('');
    onSubmit(book);
    if (!initialBook) {
      setBook({ title: '', author: '', status: 'Dimiliki' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <h2>{initialBook ? 'Edit Buku' : 'Tambah Buku Baru'}</h2>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        name="title"
        placeholder="Judul Buku"
        value={book.title}
        onChange={handleChange}
      />
      <input
        type="text"
        name="author"
        placeholder="Penulis"
        value={book.author}
        onChange={handleChange}
      />
      <select name="status" value={book.status} onChange={handleChange}>
        <option value="Dimiliki">Dimiliki</option>
        <option value="Dibaca">Sedang Dibaca</option>
        <option value="Ingin dibeli">Ingin Dibeli</option>
      </select>
      <button type="submit">{initialBook ? 'Update Buku' : 'Tambah Buku'}</button>
    </form>
  );
}

export default BookForm;
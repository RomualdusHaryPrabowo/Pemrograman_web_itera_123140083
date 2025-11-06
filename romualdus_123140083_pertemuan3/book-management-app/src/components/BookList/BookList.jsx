import React from 'react';
import './BookList.css';

function BookList({ books, onEdit, onDelete }) {
  return (
    <div className="book-list">
      {books.length === 0 ? (
          <>
            <h3>Daftar Buku.</h3>
            <p>Tidak ada buku yang ditemukan.</p>
          </>
      ) : (
        books.map(book => (
          <div key={book.id} className="book-item">
            <div className="book-info">
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <span className={`status ${book.status}`}>{book.status}</span>
            </div>
            <div className="book-actions">
              <button onClick={() => onEdit(book)}>Edit</button>
              <button onClick={() => onDelete(book.id)} className="delete">Hapus</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default BookList;
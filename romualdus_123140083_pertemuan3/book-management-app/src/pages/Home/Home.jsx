import React, { useState, useMemo } from 'react';
import { useBook } from '../../context/BookContext';
import BookForm from '../../components/BookForm/BookForm';
import BookList from '../../components/BookList/BookList';
import BookFilter from '../../components/BookFilter/BookFilter';
import './Home.css';

function Home() {
  const { books, addBook, deleteBook, editBook } = useBook();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [editingBook, setEditingBook] = useState(null);

  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            book.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === '' || book.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [books, searchTerm, statusFilter]);

  const handleAddBook = (book) => {
    addBook(book);
  };

  const handleEditBook = (book) => {
    editBook(book.id, book);
    setEditingBook(null);
  };

  const handleDeleteBook = (id) => {
    if (window.confirm('Yakin ingin menghapus buku ini?')) {
      deleteBook(id);
    }
  };

  const startEdit = (book) => {
    setEditingBook(book);
  };

  return (
    <div className="home-container">
      <h1>Perpustakaan ku..</h1>
      <div className="content-wrapper">
        <div className="form-section">
          <BookForm
            onSubmit={editingBook ? handleEditBook : handleAddBook}
            initialBook={editingBook}
          />
        </div>
        <div className="list-section">
          <BookFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
          />
          <BookList
            books={filteredBooks}
            onEdit={startEdit}
            onDelete={handleDeleteBook}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
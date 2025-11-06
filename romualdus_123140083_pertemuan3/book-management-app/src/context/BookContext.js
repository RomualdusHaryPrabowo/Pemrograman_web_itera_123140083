import React, { createContext, useContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const BookContext = createContext();

export function useBook() {
  return useContext(BookContext);
}

export function BookProvider({ children }) {
  const [books, setBooks] = useLocalStorage('books', []);

  const addBook = (book) => {
    setBooks([...books, { ...book, id: Date.now() }]);
  };

  const deleteBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

  const editBook = (id, updatedBook) => {
    setBooks(books.map(book => (book.id === id ? updatedBook : book)));
  };

  const value = {
    books,
    addBook,
    deleteBook,
    editBook,
  };

  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  );
}
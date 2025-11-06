// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// src/App.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { BookProvider } from './context/BookContext';

// Wrapper untuk menyediakan context dan router
const AllTheProviders = ({ children }) => {
  return (
    <BookProvider>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </BookProvider>
  );
};

// Custom render function
const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

test('renders home page and initial components', () => {
  customRender(<App />);
  expect(screen.getByText(/Manajemen Buku Pribadi/i)).toBeInTheDocument();
  expect(screen.getByText(/Tambah Buku Baru/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Cari berdasarkan judul atau penulis/i)).toBeInTheDocument();
});

test('adds a new book', async () => {
  customRender(<App />);
  
  fireEvent.change(screen.getByPlaceholderText('Judul Buku'), {
    target: { value: 'React Testing' },
  });
  fireEvent.change(screen.getByPlaceholderText('Penulis'), {
    target: { value: 'John Doe' },
  });
  fireEvent.click(screen.getByText('Tambah Buku'));

  await waitFor(() => {
    expect(screen.getByText('React Testing')).toBeInTheDocument();
    expect(screen.getByText('oleh John Doe')).toBeInTheDocument();
  });
});

test('deletes a book', async () => {
  customRender(<App />);
  
  // Tambah buku dulu
  fireEvent.change(screen.getByPlaceholderText('Judul Buku'), {
    target: { value: 'Buku untuk Dihapus' },
  });
  fireEvent.change(screen.getByPlaceholderText('Penulis'), {
    target: { value: 'Author' },
  });
  fireEvent.click(screen.getByText('Tambah Buku'));

  await waitFor(() => {
    expect(screen.getByText('Buku untuk Dihapus')).toBeInTheDocument();
  });

  // Hapus buku
  fireEvent.click(screen.getByText('Hapus'));
  
  // Konfirmasi dialog
  // NOTE: window.confirm perlu di-mock
  window.confirm = jest.fn(() => true);
  fireEvent.click(screen.getByText('Hapus')); // Klik lagi setelah mock

  await waitFor(() => {
    expect(screen.queryByText('Buku untuk Dihapus')).not.toBeInTheDocument();
  });
});

test('filters books by status', async () => {
  customRender(<App />);
  
  // Tambah buku dengan status 'milik'
  fireEvent.change(screen.getByPlaceholderText('Judul Buku'), { target: { value: 'Buku Milik' } });
  fireEvent.change(screen.getByPlaceholderText('Penulis'), { target: { value: 'Author' } });
  fireEvent.click(screen.getByText('Tambah Buku'));

  // Tambah buku dengan status 'baca'
  await waitFor(() => {
    fireEvent.change(screen.getByPlaceholderText('Judul Buku'), { target: { value: 'Buku Baca' } });
  });
  fireEvent.change(screen.getByPlaceholderText('Penulis'), { target: { value: 'Author' } });
  fireEvent.change(screen.getByDisplayValue('Dimiliki'), { target: { value: 'baca' } });
  fireEvent.click(screen.getByText('Tambah Buku'));

  await waitFor(() => {
    expect(screen.getByText('Buku Milik')).toBeInTheDocument();
    expect(screen.getByText('Buku Baca')).toBeInTheDocument();
  });

  // Filter status 'milik'
  fireEvent.click(screen.getByText('Dimiliki'));
  
  await waitFor(() => {
    expect(screen.getByText('Buku Milik')).toBeInTheDocument();
    expect(screen.queryByText('Buku Baca')).not.toBeInTheDocument();
  });
});

test('searches for a book', async () => {
  customRender(<App />);

  // Tambah buku
  fireEvent.change(screen.getByPlaceholderText('Judul Buku'), { target: { value: 'Pencarian Buku' } });
  fireEvent.change(screen.getByPlaceholderText('Penulis'), { target: { value: 'Penulis Pencarian' } });
  fireEvent.click(screen.getByText('Tambah Buku'));

  await waitFor(() => {
    expect(screen.getByText('Pencarian Buku')).toBeInTheDocument();
  });

  // Lakukan pencarian
  fireEvent.change(screen.getByPlaceholderText('Cari berdasarkan judul atau penulis...'), {
    target: { value: 'Pencarian' },
  });

  await waitFor(() => {
    expect(screen.getByText('Pencarian Buku')).toBeInTheDocument();
  });

  // Cari dengan kata kunci yang tidak ada
  fireEvent.change(screen.getByPlaceholderText('Cari berdasarkan judul atau penulis...'), {
    target: { value: 'Tidak Ada' },
  });

  await waitFor(() => {
    expect(screen.getByText('Tidak ada buku yang ditemukan.')).toBeInTheDocument();
  });
});
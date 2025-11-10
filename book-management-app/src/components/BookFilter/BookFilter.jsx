// src/components/BookFilter/BookFilter.jsx
import React from 'react';
import './BookFilter.css';

function BookFilter({ searchTerm, onSearchChange, statusFilter, onStatusChange }) {
  return (
    <div className="book-filter">
      <input
        type="text"
        placeholder="Cari berdasarkan judul atau penulis..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <div className="filter-buttons">
        <button
          onClick={() => onStatusChange('')}
          className={statusFilter === '' ? 'active' : ''}
        >
          Semua
        </button>
        <button
          onClick={() => onStatusChange('Dimiliki')}
          className={statusFilter === 'Dimiliki' ? 'active' : ''}
        >
          Dimiliki
        </button>
        <button
          onClick={() => onStatusChange('Dibaca')}
          className={statusFilter === 'Dibaca' ? 'active' : ''}
        >
          Sedang Dibaca
        </button>
        <button
          onClick={() => onStatusChange('Ingin dibeli')}
          className={statusFilter === 'Ingin dibeli' ? 'active' : ''}
        >
          Ingin Dibeli
        </button>
      </div>
    </div>
  );
}

export default BookFilter;
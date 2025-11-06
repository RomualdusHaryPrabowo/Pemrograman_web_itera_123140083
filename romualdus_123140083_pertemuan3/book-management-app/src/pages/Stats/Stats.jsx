import React from 'react';
import { useBook } from '../../context/BookContext';
import useBookStats from '../../hooks/useBookStats';
import './Stats.css';

function Stats() {
  const { books } = useBook();
  const { total, owned, reading, toBuy } = useBookStats(books);

  return (
    <div className="stats-container">
      <h1>Statistik Buku</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Buku</h3>
          <p className="stat-number">{total}</p>
        </div>
        <div className="stat-card">
          <h3>Dimiliki</h3>
          <p className="stat-number">{owned}</p>
        </div>
        <div className="stat-card">
          <h3>Sedang Dibaca</h3>
          <p className="stat-number">{reading}</p>
        </div>
        <div className="stat-card">
          <h3>Ingin Dibeli</h3>
          <p className="stat-number">{toBuy}</p>
        </div>
      </div>
    </div>
  );
}

export default Stats;
import { useMemo } from 'react';

function useBookStats(books) {
  const stats = useMemo(() => {
    const total = books.length;
    const owned = books.filter(book => book.status === 'Dimilik').length;
    const reading = books.filter(book => book.status === 'Dibaca').length;
    const toBuy = books.filter(book => book.status === 'Ingin dibeli').length;

    return { total, owned, reading, toBuy };
  }, [books]);

  return stats;
}

export default useBookStats;
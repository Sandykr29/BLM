import { useEffect, useState } from 'react';

export default function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/books`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-indigo-600">All Books</h1>
      <ul className="space-y-3">
        {books.map(book => (
          <li key={book._id} className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold text-lg">{book.title}</h2>
            <p className="text-sm text-gray-600">Author: {book.author}</p>
            <p className="text-sm text-gray-500">Rating: {book.rating}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

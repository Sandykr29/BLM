import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function MyBooks() {
  const [books, setBooks] = useState([]);

  const fetchBooks = () => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/books/my`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => setBooks(data));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/books/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    fetchBooks();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-indigo-600">My Books</h1>
      <ul className="space-y-4">
        {books.map(book => (
          <li key={book._id} className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{book.title}</h2>
            <p className="text-sm text-gray-600">Author: {book.author}</p>
            <p className="text-sm text-gray-500">Rating: {book.rating}</p>
            <div className="mt-2 space-x-2">
              <Link to={`/books/edit/${book._id}`} className="text-blue-600 hover:underline">Edit</Link>
              <button onClick={() => handleDelete(book._id)} className="text-red-600 hover:underline">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

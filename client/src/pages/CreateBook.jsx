import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/books`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ title, author, rating }),
    });
    navigate('/books');
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-indigo-600">Add a New Book</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="number" placeholder="Rating" value={rating} onChange={(e) => setRating(e.target.value)} className="w-full p-2 border rounded" required />
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Add Book</button>
      </form>
    </div>
  );
}

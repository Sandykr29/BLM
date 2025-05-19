import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState('');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/books/${id}`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        setTitle(data.title);
        setAuthor(data.author);
        setRating(data.rating);
      });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/books/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ title, author, rating }),
    });
    navigate('/mybooks');
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-indigo-600">Edit Book</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} className="w-full p-2 border rounded" required />
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Update Book</button>
      </form>
    </div>
  );
}

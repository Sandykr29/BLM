import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import BookList from './pages/BookList';
import CreateBook from './pages/CreateBook';
import EditBook from './pages/EditBook';
import MyBooks from './pages/MyBooks';
import { useEffect, useState } from 'react';

function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/me`, {
        credentials: 'include'
      });
      if (res.ok) {
        const data = await res.json();
        if (data.email) {
          setIsAuthenticated(true);
        }
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleLogout = async () => {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/logout`, {
      credentials: 'include'
    });
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-indigo-600">Books Library</Link>
        <div className="space-x-4">
          {!isAuthenticated ? (
            <>
              <Link to="/register" className="text-gray-600 hover:text-indigo-600">Register</Link>
              <Link to="/login" className="text-gray-600 hover:text-indigo-600">Login</Link>
            </>
          ) : (
            <>
              <Link to="/books" className="text-gray-600 hover:text-indigo-600">Books</Link>
              <Link to="/mybooks" className="text-gray-600 hover:text-indigo-600">My Books</Link>
              <Link to="/books/create" className="text-gray-600 hover:text-indigo-600">Add Book</Link>
              <button onClick={handleLogout} className="text-red-500 hover:text-red-700">Logout</button>
            </>
          )}
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/books/create" element={<CreateBook />} />
        <Route path="/books/edit/:id" element={<EditBook />} />
        <Route path="/mybooks" element={<MyBooks />} />
      </Routes>
    </div>
  );
}
export default App;

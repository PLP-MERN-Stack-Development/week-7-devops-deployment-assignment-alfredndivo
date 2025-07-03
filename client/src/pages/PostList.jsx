// src/pages/PostList.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useApi from '../hooks/useApi';

/* -------------------------------------------------------------- */
export default function PostList() {
  /* text in the search box */
  const [search, setSearch] = useState('');

  /* debounced value (updates 300 ms after the user stops typing) */
  const [debounced, setDebounced] = useState(search);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  /* API hook – endpoint changes only when `debounced` changes */
  const {
    data: posts = [],
    loading,
    error,
  } = useApi(`http://localhost:5000/api/posts?search=${encodeURIComponent(debounced)}`);

  /* ---------------------------------------------------------- */
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-emerald-800 text-center mb-8">
        Latest Posts
      </h1>

      {/* search box */}
      <div className="mb-6 text-center">
        <input
          type="text"
          placeholder="Search posts…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-96 px-4 py-2 border border-emerald-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* initial load spinner */}
      {loading && posts.length === 0 && (
        <p className="text-center text-emerald-600 font-medium">Loading posts…</p>
      )}

      {/* error message */}
      {error && (
        <p className="text-center text-red-500 font-semibold">{error}</p>
      )}

      {/* posts grid */}
      {posts.length === 0 && !loading ? (
        <p className="text-center text-gray-500 text-lg">
          No posts found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-gradient-to-br from-green-50 to-emerald-100 border border-emerald-200 rounded-2xl shadow hover:shadow-xl transition-all p-5 flex flex-col"
            >
              {post.featuredImage && (
                <img
                  src={`http://localhost:5000${post.featuredImage}`}
                  alt={post.title}
                  className="w-full max-h-40 object-cover rounded-lg mb-4"
                />
              )}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-emerald-800 mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-700 text-sm mb-4">
                  {(post.excerpt || post.content.slice(0, 120)) + '…'}
                </p>
              </div>
              <div className="mt-auto flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
                <Link
                  to={`/posts/${post._id}`}
                  className="text-sm bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

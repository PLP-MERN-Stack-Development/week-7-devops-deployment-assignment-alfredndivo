import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { postService, authService } from '../services/api';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const user = authService.getCurrentUser();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await postService.getPost(id);
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleCommentSubmit = async (e) => {
  e.preventDefault();

  const newComment = {
    content: comment,
    createdAt: new Date().toISOString(),
    user: { name: user.name || 'You' },
    tempId: Date.now(), // Used for temp tracking
  };

  // Optimistically update UI
  const updatedComments = [...post.comments, newComment];
  setPost({ ...post, comments: updatedComments });
  setComment('');

  try {
    await postService.addComment(post._id, { content: comment });
    // Optionally refetch post to sync real data
    // const refreshed = await postService.getPost(post._id);
    // setPost(refreshed);
  } catch (error) {
    console.error('Error posting comment:', error.message);
    // Remove the optimistically added comment if failed
    setPost((prev) => ({
      ...prev,
      comments: prev.comments.filter(c => c.tempId !== newComment.tempId)
    }));
    alert('Failed to add comment.');
  }
};


  if (loading) {
    return <div className="text-center py-10 text-emerald-600 font-medium">Loading post...</div>;
  }

  if (!post) {
    return <div className="text-center py-10 text-red-600 font-semibold">Post not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl shadow-md">
      <h1 className="text-4xl font-bold text-emerald-800 mb-2">{post.title}</h1>
      <p className="text-sm text-gray-600 mb-4">
        By <span className="font-semibold">{post.author?.name || 'Unknown'}</span> •{' '}
        {new Date(post.createdAt).toLocaleDateString()}
      </p>

      {post.featuredImage && (
        <div className="w-full mb-6">
            <img
              src={`http://localhost:5000${post.featuredImage}`}
              alt={post.title}
                    className="w-full max-h-[400px] object-cover rounded-lg shadow-md border"
                   style={{
                           aspectRatio: '16/9',
                          objectFit: 'cover',
                          width: '100%',
                          height: 'auto',
                          maxHeight: '400px',
                          borderRadius: '12px'
                    }}
            />
          </div>
      )}

      <div className="text-lg text-gray-800 leading-relaxed mb-6 whitespace-pre-line">
        {post.content}
      </div>

      {post.tags?.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700">Tags:</h3>
          <div className="flex gap-2 mt-2 flex-wrap">
            {post.tags.map((tag, idx) => (
              <span key={idx} className="bg-emerald-200 text-emerald-800 text-xs px-2 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <hr className="my-6 border-emerald-300" />

      <h2 className="text-2xl font-semibold text-emerald-700 mb-4">Comments</h2>
      <div className="space-y-4 mb-6">
        {post.comments.length === 0 ? (
          <p className="text-gray-600 italic">No comments yet. Be the first!</p>
        ) : (
          post.comments.map((comment, idx) => (
            <div key={idx} className="bg-white border border-emerald-200 p-3 rounded-lg shadow-sm">
              <p className="text-gray-800">{comment.content}</p>
              <p className="text-sm text-gray-500 mt-1">
                By <span className="font-medium">{comment.user?.name || 'User'}</span> on{' '}
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>

      {user ? (
        <form onSubmit={handleCommentSubmit} className="space-y-3">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your comment..."
            className="w-full p-3 border border-emerald-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400"
            required
          />
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-lg"
          >
            Post Comment
          </button>
        </form>
      ) : (
        <p className="text-gray-700 italic">Log in to post a comment.</p>
      )}
    </div>
  );
};

export default PostDetail;

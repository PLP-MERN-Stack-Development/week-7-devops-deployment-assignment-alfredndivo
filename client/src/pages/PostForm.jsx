import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { postService, categoryService } from '../services/api';

const PostForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting }
  } = useForm();

  const [categories, setCategories] = React.useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const cats = await categoryService.getAllCategories();
        setCategories(cats);

        if (isEdit) {
          const post = await postService.getPost(id);
          reset({
            title: post.title,
            content: post.content,
            category: post.category,
            tags: post.tags.join(', '),
          });
        }
      } catch (err) {
        console.error('Load error:', err);
      }
    };

    load();
  }, [id, isEdit, reset]);

  const onSubmit = async (data) => {
    const payload = new FormData();
    payload.append('title', data.title);
    payload.append('content', data.content);
    payload.append('category', data.category);
    payload.append('tags', JSON.stringify(data.tags.split(',').map(tag => tag.trim())));
    if (data.featuredImage?.[0]) {
      payload.append('featuredImage', data.featuredImage[0]);
    }

    try {
      if (isEdit) {
        await postService.updatePost(id, payload);
      } else {
        await postService.createPost(payload);
      }
      navigate('/');
    } catch (err) {
      console.error('Submit error:', err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl shadow-xl border border-emerald-200">
      <h2 className="text-3xl font-bold text-emerald-800 mb-6 text-center">
        {isEdit ? 'Edit Post' : 'Create a New Post'}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-5">
        <div>
          <label className="block text-emerald-700 font-semibold">Title</label>
          <input
            {...register('title', { required: 'Title is required' })}
            className="w-full p-3 border border-emerald-200 rounded-lg bg-white"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-emerald-700 font-semibold">Content</label>
          <textarea
            {...register('content', { required: 'Content is required' })}
            className="w-full p-3 border border-emerald-200 rounded-lg h-40 bg-white"
          />
          {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
        </div>

        <div>
          <label className="block text-emerald-700 font-semibold">Category</label>
          <select
            {...register('category', { required: 'Category is required' })}
            className="w-full p-3 border border-emerald-200 rounded-lg bg-white"
          >
            <option value="">-- Select a category --</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>

        <div>
          <label className="block text-emerald-700 font-semibold">Tags</label>
          <input
            {...register('tags')}
            placeholder="e.g. react, mern, webdev"
            className="w-full p-3 border border-emerald-200 rounded-lg bg-white"
          />
        </div>

        <div>
          <label className="block text-emerald-700 font-semibold">Featured Image</label>
          <input
            type="file"
            accept="image/*"
            {...register('featuredImage')}
            className="w-full p-3 border border-emerald-200 rounded-lg bg-white"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition"
        >
          {isSubmitting ? 'Saving...' : isEdit ? 'Update Post' : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

export default PostForm;

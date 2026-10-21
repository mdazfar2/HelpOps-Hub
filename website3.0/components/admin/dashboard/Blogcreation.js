"use client";
import React, { useState, useEffect, useContext } from 'react';
import "@stylesheets/admin.css";
import { Context } from "@context/store";

const Popup = ({ msg, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-md text-center">
        <div className="flex items-center justify-center mb-2">
          <div className="w-6 h-6 rounded-full border-2 border-green-500 flex items-center justify-center">
            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <p>{msg}</p>
        <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Close</button>
      </div>
    </div>
  );
};

const BlogCreation = () => {
  const [formData, setFormData] = useState({
    title: '',
    image: null,
    type: '',
    date: new Date(),
    length: '',
    description: '',
    mustRead: false,
    editorsPick: false,
    authorName: '',
    authorId: '',
  });
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { finalUser = {} } = useContext(Context);

  useEffect(() => {
    if (!finalUser.email) {
      setFormData((prevData) => ({
        ...prevData,
        authorName: finalUser.name || "HelpOps Admin",
      }));
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const response = await fetch('/api/getuserbyemail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: finalUser.email }),
        });

        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            setFormData((prevData) => ({
              ...prevData,
              authorId: result.msg._id,
            }));
          } else {
            setError("Failed to fetch user info.");
          }
        } else {
          setError("Failed to fetch user info.");
        }
      } catch (error) {
        console.error("Error fetching blog author:", error);
        setError("An error occurred while fetching user info.");
      }
    };

    fetchUserInfo();
  }, [finalUser.email, finalUser.name]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : (name === 'image' ? files[0] : value),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };

    try {
      let base64Image = "";
      if (formData.image) {
        base64Image = await convertToBase64(formData.image);
      }

      const blogData = {
        ...formData,
        image: base64Image,
        authorName: finalUser.name || formData.authorName || "HelpOps Admin",
        date: formData.date.toISOString(),
      };

      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setShowPopup(true);
        setFormData({
          title: '',
          image: null,
          type: '',
          date: new Date(),
          length: '',
          description: '',
          mustRead: false,
          editorsPick: false,
          authorName: finalUser.name || "HelpOps Admin",
          authorId: formData.authorId,
        });
        const imageInput = document.querySelector('input[name="image"]');
        if (imageInput) imageInput.value = "";
      } else {
        setError(result.error || "Failed to create the blog. Please try again.");
      }
    } catch (submitError) {
      console.error("Error creating blog:", submitError);
      setError("An error occurred while creating the blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
      <h2 className="mb-2 text-2xl font-bold text-slate-900">Create a blog post</h2>
      <p className="mb-6 text-sm text-slate-500">Share a new article with the HelpOps Hub community.</p>
      {error && (
        <p role="alert" className="mb-5 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          {error}
        </p>
      )}
      <form id="blog-form" className="space-y-5" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="blog-title" className="mb-2 block text-sm font-medium text-slate-700">Title</label>
          <input
            id="blog-title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="blog-image" className="mb-2 block text-sm font-medium text-slate-700">Cover image</label>
          <input
            id="blog-image"
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-cyan-50 file:px-3 file:py-2 file:font-medium file:text-cyan-800"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="blog-type" className="mb-2 block text-sm font-medium text-slate-700">Category</label>
          <input
            id="blog-type"
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="blog-length" className="mb-2 block text-sm font-medium text-slate-700">Reading time</label>
          <input
            id="blog-length"
            type="text"
            name="length"
            value={formData.length}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="blog-description" className="mb-2 block text-sm font-medium text-slate-700">Description</label>
          <textarea
            id="blog-description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={6}
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
            required
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            name="mustRead"
            checked={formData.mustRead}
            onChange={handleChange}
            className="h-4 w-4 rounded border-slate-300 text-cyan-700 focus:ring-cyan-600"
          />
          Mark as a must-read
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            name="editorsPick"
            checked={formData.editorsPick}
            onChange={handleChange}
            className="h-4 w-4 rounded border-slate-300 text-cyan-700 focus:ring-cyan-600"
          />
          Mark as editor&apos;s pick
        </label>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-cyan-800 px-4 py-3 font-semibold text-white transition hover:bg-cyan-900 disabled:cursor-wait disabled:opacity-60"
        >
          {loading ? "Creating post..." : "Create blog post"}
        </button>
      </form>
      {showPopup && <Popup msg="Blog created successfully!" onClose={closePopup} />}
    </div>
  );
};

export default BlogCreation;

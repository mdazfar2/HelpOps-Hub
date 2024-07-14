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
  const [blur, setBlur] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(false);
  const { finalUser,isLogin } = useContext(Context);

  useEffect(() => {
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
        setError("An error occurred while fetching user info.");
      }
    };

    fetchUserInfo();
  }, [finalUser.email]);

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
    setBlur(true);
    setDisableSubmit(true);

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
        authorName: finalUser.name,
        date: formData.date.toISOString(),
      };

      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });

      if (response.ok) {
        setShowPopup(true);
        setError("Blog created successfully!");
        setTimeout(() => {
          document.getElementById("blog-form").reset();
          setFormData({
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
          setError("");
          setShowPopup(false);
        }, 3000);
      } else {
        setError("Failed to create the blog. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }

    setTimeout(() => {
      setDisableSubmit(false);
      setLoading(false);
      setBlur(false);
    }, 5000);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Create New Blog</h2>
      {error && <Popup msg={error} error={`${error === "Blog created successfully!" ? "green1" : "red1"}`} />}
      <form id="blog-form" className={`${blur ? "blurclass" : ""}`} onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Type</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Length</label>
          <input
            type="text"
            name="length"
            value={formData.length}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            name="mustRead"
            checked={formData.mustRead}
            onChange={handleChange}
            className="mr-2"
          />
          <label>Must Read</label>
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            name="editorsPick"
            checked={formData.editorsPick}
            onChange={handleChange}
            className="mr-2"
          />
          <label>Editor's Pick</label>
        </div>
        <button type="submit" disabled={disableSubmit} className="w-full p-2 bg-blue-500 text-white rounded">
          Create Blog
        </button>
        {showPopup && <Popup msg="Blog created successfully!" onClose={closePopup} />}
      </form>
    </div>
  );
};

export default BlogCreation;

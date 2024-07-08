"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function BlogPost() {
  const [blog, setBlog] = useState({});
  const [error, setError] = useState("");
  const pathname = usePathname();
  const id = pathname.split("/blogs/")[1];
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blog/${id}`); 
        if (response.ok) {
          const data = await response.json();
          setBlog(data); 
        } else {
          setError("Failed to fetch blog.");
        }
      } catch (error) {
        setError("An error occurred while fetching the blog.");
      }
    };

    fetchBlog(); 
  });

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div className="mt-40">
      <div className="max-w-4xl mx-auto my-10 p-5 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-5">{blog.title}</h1>
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-64 object-cover mb-5 rounded-lg"
        />
        <div className="flex items-center mb-5">
          <div className="text-lg font-semibold mr-1">{blog.authorName}</div>{"-"}
          <div className="text-gray-500 ml-1">{blog.authorTitle}</div>
          <div className="ml-auto text-gray-500">
            {new Date(blog.date).toLocaleDateString()}
          </div>
        </div>
        <div className="text-gray-600 mb-5">{blog.description}</div>
        <div className="flex items-center mb-5">
          <div className="text-sm font-medium bg-blue-100 text-blue-500 px-2 py-1 rounded">
            {blog.type}
          </div>
          <div className="ml-3 text-sm text-gray-500">{blog.length}</div>
          {blog.mustRead && (
            <div className="ml-3 text-sm text-red-500 font-semibold">
              Must Read
            </div>
          )}
          {blog.editorsPick && (
            <div className="ml-3 text-sm text-green-500 font-semibold">
              Editor's Pick
            </div>
          )}
          <div className="ml-auto text-sm text-gray-500">
            {blog.likes} Likes
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPost;

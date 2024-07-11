"use client";
import { useContext } from "react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ReactionTab from "@components/blogpage/ReactionTab";
import { Context } from "@context/store";

function BlogPost() {
  const [blog, setBlog] = useState({});
  const [error, setError] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const pathname = usePathname();
  const id = pathname.split("/blogs/")[1];
  const countRec1 = 13;
  const countRec2 = 23;
  const countRec3 = 12;
  const { finalUser ,isLogin } = useContext(Context);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blog/${id}`);
        if (response.ok) {
          const data = await response.json();
          setBlog(data);
          setComments(data.comments || []);
        } else {
          setError("Failed to fetch blog.");
        }
      } catch (error) {
        setError("An error occurred while fetching the blog.");
      }
    };

    fetchBlog();
  }, [id]);

  const handleAddComment = async () => {
    if(!isLogin){
      return 
    }
    if (newComment.trim() !== "") {
      const newCommentObject = {
        user: {
          name: finalUser.name || "Unknown",
          image:
            finalUser.image1 ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81iX4Mo49Z3oCPSx-GtgiMAkdDop2uVmVvw&s",
        },
        comment: newComment,
      };

      const updatedComments = [...comments, newCommentObject];
      setComments(updatedComments);
      setNewComment("");

      try {
        const response = await fetch(`/api/blog/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCommentObject),
        });

        if (response.ok) {
          const updatedBlog = await response.json();
          setComments(updatedBlog.comments);
        } else {
          setError("Failed to update comments.");
        }
      } catch (error) {
        setError("An error occurred while updating the comments.");
      }
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="mt-48 flex">
      <div className="w-[10%]">
        <div className="fixed left-24 top-60">
          <ReactionTab />
        </div>
      </div>

      <div className="w-[55%] bg-white shadow-lg rounded-lg">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-96 object-cover mb-5 rounded-lg"
        />
        <div className="px-10">
          <div className="flex items-center mb-5">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81iX4Mo49Z3oCPSx-GtgiMAkdDop2uVmVvw&s"
              alt={blog.authorName}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <div className="text-base font-bold">{blog.authorName}</div>
              <div className="text-gray-500 text-xs">
                Posted on{" "}
                {new Date(blog.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>
          <div className="flex gap-5 py-2 mb-5">
            <div className="flex">
              <img src="/icon1.png" width={25} height={25} />
              {countRec1}
            </div>
            <div className="flex">
              <img src="/icon2.png" width={25} height={25} />
              {countRec2}
            </div>
            <div className="flex">
              <img src="/icon3.png" width={25} height={25} />
              {countRec3}
            </div>
          </div>
          <h1 className="text-4xl font-extrabold mb-5">{blog.title}</h1>
          <div className="text-gray-600 mb-5">{blog.introduction}</div>
          <div className="mb-5">
            {blog.sections?.map((section, index) => (
              <div key={index} className="mb-5">
                <h2 className="text-2xl font-semibold mb-3">
                  {section.heading}
                </h2>
                <p className="text-gray-600 mb-3">{section.content}</p>
                {section.subsections?.map((sub, subIndex) => (
                  <div key={subIndex} className="ml-5 mb-3">
                    <h3 className="text-xl font-semibold mb-2">
                      {sub.subheading}
                    </h3>
                    <p className="text-gray-600">{sub.content}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
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
          </div>
          <div className="pb-10">{blog.description}</div>
          <hr className="w-full h-1 pb-5" />
          <div className="text-2xl font-bold pb-5">Top Comments</div>
          <div className="flex items-center justify-center mb-4">
            <img
              src={
                finalUser.image1?.length > 0
                  ? finalUser.image1
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81iX4Mo49Z3oCPSx-GtgiMAkdDop2uVmVvw&s"
              }
              alt={blog.authorName}
              className="w-10 h-10 rounded-full mr-3"
            />
            <input
              type="text"
              className="w-full p-4 border-[1px] border-gray-300 rounded-lg"
              placeholder="Add to the Discussion"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleAddComment();
              }}
            />
          </div>
          <div className="border-gray-300 rounded-xl mb-10 w-full h-[500px] p-5 overflow-y-auto">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div
                  key={comment._id || index}
                  className="bg-white flex gap-4 p-4 mb-4 rounded-lg shadow"
                >
                  <img
                    src={comment.user.image}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <div className="font-medium text-sm mb-1">
                      {comment.user.name}
                    </div>
                    <p>{comment.comment}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No comments yet.</p>
            )}
          </div>
        </div>
      </div>

      <div className="w-[25%] ml-5">
        <div className="h-[400px] bg-white rounded-xl overflow-hidden">
          {/* <img src="/banner.png" alt="" /> */}
          <div className="w-full bg-[#000000] h-10"></div>
          <div className="flex px-5">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR81iX4Mo49Z3oCPSx-GtgiMAkdDop2uVmVvw&s"
              alt={blog.authorName}
              className="w-12 h-12 rounded-full mr-3 relative -top-3"
            />
            <div className="py-1">
              <div className="text-xl font-bold">{blog.authorName}</div>
            </div>
          </div>
          <div className="w-full px-4">
            <button className="py-2 px-5 w-full bg-[#5271ff] rounded-xl text-bold text-white">
              Follow
            </button>
          </div>
          <div className="m-5 h-52 bg-gray-100"></div>
        </div>
        <div className="my-5 bg-white rounded-xl p-5">
          <div className="text-xl font-bold flex">
            More From{" "}
            <span className="text-blue-500 ml-1">{blog.authorName}</span>
          </div>
          <div className="my-5 h-16 bg-gray-100 rounded-xl p-5"></div>
          <div className="my-5 h-16 bg-gray-100 rounded-xl p-5"></div>
          <div className="my-5 h-16 bg-gray-100 rounded-xl p-5"></div>
        </div>
      </div>
    </div>
  );
}

export default BlogPost;

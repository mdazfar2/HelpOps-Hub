import React, { useEffect, useState } from "react";
import "@stylesheets/blogspage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faPlus, faHands } from "@fortawesome/free-solid-svg-icons";
import {
  faComment as regularComment,
  faBookmark as regularBookmark,
} from "@fortawesome/free-regular-svg-icons";
import { useRouter } from "next/navigation";

function BlogPage({ theme }) {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("");
  const [editorsChoiceCount, setEditorsChoiceCount] = useState(3);
  const [sortBy, setSortBy] = useState("date");
  const [filter, setFilter] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blog", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          const sortedBlogs = data.data.sort((a, b) => {
            const totalReactionsA = a.reactionList.reduce(
              (sum, reaction) => sum + reaction.count,
              0
            );
            const totalReactionsB = b.reactionList.reduce(
              (sum, reaction) => sum + reaction.count,
              0
            );

            return sortBy === "reactions"
              ? totalReactionsB - totalReactionsA
              : new Date(b.date) - new Date(a.date);
          });
          setBlogs(sortedBlogs);
        } else {
          setError("Failed to fetch blogs.");
        }
      } catch (err) {
        setError("An error occurred while fetching blogs.");
      } finally {
        setTimeout(() => {
          setLoading(false);
          setShowContent(true);
        }, 1500);
      }
    };

    fetchBlogs();
  }, [sortBy]);

  const formatDate = (dateString) => {
    const options = { month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setNewsletterStatus("submitting");

    try {
      const subscribeResult = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const subscribeData = await subscribeResult.json();
      console.log("subscribeData:", subscribeData);

      if (subscribeResult.ok) {
        if (subscribeData.success) {
          setNewsletterStatus("success");
          setEmail("");
        } else if (subscribeData.message === "User already subscribed") {
          setNewsletterStatus("already_subscribed");
        } else {
          setNewsletterStatus("error");
        }
      } else {
        setNewsletterStatus("error");
      }
    } catch (err) {
      console.error("Error:", err);
      setNewsletterStatus("error");
    }
  };

  useEffect(() => {
    if (
      newsletterStatus === "success" ||
      newsletterStatus === "already_subscribed" ||
      newsletterStatus === "error"
    ) {
      const timer = setTimeout(() => {
        setNewsletterStatus("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [newsletterStatus]);

  const handleImageError = (e) => {
    const src = e.target.src;
    e.target.onerror = null;
    e.target.src = src;
  };

  const mustReadBlogs = blogs.filter((blog) => blog.mustRead);
  const editorsPickBlogs = blogs.filter((blog) => blog.editorsPick);
  const recentBlogs = blogs.filter(
    (blog) => !blog.mustRead && !blog.editorsPick
  );

  const finalEditorsPick = [
    ...editorsPickBlogs,
    ...recentBlogs.slice(
      0,
      Math.max(0, editorsChoiceCount - editorsPickBlogs.length)
    ),
  ].slice(0, editorsChoiceCount);

  const finalMustRead = [
    ...mustReadBlogs,
    ...recentBlogs.slice(0, Math.max(0, 2 - mustReadBlogs.length)),
  ].slice(0, 2);

  const topBlogs = blogs
    .map((blog) => ({
      ...blog,
      totalReactions: blog.reactionList.reduce(
        (sum, reaction) => sum + reaction.count,
        0
      ),
    }))
    .sort((a, b) => b.totalReactions - a.totalReactions)
    .slice(0, 4);

  const renderBlogDescription = (description) => {
    const words = description.split(" ");
    const limitedDescription = words.slice(0, 10).join(" ");

    return words.length > 10 ? (
      <React.Fragment>{limitedDescription}.... Read more</React.Fragment>
    ) : (
      limitedDescription
    );
  };

  const navigateToBlogDetails = (blogId) => {
    router.push(`/blogs/${blogId}`);
  };

  const authorBlogCounts = {};
  blogs.forEach((blog) => {
    const { authorName, authorCaption, authorImage } = blog;
    if (!authorBlogCounts[authorName]) {
      authorBlogCounts[authorName] = {
        count: 0,
        caption: authorCaption,
        image: authorImage,
      };
    }
    authorBlogCounts[authorName].count += 1;
  });

  const topAuthors = Object.entries(authorBlogCounts)
    .sort(([, a], [, b]) => b.count - a.count)
    .slice(0, 3)
    .map(([authorName, { caption, image }]) => ({
      authorName,
      authorCaption: caption,
      authorImage: image,
    }));

  const handleTopPostsClick = () => {
    setSortBy("reactions");
    setFilter("topPosts");
  };

  const handleMustReadClick = () => {
    setFilter("mustRead");
  };

  const handleRecentBlogsClick = () => {
    setFilter("recentBlogs");
    setSortBy("date"); // Ensure recent blogs are sorted by date
  };

  return (
    <div className="pt-24">
    <div className="w-full bg-[#6089a4] h-9 mb-20 py-2 text-center text-white font-medium">Ensuring You Never Get Stuck in Devops Again !!</div>
    <div className="flex gap-32 px-40">
      <div
        className={`${
          theme ? "bg-[#F4F4F4]" : "bg-[#1e1d1d] "
        } transition-colors duration-500 min-h-screen w-[70%]`}
      >
        <div className="text-sm flex gap-5 mb-6 cursor-pointer items-center text-gray-500 font-semibold">
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          <div
            className={`${filter === "recentBlogs" ? "underline text-gray-900 underline-offset-[30px]" : ""}`}
            onClick={handleRecentBlogsClick}
          >
            Recent Blogs
          </div>
          <div
            onClick={handleTopPostsClick}
            className={`${filter === "topPosts" ? "underline text-gray-900 underline-offset-[30px]" : ""}`}
          >
            Top Posts
          </div>
          <div>Book Marked</div>
          <div
            className={`${filter === "mustRead" ? "underline text-gray-900 underline-offset-[30px]" : ""}`}
            onClick={handleMustReadClick}
          >
            Must Read
          </div>
        </div>
        <hr className="w-full border-[1px] border-gray-200" />
        <div className="mt-10 w-full">
          {filter === "mustRead"
            ? mustReadBlogs.map((blog, index) => (
                <div
                  className="cursor-pointer"
                  key={index}
                  onClick={() => navigateToBlogDetails(blog._id)}
                >
                  <div className="flex items-center mb-2">
                    <img
                      src={blog.authorImage}
                      onError={handleImageError}
                      className="w-6 h-6 rounded-full mr-3"
                    />
                    <div className="text-sm">{blog.authorName}</div>
                  </div>
                  <div className="flex gap-10 items-center">
                    <div>
                      <div className="text-2xl mb-2 font-extrabold">
                        {blog.title}
                      </div>
                      <div className="font-medium text-gray-600">
                        {renderBlogDescription(blog.description)}
                      </div>
                      <div className="flex text-sm text-gray-500 justify-between items-center">
                        <div className="flex gap-5 items-center">
                          <div className="my-2 font-medium ">
                            {formatDate(blog.date)}
                          </div>
                          <div>
                            <FontAwesomeIcon icon={faHands} className="mr-2" />
                            {blog.reactionList.reduce(
                              (sum, reaction) => sum + reaction.count,
                              0
                            )}
                          </div>
                          <div>
                            <FontAwesomeIcon
                              icon={faComment}
                              className="mr-2"
                            />
                            {blog.comments.length}
                          </div>
                        </div>
                        <div>
                          <FontAwesomeIcon
                            icon={regularBookmark}
                            className="mr-2"
                          />
                          {blog.bookmarks}
                        </div>
                      </div>
                    </div>
                    <img
                      src={blog.image}
                      onError={handleImageError}
                      className="h-[150px] w-[200px] bg-white object-cover object-center"
                    />
                  </div>
                  <hr className="w-full mt-5 mb-5 border-gray-200" />
                </div>
              ))
            : blogs.map((blog, index) => (
                <div
                  className="cursor-pointer"
                  key={index}
                  onClick={() => navigateToBlogDetails(blog._id)}
                >
                  <div className="flex items-center mb-2">
                    <img
                      src={blog.authorImage}
                      onError={handleImageError}
                      className="w-6 h-6 rounded-full mr-3"
                    />
                    <div className="text-sm">{blog.authorName}</div>
                  </div>
                  <div className="flex gap-10 items-center">
                    <div>
                      <div className="text-2xl mb-2 font-extrabold">
                        {blog.title}
                      </div>
                      <div className="font-medium text-gray-600">
                        {renderBlogDescription(blog.description)}
                      </div>
                      <div className="flex text-sm text-gray-500 justify-between items-center">
                        <div className="flex gap-5 items-center">
                          <div className="my-2 font-medium ">
                            {formatDate(blog.date)}
                          </div>
                          <div>
                            <FontAwesomeIcon icon={faHands} className="mr-2" />
                            {blog.reactionList.reduce(
                              (sum, reaction) => sum + reaction.count,
                              0
                            )}
                          </div>
                          <div>
                            <FontAwesomeIcon
                              icon={faComment}
                              className="mr-2"
                            />
                            {blog.comments.length}
                          </div>
                        </div>
                        <div>
                          <FontAwesomeIcon
                            icon={regularBookmark}
                            className="mr-2"
                          />
                          {blog.bookmarks}
                        </div>
                      </div>
                    </div>
                    <img
                      src={blog.image}
                      onError={handleImageError}
                      className="h-[150px] w-[200px] bg-white object-cover object-center"
                    />
                  </div>
                  <hr className="w-full mt-5 mb-5 border-gray-200" />
                </div>
              ))}
        </div>
      </div>
      <div className="flex flex-col gap-5 border-l-[1px] w-[30%] pl-10 border-gray-300">
        <div className="text-sm font-semibold text-black">Editor's Choice</div>
        <div>
          {finalEditorsPick.map((blog, index) => (
            <div
              className="cursor-pointer mb-6"
              key={index}
              onClick={() => navigateToBlogDetails(blog._id)}
            >
              <div className="flex items-center mb-2">
                <img
                  src={blog.authorImage}
                  onError={handleImageError}
                  className="w-5 h-5 rounded-full mr-3"
                />
                <div className="text-xs font-bold">{blog.authorName}</div>
              </div>
              <div className="text-sm font-extrabold">{blog.title}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-5">
          <div className="text-sm font-semibold text-black">
            Key Influencers
          </div>
          {topAuthors.map((author, index) => (
            <div key={index}>
              <div className="flex gap-2 items-center mb-2">
                <img
                  src={author.authorImage}
                  onError={handleImageError}
                  className="w-5 h-5 rounded-full mr-3"
                />
                <div>
                  <div className="text-xs font-bold">{author.authorName}</div>
                  <div className="text-xs text-gray-500">
                    {author.authorCaption}
                  </div>
                </div>
                <div>
                  <button className="px-3 py-2 bg-[#6089a4] rounded-3xl font-light text-sm text-white">
                    Follow
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}

export default BlogPage;

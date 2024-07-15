import React, { useEffect, useState, useRef, useContext } from "react";
import "@stylesheets/blogspage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faPlus,
  faHands,
  faBars,
  faTimes,
  faBookmark as solidBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark as regularBookmark } from "@fortawesome/free-regular-svg-icons";
import { useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function BlogPage({ theme,finalUser,searchedBlog }) {
  const [blogs, setBlogs] = useState([]);
  const [authorDetails, setAuthorDetails] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [editorsChoiceCount, setEditorsChoiceCount] = useState(3);
  const [sortBy, setSortBy] = useState("date");
  const [filter, setFilter] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
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
          fetchAuthorDetails(sortedBlogs);
        } else {
          setError("Failed to fetch blogs.");
        }
      } catch (err) {
        setError("An error occurred while fetching blogs.");
      }
    };
    const fetchAuthorDetails = async (blogs) => {
      const authorIds = [...new Set(blogs.map((blog) => blog.authorId))];
      const authorData = {};

      for (const authorId of authorIds) {
        try {
          const response = await fetch("/api/getuser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: authorId }),
          });

          if (response.ok) {
            const result = await response.json();
            authorData[authorId] = result.msg;
          }
        } catch (err) {
          console.error(
            `Failed to fetch author data for authorId ${authorId}`,
            err
          );
        } finally {
          setLoading(false);
          setShowContent(true);
        }
      }
      setAuthorDetails(authorData);
    };

    fetchBlogs();
  }, [sortBy]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeSidebar();
      }
    };

    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  const formatDate = (dateString) => {
    const options = { month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

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
    const hasMore = words.length > 10;

    // Check if description contains HTML tags
    const containsHTML = /<[a-z][\s\S]*>/i.test(description);

    return containsHTML ? (
      <div
        dangerouslySetInnerHTML={{
          __html: limitedDescription + (hasMore ? ".... Read more" : ""),
        }}
      />
    ) : (
      <React.Fragment>
        {limitedDescription}
        {hasMore && ".... Read more"}
      </React.Fragment>
    );
  };

  const navigateToBlogDetails = (blogId) => {
    router.push(`/blogs/${blogId}`);
  };

  const authorBlogCounts = {};
  blogs.forEach((blog) => {
    const { authorId } = blog;
    if (!authorBlogCounts[authorId]) {
      authorBlogCounts[authorId] = { count: 0, authorId };
    }
    authorBlogCounts[authorId].count += 1;
  });

  const topAuthors = Object.entries(authorBlogCounts)
    .sort(([, a], [, b]) => b.count - a.count)
    .slice(0, 3)
    .map(([authorId, { count }]) => {
      const author = authorDetails[authorId];
      return {
        authorName: author?.name || "Unknown",
        authorCaption: author?.caption || "",
        authorImage: author?.image1 || "",
        count,
      };
    });
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
  const handleBookmarkedClick = () => {
    setFilter("bookmarked");
  };
  const filteredBlogs = () => {
    let filtered = blogs;
    if (filter === "mustRead") {
      filtered = mustReadBlogs;
    } else if (filter === "bookmarked") {
      const reactionIds = finalUser && finalUser.reactions ? Object.keys(finalUser.reactions) : [];
      filtered = blogs.filter((blog) => reactionIds.includes(blog._id));
    }
    if (searchedBlog) {
      filtered = filtered.filter((blog) =>
        blog.title.toLowerCase().includes(searchedBlog.toLowerCase())
      );
    }

    return filtered;
  };
  return (
    <div
      className={`${
        theme ? "" : "bg-[#1e1d1d] text-white"
      } pt-24 transition-all duration-200`}
    >
      <div
        className={`${
          theme ? "bg-[#6089a4] text-white" : "bg-[#ffffff] text-black"
        } w-full h-9 mb-20 py-2 text-center font-medium max-[425px]:font-[400] max-[425px]:text-[13px] max-[425px]:py-3 transition-all duration-200`}
      >
        Ensuring You Never Get Stuck in Devops Again !!
      </div>
      <div className="flex gap-32 px-40 max-lg:flex-col max-lg:gap-16 max-lg:px-20 max-md:px-10 max-sm:px-5">
        <div className="duration-500 min-h-screen w-full">
          <div
            className={`${
              theme ? "text-gray-500" : "text-gray-300"
            } text-sm flex gap-5 mb-6 cursor-pointer items-center font-semibold max-sm:flex-wrap max-[500px]:text-[12px] max-[500px]:gap-2 transition-all duration-200`}
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            <div
              className={`${
                theme
                  ? filter === "recentBlogs"
                    ? "text-gray-900 underline underline-offset-[30px]"
                    : ""
                  : filter === "recentBlogs"
                  ? "underline text-gray-400 underline-offset-[30px]"
                  : ""
              }`}
              onClick={handleRecentBlogsClick}
            >
              Recent Blogs
            </div>
            <div
              onClick={handleTopPostsClick}
              className={`${
                theme
                  ? filter === "topPosts"
                    ? "text-gray-900 underline underline-offset-[30px]"
                    : ""
                  : filter === "topPosts"
                  ? "underline text-gray-400 underline-offset-[30px]"
                  : ""
              }`}
            >
              Top Posts
            </div>
            <div
              className={`${
                theme
                  ? filter === "bookmarked"
                    ? "text-gray-900 underline underline-offset-[30px]"
                    : ""
                  : filter === "bookmarked"
                  ? "underline text-gray-400 underline-offset-[30px]"
                  : ""
              }`}
              onClick={handleBookmarkedClick}
            >
              Book Marked
            </div>
            <div
              className={`${
                theme
                  ? filter === "mustRead"
                    ? "text-gray-900 underline underline-offset-[30px]"
                    : ""
                  : filter === "mustRead"
                  ? "underline text-gray-400 underline-offset-[30px]"
                  : ""
              }`}
              onClick={handleMustReadClick}
            >
              Must Read
            </div>
            <div className="lg:hidden ml-auto" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faBars} />
            </div>
          </div>
          <hr className="w-full border-[1px] border-gray-200" />
          <div className="mt-10 w-full">
            {loading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="mb-10">
                    <div className="flex max-md:flex-col items-end gap-5">
                      <div className="flex flex-col gap-1 w-full">
                        <div className="flex gap-2 w-full h-full ">
                          <Skeleton height={30} width={30} borderRadius={100} />
                          <Skeleton height={30} width={100} />
                        </div>
                        <Skeleton height={30} />
                        <Skeleton height={100} />
                      </div>
                      <div className="max-md:w-full w-1/2">
                        <Skeleton height={150} />
                      </div>
                    </div>
                    <hr className="w-full mt-5 mb-5 border-gray-200" />
                  </div>
                ))
              : filteredBlogs().map((blog, index) => {
                  const author = authorDetails[blog.authorId];
                  if (!author) return null;
                  const isBookmarked = finalUser
                  ? finalUser.reactions && finalUser.reactions.hasOwnProperty(blog._id)
                  : false;
                
                  return (
                    <div
                      className="cursor-pointer"
                      key={index}
                      onClick={() => navigateToBlogDetails(blog._id)}
                    >
                      <div className="flex items-center mb-2">
                        <img
                          src={author.image1}
                          onError={handleImageError}
                          className="w-6 h-6 rounded-full mr-3"
                        />
                        <div className="text-sm">{author.name}</div>
                      </div>
                      <div className="flex gap-10 items-center max-md:flex-col max-md:items-start">
                        <div className="flex-1">
                          <div
                            className="text-2xl mb-2 font-normal max-sm:text-xl"
                            dangerouslySetInnerHTML={{ __html: blog.title }}
                          ></div>
                          <div
                            className={`${
                              theme ? "text-gray-600" : "text-gray-300"
                            } font-medium max-sm:text-sm transition-all duration-200`}
                          >
                            {renderBlogDescription(blog.description)}
                          </div>
                          <div
                            className={`${
                              theme ? "text-gray-500" : "text-gray-300"
                            } flex text-sm justify-between items-center max-sm:flex-wrap max-sm:gap-2 transition-all duration-200`}
                          >
                            <div className="flex gap-5 items-center max-sm:flex-wrap">
                              <div className="my-2 font-medium">
                                {formatDate(blog.date)}
                              </div>
                              <div>
                                <FontAwesomeIcon
                                  icon={faHands}
                                  className="mr-2"
                                />
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
                                icon={
                                  isBookmarked ? solidBookmark : regularBookmark
                                }
                                className="mr-2"
                              />
                            </div>
                          </div>
                        </div>
                        <img
                          src={blog.image}
                          onError={handleImageError}
                          className="h-[150px] w-[200px] bg-white object-cover object-center max-md:w-full max-md:h-[200px]"
                        />
                      </div>
                      <hr className="w-full mt-5 mb-5 border-gray-200" />
                    </div>
                  );
                })}
          </div>
        </div>

        {/* Sidebar for larger screens */}
        <div className="hidden lg:flex flex-col gap-5 border-l-[1px] w-[40%] pl-10 border-gray-300">
          <div
            className={`${
              theme ? "text-black" : "text-gray-300"
            } text-sm font-semibold transition-all duration-200`}
          >
            Editor's Choice
          </div>
          <div>
            {loading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="mb-6">
                    <Skeleton height={20} />
                    <Skeleton count={2} />
                  </div>
                ))
              : finalEditorsPick.map((blog, index) => {
                  const author = authorDetails[blog.authorId];
                  if (!author) return null;

                  return (
                    <div
                      className="cursor-pointer mb-6"
                      key={index}
                      onClick={() => navigateToBlogDetails(blog._id)}
                    >
                      <div className="flex items-center mb-2">
                        <img
                          src={author.image1}
                          onError={handleImageError}
                          className="w-5 h-5 rounded-full mr-3"
                        />
                        <div className="text-xs font-bold">{author.name}</div>
                      </div>
                      <div
                        className="text-sm font-normal"
                        dangerouslySetInnerHTML={{ __html: blog.title }}
                      ></div>
                    </div>
                  );
                })}
          </div>
          <div className="flex flex-col gap-5">
            <div
              className={`${
                theme ? "text-black" : "text-gray-300"
              } text-sm font-semibold`}
            >
              Key Influencers
            </div>
            {loading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="mb-4">
                    <Skeleton height={20} />
                    <Skeleton width={100} />
                  </div>
                ))
              : topAuthors.map((author, index) => (
                  <div key={index}>
                    <div className="flex gap-2 items-center mb-2">
                      <img
                        src={author.authorImage}
                        onError={handleImageError}
                        className="w-5 h-5 rounded-full mr-3"
                      />
                      <div>
                        <div className="text-xs font-bold">
                          {author.authorName}
                        </div>
                        <div
                          className={`${
                            theme ? "text-gray-500" : "text-gray-300"
                          } text-xs`}
                        >
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

        {/* Sidebar for smaller screens */}
        {sidebarOpen && (
          <div
            className={`fixed lg:hidden flex flex-col gap-5 bg-white dark:bg-black h-full w-64 top-0 right-0 z-50 transition-transform duration-200 ${
              sidebarOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between p-4">
              <button
                onClick={toggleSidebar}
                className="text-gray-700 dark:text-gray-300"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="p-4">
              <div className="text-sm font-semibold mb-4">Editor's Choice</div>
              {loading
                ? Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="mb-4">
                      <Skeleton height={20} />
                      <Skeleton count={2} />
                    </div>
                  ))
                : finalEditorsPick.map((blog, index) => {
                    const author = authorDetails[blog.authorId];
                    if (!author) return null;

                    return (
                      <div
                        className="cursor-pointer mb-6"
                        key={index}
                        onClick={() => navigateToBlogDetails(blog._id)}
                      >
                        <div className="flex items-center mb-2">
                          <img
                            src={author.image1}
                            onError={handleImageError}
                            className="w-5 h-5 rounded-full mr-3"
                          />
                          <div className="text-xs font-bold">{author.name}</div>
                        </div>
                        <div
                          className="text-sm font-normal"
                          dangerouslySetInnerHTML={{ __html: blog.title }}
                        ></div>
                      </div>
                    );
                  })}
            </div>
            <div className="p-4">
              <div className="text-sm font-semibold mb-4">Key Influencers</div>
              {loading
                ? Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="mb-4">
                      <Skeleton height={20} />
                      <Skeleton width={100} />
                    </div>
                  ))
                : topAuthors.map((author, index) => (
                    <div key={index}>
                      <div className="flex gap-2 items-center mb-2">
                        <img
                          src={author.authorImage}
                          onError={handleImageError}
                          className="w-5 h-5 rounded-full mr-3"
                        />
                        <div>
                          <div className="text-xs font-bold">
                            {author.authorName}
                          </div>
                          <div
                            className={`${
                              theme ? "text-gray-500" : "text-gray-300"
                            } text-xs`}
                          >
                            {author.authorCaption}
                          </div>
                        </div>
                        <div>
                          <button className="px-3 py-2 bg-[#6089a4] text-white rounded-3xl font-light text-sm">
                            Follow
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogPage;

"use client";
import React, { useEffect, useState } from "react";
import "@stylesheets/blogspage.css";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";

function BlogPage({ theme }) {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(4); // Initial display count
  const [showContent, setShowContent] = useState(false); // State to manage when to show content
  const [email, setEmail] = useState(""); // State for newsletter email
  const [newsletterStatus, setNewsletterStatus] = useState(""); // State for newsletter subscription status
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
          // Sort blogs by date in descending order
          const sortedBlogs = data.data.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          setBlogs(sortedBlogs);
        } else {
          setError("Failed to fetch blogs.");
        }
      } catch (err) {
        setError("An error occurred while fetching blogs.");
      } finally {
        // Delay showing the content by 0.5 seconds
        setTimeout(() => {
          setLoading(false);
          setShowContent(true);
        }, 1500);
      }
    };

    fetchBlogs();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleLoadMore = () => {
    setDisplayCount((prevCount) => prevCount + 2);
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
      console.log("subscribeData:", subscribeData); // Debugging statement

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

  // Clear status after 2 seconds
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

  // Handle image loading errors
  const handleImageError = (e) => {
    const src = e.target.src;
    e.target.onerror = null; // Prevent infinite loop if error happens again
    e.target.src = src; // Retry fetching the image
  };

  // Process blogs for different sections
  const mustReadBlogs = blogs.filter((blog) => blog.mustRead);
  const editorsPickBlogs = blogs.filter((blog) => blog.editorsPick);

  const recentBlogs = blogs.filter(
    (blog) => !blog.mustRead && !blog.editorsPick
  );

  const finalEditorsPick = [
    ...editorsPickBlogs,
    ...recentBlogs.slice(0, Math.max(0, 3 - editorsPickBlogs.length)),
  ].slice(0, 3);

  const finalMustRead = [
    ...mustReadBlogs,
    ...recentBlogs.slice(0, Math.max(0, 2 - mustReadBlogs.length)),
  ].slice(0, 2);

  // Get the top 4 blogs based on likes
  const topBlogs = blogs.sort((a, b) => b.likes - a.likes).slice(0, 4);

  // Render 50 words
  const renderBlogDescription = (description) => {
    const words = description.split(" ");
    const limitedDescription = words.slice(0, 50).join(" ");

    if (words.length > 50) {
      return (
        <React.Fragment>
          {limitedDescription}....{" "}
            Read more
        </React.Fragment>
      );
    } else {
      return limitedDescription;
    }
  };
  const navigateToBlogDetails = (blogId) => {
    router.push(`/blogs/${blogId}`);
  };
  return (
    <div className={`${theme?"bg-[#F4F4F4]":"bg-[#1e1d1d] "} transition-colors duration-500 min-h-screen pt-40 px-24`}>
      <div className={`${theme?"text-black":"text-white "} font-medium text-center text-[30px] `}>
        DevOps Blog Life
      </div>
      <div className="flex gap-20 mt-8 justify-center">
        <div className="w-[70%] flex flex-col">
          {loading || blogs.length === 0 ? (
            <div className={`${theme?"bg-[#deeff8]":"bg-[#111111] "} w-full p-8 rounded-xl border-2 border-black border-dashed shadow-[2px_2px_5px_2px_#00000040]`}>
              <div className="skeleton h-[500px]"></div>
              <div className="mt-4 bg-white p-4 border-2 border-black rounded-xl">
                <div className="recent_blog_details_container">
                  <div className="skeleton w-[60%] h-4 mb-[10px]"></div>
                  <div className="skeleton w-[80%] h-4 mb-[10px]"></div>
                  <div className="skeleton w-[80%] h-4 mb-[10px]"></div>
                </div>
              </div>
            </div>
          ) : (
            <React.Fragment>
              {blogs.length > 0 && blogs[0] && (
                <div className={`${theme?"bg-[#deeff8]":"bg-[#111111] "} w-full p-8 rounded-xl border-2 border-black border-dashed shadow-[2px_2px_5px_2px_#00000040] cursor-pointer`}  onClick={() => navigateToBlogDetails(blogs[0]._id)}>
                  <img
                    src={blogs[0].image}
                    alt="Blog Image"
                    onError={handleImageError}
                    className="bg-white h-[500px]  hover:scale-[0.99] hover:transition-all w-full rounded-xl"
                  />
                  <div className={`${theme?"bg-white text-black":"bg-[#1d1c1c] text-white"} mt-4 p-4 border-2 border-black rounded-xl`}>
                    <div className="recent_blog_details_container">
                      <div className="flex gap-[5px] my-2 text-[12px] font-bold">
                        <div className="underline">{blogs[0].type}</div>
                        {" - "}
                        <div className="blog_date">
                          {formatDate(blogs[0].date)}
                        </div>
                        {" - "}
                        <div className="blog_length">{blogs[0].length}</div>
                      </div>
                    </div>
                    <div className="text-xl font-semibold">{blogs[0].title}</div>
                    <div className="flex gap-[5px] my-2 text-[12px] font-bold">
                      {"By"}
                      <div className="underline text-[#5271ff]">{blogs[0].authorName}</div>
                      {" , "}
                      <div className="author_title">{blogs[0].authorTitle}</div>
                    </div>
                    <div className="flex gap-[5px] my-2 text-xs font-normal">
                      {renderBlogDescription(blogs[0].description)}
                    </div>
                  </div>
                </div>
              )}
            </React.Fragment>
          )}

          <div className="my-8">
            <div className={`${theme?" text-black":" text-white"} flex justify-between items-center`}>
              <div className="text-xl font-semibold my-2">Editor's Picks</div>
              <div className="h-[30px] flex justify-center items-center gap-2 text-[20.7px] font-semibold my-2">
                View All <img src="new/Arrow.webp"  alt="Arrow" className={`${theme? "":"invert"} h-full`}/>
              </div>
            </div>
            <div className="my-8 flex gap-4">
              {finalEditorsPick.map((blog, index) => (
                <div className="relative w-[35%] cursor-pointer" key={index} onClick={() => navigateToBlogDetails(blog._id)}>
                  <img
                    src={blog.image}
                    alt={`Blog Image ${index}`}
                    onError={handleImageError}
                    className="rounded-xl h-[200px]  hover:scale-[0.99] hover:transition-all w-full bg-white object-cover object-center blur-[0.05rem]"
                  />
                  <div className="absolute top-1/2 -translate-y-1/2 w-full text-center text-white text-[17px] font-extrabold py-4 px-6 bg-[#00000080]">{blog.title}</div>
                </div>
              ))}
            </div>
            <hr className={`${theme?"border-black":" border-[#ffffff41]"} w-full border-[1px]`}/>
          </div>

          <div className="recent_posts">
            <div className={`${theme?" text-black":" text-white"} flex justify-between items-center`}>
              <div className="text-xl font-semibold my-2">Recent Posts</div>
              <div className="h-[30px] flex justify-center items-center gap-2 text-[20.7px] font-semibold my-2">
                View All <img src="new/Arrow.webp" alt="Arrow" className={`${theme? "":"invert"} h-full`}/>
              </div>
            </div>
            <div className="flex flex-wrap gap-5 mt-8">
              {loading || blogs.length === 0
                ? Array.from({ length: displayCount }).map((_, index) => (
                    <div className={`${theme?"bg-[#deeff8]":"bg-[#111111] "} w-[48%] min-h-[390px] h-auto flex flex-col justify-center  cursor-pointer border-2 border-black border-dashed bg-[#D7E4EB] p-4 rounded-xl`} key={index}>
                      <div className="skeleton w-full h-[200px] mb-[10px]"></div>
                      <div className="flex gap-[5px] my-2 text-[12px] font-bold">
                        <div className="skeleton w-[80%] h-4 mb-[10px]"></div>
                        <div className="skeleton skeleton w-[80%] h-4 mb-[10px]"></div>
                        <div className="skeleton skeleton w-[80%] h-4 mb-[10px]"></div>
                      </div>
                    </div>
                  ))
                : blogs.slice(0, displayCount).map((blog, index) => (
                    <div className={`${theme?"bg-[#D7E4EB] border-black":"bg-[#111111] border-[#525252]"} w-[48%] border-2 border-dashed p-4 min-h-[390px] h-auto flex flex-col justify-center cursor-pointer rounded-xl`} key={index} onClick={() => navigateToBlogDetails(blog._id)}>
                      <img
                        src={blog.image}
                        alt={`Blog Image ${index}`}
                        onError={handleImageError}
                        className="w-full rounded-xl h-[200px] object-cover  hover:scale-[0.99] hover:transition-all object-center bg-white"
                      />
                      <div className={`${theme?"bg-white text-black":"bg-[#222121] text-white "} px-4 py-[0.1rem] mt-4 rounded-xl border-2 border-black`}>
                        <div className="flex gap-[5px] my-2 text-[12px] font-bold">
                          <div className="underline">{blog.type}</div>
                          {" - "}
                          <div className="blog_date">
                            {formatDate(blog.date)}
                          </div>
                          {" - "}
                          <div className="blog_length">{blog.length}</div>
                        </div>
                        <div className="font-semibold">{blog.title}</div>
                        <div className="flex gap-[5px] my-2 text-[12px] font-bold">
                          {"By"}
                          <div className="underline text-[#5271ff]">{blog.authorName}</div>
                          {" , "}
                          <div className="author_title">{blog.authorTitle}</div>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
          {blogs.length > displayCount && (
            <div className="load">
              <button id="load-more" onClick={handleLoadMore}>
                Load More
              </button>
            </div>
          )}
        </div>

        <div className="w-[30%] flex flex-col relative items-center">
        <button className={` ${theme?"bg-gray-100/80 text-black border-none":"text-white bg-black border-white border"}  absolute top-[-130px] right-[10px] w-[300px] flex justify-center items-center gap-2  auth-btn`}  onClick={()=>router.push('createblog')}><FaPlus color="#9590d8"/> Create DevPost Now</button>          <div className={`${theme?"bg-[#D7E4EB] text-black border-black":"bg-[#111111] text-white border-[#525252]"}  border-2  border-dashed py-20 px-8 w-full h-[710px] rounded-2xl`}>
            <div className="text-center text-[30px] font-semibold">Top Posts</div>
            {topBlogs.map((blog, index) => (
              <div className={`top_blog_${index + 1} cursor-pointer my-8`} key={index} onClick={() => navigateToBlogDetails(blog._id)}>
                <div className="flex gap-[5px] my-2 text-[12px] font-bold">
                  <div className="underline">{blog.type}</div>
                  {" - "}
                  <div className="blog_date">{formatDate(blog.date)}</div>
                  {" - "}
                  <div className="blog_length">{blog.length}</div>
                </div>
                <div className="font-semibold">{blog.title}</div>
                <div className="flex gap-[5px] my-2 text-[12px] font-bold">
                  {"By"}
                  <div className="underline text-[#5271ff]">{blog.authorName}</div>
                  {" , "}
                  <div className="author_title">{blog.authorTitle}</div>
                </div>
              </div>
            ))}
          </div>

          <div className={`${theme?"bg-[#D7E4EB] text-black":"bg-[#111111] text-white"} w-full h-[400px] mt-8 p-12 py-8 relative flex justify-center items-center`}>
            <div>
              <div className="bg-[#4d87ba] w-[16%] p-1.5 absolute left-[35px] top-0">
                <img src="new/mail_icon.webp" alt="Mail Icon" className="w-full"/>
              </div>
              <div className="text-[26px] leading-8 font-semibold my-4">
                Subscribe to Our Newsletter
              </div>
              <div className="my-4">
                Receive the latest notifications on DevOps updates and insights
              </div>
              <form onSubmit={handleNewsletterSubmit}>
                <div className="w-full my-4">
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full py-[0.8rem] px-2"
                  />
                </div>
                {newsletterStatus === "success" && (
                  <div className="newsletter_status">
                    Subscription successful!
                  </div>
                )}
                {newsletterStatus === "already_subscribed" && (
                  <div className="newsletter_status">Already subscribed!</div>
                )}
                {newsletterStatus === "error" && (
                  <div className="newsletter_status">
                    Subscription failed. Please try again.
                  </div>
                )}
                <div className="w-full flex justify-center">
                  <button
                    type="submit"
                    disabled={newsletterStatus === "submitting"}
                    className="py-[0.7rem] px-4 bg-[#4d87ba] text-white rounded-3xl"
                  >
                    {newsletterStatus === "submitting"
                      ? "Submitting..."
                      : "Subscribe"}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className={`${theme?"bg-[#D7E4EB] text-black border-[#4d87ba]":"bg-[#111111] text-white border-[#161616]"} w-full h-[700px] mt-8 flex flex-col justify-center items-center p-12 text-center playfair border-[2rem] `}>
            <div className="text-[50px] font-medium">Helpops Hub</div>
            <div className="my-4">
              Ensuring You Never Get Stuck In DevOps Again!
            </div>
          </div>
        </div>
      </div>

      {/* Section: Join Us and Call to Action */}
      <div className={`${theme?" bg-[rgba(47,_158,_214,_0.35)] text-black ":" bg-[rgba(47,_158,_214,_0.35)] text-white "}  trophy-card flex pl-[20px] mt-20 rounded-[18px] p-4 relative`}>
        <img src="new/trophy.webp" alt="Trophy" className="trophy h-[66px] relative" />
        <div className="team-invite pl-8">
          <h2 className="text-[1.5em] font-bold mb-2 font-arial">Join our awesome team!</h2>
          <p>
            Be a contributor and improve HelpOps-Hub and help fellow developers.
          </p>
        </div>
        <a
          href="https://discord.gg/UWTrRhqywt"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-[20px]"
        >
          <button className="join-button px-[20px] py-[10px] text-[16px] bg-[#d9d9d9] text-[#3a3a3a] border-[none] [box-shadow:0px_4px_4px_0px_#00000040] rounded-[23px] cursor-pointer [transition:all_0.3s_ease] hover:bg-[linear-gradient(to_right,_#ff7d1f,_#ffd700)]"> 
            Join us now
          </button>
        </a>
      </div>


      {/* Must Read Section */}
      <div>
        <div className={`${theme?" text-black":" text-white"} text-[20.7px] font-semibold my-8`}>Must Read</div>
        <div className="w-full flex gap-8">
          {finalMustRead.length > 0 ? (
            finalMustRead.map((blog, index) => (
              <div className={`${theme?" bg-[#D7E4EB]":" bg-[#111111]"} w-full h-full p-4 rounded-xl border-2 border-black border-dashed`} key={index} onClick={() => navigateToBlogDetails(blog._id)}>
                <img
                  src={blog.image}
                  alt={`Blog Image ${index}`}
                  onError={handleImageError}
                className="h-[400px] w-full object-cover object-center bg-white hover:scale-[0.99] hover:transition-all " 
                />
                <div className={`${theme?"bg-white text-black":"bg-[#222121] text-white "}  px-4 py-[0.1rem] mt-4 rounded-xl border-2 border-black`}>
                  <div className="flex gap-[5px] my-2 text-[12px] font-bold">
                    <div className="blog_type">{blog.type}</div>
                    {" - "}
                    <div className="blog_date">{formatDate(blog.date)}</div>
                    {" - "}
                    <div className="blog_length">{blog.length}</div>
                  </div>
                  <div className="font-semibold">{blog.title}</div>
                  <div className="flex gap-[5px] my-2 text-[12px] font-bold">
                    {"By"}
                    <div className="underline text-[#5271ff]">{blog.authorName}</div>
                    {" , "}
                    <div className="author_title">{blog.authorTitle}</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="must_read_placeholder">
              No Must Read blogs available.
            </div>
          )}
        </div>
      </div>

      {blogs.length > displayCount && (
        <div className="load">
          <button id="load-more" className="block mx-[auto] px-[20px] py-[10px] text-[16px] bg-[white] text-[black] border-solid border border-black [box-shadow:-5px_5px_0px_0px_#000000] cursor-pointer [transition:all_0.3s_ease] hover:bg-[linear-gradient(to_right,_#ff7d1f,_#ffd700)]" onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default BlogPage;

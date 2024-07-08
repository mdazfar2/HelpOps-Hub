"use client";
import React, { useEffect, useState } from "react";
import "@stylesheets/blogspage.css";

function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(4); // Initial display count
  const [showContent, setShowContent] = useState(false); // State to manage when to show content
  const [email, setEmail] = useState(""); // State for newsletter email
  const [newsletterStatus, setNewsletterStatus] = useState(""); // State for newsletter subscription status

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blog", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Sort blogs by date in descending order
          const sortedBlogs = data.data.sort((a, b) => new Date(b.date) - new Date(a.date));
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
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleLoadMore = () => {
    setDisplayCount(prevCount => prevCount + 2);
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setNewsletterStatus("submitting");
  
    try {
      const subscribeResult = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
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
    if (newsletterStatus === "success" || newsletterStatus === "already_subscribed" || newsletterStatus === "error") {
      const timer = setTimeout(() => {
        setNewsletterStatus('');
      }, 2000);
  
      return () => clearTimeout(timer);
    }
  }, [newsletterStatus]);


  // Process blogs for different sections
  const mustReadBlogs = blogs.filter(blog => blog.mustRead);
  const editorsPickBlogs = blogs.filter(blog => blog.editorsPick);

  // Fill gaps with recent blogs if needed
  const recentBlogs = blogs.filter(blog => !blog.mustRead && !blog.editorsPick);

  const finalEditorsPick = [
    ...editorsPickBlogs,
    ...recentBlogs.slice(0, Math.max(0, 3 - editorsPickBlogs.length))
  ].slice(0, 3);

  const finalMustRead = [
    ...mustReadBlogs,
    ...recentBlogs.slice(0, Math.max(0, 2 - mustReadBlogs.length))
  ].slice(0, 2);

  // Get the top 4 blogs based on likes
  const topBlogs = blogs.sort((a, b) => b.likes - a.likes).slice(0, 4);

  const handleImageError = (e) => {
    const src = e.target.src;
    e.target.onerror = null; // Prevent infinite loop if error happens again
    e.target.src = src; // Retry fetching the image
  };


  return (
    <div className="blogpage-container">
      <div className="blogpage-title">Ensuring You Never Get Stuck In DevOps Again!</div>
      <div className="blogpage-content">
        <div className="left_section">
          {!showContent || loading ? (
            <div className="recent_blog">
              <div className="skeleton skeleton-image"></div>
              <div className="content">
                <div className="recent_blog_details_container">
                  <div className="skeleton skeleton-title"></div>
                  <div className="skeleton skeleton-text"></div>
                  <div className="skeleton skeleton-text"></div>
                </div>
              </div>
            </div>
          ) : (
            blogs.length > 0 && (
              <div className="recent_blog">
                <img src={blogs[0].image} alt="Blog Image" onError={handleImageError} />
                <div className="content">
                  <div className="recent_blog_details_container">
                    <div className="blog_details">
                      <div className="blog_type">{blogs[0].type}</div>
                      {" - "}
                      <div className="blog_date">{formatDate(blogs[0].date)}</div>
                      {" - "}
                      <div className="blog_length">{blogs[0].length}</div>
                    </div>
                  </div>

                  <div className="recent_blog_title">
                    {blogs[0].title}
                  </div>
                  <div className="blog_author">
                    {"By"}
                    <div className="author_name">{blogs[0].authorName}</div>
                    {" , "}
                    <div className="author_title">{blogs[0].authorTitle}</div>
                  </div>
                  <div className="recent_blog_description">
                    {blogs[0].description}
                  </div>
                </div>
              </div>
            )
          )}

          <div className="editor_picks">
            <div className="editor_picks_options">
              <div className="options_title">Editor's Picks</div>
              <div className="options_view">
                View All <img src="new/arrow.webp" alt="Arrow" />
              </div>
            </div>
            <div className="editor_picks_content">
              {finalEditorsPick.map((blog, index) => (
                <div className="editor_picks_blog" key={index}>
                  <img src={blog.image} alt={`Blog Image ${index}`} onError={handleImageError} />
                  <div className="editor_picks_blog_title">{blog.title}</div>
                </div>
              ))}
            </div>
            <hr />
          </div>

          <div className="recent_posts">
            <div className="recent_posts_options">
              <div className="options_title">Recent Posts</div>
              <div className="options_view">
                View All <img src="new/arrow.webp" alt="Arrow" />
              </div>
            </div>
            <div className="recent_posts_content">
              {!showContent || loading ? (
                Array.from({ length: displayCount }).map((_, index) => (
                  <div className="recent_posts_blog" key={index}>
                    <div className="skeleton skeleton-image"></div>
                    <div className="blog_details">
                      <div className="skeleton skeleton-title"></div>
                      <div className="skeleton skeleton-text"></div>
                      <div className="skeleton skeleton-text"></div>
                    </div>
                  </div>
                ))
              ) : (
                blogs.slice(0, displayCount).map((blog, index) => (
                  <div className="recent_posts_blog" key={index}>
                    <img src={blog.image} alt={`Blog Image ${index}`} onError={handleImageError} />
                    <div className="blog_details">
                      <div className="blog_type">{blog.type}</div>
                      {" - "}
                      <div className="blog_date">{formatDate(blog.date)}</div>
                      {" - "}
                      <div className="blog_length">{blog.length}</div>
                    </div>
                    <div className="blog_title">{blog.title}</div>
                    <div className="blog_author">
                      {"By"}
                      <div className="author_name">{blog.authorName}</div>
                      {" , "}
                      <div className="author_title">{blog.authorTitle}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="right_section">
          <div className="top_blogs">
            <div className="top_blog_title">Top Posts</div>
            {topBlogs.map((blog, index) => (
              <div className={`top_blog_${index + 1}`} key={index}>
                <div className="blog_details">
                  <div className="blog_type">{blog.type}</div>
                  {" - "}
                  <div className="blog_date">{formatDate(blog.date)}</div>
                  {" - "}
                  <div className="blog_length">{blog.length}</div>
                </div>
                <div className="blog_title">{blog.title}</div>
                <div className="blog_author">
                  {"By"}
                  <div className="author_name">{blog.authorName}</div>
                  {" , "}
                  <div className="author_title">{blog.authorTitle}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="newsletter_form_container">
            <div className="newsletter_form">
              <div className="mail_icon">
                <img src="new/mail_icon.webp" alt="Mail Icon" />
              </div>
              <div className="newsletter_form_title">
                Subscribe to Our Newsletter
              </div>
              <div className="newsletter_form_description">
                Receive the latest notifications on DevOps updates and insights
              </div>
              <form onSubmit={handleNewsletterSubmit}>
                <div className="newsletter_form_input">
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                {newsletterStatus === "success" && <div className="newsletter_status">Subscription successful!</div>}
                {newsletterStatus === "already_subscribed" && <div className="newsletter_status">Already subscribed!</div>}
                {newsletterStatus === "error" && <div className="newsletter_status">Subscription failed. Please try again.</div>}
                <div className="newsletter_form_button">
                  <button type="submit" disabled={newsletterStatus === "submitting"}>
                    {newsletterStatus === "submitting" ? "Submitting..." : "Subscribe"}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="helpops_ad">
            <div className="ad_title">Helpops Hub</div>
            <div className="ad_description">
              Ensuring You Never Get Stuck In DevOps Again!
            </div>
          </div>
        </div>
      </div>

      {/* Section: Join Us and Call to Action */}
      <div className="join_us">
        <div className="trophy-card">
          <img src="new/trophy.webp" alt="Trophy" className="trophy" />
          <div className="team-invite">
            <h2>Join our awesome team!</h2>
            <p>
              Be a contributor and improve HelpOps-Hub and help fellow developers.
            </p>
          </div>
          <a
            href="https://discord.gg/UWTrRhqywt"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="join-button"> Join us now &#8594;</button>
          </a>
        </div>
      </div>

      {/* Must Read Section */}
      <div className="must_read">
        <div className="must_read_title">Must Read</div>
        <div className="must_read_content">
          {finalMustRead.length > 0 ? (
            finalMustRead.map((blog, index) => (
              <div className="must_read_blog" key={index}>
                <img src={blog.image} alt={`Blog Image ${index}`} onError={handleImageError} />
                <div className="blog_details">
                      <div className="blog_type">{blog.type}</div>
                      {" - "}
                      <div className="blog_date">{formatDate(blog.date)}</div>
                      {" - "}
                      <div className="blog_length">{blog.length}</div>
                    </div>
                    <div className="blog_title">{blog.title}</div>
                    <div className="blog_author">
                      {"By"}
                      <div className="author_name">{blog.authorName}</div>
                      {" , "}
                      <div className="author_title">{blog.authorTitle}</div>
                    </div>
              </div>
            ))
          ) : (
            <div className="must_read_placeholder">No Must Read blogs available.</div>
          )}
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
  );
}

export default BlogPage;

"use client";
import React, { useEffect } from "react";
import "@stylesheets/blogspage.css";

function BlogPage() {
  return (
    <div className="blogpage-container">
      <div className="blogpage-title">Ensuring You Never Get Stuck In DevOps Again!</div>
      <div className="blogpage-content">
        <div className="left_section">
          <div className="recent_blog">
            <img src="/Blog_Sample_1.png" alt="Blog Image" />
            <div className="content">
              <div className="recent_blog_details_container">
                <div className="blog_details">
                  <div className="blog_type">Announcements</div>
                  {" - "}
                  <div className="blog_date">June 29</div>
                  {" - "}
                  <div className="blog_length">11 min read</div>
                </div>
              </div>

              <div className="recent_blog_title">
                From code to production: New ways Azure helps you build
                transformational AI experiences
              </div>
              <div className="blog_author">
                {"By"}
                <div className="author_name">Azfar Alam</div>
                {" , "}
                <div className="author_title">Founder, Helpops-Hub</div>
              </div>
              <div className="recent_blog_description">
                What was once a distant promise is now manifesting—and not only
                through the type of apps that are possible, but how you can
                build them. With Azure, we’re meeting you where you are
                today—and paving the way to where you’re going. So let’s jump
                right into some of what you’ll learn over the next few days.
                Welcome to Build 2024!
              </div>
            </div>
          </div>
          <div className="editor_picks">
            <div className="editor_picks_options">
              <div className="options_title">Editor's Picks</div>
              <div className="options_view">
                View All <img src="/arrow.png" />
              </div>
            </div>
            <div className="editor_picks_content">
              <div className="editor_picks_blog">
                <img src="/Blog_Sample_2.png" />
                <div className="editor_picks_blog_title">
                  The Power of Automation: Enhancing DevOps Efficiency
                </div>
              </div>
              <div className="editor_picks_blog">
                <img src="/Blog_Sample_3.png" />
                <div className="editor_picks_blog_title">
                  Revolutionizing DevOps with Infrastructure as Code (IaC)
                </div>
              </div>
              <div className="editor_picks_blog">
                <img src="/Blog_Sample_4.png" />
                <div className="editor_picks_blog_title">
                  {" "}
                  Fostering a DevOps Culture: Building a Collaborative
                  Environment
                </div>
              </div>
            </div>
            <hr />
          </div>

          <div className="recent_posts">
            <div className="recent_posts_options">
              <div className="options_title">Recent Posts</div>
              <div className="options_view">
                View All <img src="/arrow.png" />
              </div>
            </div>
            <div className="recent_posts_content">
              <div className="recent_blog"></div>
              <div className="recent_blog"></div>
              <div className="recent_blog"></div>
              <div className="recent_blog"></div>
            </div>
          </div>
        </div>

        <div className="right_section">
          <div className="top_blogs">
            <div className="top_blog_title">Top Posts</div>
            <div className="top_blog_1">
              <div className="blog_details">
                <div className="blog_type">Announcements</div>
                {" - "}
                <div className="blog_date">June 27</div>
                {" - "}
                <div className="blog_length">12 min read</div>
              </div>
              <div className="blog_title">
                Continuous Integration and Continuous Deployment (CI/CD) Best
                Practices
              </div>
              <div className="blog_author">
                {"By"}
                <div className="author_name">Azfar Alam</div>
                {" , "}
                <div className="author_title">Founder, Helpops-Hub</div>
              </div>
            </div>
            <div className="top_blog_2">
              <div className="blog_details">
                <div className="blog_type">Announcements</div>
                {" - "}
                <div className="blog_date">June 24</div>
                {" - "}
                <div className="blog_length">15 min read</div>
              </div>
              <div className="blog_title">
                Revolutionizing DevOps with Infrastructure as Code (IaC)
              </div>
              <div className="blog_author">
                {"By"}
                <div className="author_name">Azfar Alam</div>
                {" , "}
                <div className="author_title">Founder, Helpops-Hub</div>
              </div>
            </div>
            <div className="top_blog_3">
              <div className="blog_details">
                <div className="blog_type">Announcements</div>
                {" - "}
                <div className="blog_date">June 20</div>
                {" - "}
                <div className="blog_length">22 min read</div>
              </div>
              <div className="blog_title">
                The Power of Automation: Enhancing DevOps Efficiency
              </div>
              <div className="blog_author">
                {"By"}
                <div className="author_name">Azfar Alam</div>
                {" , "}
                <div className="author_title">Founder, Helpops-Hub</div>
              </div>
            </div>
          </div>

          <div className="newsletter_form_container">
            <div className="newsletter_form">
              <div className="mail_icon">
                <img src="/mail_icon.png" alt="" />
              </div>
              <div className="newsletter_form_title">
                Subscribe to Our Newsletter
              </div>
              <div className="newsletter_form_description">
                Receive the latest notifications on DevOps updates and insights
              </div>
              <div className="newsletter_form_input">
                <input type="text" placeholder="Email Address" />
              </div>
              <div className="newsletter_form_button">
                <button>Subscribe</button>
              </div>
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
          <img src="trophy.png" alt="Trophy" className="trophy" />
          <div className="team-invite">
            <h2>Join our awesome team!</h2>
            <p>
              Be a contributor and improve HelpOps-Hub and help fellow
              developers.
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

      <div className="must_read">
        <div className="must_read_title">Must Read</div>
        <div className="must_read_content">
          <div className="must_read_left"></div>
          <div className="must_read_right"></div>
        </div>
      </div>
      
      <div className="load">
        <button id="load-more">
          Load More
        </button>
      </div>
    </div>
  );
}

export default BlogPage;

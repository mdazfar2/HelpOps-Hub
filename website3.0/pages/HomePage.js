import React, { useEffect } from "react";
import "@stylesheets/homepage.css";
import { useRouter } from "next/navigation";

//Importing FontAwesome for Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faStar, faHeart, faAnglesDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

//Importing the AOS Package for Scroll Animations
import AOS from "aos";
import "aos/dist/aos.css";

//Import Rellax Package
import Rellax from "rellax";

//Importing the SplideJS Package
import Splide from "@splidejs/splide"; 
import "@splidejs/splide/dist/css/splide.min.css";

function HomePage() {

  // Initialize the Splide carousel on component mount
  useEffect(() => {
    const splide = new Splide("#splide", {
      type: "loop",
      drag: "free",
      focus: "center",
      perPage: 5,
      pagination: false,
      arrows: false,
      autoplay: true,
      interval: 0, 
      speed: 60000,
      rewind: true,
    });

    splide.mount();

    // Cleanup Splide instance on component unmount
    return () => {
      splide.destroy();
    };
  }, []);

  const router = useRouter();
  
  // Initialize AOS (Animate on Scroll) library for scroll animations
  useEffect(() => {
    setTimeout(() => {
      AOS.init({
        duration: 1200,
      });
    }, 100);

    // Refresh AOS on component unmount
    return () => {
      AOS.refreshHard();
    };
  }, []);

  // Initialize Rellax library for parallax scrolling effects
  useEffect(() => {
    var rellax = new Rellax(".rellax");

    // Cleanup Rellax instance on component unmount
    return () => {
      rellax.destroy();
    };
  }, []);

  // Navigate to the /resources page when "Get started" button is clicked
  const handleGetStartedClick = () => {
    router.push("/resources");
  };

  // Smooth scroll to the element with id "img1"
  const scrollToImage = () => {
    const img1 = document.getElementById("img1");
    if (img1) {
      img1.scrollIntoView({ behavior: "smooth" });
    }
  };

    // Smooth scroll to the top of the page
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

  return (
    <div>
      <main>

        {/* Section: Main */}

        <div className="main-content">
          <div className="content">
            <a href="https://github.com/mdazfar2/HelpOps-Hub/" target="_blank">
              <h3 className="star-button">
                <FontAwesomeIcon
                  icon={faStar}
                  className="star-icon"
                  width={24}
                />{" "}
                Star Us
              </h3>
            </a>
            <li className="isDisplay">
              <a href="https://github.com/sponsors/mdazfar2" target="_blank">
                <h3 className="home-sponsor-btn">
                  Sponsor{" "}
                  <FontAwesomeIcon icon={faHeart} id="heart" width={25} />
                </h3>
              </a>
            </li>
          </div>
          <h1 className="main-title">HelpOps-Hub</h1>
          <p className="main-para">
            Ensuring You Never Get Stuck In DevOps Again!
          </p>
          <button className="get-started-btn" onClick={handleGetStartedClick}>
            Get started
          </button>
        </div>
      </main>

      {/* Down arrow icon for scrolling to the image section */}

      <div className="arrow_container">
        <FontAwesomeIcon
          icon={faAnglesDown}
          className="arrow animation1"
          style={{ color: "rgb(206, 191, 191)" }}
          id="scrollIcon"
          onClick={scrollToImage}
        />
      </div>

      {/* Section: Devops-Image */}
      
      <div className="img1" id="img1">
        <img src="/img1.png" />
      </div>

      {/*Section: DevOps Insights */}

      <div className="devops_text_container">
        <div className="text-section">
          <h1 data-aos="fade-right">Expert DevOps Insights</h1>
          <p data-aos="fade-right">
            Discover the ultimate resource for resolving your DevOps challenges
            quickly and efficiently. Our HelpOps-Hub connects you with expert
            insights, collaborative problem-solving, and a supportive community.
            Whether you're troubleshooting a complex issue or seeking advice on
            best practices, find the solutions you need right here.
          </p>
          <button data-aos="fade-up">Start now</button>
        </div>
        <div className="image-section">
          <img
            src="img2.jpeg"
            alt="DevOps Image"
            className="rellax"
            data-rellax-speed="5"
            data-rellax-zindex="5"
          />
          <img
            src="dev1.jpg"
            alt="DevOps Image"
            className="rellax"
            data-rellax-speed="5"
            data-rellax-zindex="5"
          />
          <img
            src="dev2.jpg"
            alt="DevOps Image"
            className="rellax"
            data-rellax-speed="5"
            data-rellax-zindex="5"
          />
          <img
            src="dev3.jpg"
            alt="DevOps Image"
            className="rellax"
            data-rellax-speed="5"
            data-rellax-zindex="5"
          />
        </div>
      </div>

      {/*Section: Cards*/}

      <div className="container1">
        <div className="header">
          <div id="h1" className="h1" data-aos="fade-right">
            We Are
          </div>
          <h1 className="creative" data-aos="fade-right" data-aos-delay="200">
            Creative
          </h1>
        </div>
        <div className="cards">
          <div className="card" id="c1" data-aos="fade-up">
            <div className="card-header">
              <img src="i1.png" alt="Icon" />
              <h2>Innovative Solutions</h2>
            </div>
            <p>
              We provide cutting-edge solutions to common DevOps challenges,
              offering tools and strategies that streamline workflows and
              enhance productivity.
            </p>
            <p>
              <strong>Example:</strong> Custom automation scripts and
              integrations tailored to specific DevOps needs.
            </p>
          </div>
          <div className="card" id="c2" data-aos="fade-up" data-aos-delay="400">
            <div className="card-header">
              <img src="i2.png" alt="Icon" />
              <h2>Interactive Tutorials</h2>
            </div>
            <p>
              Our interactive tutorials are designed to engage and educate,
              allowing users to practice skills in real-time within a simulated
              DevOps environment.
            </p>
            <p>
              <strong>Example:</strong> Hands-on labs and sandbox environments
              where users can experiment with DevOps tools and scenarios.
            </p>
          </div>
          <div className="card" id="c3" data-aos="fade-up" data-aos-delay="600">
            <div className="card-header">
              <img src="i3.png" alt="Icon" />
              <h2>Personalized Learning Paths</h2>
            </div>
            <p>
              We offer customized learning paths based on individual goals and
              skill levels, ensuring that every user can progress at their own
              pace.
            </p>
            <p>
              <strong>Example:</strong> Tailored courses and skill assessments
              that guide users through their DevOps journey.
            </p>
          </div>
          <div className="card" id="c4" data-aos="fade-up" data-aos-delay="800">
            <div className="card-header">
              <img src="i4.png" alt="Icon" />
              <h2>Community-Driven Development</h2>
            </div>
            <p>
              HelpOps-Hub thrives on the contributions of its community. We
              leverage collective knowledge and experience to continuously
              improve and innovate.
            </p>
            <p>
              <strong>Example:</strong> Regular community hackathons and
              collaborative projects that drive platform enhancements.
            </p>
          </div>
        </div>
      </div>

      {/*Section: Banner with carousel using SplideJS*/}

      <div className="banner">
        <h1 className="banner-title" data-aos="fade-up">
          DevOps Arsenal
        </h1>
        <div
          id="splide"
          className="splide icn"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="splide__track">
            <div className="splide__list icons">
              <div className="splide__slide">
                <img src="/b1.png" alt="Cloud Icon" />
              </div>
              <div className="splide__slide">
                <img src="/b2.png" alt="Monitor Icon" />
              </div>
              <div className="splide__slide">
                <img src="/b3.png" alt="Pipeline Icon" />
              </div>
              <div className="splide__slide">
                <img src="/b4.png" alt="DevOps Icon" />
              </div>
              <div className="splide__slide">
                <img src="/b5.png" alt="Container Icon" />
              </div>
              <div className="splide__slide">
                <img src="/b6.png" alt="Tools Icon" />
              </div>
            </div>
          </div>
        </div>

        {/*Section: Newsletter subscription*/}

        <div className="newsletter-container">
          <div className="newsletter">
            <div className="logo-section">
              <img src="HelpOps-H Fevicon.png" alt="Logo" data-tilt />
              <h3 className="news-logo">elpOps-Hub</h3>
            </div>
            <div className="subscribe-section">
              <p className="subscribe-text">Subscribe to our newsletter</p>
              <div className="subscribe-input">
                <input
                  placeholder="example@gmail.com"
                  className="input-field"
                />
                <button className="subscribe-btn">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a className="gotopbtn" href="#" onClick={scrollToTop}>
        <FontAwesomeIcon icon={faArrowUp} />
      </a>
    </div>
  );
}

export default HomePage;

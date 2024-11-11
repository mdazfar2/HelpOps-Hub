import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useMediaQuery } from 'react-responsive';

const reviews = [
    {
      name: 'Hema Qureshi',
      role: 'Tech Enthusiast',
      image: 'https://media.istockphoto.com/id/1320811419/photo/head-shot-portrait-of-confident-successful-smiling-indian-businesswoman.jpg?s=612x612&w=0&k=20&c=bCUTB8vd8MnzZFIq-x645-SmLNk2sQzOvOvWCPGDfZ4=',
      quote: 'HelpOps-Hub made troubleshooting easy!',
      review: 'The platform offers practical solutions and resources that are perfect for complex DevOps issues.',
      rating: 5,
    },
    {
      name: 'Kavita Singhal',
      role: 'Tech Blogger',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyVrIew4wGdw5mK6gL--VNgWtcavnDjErVzg&s',
      quote: 'A great knowledge source.',
      review: 'The guides and articles here have been invaluable in enhancing my DevOps skills and knowledge base.',
      rating: 4,
    },
    {
      name: 'Rekha Sharma',
      role: 'DevOps Enthusiast',
      image: 'https://preview.redd.it/a-beautiful-south-indian-girl-v0-2khkhnm0rllb1.png?width=512&format=png&auto=webp&s=2c3bacb21906f66018f792cc83cf1d9b81884c76',
      quote: 'Highly recommend!',
      review: 'The answers to my questions are detailed and help resolve my issues quickly and effectively every time.',
      rating: 5,
    },
    {
      name: 'Raj Verma',
      role: 'Software Engineer',
      image: 'https://media.istockphoto.com/id/1141737652/photo/portrait-of-a-confident-young-man.jpg?s=612x612&w=0&k=20&c=YQaYjmbPGpJ0DXxGSTLHFPWsBKjBsAmR_l-XHYt2vHU=',
      quote: 'Helped with every query!',
      review: 'HelpOps-Hub is fantastic for finding quick solutions and learning new tips on DevOps topics.',
      rating: 5,
    },
    {
      name: 'Ananya Gupta',
      role: 'System Admin',
      image: 'https://static.vecteezy.com/system/resources/thumbnails/032/946/473/small_2x/smiling-indian-girl-in-traditional-sari-outdoors-free-photo.jpg',
      quote: 'A must for DevOps.',
      review: 'This platform offers detailed insights and answers for even the most complex DevOps problems.',
      rating: 5,
    },
    {
      name: 'Sunil Rao',
      role: 'Cloud Architect',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu-J3wFseTVVZKfaKLjWAl7Q33w1_4-Jlm6A&s',
      quote: 'Insightful and practical!',
      review: 'The blog articles provide clear, actionable advice on DevOps that is useful in my day-to-day work.',
      rating: 4,
    },
  ];
  
  
const infiniteReviews = reviews;

const ReviewCard = ({ review, theme, setIsPaused }) => (
    <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className={`rounded-lg hover:shadow-xl p-4 flex flex-col justify-between h-full transition-shadow duration-300 transform hover:scale-105 shadow-[0_2px_10px_rgba(0,0,0,0.3)] ${theme ? 'bg-white' : 'bg-gray-800'}`}
    >
        <div>
            <div className="flex items-center mb-4">
                <img src={review.image} alt={review.name} className="w-16 h-16 rounded-full border-2 mr-4 object-cover" />
                <div>
                    <h3 className={`font-semibold text-lg ${theme ? 'text-gray-700' : 'text-white'}`}>{review.name}</h3>
                    <p className={`text-sm ${theme ? 'text-red-600' : 'text-red-400'}`}>{review.role}</p>
                </div>
            </div>
            <p className={`text-xl font-bold mb-2 ${theme ? 'text-gray-700' : 'text-gray-200'}`}>"{review.quote}"</p>
            <p className={`mb-4 ${theme ? 'text-gray-600' : 'text-gray-300'}`}>{review.review}</p>
        </div>
        <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : theme ? 'text-gray-300' : 'text-gray-500'} fill-current`} />
            ))}
        </div>
    </div>
);

  

const Testimonial = ({ theme }) => {
    const [currentIndex, setCurrentIndex] = useState(1); // Start at the first real review
    const [isTransitioning, setIsTransitioning] = useState(true);
    const isSmallScreen = useMediaQuery({ query: '(max-width: 640px)' });
    const isLargeScreen = useMediaQuery({ query: '(min-width: 641px)' });
    const reviewWidth = isSmallScreen ? 100 : 100 / 3;
    const [isPaused, setIsPaused] = useState(false);

    // Separate out auto-scroll to respect `isPaused`
    const autoNextReview = useCallback(() => {
        if (!isPaused) {
            setIsTransitioning(true);
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    }, [isPaused]);

    const nextReview = () => {
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => prevIndex + 1);
    };

    const prevReview = () => {
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => prevIndex - 1);
    };

    useEffect(() => {
        if (currentIndex === infiniteReviews.length - 2) {
            setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(1);
            }, 4000);
        } else if (currentIndex === 0) {
            setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(infiniteReviews.length - 2);
            }, 500);
        }
    }, [currentIndex]);

    useEffect(() => {
        const timer = setInterval(autoNextReview, 4000);
        return () => clearInterval(timer);
    }, [autoNextReview]);

    return (
        <section className="py-5 px-4 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <h2 className={`${
                    theme ? "text-gray-700" : "text-white"
                } mb-5 text-center text-4xl max-sm:text-2xl font-semibold`}>
                    What Our Community Says
                </h2>
                <div className="relative">
                    <div className="w-[85vw] lg:w-full overflow-hidden">
                        <div
                            className={`flex transition-transform duration-500 ease-in-out ${!isTransitioning ? 'transition-none' : ''}`}
                            style={{
                                transform: `translateX(-${(currentIndex - 1) * reviewWidth}%)`,
                            }}
                        >
                            {infiniteReviews.map((review, index) => (
                                <div key={index} className={`w-full ${isSmallScreen ? 'flex-shrink-0' : 'sm:w-1/3 flex-shrink-0'} px-2`}>
                                    <ReviewCard review={review} theme={theme} setIsPaused={setIsPaused} />
                                </div>
                            ))}
                        </div>
                    </div>
                    {currentIndex !== 1 && (
                        <button
                            onClick={prevReview}
                            className="absolute top-1/2 -left-4 transform -translate-y-1/2 rounded-full p-2 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 hover:shadow-lg ml-1 bg-white hover:bg-gray-100"
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-600" />
                        </button>
                    )}
                    {currentIndex !== infiniteReviews.length - 2 && (
                        <button
                            onClick={nextReview}
                            className="absolute top-1/2 -right-4 transform -translate-y-1/2 rounded-full p-2 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 hover:shadow-lg mr-1 bg-white hover:bg-gray-100"
                        >
                            <ChevronRight className="w-6 h-6 text-gray-600" />
                        </button>
                    )}
                </div>
                <div className="flex justify-center mt-8">
                    {infiniteReviews
                        .slice(1, isLargeScreen ? infiniteReviews.length - 1 : infiniteReviews.length - 1)
                        .map((_, index) => (
                            <div
                                key={index}
                                onClick={() => setCurrentIndex(index + 1)}
                                className={`w-2 h-2 mx-1 rounded-full cursor-pointer transition-colors duration-200 ${index + 1 === currentIndex ? 'bg-red-600' : 'bg-gray-300'}`}
                            />
                        ))}
                </div>
            </div>
        </section>
    );
};

  
  

export default Testimonial;
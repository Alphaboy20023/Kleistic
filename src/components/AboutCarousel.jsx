import { useState, useEffect } from 'react';

const AboutCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const teamMembers = [
        {
            id: 1,
            name: "Tom Stevens",
            position: "Founder & Chairman",
            image: "/Img/Toms.jpg",
        },
        {
            id: 2,
            name: "Akinola Victor",
            position: "Lead Developer",
            image: "/Img/me.jpg",
        },

        {
            id: 3,
            name: "Brazil Smith",
            position: "Product Designer",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
        },
        {
            id: 4,
            name: "Sarah Johnson",
            position: "Head of Marketing",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
        },
        {
            id: 5,
            name: "Michael Chen",
            position: "Managing Director",
            image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=face",
        },
        {
            id: 6,
            name: "Emma Wilson",
            position: "Operations Manager",
            image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face",
        }
    ];

    const totalSlides = Math.ceil(teamMembers.length / 3);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
        }, 12000);

        return () => clearInterval(interval);
    }, [totalSlides]);


    const getCurrentCards = () => {
        const startIndex = currentIndex * 3;
        return teamMembers.slice(startIndex, startIndex + 3);
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                        <div key={slideIndex} className="w-full flex-shrink-0">
                            <section className="flex justify-center gap-4 sm:gap-6 lg:gap-9 py-7 flex-wrap">
                                {teamMembers.slice(slideIndex * 3, slideIndex * 3 + 3).map((member) => (
                                    <aside key={member.id} className="flex flex-col items-center text-center w-full sm:w-[280px] lg:w-[320px]">
                                        <div className="w-full h-80 sm:h-96 lg:h-[320px] mb-4">
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="bg-gray-100 w-full h-full object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                                            />
                                        </div>
                                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{member.name}</h1>
                                        <p className="text-base sm:text-lg text-gray-600 mb-4">{member.position}</p>
                                        <div className="flex space-x-4">
                                        </div>
                                    </aside>
                                ))}
                            </section>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center py-8 sm:py-12">
                <div className="flex space-x-2">
                    {Array.from({ length: totalSlides }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? 'bg-orange-600 scale-125'
                                    : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutCarousel;
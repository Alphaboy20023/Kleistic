import { useState } from "react";
import { Link } from "react-router-dom";

const slides = [
    {
        id: 1,
        image1: "/img/applelogo.jpg",
        title: " iphone 15 series",
        subtitle: "Up to 18% off Voucher",
        image: "/img/iphone14main.webp"
    },
    {
        id: 2,
        title: " Roku plus series",
        subtitle: "Up to 15% off Voucher",
        image: "/img/RokuTvm.jpg"
    },
    {
        id: 3,
        title: " Samsung Galaxy S24 series",
        subtitle: "Up to 20% off Voucher",
        image: "/img/s24main.jpg"
    },
];

export default function HeroCarousel() {
    const [current, setCurrent] = useState(0);

    return (
        <>

            <div className="  w-auto bg-black text-white flex flex-col ">
                <div className="p-7 w-auto flex flex-col lg:flex-row items-center justify-between gap-auto transition-all duration-500">
                    <div className="flex flex-col gap-4 max-w-md text-center sm:text-left">
                        <div className="flex flex-row gap-2 items-center justify-center sm:justify-start">
                            {slides[current].image1 && (
                            <img src={slides[current].image1} alt="" className="h-[40px] w-[40px]" />
                            )}
                            <p className="text-2xl">{slides[current].title}</p>
                        </div>
                        <h4 className="text-5xl sm:text-6xl font-bold">{slides[current].subtitle}</h4>
                        <Link to="#" className=" w-[85px] hover:underline hover:underline-offset-4 text-blue-700"> Shop now</Link>
                    </div>
                        
                    <img
                        src={slides[current].image}
                        alt={slides[current].subtitle}
                        className={`h-full w-auto sm:w-auto max-h-[300px] object-contain ${slides[current].id === 3 ? 'lg:w-[490px]' : 'sm:w-auto' } `}
                    />

                    
                </div>


                <div className="flex justify-center items-center gap-3 py-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrent(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${current === index ? "bg-white" : "bg-white/50"
                                }`}
                        >
                        </button>
                    ))}
                </div>

            </div>
        </>
    )
}
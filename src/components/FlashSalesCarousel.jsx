import { useRef, forwardRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { LuEye } from 'react-icons/lu';
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import defaultProducts from "../data/product";


const FlashSalesCarousel = forwardRef(({ products, nextEl, prevEl }, ref) => {
    const swiperRef = useRef();

    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }


    const filteredProducts = defaultProducts.filter(p => p.category === 'flashSales');
    const items = filteredProducts.length ? filteredProducts : [];

    useEffect(() => {
        if (swiperRef.current && nextEl && prevEl) {
            swiperRef.current.params.navigation.prevEl = prevEl.current;
            swiperRef.current.params.navigation.nextEl = nextEl.current;
            swiperRef.current.navigation.init();
            swiperRef.current.navigation.update();
        }
    }, [nextEl, prevEl]);

    return (
        <>
            <Swiper
                modules={[Navigation]}
                spaceBetween={16}
                slidesPerView={1}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 4 },
                }}
            >
                {items.map((product) => (
                    <SwiperSlide key={product.id}>
                        <div className="bg-purple-100 py-11 px-8 h-[280px] relative">
                            <div className="absolute top-3 left-4 bg-red-700 text-white text-[14px] text-center rounded-[4px] w-[50px] h-[24px]">
                                {product.discount}
                            </div>

                            <Link to="#wishlist">
                                <div className=" absolute top-4 right-3 bg-white w-9 h-9 rounded-full flex items-center justify-center z-10">
                                    <i className="bx bx-heart text-[20px] text-gray-700"></i>
                                </div>
                            </Link>


                            <Link to={`/product_detail/${product.id}`}>
                                <div className="rounded-full bg-white w-9 h-9 flex items-center justify-center absolute top-[65px] right-3">
                                    <LuEye style={{
                                        stroke: 'black',
                                        fill: 'white',
                                        strokeWidth: 2,
                                        width: '20px',
                                        height: '20px'
                                    }} />
                                </div>
                            </Link>
                            <div className="p-4 flex flex-col items-center">
                                <img src={product.image} alt={product.title} className="h-[160px] mx-auto" />
                            </div>
                        </div>

                        <div className="mt-2">
                            <h4 className="text-black font-semibold">{product.title}</h4>
                            <div className="flex gap-3">
                                <p className="text-red-500">${product.price}</p>
                                <p className="text-gray-500 line-through">${product.oldPrice}</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="flex">
                                    {Array.from({ length: 5 }, (_, i) => {
                                        const fullStars = Math.floor(product.rating);
                                        const hasHalfStar = product.rating % 1 !== 0;

                                        if (i < fullStars) {
                                            return <i key={i} className="bx bxs-star text-yellow-400 text-sm" ></i>;
                                        } else if (i === fullStars && hasHalfStar) {
                                            return (
                                                <i
                                                    key={i}
                                                    className="bx bxs-star-half text-sm"
                                                    style={{ color: "yellow", background: "linear-gradient(to right, #facc15 50%,  #9CA3AF 50%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                                                >
                                                </i>
                                            );
                                        } else {
                                            return <i key={i} className="bx bxs-star text-gray-400 text-sm" ></i>
                                        }
                                    })}
                                </div>
                                <p className="text-sm text-gray-600">({product.reviews})</p>
                            </div>
                            <button onClick={() => handleAddToCart(product)} className="w-full flex justify-center relative bottom-[125px] cursor-pointer">
                                <div className="w-full bg-black text-white rounded flex items-center justify-center">
                                    <p className="p-3">Add to Cart</p>
                                </div>
                            </button>

                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

        </>

    );
});

export default FlashSalesCarousel;

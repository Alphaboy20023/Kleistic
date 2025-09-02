import { useRef, forwardRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { LuEye } from 'react-icons/lu';
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { getProducts } from "../redux/productSlice";


const FlashSalesCarousel = forwardRef(({ nextEl, prevEl }, ref) => {
    const swiperRef = useRef();
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products);


    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }

    const filteredProducts = products.filter(p => p.category === 'Flash Sales');
    const items = filteredProducts.length ? filteredProducts : [];

    useEffect(() => {
        if (swiperRef.current && nextEl && prevEl) {
            swiperRef.current.params.navigation.prevEl = prevEl.current;
            swiperRef.current.params.navigation.nextEl = nextEl.current;
            swiperRef.current.navigation.init();
            swiperRef.current.navigation.update();
        }

        dispatch(getProducts());
    }, [nextEl, prevEl, dispatch]);


    return (
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
                    <div className="mt-5 group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden">
                        {/* Product Image Container with Button */}
                        <div className="bg-purple-100 relative flex flex-col h-[290px]">
                            {/* Top Section - Badges and Icons */}
                            <div className="relative flex-shrink-0">
                                {/* Discount Badge */}
                                <div className="absolute top-3 left-4 bg-red-700 text-white text-xs font-medium text-center rounded px-2 py-1 z-10">
                                    {product.discount}%
                                </div>

                                <Link to="#wishlist" onClick={(e) => e.stopPropagation()}>
                                    <div className="absolute top-4 right-3 bg-white w-9 h-9 rounded-full flex items-center justify-center z-10 hover:bg-gray-50 transition-colors">
                                        <i className="bx bx-heart text-lg text-gray-700"></i>
                                    </div>
                                </Link>

                                {/* View Product Button */}
                                <Link to={`/product_detail/${product.id}`} onClick={(e) => e.stopPropagation()}>
                                    <div className="absolute top-16 right-3 bg-white w-9 h-9 rounded-full flex items-center justify-center z-10 hover:bg-gray-50 transition-colors">
                                        <LuEye style={{
                                            stroke: 'black',
                                            fill: 'white',
                                            strokeWidth: 2,
                                            width: '18px',
                                            height: '18px'
                                        }} />
                                    </div>
                                </Link>
                            </div>

                            {/* Middle Section - Product Image */}
                            <div className="flex-1 flex items-center justify-center p-4">
                                <img
                                   src={product.image}
                                    alt={product.title}
                                    className="max-h-[140px] max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            <div className=" pb-1 flex-shrink-0">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleAddToCart(product);
                                    }}
                                    className="w-full bg-black hover:bg-gray-800 text-white py-3 px-4 rounded-md font-medium text-sm transition-all duration-200 transform group-hover:scale-105"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Product Details Container */}
                    <div className="p-3 space-y-1 shadow-none">
                        <h4 className="text-gray-900 font-semibold text-md leading-5 line-clamp-2 min-h-[1.3rem] group-hover:text-black transition-colors">
                            {product.title}
                        </h4>

                        {/* Price Section */}
                        <div className="flex items-center gap-3">
                            <span className="text-red-500 font-bold text-base">
                                ₦{product.price.toLocaleString()}
                            </span>
                            <span className="text-gray-500 line-through text-sm">
                                ₦{product.oldPrice.toLocaleString()}
                            </span>
                        </div>
                        {/* Rating Section */}
                        <div className="flex items-center gap-2">
                            <div className="flex items-center">
                                {Array.from({ length: 5 }, (_, i) => {
                                    const fullStars = Math.floor(product.rating);
                                    const hasHalfStar = product.rating % 1 !== 0;

                                    if (i < fullStars) {
                                        return <i key={i} className="bx bxs-star text-yellow-400 text-sm"></i>;
                                    } else if (i === fullStars && hasHalfStar) {
                                        return (
                                            <i
                                                key={i}
                                                className="bx bxs-star-half text-sm"
                                                style={{
                                                    color: "yellow",
                                                    background: "linear-gradient(to right, #facc15 50%, #9CA3AB 50%)",
                                                    WebkitBackgroundClip: "text",
                                                    WebkitTextFillColor: "transparent"
                                                }}
                                            />
                                        );
                                    } else {
                                        return <i key={i} className="bx bxs-star text-gray-400 text-sm"></i>;
                                    }
                                })}
                            </div>
                            <span className="text-xs text-gray-600">({product.reviews})</span>
                        </div>
                    </div>

                </SwiperSlide>
            ))}
        </Swiper>
    );
});

export default FlashSalesCarousel;
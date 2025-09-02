import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams } from "react-router";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { addToCart } from "../redux/cartSlice";
import { LuEye } from 'react-icons/lu';
import { useDispatch, useSelector } from "react-redux";
import CountdownTimer from "../components/Countdown";
import WithSpinner from "../components/WithSpinner";
import { getProducts } from "../redux/productSlice";



const AllProducts = () => {
    const { categoryId } = useParams();
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products);
    

    const handleAddToCart = (products) => {
        dispatch(addToCart(products))
    }

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const filteredProducts = products.filter((product) => product.category === categoryId);
    

    return (
        <>
            <Navbar />
            <div className="max-w-[1200px] mx-auto">
                {/* <div> home </div> */}
                {filteredProducts.length ? (
                    <div className=" p-1 w-[100%]">
                        <WithSpinner>
                        <div className="flex py-3 gap-4 items-center">
                            <div className="h-[40px] w-[20px] rounded bg-orange-700" />
                            <h1 className="text-orange-700 text-xl font-bold">{categoryId}</h1>
                        </div>

                            {/* FlashSales */}
                            {categoryId === 'Flash Sales' && (
                                <CountdownTimer targetDate="2025-07-01T00:00:00" />
                            )}

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                                {filteredProducts.map(product => (
                                    <div>
                                        {product.category === 'Flash Sales' && (
                                            <>
                                                <div className="bg-purple-200 py-4 px-7 relative">
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
                                                    <div className="h-[15vh] sm:h-[35vh] md:h-[45vh] lg:h-[45vh] flex items-center justify-center">
                                                        <img
                                                            src={product.image}
                                                            alt={product.title}
                                                            className="object-contain h-full w-auto lg:p-7 p-4"
                                                        />
                                                    </div>
                                                </div>
                                                <button onClick={() => handleAddToCart(product)} className="w-full flex justify-center cursor-pointer relative bottom-12">
                                                    <div className="w-full bg-black text-white rounded flex items-center justify-center">
                                                        <p className="p-3">Add to Cart</p>
                                                    </div>
                                                </button>

                                                <div className="relative bottom-9">
                                                    <h4 className="text-black font-semibold">{product.title}</h4>
                                                    <div className="flex gap-3">
                                                        <p className="text-red-500">₦{product.price.toLocaleString()}</p>
                                                        <p className="text-gray-500 line-through">₦{product.oldPrice.toLocaleString()}</p>
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
                                                </div>
                                            </>
                                        )}

                                        {(product.category === 'This Month' || product.category === "Our Products") && (
                                            <div className=" bg-white h-auto ">
                                                <div className="relative ">
                                                    <Link to="#wishlist">
                                                        <div className=" absolute top-3 right-1 md:right-3 md:top-4 bg-white md:w-9 md:h-9 w-7 h-7 rounded-full flex items-center justify-center z-10">
                                                            <i className="bx bx-heart text-[20px]  text-gray-700"></i>
                                                        </div>
                                                    </Link>
                                                    <Link to={`/product_detail/${product.id}`}>
                                                        <div className="rounded-full bg-white w-7 h-7 md:w-9 md:h-9 md:right-3 md:top-[60px] flex items-center justify-center absolute top-11 right-1">
                                                            <LuEye style={{
                                                                stroke: 'black',
                                                                fill: 'white',
                                                                strokeWidth: 2,
                                                                width: '20px',
                                                                height: '20px'
                                                            }} />
                                                        </div>
                                                    </Link>
                                                </div>

                                                <div className="bg-gray-100 h-[15vh] sm:h-[35vh] md:h-[45vh] lg:h-[45vh] flex items-center justify-center">
                                                    <img
                                                        src={product.image}
                                                        alt={product.title}
                                                        className="object-contain h-full w-auto lg:p-7 p-4"
                                                    />
                                                </div>

                                                <div className="mt-2 text-sm flex flex-col justify-center">
                                                    <Link to="#product_detail">
                                                        <p className="font-semibold flex text-sm text-start text-center">{product.title}</p>
                                                    </Link>
                                                    <div className="flex gap-2 items-center">
                                                        <span className="text-red-500 font-semibold">${product.price.toLocaleString()}</span>
                                                        {product.oldPrice && (
                                                            <span className="line-through text-gray-400 text-xs">${product.oldPrice.toLocaleString()}</span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex">
                                                            {Array.from({ length: 5 }, (_, i) => {
                                                                const fullstars = Math.floor(product.rating);
                                                                const hasHalfStar = product.rating % 1 !== 0;

                                                                if (i < fullstars) {
                                                                    return <i className="bx bxs-star text-yellow-400 text-sm"></i>;
                                                                } else if (i === fullstars && hasHalfStar) {
                                                                    return (
                                                                        <i className="bx bxs-star-half text-sm"
                                                                            style={{ color: "yellow", background: "linear-gradient(to right, #facc15 50%,  #9CA3AF 50%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                                                                        ></i>
                                                                    );
                                                                } else {
                                                                    return <i className="bx bxs-star text-gray-400 text-sm"></i>
                                                                }
                                                            })}
                                                        </div>
                                                        <div className="text-sm text-gray-600">({product.reviews})</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </WithSpinner>
                    </div>


                ) : (
                    <p>No products found in this category.</p>
                )}
            </div >
            <Footer />
        </>
    )
}
export default AllProducts
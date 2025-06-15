import { useParams, Link } from "react-router-dom";
import defaultProducts from "../data/product";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { LuEye } from 'react-icons/lu';
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { updateQuantity, addToCart } from "../redux/cartSlice";




const ProductDetail = () => {
    const { id } = useParams();
    const product = defaultProducts.find(p => p.id.toString() === id);
    const [selectedSize, setSelectedSize] = useState(null);
    // const [count, setCount] = useState(1);
    const sizes = ['XS', 'S', 'M', 'L', 'XL']
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.items);

    const cartItem = cart.find(i => i.id === product.id);
    const quantity = cartItem ? cartItem.quantity : 0;


    if (!product) return <div className="p-6">Product not found</div>



    const handleIncrease = () => {
        const cartItem = cart.find(i => i.id === product.id);

        if (!cartItem) {
            dispatch(addToCart(product));
        } else {
            dispatch(updateQuantity({
                productId: product.id,
                quantity: cartItem.quantity + 1
            }));
        }
    };

    const handleDecrease = () => {
        const cartItem = cart.find(i => i.id === product.id);

        if (cartItem && cartItem.quantity > 0) {
            dispatch(updateQuantity({
                productId: product.id,
                quantity: cartItem.quantity - 1
            }));
        }
    };

    // console.log("Quantity in Redux:", quantity);

    const relatedItems = defaultProducts.filter(p => p.mainCategory === product.mainCategory && p.id !== product.id);



    return (
        <>
            <Navbar />
            <div className="p-5 flex justify-center pt-[260px] lg:pt-[140px] ">
                <div className="flex px-3 lg:px-7 gap-5 flex-wrap lg:flex-nowrap">
                    <div className="flex gap-4 w-full justify-center">
                        <div className="flex flex-col space-y-3 max-w-[10.5vw] sm:w-[20vw] md:w-[33.333vw] lg:max-h-[24vh]">
                            {[...Array(3)].map((_, i) => (
                                <img
                                    key={i}
                                    src={product.image}
                                    alt={product.title}
                                    className=" md:h-full w-full object-cover rounded cursor-pointer border"
                                />
                            ))}
                        </div>
                        <div className="max-w-full  sm:w-[20vw] md:w-[33.333vw] lg:max-w-1/2">
                            <img src={product.image} alt={product.title} className="w-full object-cover" />
                        </div>
                    </div>


                    <div className="flex flex-col w-full gap-2">
                        <h4 className="font-semibold">{product.title}</h4>
                        <div className="flex">
                            <div className="flex items-center justify-center space-x-1">
                                <p className="text-sm text-gray-600">( {product.reviews} Reviews )</p>
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
                            </div>
                            <p className="text-green-400">| In Stock</p>
                        </div>
                        <p className="text-red-500">${product.price}</p>
                        <p>{product.description || "No descriptions available."}</p>
                        <div className="bg-black h-[0.5px] w-full my-3 "></div>
                        {/* <p>colors</p> */}
                        <div className="flex items-center py-3">
                            <p className="mr-3">Size: </p>
                            <div className="gap-2 flex">
                                {sizes.map(size => (
                                    <div
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`h-7 w-7 border flex items-center justify-center cursor-pointer rounded ${selectedSize === size ? "bg-orange-600 text-white border-black" : "border-gray-400"}`}>{size}</div>
                                ))}
                            </div>
                        </div>


                        <div className="flex gap-4">
                            <div className="flex items-center  justify-center gap-1">
                                <button onClick={() => handleDecrease()} className="px-2 h-8 border-gray-200 border rounded">-</button>
                                <div className="flex h-8 text-center justify-center border border-gray-200">
                                    <input
                                        type="number"
                                        min="0"
                                        max="25"
                                        readOnly
                                        value={quantity}
                                        className=" focus:outline-none flex text-center"
                                    />
                                </div>
                                <button onClick={() => handleIncrease()} className="px-2 h-8 border border-gray-200 rounded">+</button>
                            </div>
                            <div className="flex space-x-4">
                                <Link to="/checkout" className="flex px-4 pb-1 pt-1 text-center text-white rounded border bg-orange-600">Buy Now</Link>
                                <Link to="/countwishlist" className="border border-gray-300 flex justify-center p-1">
                                    <i className="bx bx-heart bx-flip-horizontal text-2xl text-[#837979] flex text-center" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="px-9 flex flex-col gap-2 mt-6">
                <div className="flex gap-3 items-center mb-4">
                    <div className="h-[40px] w-[18px] rounded bg-orange-700" />
                    <h5 className="text-orange-700 font-bold">Related Items</h5>
                </div>
                    {/* relatedItems */}
                <div className="w-full overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar ">
                    <div className="flex w-max  ">
                        {relatedItems.map((relatedProduct) => (
                            <div
                                key={relatedProduct.id}
                                className="w-[38vw] sm:w-[28vw] md:w-[33.333vw] lg:w-[23vw] snap-start px-3 mt-2" >
                                <div className=" bg-white h-auto ">
                                    <div className="relative ">
                                        <Link to="#wishlist">
                                            <div className=" absolute top-3 right-1 md:right-3 md:top-4 bg-white md:w-9 md:h-9 w-7 h-7 rounded-full flex items-center justify-center z-10">
                                                <i className="bx bx-heart text-[20px]  text-gray-700"></i>
                                            </div>
                                        </Link>
                                        <Link to={`/product_detail/${relatedProduct.id}`}>
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
                                            src={relatedProduct.image}
                                            alt={relatedProduct.title}
                                            className="object-contain h-full w-auto lg:p-7 p-4"
                                        />
                                    </div>

                                    <div className="mt-2 text-sm flex flex-col justify-center">
                                        <Link to="#product_detail">
                                            <p className="font-semibold flex text-sm text-start text-center">{relatedProduct.title}</p>
                                        </Link>
                                        <div className="flex gap-2 items-center">
                                            <span className="text-red-500 font-semibold">${relatedProduct.price}</span>
                                            {product.oldPrice && (
                                                <span className="line-through text-gray-400 text-xs">${relatedProduct.oldPrice}</span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="flex">
                                                {Array.from({ length: 5 }, (_, i) => {
                                                    const fullstars = Math.floor(relatedProduct.rating);
                                                    const hasHalfStar = relatedProduct.rating % 1 !== 0;

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
                                            <div className="text-sm text-gray-600">({relatedProduct.reviews})</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            </div>
            <div className="pt-6">
                <Footer />
            </div>
        </>
    )
}

export default ProductDetail
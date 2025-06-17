import { useParams } from "react-router-dom";
import defaultProducts from "../data/product";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { LuEye } from 'react-icons/lu';


const CategoryPage = () => {
    const { mainCategory } = useParams();

    const products = defaultProducts.filter(
        (product) =>
            product.mainCategory &&
            product.mainCategory.toLowerCase() === mainCategory.toLowerCase()
    );

    return (
        <>
            <Navbar />

            <div className="p-6 pt-[245px] lg:pt-[130px] gap-3 lg:flex-row flex-col flex lg:flex-nowrap flex-wrap lg:gap-6">
                <aside className=" flex  flex-col border-r-0 sm:border-r-2 px-3 lg:w-[15vw]">
                    {[
                        "Women's Fashion", "Men's Fashion", "Electronics", "Gaming",
                        "Baby's and Toys", "Groceries and pets", "Health and beauty", "Lifestyle", "Sports"
                    ].map((category, idx) => (
                        <Link key={idx} to={`/category/${encodeURIComponent(category)}`}>
                            <p className="cursor-pointer hover:text-orange-500">{category}</p>
                        </Link>
                    ))}
                </aside>
                <div>
                    <h2 className="text-2xl font-bold mb-4">{mainCategory}</h2>
                    {products.length === 0 ? (
                        <p className="text-gray-500">No products found in this category.</p>
                    ) : (
                        <div className="flex flex-wrap ">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="w-[40vw] sm:w-[28vw] md:w-[33.333vw] lg:w-[23vw] snap-start px-3 mt-2">
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
                                                <span className="text-red-500 font-semibold">${product.price}</span>
                                                {product.oldPrice && (
                                                    <span className="line-through text-gray-400 text-xs">${product.oldPrice}</span>
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
                                                <div className="text-sm text-gray-600">{product.reviews}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
            <Footer />
        </>
    );
};

export default CategoryPage;

import { Link } from "react-router-dom";
import { LuEye } from 'react-icons/lu';
import { useSelector } from "react-redux";



const ThisMonth = () => {
    const { products } = useSelector((state) => state.products);
    const items = products.filter(p => p.category === 'This Month')
 

    return (
        //  bg-gray-100    #f3f4f6 
        <>
            <div className="w-full overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar ">
                <div className="flex w-max  ">
                    {items.map((product) => (
                        <div
                            key={product.id}
                            className="w-[38vw] sm:w-[28vw] md:w-[33.333vw] lg:w-[23vw] snap-start px-3 mt-2"
                        >
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
                                        <span className="text-red-500 font-bold">₦{product.price.toLocaleString()}</span>
                                        
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
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}

export default ThisMonth;
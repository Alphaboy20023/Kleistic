import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router";


const Wishlist = () => {


    return (
        <>
            <Navbar />
            <div className="pt-[150px] lg:pt-[110px]">
                <main className="">
                    <div className="flex justify-between items-center p-3 ">
                        <p className="text-2xl">Wishlist ()</p>
                        <Link to="#Cart" className="border-gray border p-2 border-shadow text-xl">Move All To Cart</Link>
                    </div>
                    <div>
                        {/* stuff here */}
                    </div>

                    <section className="flex justify-between">
                        <div className="flex gap-2 items-center px-5 flex-row">
                            <div className="h-[40px] w-[20px] rounded bg-orange-700" />
                            <h5 className="text-orange-700 font-bold">Just For You</h5>
                        </div>
                        <div>
                            <Link to="#product_detail" className="border-gray border p-2 border-shadow text-xl">See All</Link>
                        </div>
                    </section>
                </main>
            </div>
            <Footer />
        </>
    )
}

export default Wishlist
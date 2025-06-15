import { useRef } from "react";
import { Link } from "react-router-dom";
import HeroCarousel from "../components/HeroCarousel";
import CountdownTimer from "../components/Countdown";
import FlashSalesCarousel from "../components/FlashSalesCarousel";
import Navbar from "../components/Navbar";
import ThisMonth from "../components/ThisMonth";
import Footer from "../components/Footer";
import CountTimer from "../components/counter2";
import OurProducts from "../components/ourProducts";
import defaultProducts from "../data/product";
import { FaTruckFast } from "react-icons/fa6";
import { RiCustomerServiceFill } from "react-icons/ri";
import { MdOutlineVerifiedUser } from "react-icons/md";
// import SearchBtn from "../components/SearchButton";



const LandingPage = () => {
  const nextRef = useRef(null);
  const prevRef = useRef(null);
  // const { searchTerm } = useSearch();

  // const filteredProducts = defaultProducts.filter((product) =>
  //   product.title.toLowerCase().includes(searchTerm.toLowerCase()) );

  const flashSales = defaultProducts.filter(p => p.category === "Flash Sales");


  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <main className="pt-[220px] lg:pt-[125px]">

        <div className="py-7 flex flex-col sm:flex-row gap-8 sm:pl-4 sm:py-4 lg:mt-5 max-w-[1400px] mx-auto">
          <aside className="ml-8 flex flex-col border-r-0 sm:border-r-2 px-6">
            {[
              "Women's Fashion", "Men's Fashion", "Electronics", "Gaming",
              "Baby's and Toys", "Groceries and pets", "Health and beauty", "Lifestyle", "Sports"
            ].map((category, idx) => (
              <Link key={idx} to={`/category/${encodeURIComponent(category)}`}>
                <p className="cursor-pointer hover:text-orange-500">{category}</p>
              </Link>
            ))}
          </aside>
          <HeroCarousel />
        </div>

        {/* Main Content */}
        <main className="px-4 sm:px-8 lg:px-16 mx-auto max-w-[1400px]">
          {/* Flash Sales Section */}
          <section className="my-10">
            <div className="flex gap-2 items-center">
              <div className="h-[40px] w-[20px] rounded bg-orange-700" />
              <h5 className="text-orange-700 font-bold">Today's</h5>
            </div>

            <div className="flex items-center gap-8 flex-wrap">
              <p className="font-bold text-3xl">Flash Sales</p>
              <CountdownTimer targetDate="2025-07-01T00:00:00" />

              <div className="flex items-center gap-2 ml-auto">
                <button ref={prevRef}>
                  <i className='bx bx-left-arrow-circle text-[40px] text-gray-400'></i>
                </button>
                <button ref={nextRef}>
                  <i className='bx bx-right-arrow-circle text-[40px] text-gray-400'></i>
                </button>
              </div>
            </div>

            <FlashSalesCarousel nextEl={nextRef} prevEl={prevRef} products={flashSales} />

            <div className="flex justify-center p-4">
              <Link to="/all_products/Flash Sales" className="bg-orange-600 px-4 py-2 text-white">
                View all Products
              </Link>
            </div>
          </section>

          {/* This Month Section */}
          <section className="my-10">
            <div className="flex gap-3 items-center">
              <div className="h-[40px] w-[20px] rounded bg-orange-700" />
              <h5 className="text-orange-700 font-bold">This Month</h5>
            </div>
            <div className="flex items-center flex-wrap justify-between">
              <p className="font-bold text-3xl m-1">Best Selling Products</p>
              <Link to="/all_products/This Month" className="bg-orange-700 px-6 py-2 text-white m-1">
                View all
              </Link>
            </div>
            <ThisMonth />
          </section>

          {/* Music Promo Section */}
          <section className="flex flex-col sm:flex-row items-center bg-black p-6 rounded-lg mb-10">
            <div className=" w-full sm:w-1/2 p-6">
              <p className="text-green-400 text-xl font-semibold">Categories</p>
              <h2 className="text-2xl sm:text-5xl my-6 text-white">Enhance Your Music Experience</h2>
              <CountTimer targetedDate="2025-07-22T23:59:35" />
              <Link>
                <div className="p-3 bg-green-600 w-1/2 mt-5 text-center">
                  <p className="text-white text-xl">Buy Now</p>
                </div>
              </Link>
            </div>
            <div className="relative h-[450px] w-full sm:w-1/2 flex justify-center items-center overflow-hidden">
              <div className="absolute inset-0 z-0">
                <div className="h-full bg-[radial-gradient(circle,_rgba(199,199,199,0.29)_30%,_rgba(0,0,0,1)_100%)]" />
              </div>
              <img src="/img/jbl-xtreme3.webp" alt="Speaker" className="relative z-10 w-full max-w-md" />
            </div>
          </section>

          {/* Our Products */}
          <section className="my-10">
            <div className="flex gap-3 items-center">
              <div className="h-[40px] w-[20px] rounded bg-orange-700" />
              <h5 className="text-orange-700 font-bold">Our Products</h5>
            </div>
            <p className="font-bold text-3xl py-2 m-1">Explore Our Products</p>
            <OurProducts />
            <div className="flex justify-center p-8">
              <Link to="/all_products/Our Products" className="bg-orange-700 px-4 py-2 text-white">
                View all Products
              </Link>
            </div>
            <div className="w-full 2px bg-gray-500 text-2xl"></div>
          </section>

          {/* Featured Section */}
          <section className="my-10">
            <div className="flex gap-3 items-center">
              <div className="h-[40px] w-[20px] rounded bg-orange-700" />
              <h5 className="text-orange-700 font-bold">Featured</h5>
            </div>
            <p className="font-bold text-3xl py-2">New Arrival</p>


            {/* w-[38vw] sm:w-[28vw] md:w-[33.333vw] lg:w-[23vw] */}
            <div className="flex justify-center mt-3 gap-3">
              <div className="w-full">
                <img src="/img/PS5.jpg" alt="PS5" className="w-[58vw] sm:w-[60vw] md:w-[55vw] lg:w-[43.4vw] object-cover" />
              </div>
              <div className="flex flex-col lg:gap-5 gap-3 w-full">
                <img src="/img/Women's.jpg" alt="Women's Fashion" className="w-[46vw] sm:w-[49vw] md:w-[42vw] lg:w-[43vw]  object-cover" />

                <div className="flex gap-2">
                  <img src="/img/amazon_speakers.jpg" alt="amazon_speakers" className="w-[20.5vw] sm:w-[22vw] md:w-[210w] lg:w-[21.7vw]  object-cover" />
                  <img src="/img/Gucci_perfume.jpg" alt="gucci_perfume" className="w-[20.5vw] sm:w-[22vw] md:w-[21vw] lg:w-[21vw]  object-cover" />
                </div>
              </div>

            </div>
          </section>


          <section className="flex justify-center gap-4 flex-wrap">
            <div className="flex flex-col items-center m-4">
              <div className="rounded-full bg-gray-200 p-4">
                <div className="rounded-full bg-black p-4">
                  <FaTruckFast className="text-white text-2xl" />
                </div>
              </div>
              <h2 className="font-bold text-[18px]">FREE AND FAST DELIVERY</h2>
              <p className="text-sm font-semibold">Free delivery for all orders over $150</p>
            </div>

            <div className="flex flex-col items-center m-4">
              <div className="rounded-full bg-gray-200 p-4">
                <div className="rounded-full bg-black p-4">
                  <RiCustomerServiceFill className="text-white text-2xl" />
                </div>
              </div>
              <h2 className="font-bold text-[18px]">24/7 CUSTOMER SERVICE</h2>
              <p className="text-sm font-semibold">Friendly 24/7 customer support</p>
            </div>
            <div className="flex flex-col items-center m-4">
              <div className="rounded-full bg-gray-200 p-4">
                <div className="rounded-full bg-black p-4">
                  <MdOutlineVerifiedUser className="text-white text-2xl" />
                </div>
              </div>
              <h2 className="font-bold text-[18px]">MONEY BACK GUARANTEE</h2>
              <p className="text-sm font-semibold">we return money within 30 days</p>
            </div>
          </section>

        </main>
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;

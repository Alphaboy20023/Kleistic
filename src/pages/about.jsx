import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaTruckFast } from "react-icons/fa6";
import { RiCustomerServiceFill } from "react-icons/ri";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { GiFamilyHouse } from "react-icons/gi";
import { BiDollarCircle } from "react-icons/bi";
import AboutCarousel from "../components/AboutCarousel";
import { FaSackDollar } from "react-icons/fa6";
import { GiShoppingBag } from "react-icons/gi";

const About = () => {
    return (
        <>
            <Navbar />
            <div className="flex justify-center flex-wrap lg:flex-nowrap items-center pt-[135px] lg:pt-[120px] gap-5">
                <div className="w-full space-y-9 lg:pl-[120px] p-5">
                    <h1 className="text-6xl font-semibold">Our Story</h1>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry. Lorem Ipsum has been the industry's standard dummy text ever since the
                        1500s, when an unknown printer took a galley of type and scrambled it 1960s.
                        Launced in 2015, <span className="text-blue-700 font-semibold">KLEISTIC</span> is South America's premier online shopping makterplace with an active presense in Brazil.
                        Supported by wide range of tailored marketing, data and service solutions, <span className="text-blue-700 font-semibold">KLEISTIC</span> has 10,500 sallers and 300 brands and serves 3 millioons customers across the region.
                    </p>
                </div>
                <div className="w-full pb-8">
                    <img src="/img/about.jpg" alt="about_picture" />
                </div>
            </div>

            <div className="flex justify-center gap-5 pb-6 flex-wrap">
                <div className="border flex border-gray-200 flex shadow-lg justify-center items-center flex-col p-5 space-y-1">
                    <div className="rounded-full bg-gray-300 p-4">
                        <GiFamilyHouse className="text-4xl" />
                    </div>
                    <p className="font-bold text-2xl">10.5k</p>
                    <p className="font-semibold">sellers active on our site</p>
                </div>
                <div className="border flex border-gray-200 shadow-lg flex justify-center items-center flex-col p-5 space-y-1">
                    <div className="rounded-full bg-gray-300 p-4">
                        <BiDollarCircle className="text-4xl" />
                    </div>
                    <p className="font-bold text-2xl">25.5k</p>
                    <p className="font-semibold">Monthly product Sale</p>
                </div>
                <div className="border flex border-gray-200 shadow-lg flex justify-center items-center flex-col p-5">
                    <div className="rounded-full bg-gray-300 p-4">
                        <GiShoppingBag className="text-4xl"/>
                    </div>
                    <p className="font-bold text-2xl">35.5k</p>
                    <p className="font-semibold">Customer active on our site</p>
                </div>
                <div className="border flex border-gray-200 shadow-lg flex justify-center items-center flex-col p-5">
                    <div className="rounded-full bg-gray-300 p-4">
                        <FaSackDollar className="text-4xl" />
                    </div>
                    <p className="font-bold text-xl">40k</p>
                    <p className="font-semibold">Annual gross sale</p>
                </div>
            </div>
            <AboutCarousel />
            <div className="flex justify-center pt-5">
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
            </div>
            <Footer />
        </>
    )
}
export default About
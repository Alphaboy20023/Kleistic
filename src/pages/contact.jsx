import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineForwardToInbox } from "react-icons/md";

const Contact = () => {
    return (
        <>
            <Navbar />
            <div className="lg:pt-[150px] pt-[170px] h-full p-4 flex justify-center items-center gap-5 pb-5 flex-wrap lg:flex-nowrap">
                <div className=" shadow-lg p-5 h-full space-y-5">
                    <h1 className="text-2xl font-semibold flex items-center gap-2"> <span><IoCallOutline className="text-orange-600 font-bold" /> </span> Call us</h1>
                    <p>We are available 24/7, 7 days a week.</p>
                    <h5>phone: +880161163836</h5>

                    <div className="border 2px bg-black w-full"></div>

                    <h1 className="text-2xl font-semibold flex items-center gap-2"> <span><MdOutlineForwardToInbox className="text-orange-600 font-bold" /></span>Write to us</h1>
                    <p>Fill our form and will contact you within 24 hours</p>
                    <address>Email: customer@kleistic.com</address>
                    <address>Email: support@kleistic.com</address>
                </div>
                <form action="">
                    <div className=" space-y-4 flex flex-col h-full shadow-lg p-5">
                        <div className="flex flex-wrap gap-4">
                            <input type="text" placeholder="Your Name*" className="p-2 rounded bg-gray-100 focus:outline-none border border-gray-200 w-full sm:w-auto flex-1" required />
                            <input type="text" placeholder="Your Email*" className="p-2 rounded bg-gray-100 focus:outline-none border border-gray-200 w-full sm:w-auto flex-1" required />
                            <input type="text" placeholder="Your Phone*" className="p-2 rounded bg-gray-100 focus:outline-none border border-gray-200 w-full sm:w-auto flex-1" required />
                        </div>
                        <div>
                            <textarea
                                id="orderNotes"
                                placeholder="Your Message"
                                rows="4"
                                className="p-2 rounded w-full h-40 bg-gray-100 border focus:outline-none"
                            />
                        </div>
                        <div className="bg-green-400 p-3 text-white lg:w-[10vw] ml-auto">
                            <button className="text-center">Send Message</button>
                        </div>
                    </div>
                </form>
            </div>
            <Footer />

        </>
    )
}

export default Contact
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
    return (
        <>
            <Navbar />
            <div className="lg:pt-[180px] pt-[250px] h-full p-4 flex justify-center items-center gap-5 pb-5 flex-wrap lg:flex-nowrap">
                <div className=" shadow-lg p-5 h-full space-y-5">
                    <p>Call us</p>
                    <p>We are available 24/7, 7 days a week.</p>
                    <address>phone: +880161163836</address>

                    <div className="border 2px bg-black w-full"></div>

                    <p>Write to us</p>
                    <p>Fill our form and will contact you within 24 hours</p>
                    <address>Email: customer@kleistic.com</address>
                    <address>Email: support@kleistic.com</address>
                </div>
                <div className=" space-y-4 flex flex-col h-full shadow-lg p-5">
                    <div className="space-y-5 lg:space-x-5">
                        <input type="text" placeholder="Your Name*" className="p-2 rounded bg-gray-200 focus:outline-none border border-gray-200" required />
                        <input type="text" placeholder="Your Email*" className="p-2 rounded bg-gray-200 focus:outline-none border border-gray-200" required />
                        <input type="text" placeholder="Your Phone*" className="p-2 rounded bg-gray-200 focus:outline-none border border-gray-200" required />
                    </div>
                    <div>
                        <input type="description" placeholder="Your Message" className="p-2 bg-gray-200 focus:outline-none w-full" />
                    </div>
                    <div className="bg-green-400 p-3 text-white lg:w-[10vw] ml-auto">
                        <p className="text-center">Send Message</p>
                    </div>
                </div>
            </div>
            <Footer />

        </>
    )
}

export default Contact
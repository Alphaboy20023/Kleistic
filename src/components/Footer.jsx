import { Link } from "react-router-dom";
import { IoMdSend } from "react-icons/io";

const Footer = () => {

    return (
        <>
            <footer className="mt-3 bg-black text-white w-full px-4 py-6">
                <div className="grid grid-cols-2 gap-2 lg:gap-6 max-w-7xl mx-auto sm:grid-cols-2 md:grid-cols-3 lg:flex lg:justify-center">

                    <section className=" text-[13px] lg:text-[15px] ">
                        <h1 className="text-xl font-bold mb-1 ">KLEISTIC</h1>
                        <h5 className="font-semibold ">Subscribe</h5>
                        <p>Get 10% off your first order</p>
                        <div className="relative w-full max-w-xs mt-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 bg-black text-white border border-white rounded-md placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
                            />
                            <IoMdSend className="absolute right-3 top-1/2 -translate-y-1/2 text-white cursor-pointer" />
                        </div>
                    </section>

                    <section className=" text-[13px] lg:text-[15px] ">
                        <h1 className="lg:text-2xl text-xl font-bold mb-1">Support</h1>
                        <address><span className="font-semibold">Address:</span> 42, Bishop Oluwole Street,<br /> Victoria Island, Lagos</address>
                        <address>
                            <a href="mailto:kleistic@gmail.com" className="hover:underline">
                                <span className="font-semibold">Mail:</span> kleistic@gmail.com
                            </a>
                        </address>
                        <address ><span className="font-semibold">Phone:</span> +234-01-4935627</address>
                    </section>

                    <section className="flex flex-col  text-[13px] lg:text-[15px] ">
                        <h1 className=" font-bold mb-1 lg:text-2xl text-xl">Account</h1>
                        <Link>My account</Link>
                        <Link to="/SignUp">Login/Register</Link>
                        <Link>Cart</Link>
                        <Link>Wishlist</Link>
                        <Link>Shop</Link>
                    </section>

                    <section className=" text-[13px] lg:text-[15px] ">
                        <h1 className=" font-bold mb-1 lg:text-2xl text-xl">Quick Link</h1>
                        <p>Privacy Policy</p>
                        <p>Terms of Use</p>
                        <Link>FAQ</Link>
                        <Link>Contact</Link>
                    </section>
                    
                    <section className=" mb-2 col-span-2 flex flex-col items-center text-center sm:col-span-2 md:col-span-1 md:col-start-2  text-[13px] lg:text-[15px] ">
                        <h1 className="lg:text-2xl text-xl font-bold">Download App</h1>
                        <p>Save $3 with app, new Users only</p>
                        <div className="flex gap-3 mt-2 justify-center items-center">
                            <img src="/img/Qrcode 1.jpg" alt="qrcode" className="w-16 h-16 object-cover" />
                            <div className="flex flex-col gap-2">
                                <img src="/img/download-appstore.jpg" alt="appstore" className="w-20" />
                                <img src="/img/playstore.jpg" alt="playstore" className="w-20" />
                            </div>
                        </div>
                    </section>
                </div>

                <p className="text-center mt-6 text-sm">© Kleistic 2025. All rights reserved.</p>
            </footer>

        </>
    )
}

export default Footer
import Navbar from "../components/Navbar";
import { Link } from "react-router";
import Footer from "../components/Footer";



const Checkout = () => {


    // const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0.00)
    // const shipping = subtotal > 200 ? 25 : 0;

    // const total = subtotal + shipping

    return (
        <>

            <Navbar />
            <div className="lg:pt-[160px] pt-[240px] md:pt-[200px] sm:pt-[150px] p-4 gap-2 lg:p-9 flex lg:flex-nowrap flex-wrap md:flex-nowrap sm:flex-nowrap lg:pl-[80px] lg:gap-7">
                <div className="space-y-5 w-full max-w-7xl">
                    <h1 className="text-3xl font-semibold">Billing Details</h1>
                    <div className="flex flex-col">
                        <label htmlFor="FirstName" className="text-gray-700">First Name</label>
                        <input type="FirstName" className="p-1 rounded bg-gray-300 border focus:outline-none" required />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="CompanyName" className="text-gray-700">Company Name</label>
                        <input type="CompanyName" className="p-1 rounded bg-gray-300 border focus:outline-none " />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="StreetAddress" className="text-gray-700">Street Address</label>
                        <input type="StreetAddress" className="p-1 rounded bg-gray-300 border focus:outline-none " required />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="Town/City" className="text-gray-700">Town/City</label>
                        <input type="Town/City" className="p-1 rounded bg-gray-300 border focus:outline-none " required />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="PhoneNumber" className="text-gray-700">Phone Number</label>
                        <input type="PhoneNumber" className="p-1 rounded bg-gray-300 border focus:outline-none " required />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-gray-700">Email Address</label>
                        <input type="email" className="p-1 rounded bg-gray-300 border focus:outline-none " required />
                    </div>
                    <p className="max-text-xl"><input type="checkbox" /> save this information for faster check-out next time.</p>
                </div>

                <section className="pt-[80px] w-full lg:px-9 px-4  space-y-5">
                    <div className="flex">
                        <img src="checkout_image" alt="checkpout_image" className="px-2" />
                        <p>Name</p>
                        <p className="flex ml-auto">Price</p>
                    </div>
                    <div className=" flex justify-between border-b border-gray-300 p-2">
                        <p>Subtotal: </p>
                        <p>$SubtotalPrice</p>
                    </div>
                    <div className=" flex justify-between border-b border-gray-300 p-2">
                        <p>Shipping: </p>
                        <p>$</p>
                    </div>
                    <div className=" flex justify-between border-b border-gray-300 p-2">
                        <p>Total: </p>
                        <p>$TotalPrice</p>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center space-x-4">
                            <input type="radio" id="bank" name="paymentMethod" value="bank" />
                            <label htmlFor="bank">Bank</label>
                            <img
                                src="/img/payments.png"
                                alt="payment_card_options"
                                className="h-6 w-auto"
                            />
                        </div>

                        <div className="flex items-center space-x-4">
                            <input type="radio" id="cod" name="paymentMethod" value="cash_on_delivery" />
                            <label htmlFor="cod">Cash on Delivery</label>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex space-x-5 h-10 ">
                            <input type="text" placeholder="coupon code"
                                className="focus:outline-none border border-gray-700 px-2"
                            />
                            <button className="bg-orange-600 text-center    text-[13px] lg:text-xl lg:text-lg px-3 text-white ">Apply Coupon</button>
                        </div>


                        <Link className="p-4 w-40 text-center text-white text-md bg-green-600 border rounded">Place Order</Link>
                    </div>

                </section>
            </div>
            <Footer />
        </>
    )
}

export default Checkout;
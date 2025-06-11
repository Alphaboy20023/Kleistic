import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Checkout = () => {
    const cartItems = useSelector((state) => state.cart.items);

    const subtotal = cartItems.reduce(
        (total, item) => total + item.price * (item.quantity || 1),
        0
    );
    const shipping = 25;
    const total = subtotal + shipping;

    return (
        <>
            <Navbar />
            <div className="lg:pt-[160px] pt-[240px] md:pt-[200px] sm:pt-[150px] p-4 gap-2 lg:p-9 flex lg:flex-nowrap flex-wrap md:flex-nowrap sm:flex-nowrap lg:pl-[80px] lg:gap-7">

                {/* Billing Form */}
                <div className="space-y-5 w-full max-w-7xl">
                    <h1 className="text-3xl font-semibold">Billing Details</h1>

                    {[
                        "First Name",
                        "Company Name",
                        "Street Address",
                        "Town/City",
                        "Phone Number",
                        "Email Address",
                    ].map((label) => (
                        <div className="flex flex-col" key={label}>
                            <label htmlFor={label} className="text-gray-700">
                                {label}
                            </label>
                            <input
                                type={label}
                                className="p-1 rounded bg-gray-300 border focus:outline-none"
                                required={label !== "Company Name"}
                            />
                        </div>
                    ))}

                    <p className="max-text-xl">
                        <input type="checkbox" /> save this information for faster checkout
                        next time.
                    </p>
                </div>

                <section className="pt-[80px] w-full lg:px-9 px-4 space-y-5">
                    <h2 className="text-xl font-bold">Order Summary</h2>
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between border-b pb-2"
                        >
                            <div className="flex items-center space-x-3">
                                <img
                                    src={item.image || "/img/placeholder.jpg"}
                                    alt={item.title}
                                    className="w-16 h-16 object-cover rounded"
                                />
                                <div>
                                    <p className="font-medium">{item.title}</p>
                                    <p className="text-sm text-gray-600">
                                        Qty: {item.quantity || 1}
                                    </p>
                                </div>
                            </div>
                            <p className="font-semibold">
                                ${(item.price * (item.quantity || 1)).toFixed(2)}
                            </p>
                        </div>
                    ))}

                    <div className="flex justify-between border-b border-gray-300 p-2">
                        <p>Subtotal:</p>
                        <p>${subtotal.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 p-2">
                        <p>Shipping:</p>
                        <p>${shipping.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 p-2 font-bold text-lg">
                        <p>Total:</p>
                        <p>${total.toFixed(2)}</p>
                    </div>

                    {/* Payment Method */}
                    <div className="flex flex-col space-y-4 pt-4">
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
                            <input
                                type="radio"
                                id="cod"
                                name="paymentMethod"
                                value="cash_on_delivery"
                            />
                            <label htmlFor="cod">Cash on Delivery</label>
                        </div>
                    </div>

                    {/* Coupon & Place Order */}
                    <div className="flex flex-col gap-4 pt-4">
                        <div className="flex space-x-5 h-10">
                            <input
                                type="text"
                                placeholder="coupon code"
                                className="focus:outline-none border border-gray-700 px-2"
                            />
                            <button className="bg-orange-600 text-white px-3 text-sm lg:text-lg">
                                Apply Coupon
                            </button>
                        </div>

                        <Link
                            to="#order-confirmation"
                            className="p-4 w-40 text-center text-white text-xl bg-green-600 border rounded"
                        >
                            Place Order
                        </Link>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default Checkout;

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { createOrder } from "../redux/orderSlice";

const Checkout = () => {
    const dispatch = useDispatch();
    const { loading, error, success } = useSelector((state) => state.orders);
    const cartItems = useSelector((state) => state.cart.items);

    const [formData, setFormData] = useState({
        firstName: "",
        companyName: "",
        shippingAddress: "",
        townCity: "",
        phoneNumber: "",
        emailAddress: "",
        paymentMethod: ""
    });

    const item_total = cartItems.filter(item => item.quantity > 0).reduce((total, item) => total + item.price * item.quantity, 0)
    const shipping = 25;
    const total = item_total + shipping;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleOrder = () => {
        const orderData = {
            shipping_address: formData.shippingAddress,
            payment_method: formData.paymentMethod,
            items: cartItems
                .filter(item => item.quantity > 0)
                .map(item => ({
                    product: item.id,
                    quantity: item.quantity
                }))
        };

        dispatch(createOrder(orderData));
    };

    const billingFields = [
        { label: "First Name", name: "firstName"},
        { label: "Company Name", name: "companyName"},
        { label: "Shipping Address", name: "shippingAddress", required: true },
        { label: "Town/City", name: "townCity"},
        { label: "Phone Number", name: "phoneNumber"},
        { label: "Email Address", name: "emailAddress"},
    ];

    const paymentMethods = [
        { id: "bank", value: "BANK", label: "Bank", hasImage: true },
        { id: "cod", value: "CASH ON DELIVERY", label: "Cash on Delivery", hasImage: false }
    ];

    return (
        <>
            <Navbar />
            <div className="lg:pt-[140px] pt-[160px] md:pt-[200px] sm:pt-[150px] p-4 gap-2 lg:p-9 flex lg:flex-nowrap flex-wrap md:flex-nowrap sm:flex-nowrap lg:pl-[80px] lg:gap-7">

                {/* Billing Form */}
                <div className="space-y-5 w-full max-w-7xl">
                    <h1 className="text-3xl font-semibold">Billing Details</h1>

                    {billingFields.map((field) => (
                        <div className="flex flex-col" key={field.name}>
                            <label htmlFor={field.name} className="text-gray-700">
                                {field.label}
                            </label>
                            <input
                                type="text"
                                id={field.name}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleInputChange}
                                className="p-1 rounded bg-gray-300 border focus:outline-none"
                                required={field.required}
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
                    {cartItems
                        .filter(item => item.quantity > 0)
                        .map((item) => (
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
                                    ₦{(item.price * (item.quantity || 1)).toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </p>
                            </div>
                        ))}

                    <div className="flex justify-between border-b border-gray-300 p-2">
                        <p>Subtotal:</p>
                        {/* <p>${item_total.toFixed(2)}</p> */}
                        <p>₦{item_total.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 p-2">
                        <p>Shipping:</p>
                        <p>₦{shipping.toLocaleString()}</p>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 p-2 font-bold text-lg">
                        <p>Total:</p>
                        <p>₦{total.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>

                    {/* Payment Method */}
                    <div className="flex flex-col space-y-4 pt-4">
                        {paymentMethods.map((method) => (
                            <div key={method.id} className="flex items-center space-x-4">
                                <input 
                                    type="radio" 
                                    id={method.id} 
                                    name="paymentMethod" 
                                    value={method.value}
                                    onChange={handleInputChange}
                                    checked={formData.paymentMethod === method.value}
                                />
                                <label htmlFor={method.id}>{method.label}</label>
                                {method.hasImage && (
                                    <img
                                        src="/img/payments.png"
                                        alt="payment_card_options"
                                        className="h-6 w-auto"
                                    />
                                )}
                            </div>
                        ))}
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

                        <button className="p-2 w-1/3 text-center text-white text-2xl bg-green-600 border rounded" onClick={handleOrder} disabled={loading} >
                            {loading ? "Placing Order..." : "Place Order"}
                        </button>
                        {error && <p style={{ color: "red" }} className="font-bold">{error}</p>}
                        {success && <p style={{ color: "green" }} className="font-bold">Order placed successfully!</p>}
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default Checkout;
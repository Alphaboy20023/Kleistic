import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, decreaseQuantity, clearCart } from "../redux/cartSlice";


const Cart = () => {

    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    


    const handleClearCart = () => {
        dispatch(clearCart())
    }

    const handleDecrease = (id) => {
        dispatch(decreaseQuantity(id))
    }

    const handleIncrease = (item) => {
        dispatch(addToCart(item))
    }

    const cartInfo = cartItems.filter(item => item.quantity > 0);

    // console.log(cartInfo);
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0.00)
    const shipping = subtotal > 200 ? 25 : 0;

    const total = subtotal + shipping

    return (
        <>
            <Navbar />
            <div>
                <main className="flex justify-center h-full max-w-6xl mx-auto py-11 flex-col gap-3">
                    <table className="w-full max-w-6xl mx-auto border-separate border-spacing-y-5">
                        <thead>
                            <tr className="bg-gray-100 border shadow">
                                <th className="px-4 py-3 text-left">Product</th>
                                <th className="px-4 py-3 text-left">Price</th>
                                <th className="px-4 py-3 text-left">Quantity</th>
                                <th className="px-4 py-3 text-left">Subtotal</th>
                                <th className="px-4 py-3 text-left"></th>
                            </tr>
                        </thead>
                        <tbody >
                            {cartInfo.length === 0 ? (
                                <tr>
                                    <td colSpan={5}> Your cart is empty</td>
                                </tr>
                            ) : (
                                cartInfo.map(item => (
                                    <tr key={item.id} className="border-t border shadow mt-4">
                                        <td className=" px-2 py-3 flex items-center gap-2 ">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className=" w-8 h-8  object-cover"
                                            />
                                            <span>{item.title}</span>
                                        </td>
                                        <td className="px-4 py-3">₦{item.price.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                        <td className=" py-3">
                                            <div className="flex items-center ">
                                                <button onClick={() => handleDecrease(item.id)} className="px-2 mr-3 border rounded">-</button>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max="25"
                                                    value={item.quantity}
                                                    readOnly
                                                    className="w-6 text-center focus:outline-none "
                                                />
                                                <button onClick={() => handleIncrease(item)} className="px-2 border rounded">+</button>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">₦{(item.price * item.quantity).toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                        <td className="px-4 py-3">
                                            <button onClick={() => handleDecrease(item.id)} className="text-red-600 font-bold">del</button>
                                        </td>
                                    </tr>
                                ))
                            )}

                        </tbody>
                    </table>

                    <div className="flex flex-col mb-6 p-3">
                        <div className="flex justify-between">
                            <Link to="/" className="border-gray border p-2 border-shadow text-xl rounded hover:bg-orange-600 hover:text-white">Return to Shopping</Link>
                            <button onClick={() => handleClearCart()} className="border-gray border p-2 rounded border-shadow text-xl hover:bg-orange-600 hover:text-white">Clear Cart</button>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 p-4 lg:p-1">
                        <div className="flex space-x-6 h-12">
                            <input type="text" placeholder="coupon code"
                                className="focus:outline-none border border-gray-700 px-3"
                            />
                            <button className="bg-orange-600  text-sm lg:text-lg py-4 p-3 lg:py-2 text-white">Apply Coupon</button>
                        </div>

                        <div className="border border-black lg:w-1/2 w-full  p-4 flex lg:ml-auto flex-col ">
                            <h2 className="font-bold text-2xl">Cart Total</h2>
                            <div className="font-semibold flex justify-between border-b border-gray-300 p-2">
                                <p>Subtotal:</p>
                                <p>₦{subtotal.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                            </div>
                            <div className="font-semibold flex justify-between border-b border-gray-300 p-2">
                                <p>Shipping:</p>
                                <p>₦{shipping.toFixed(2)}</p>
                            </div>
                            <div className="font-semibold flex justify-between border-b border-gray-300 p-2">
                                <p>Total:</p>
                                <p>₦{total.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                            </div>
                            <div className="mt-4 lg:w-1/2 flex justify-center ml-auto mr-auto">
                                {cartInfo.length > 0 ? (
                                    <Link
                                        to="/checkout"
                                        className="p-2 text-xl block bg-orange-600 text-white text-center py-2 rounded hover:bg-orange-700"
                                    >
                                        Proceed to Checkout
                                    </Link>
                                ) : (
                                    <span
                                        className="p-2 text-xl block bg-gray-400 text-white text-center py-2 rounded cursor-not-allowed"
                                        title="Add items to cart before checking out"
                                    >
                                        Proceed to Checkout
                                    </span>
                                )}
                            </div>

                        </div>
                    </div>

                </main >
            </div>

            <Footer />
        </>
    )

}

export default Cart
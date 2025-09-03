import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchOrders, deleteOrder } from "../redux/orderSlice";


const Orders = () => {
    const [activeTab, setActiveTab] = useState("pending");
    const dispatch = useDispatch();
    const { orders } = useSelector((state) => state.orders);
    const auth = useSelector(state => state.auth.data);
    const user = auth?.user

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    const handleDelete = (orderId) => {
        if (window.confirm("Are you sure you want to cancel this order?")) {
            dispatch(deleteOrder(orderId)).then(() => {
                // Refresh orders after cancellation to reflect updated status
                dispatch(fetchOrders());
            });
        }
    };

    const userOrders = orders.filter((order) => 
        order.customer === user?.username
        // (activeTab === "pending" 
        //     ? ["pending", "delivered"].includes(order.status.toLowerCase())
        //     : ["cancelled", "returned"].includes(order.status.toLowerCase())
        // )
    );

    // const userOrders = orders.filter((order) =>
    //     order.customer === user?.username &&
    //     (activeTab === "pending"
    //         ? ["Pending", "Paid", "Processing", "Fulfilled", "Delivered"].includes(order.status)
    //         : ["Cancelled", "Refunded"].includes(order.status)
    //     )
    // );

    // const tabOps = 


    return (
        <>
            <Navbar />
            <div className="flex px-4 min-h-[60vh]">
                {/* Sidebar */}
                <div className="lg:w-1/6 w-1/3 border-r pr-4">
                    <p
                        className={`cursor-pointer p-2 rounded ${activeTab === "pending" ? "bg-gray-200 font-semibold" : ""
                            }`}
                        onClick={() => setActiveTab("pending")}
                    >
                        Pending / Delivered
                    </p>
                    <p
                        className={`cursor-pointer p-2 rounded ${activeTab === "cancelled" ? "bg-gray-200 font-semibold" : ""
                            }`}
                        onClick={() => setActiveTab("cancelled")}
                    >
                        Cancelled / Returned
                    </p>
                </div>

                {/* Content */}
                <div className="flex-1 pl-6">
                    <h2 className="text-xl font-bold mb-4 capitalize">
                        {activeTab} Orders
                    </h2>
                    {userOrders.length === 0 ? (
                        <p>No {activeTab} Orders Yet.</p>
                    ) : (
                        <ul className="space-y-3">
                            {userOrders.map((order) => (
                                <li
                                    key={order.id}
                                    className="p-4 border rounded shadow-sm space-y-4"
                                >
                                    <p className="text-xl font-semibold">order id: #{order.id}</p>
                                    {order.items.map((item, index) => (
                                        <div key={index} className="flex items-center gap-4">

                                            <img
                                                src={item.productDetails.image}
                                                alt={item.productDetails.title}
                                                className="w-20 h-20 rounded"
                                            />
                                            <div className="gap-2 flex flex-col">
                                                <p>
                                                    {item.productDetails.title}
                                                </p>
                                                <div className="flex space-x-3">
                                                    <p className="border rounded p-1 shadow text-center">
                                                        {order.status}
                                                    </p>
                                                    <button className="border rounded p-1 shadow  bg-red-700 text-white text-center" onClick={() => handleDelete(order.id)}>
                                                        CANCEL
                                                    </button>
                                                </div>
                                            </div>
                                            <p className="ml-auto">see details</p>
                                        </div>
                                    ))}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Orders;

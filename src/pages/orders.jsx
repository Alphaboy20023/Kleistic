import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useSelector } from "react-redux";

const Orders = () => {
    const [activeTab, setActiveTab] = useState("pending"); // default tab
    const [orders, setOrders] = useState([]);
    const accessToken = useSelector((state) => state.auth.data?.tokens?.access);

    // your backend endpoint
    const Order_URL = "http://127.0.0.1:8000/auth/orders/";

    // fetch orders when activeTab changes
    useEffect(() => {
        const fetchOrders = async (getState) => {
            try {
                const res = await axios.get(`${Order_URL}?status=${activeTab}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setOrders(res.data);
            } catch (err) {
                console.error("Failed to fetch orders", err);
            }
        };

        if (accessToken) {
            fetchOrders();
        }
    }, [activeTab, accessToken]);
    // console.log(accessToken)


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
                    {orders.length === 0 ? (
                        <p>No {activeTab} orders yet.</p>
                    ) : (
                        <ul className="space-y-3">
                            {orders.map((order) => (
                                <li
                                    key={order.id}
                                    className="p-4 border rounded shadow-sm space-y-4"
                                >
                                    {order.items.map((item, index) => (
                                        <div key={index} className="flex items-center gap-4">
                                            <img
                                                src={item.product.image}
                                                alt={item.product.title}
                                                className="w-20 h-20 rounded"
                                            />
                                            <div className="gap-2 flex flex-col">
                                                <p>
                                                    {item.product.title}
                                                </p>
                                                <p className="border rounded p-1 shadow w-1/2">
                                                    {order.status}
                                                </p>
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

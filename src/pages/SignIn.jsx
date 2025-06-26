import { Link } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch } from 'react-redux';
import { logIn } from "../redux/authSlice";



const Login = () => {

    const dispatch = useDispatch();

    const handleLogIn = () => {
        dispatch(logIn({ username:"", password:''}))
    }

    return (
        <>
            <Navbar />
            <div className="pt-[190px] lg:pt-[130px]" >
                <main className="my-9 flex flex-row gap-2 ">
                    <div className=" w-full hidden lg:block">
                        <img src="/img/Screenshot (24).png" alt="" className="w-[55vw] object-cover h-full" />
                    </div>


                    <div className=" gap-6 flex flex-col w-full justify-center py-[30px] px-[45px] ">
                        <div>
                            <h1 className="text-4xl font-semibold my-3">Login to Kleistic</h1>
                            <p>Enter Your details below</p>
                        </div>

                        <div className="relative w-75">
                            <input type="email" id="email" className="border-b focus:outline-none py-1 focus:border-orange-600 focus:border-b-2 transistion-colors peer w-full " autoComplete="off" required />
                            <label htmlFor="email" className="top-1 absolute left-0 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-orange-600 text-gray-700 ">email</label>
                        </div>
                        <div className="relative w-75">
                            <input type="password" id="password" className="border-b focus:outline-none py-1 focus:border-orange-600 focus:border-b-2 transistion-colors peer w-full " autoComplete="off" required />
                            <label htmlFor="password" className="top-1 absolute left-0 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-orange-600 text-gray-700 ">Password</label>
                        </div>
                        <div className="flex flex-row items-center gap-4">
                            <div className="flex justify-center rounded text-white px-8 py-2 bg-green-700">
                                <button onClick={handleLogIn} className="text-2xl">Log In</button>
                            </div>
                            <div>
                                <Link className="underline text-red-600">forgot password?</Link>
                            </div>
                        </div>

                    </div>
                </main>
            </div>
            <Footer />
        </>
    )
}

export default Login
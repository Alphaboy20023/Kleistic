import { Link } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"
import { FcGoogle } from "react-icons/fc";


const Register = () => {

    return (
        <>
            <Navbar />
            <div className="pt-[170px] lg:pt-[130px]">
                <main className="my-9 flex flex-row gap-2 ">
                    <div className=" w-full hidden lg:block">
                        <img src="/img/Screenshot (24).png" alt="" className="w-[55vw] object-cover h-full" />
                    </div>


                    <div className=" gap-6 flex flex-col w-full justify-center py-[40px] px-[45px] ">
                        <div>
                            <h1 className="text-4xl font-semibold my-3">Create Account</h1>
                            <p>Enter Your details below</p>
                        </div>
                        <div className="relative w-75">
                            <input type="text" id="username" className="border-b focus:outline-none py-1 focus:border-orange-600 focus:border-b-2 transistion-colors peer w-full " autoComplete="off" required />
                            <label htmlFor="username" className="top-1 absolute left-0 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-orange-600 text-gray-700 ">Name</label>
                        </div>
                        <div className="relative w-75">
                            <input type="email" id="email" className="border-b focus:outline-none py-1 focus:border-orange-600 focus:border-b-2 transistion-colors peer w-full " autoComplete="off" required />
                            <label htmlFor="email" className="top-1 absolute left-0 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-orange-600 text-gray-700 ">email</label>
                        </div>
                        <div className="relative w-75">
                            <input type="password" id="password" className="border-b focus:outline-none py-1 focus:border-orange-600 focus:border-b-2 transistion-colors peer w-full " autoComplete="off" required />
                            <label htmlFor="password" className="top-1 absolute left-0 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-orange-600 text-gray-700 ">Password</label>
                        </div>
                        <div className="flex justify-center text-2xl text-white p-2 bg-green-700">
                            <Link>Create account</Link>
                        </div>


                        <Link to="##" className="relative cursor-pointer">
                            <FcGoogle className="top-4 left-[2vh] sm:left-[37vh] lg:left-[25vh] absolute text-2xl" />
                            <div className=" flex  justify-center text-2xl text-black p-2 bg-white border-2">
                                <p>Sign up with Google</p>
                            </div>
                        </Link>

                        <div className="flex justify-center">
                            <p className="mr-2">Already have an account?</p>
                            <Link to="/Login" className="underline">Login</Link>
                        </div>

                    </div>
                </main>
            </div>
            <Footer />
        </>
    )
}

export default Register
import { Link } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from 'react-redux';
import { register } from "../redux/authSlice";
import { useState, useEffect } from "react";
import { ImSpinner2 } from "react-icons/im";
import { useNavigate } from "react-router";
import { resetAuth } from "../redux/authSlice";
import { FiEye } from "react-icons/fi";
import { IoMdEyeOff } from "react-icons/io";



const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [showAlert, setShowAlert] = useState(true);
    const [focusedUsername, setFocusedUsername] = useState(false);
    const [focusedEmail, setFocusedEmail] = useState(false);
    const [focusedPassword, setFocusedPassword] = useState(false);
    const [viewPassword, setViewPassword] = useState(false)

    const { status, error, data } = useSelector((state) => state.auth)

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleRegister = () => {
        const userData = {
            username,
            email,
            password,
        }

        console.log("Sending this to backend:", userData);
        dispatch((register(userData)))
    }


    useEffect(() => {
        let timer;

        if (status === 'succeeded' && data?.user) {
            setShowAlert(true);
            timer = setTimeout(() => {
                setShowAlert(false);
                navigate("/login");
            }, 4000)
        }

        if (error) {
            setShowAlert(true);
            timer = setTimeout(() => setShowAlert(false), 4000)
        }

        return () => clearTimeout(timer);
    }, [status, error, data?.user, navigate])

    useEffect(() => {
        dispatch(resetAuth());
    }, [dispatch]);

    return (
        <>
            <Navbar />
            <div className="pt-[170px] lg:pt-[130px] min-h-screen relative">

                <main className="my-9 flex flex-row gap-2">
                    <div className="w-full hidden lg:block">
                        <img src="/img/Screenshot (24).png" alt="" className="w-[55vw] object-cover h-full" />
                    </div>

                    <div className=" relative gap-6 flex flex-col w-full justify-center py-[40px] px-[45px]">
                        {showAlert && status === "succeeded" && data?.user && (
                            <div className="p-1">
                                <div className="absolute top-9 left-[19vh] -translate-x-1/3 lg:fixed lg:top-40 lg:left-auto lg:right-10 lg:translate-x-0 z-50 w-fit bg-green-100 border border-green-400 text-green-700 px-1 lg:px-3 lg:py-2 rounded shadow-lg text-sm sm:text-base transition-all duration-300 ease-in-out">
                                    <span>🎉 Registration successful!. Redirecting to Login</span>
                                    <span className="dot-animated inline-block">
                                        <span>.</span><span>.</span><span>.</span>
                                    </span>
                                </div>
                            </div>
                        )}

                        {showAlert && error && typeof error === "object" ? (
                            <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-fit bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded shadow-lg transition-all duration-300 ease-in-out">
                                <ul>
                                    {Object.entries(error).map(([field, errors]) =>
                                        errors.map((err, i) => (
                                            <li key={field + i}>
                                                {field}: {err}
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </div>
                        ) : showAlert && error ? (
                            <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-fit bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded shadow-lg">
                                {error}
                            </div>
                        ) : null}

                        <div>
                            <h1 className="text-4xl font-semibold my-3">Create Account</h1>
                            <p>Enter Your details below</p>
                        </div>

                        <div className="relative w-75">
                            <input
                                type="username"
                                id="username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                onFocus={() => setFocusedUsername(true)}
                                onBlur={() => setFocusedUsername(false)}
                                className="w-full border-b focus:outline-none py-1 focus:border-orange-600 focus:border-b-2 transition-colors"
                                required
                            />
                            <label
                                htmlFor="username"
                                className={`absolute left-0 text-gray-700 transition-all ${username.length > 0 || focusedUsername
                                    ? "top-[-1rem] text-xs text-orange-600"
                                    : "top-1 text-base"
                                    }`}>
                                Username
                            </label>
                        </div>

                        <div className="relative w-75">
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                onFocus={() => setFocusedEmail(true)}
                                onBlur={() => setFocusedEmail(false)}
                                className="w-full border-b focus:outline-none py-1 focus:border-orange-600 focus:border-b-2 transition-colors"
                                required
                            />
                            <label
                                htmlFor="email"
                                className={`absolute left-0 text-gray-700 transition-all ${email.length > 0 || focusedEmail
                                    ? "top-[-1rem] text-xs text-orange-600"
                                    : "top-1 text-base"
                                    }`}>
                                Email
                            </label>
                        </div>


                        <div className="relative w-75">
                            <input
                                type={viewPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={() => setFocusedPassword(true)}
                                onBlur={() => setFocusedPassword(false)}
                                className="w-full border-b focus:outline-none py-1 focus:border-orange-600 focus:border-b-2 transition-colors pr-10"
                                required
                            />
                            <label
                                htmlFor="password"
                                className={`absolute left-0 text-gray-700 transition-all ${password.length > 0 || focusedPassword
                                    ? "top-[-1rem] text-xs text-orange-600"
                                    : "top-1 text-base"
                                    }`}
                            >
                                Password
                            </label>
                            <button
                                type="button"
                                onClick={() => setViewPassword(!viewPassword)}
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-600"
                            >
                                {viewPassword ? (
                                    <IoMdEyeOff className="text-xl" />
                                ) : (
                                    <FiEye className="text-xl" />
                                )}
                            </button>
                        </div>

                        <div className="w-1/2 flex justify-center text-sm lg:text-xl text-white p-2 bg-green-700">
                            <button onClick={handleRegister} className="flex items-center gap-2">
                                {status === "loading" ? (
                                    <>
                                        <ImSpinner2 className="animate-spin" />
                                        Creating...
                                    </>
                                ) : (
                                    "Create an account"
                                )}
                            </button>
                        </div>

                        <Link to="##" className="relative cursor-pointer">
                            <FcGoogle className="top-4 left-[2vh] sm:left-[37vh] lg:left-[25vh] absolute text-2xl" />
                            <div className="flex justify-center text-2xl text-black p-2 bg-white border-2">
                                <p>Sign up with Google</p>
                            </div>
                        </Link>

                        <div className="flex justify-center">
                            <p className="mr-2">Already have an account?</p>
                            <Link to="/Login" className="underline">Login</Link>
                        </div>
                    </div>
                </main>
                <Footer className="" />
            </div>
        </>
    );
};

export default Register;






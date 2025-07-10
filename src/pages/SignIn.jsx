import { Link } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from 'react-redux';
import { logIn, resetAuth } from "../redux/authSlice";
import { useState, useEffect } from "react";
import { FiEye } from "react-icons/fi";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router";
import { ImSpinner2 } from "react-icons/im";
import { toast } from 'react-toastify';





const Login = () => {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')
    const [showAlert, setShowAlert] = useState(true);
    const [focusedUsername, setFocusedUsername] = useState(false);
    const [focusedPassword, setFocusedPassword] = useState(false);
    const [viewPassword, setViewPassword] = useState(false)
    const [clickedLogin, setClickedLogin] = useState(false);

    const { status, error, data } = useSelector((state) => state.auth)
    // const auth = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();



    const handleLogIn = () => {
        if (!username || !password) {
            setShowAlert(true)
            alert("Please fill in both username and password");
            return;
        }
        setClickedLogin(true);
        dispatch(logIn({ username, password }))
    }

    useEffect(() => {
        const justSignedUp = localStorage.getItem("justSignedUp");

        if (status === 'succeeded' && data?.user && clickedLogin) {
            if (!justSignedUp) {
                toast.success(`Welcome back, ${data.user.username}!`, {
                    pauseOnHover: false,
                    position: "top-right",
                });
            }

            setShowAlert(true);

            const timer = setTimeout(() => {
                setShowAlert(false);
                setClickedLogin(false);
                navigate("/");
                localStorage.removeItem("justSignedUp");
            }, 4000);

            return () => clearTimeout(timer);
        }

        if (error && clickedLogin) {
            setShowAlert(true);
            const timer = setTimeout(() => setShowAlert(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [status, error, data?.user, navigate, clickedLogin]);

    useEffect(() => {
        dispatch(resetAuth());
        setClickedLogin(false);
    }, [dispatch]);


    return (
        <>
            <Navbar />
            <div className="pt-[87px] lg:pt-[95px]" >
                <main className="my-9 flex flex-row gap-2 ">
                    <div className=" w-full hidden lg:block">
                        <img src="/img/Screenshot (24).png" alt="" className="w-[55vw] object-cover h-full" />
                    </div>


                    <div className=" gap-6 flex flex-col w-full justify-center py-[30px] px-[45px] ">
                        <div>
                            <h1 className="text-4xl font-semibold my-3">Login to Kleistic</h1>
                            <p>Enter Your details below</p>
                        </div>

                        {showAlert && status === "succeeded" && data?.user && (
                            <div className="p-1">
                                <div className="fixed font-bold top-40 right-7 z-50 w-fit bg-green-100 border border-2 border-red-700 text-green-700 font-semibold px-3 py-2 rounded shadow-lg text-sm sm:text-base transition-all duration-300 ease-in-out">
                                    <span className="text-bold">Login successful!. Redirecting to home page</span>
                                    <span className="dot-animated inline-block">
                                        <span>.</span><span>.</span><span>.</span>
                                    </span>
                                </div>
                            </div>
                        )}

                        {showAlert && error && typeof error === "object" ? (
                            <div className="fixed font-bold top-40 right-7 z-50 w-fit bg-red-100 border border-2 border-red-700 text-red-700 px-3 py-2 rounded shadow-lg text-sm sm:text-base transition-all duration-300 ease-in-out">
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
                            <div className="fixed font-bold top-40 right-7 z-50 w-fit bg-red-100 border border-2 border-red-700 text-red-700 px-3 py-2 rounded shadow-lg text-sm sm:text-base transition-all duration-300 ease-in-out">
                                <div>
                                    {error}!
                                </div>
                            </div>
                        ) : null}


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
                        <div className="flex flex-row items-center gap-4">
                            <button onClick={handleLogIn} className="flex items-center justify-center text-white gap-2 bg-green-700 px-5 py-[7px] rounded  text-xl">
                                {status === "loading" ? (
                                    <>
                                        <ImSpinner2 className="animate-spin" />
                                        logging in...
                                    </>
                                ) : (
                                    "Log In"
                                )}
                            </button>
                            <div>
                                <Link className="underline text-red-600">forgot password?</Link>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <span className="text-xl">Don't have an account? <Link to="/register" className="underline text-black-600">Sign Up</Link></span>
                        </div>

                    </div>
                </main>
            </div>
            <Footer />
        </>
    )
}

export default Login
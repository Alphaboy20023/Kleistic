import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from 'react-redux';
import { googleLogin, register, resetAuth } from "../redux/authSlice";
import { useState, useEffect, useCallback } from "react";
import { ImSpinner2 } from "react-icons/im";
import { FiEye } from "react-icons/fi";
import { IoMdEyeOff } from "react-icons/io";


const Register = () => {

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [focused, setFocused] = useState({
    username: false,
    email: false,
    password: false,
  });

  const [viewPassword, setViewPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(true);

  const { status, error, data } = useSelector(state => state.auth);
  // const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(resetAuth());

    }, 100);

    return () => clearTimeout(timer);
  }, [dispatch]);



  useEffect(() => {
    let timer;
    const justSignedUp = localStorage.getItem("justSignedUp");

    if (status === 'succeeded' && data?.user && justSignedUp) {
      setShowAlert(true);
      timer = setTimeout(() => {
        setShowAlert(false);

        if (data?.tokens) {

          navigate('/')
        } else {

          navigate("/login");
        }
        localStorage.removeItem("justSignedUp");
      }, 4000);
    }

    if (error) {
      setShowAlert(true);
      timer = setTimeout(() => setShowAlert(false), 4000);
    }

    return () => clearTimeout(timer);
  }, [status, error, data, navigate]);

  const handleChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleFocus = (field, value) => () => {
    setFocused(prev => ({ ...prev, [field]: value }));
  };


  const handleGoogleSignUp = async () => {
    dispatch(googleLogin());
    localStorage.setItem('justSignedUp', 'true')
  };



  const handleRegister = useCallback(() => {
    dispatch(register(formData));

    localStorage.setItem("justSignedUp", "true");
  }, [dispatch, formData]);



  return (
    <>
      <Navbar />
      <div className="pt-[75px] lg:pt-[98px] min-h-screen relative">
        <main className="my-9 flex flex-row gap-2">
          <div className="w-full hidden lg:block">
            <img src="/img/Screenshot (24).png" alt="" className="w-[55vw] object-cover h-full" />
          </div>

          <div className="relative gap-6 flex flex-col w-full justify-center py-[40px] px-[45px]">
            {showAlert && status === "succeeded" && data?.user && (
              <div className="absolute p-2 top-9 left-[19vh] font-bold -translate-x-1/3 lg:fixed lg:top-40 lg:left-auto lg:right-10 lg:translate-x-0 z-50 w-fit bg-green-100 border border-2 border-green-400 text-green-700 px-1 lg:px-3 lg:py-2 rounded shadow-lg text-sm sm:text-base">
                🎉 Registration successful!, Welcome to Kleistic
                <span className="dot-animated inline-block"><span>.</span><span>.</span><span>.</span></span>
              </div>
            )}

            {showAlert && error && (
              <div className="font-bold absolute p-2 top-9 left-[19vh] -translate-x-1/3 lg:fixed lg:top-40 lg:left-auto lg:right-10 lg:translate-x-0 z-50 w-fit bg-red-100 border border-2 border-red-700 text-red-700 px-1 lg:px-3 lg:py-2 rounded shadow-lg text-sm sm:text-base">
                {typeof error === "object" && error !== null ? (
                  <ul>
                    {Object.entries(error).flatMap(([field, errValue]) => {
                      if (Array.isArray(errValue)) {
                        return errValue.map((err, i) => <li key={field + i}>{field}: {err}</li>);
                      } else {
                        return <li key={field}>{field}: {errValue}</li>;
                      }
                    })}
                  </ul>
                ) : (
                  <span>{error?.toString()}</span>
                )}
              </div>
            )}

            <h1 className="text-4xl font-semibold my-3">Create Account</h1>
            <p>Enter Your details below</p>

            {["username", "email", "password"].map((field) => (
              <div key={field} className="relative w-75">
                <input
                  type={field === "password" && !viewPassword ? "password" : "text"}
                  id={field}
                  value={formData[field]}
                  onChange={handleChange(field)}
                  onFocus={handleFocus(field, true)}
                  onBlur={handleFocus(field, false)}
                  className="w-full border-b focus:outline-none py-1 focus:border-orange-600 focus:border-b-2 transition-colors pr-10"
                  required
                />
                <label
                  htmlFor={field}
                  className={`absolute left-0 text-gray-700 transition-all ${formData[field].length > 0 || focused[field]
                    ? "top-[-1rem] text-xs text-orange-600"
                    : "top-1 text-base"
                    }`}
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>

                {field === "password" && (
                  <button
                    type="button"
                    onClick={() => setViewPassword(!viewPassword)}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-600"
                  >
                    {viewPassword ? <IoMdEyeOff className="text-xl" /> : <FiEye className="text-xl" />}
                  </button>
                )}
              </div>
            ))}

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

            <button
              onClick={handleGoogleSignUp}
              className="flex items-center justify-center gap-3 px-4 py-2 border-2 border-gray-300 rounded-md bg-white text-black hover:shadow-md transition duration-200 w-full max-w-xs mx-auto"
            >
              <FcGoogle className="text-2xl" />
              <span className="text-base sm:text-lg font-medium">Continue with Google</span>
            </button>

            <div className="flex justify-center">
              <p className="mr-2">Already have an account?</p>
              <Link to="/Login" className="underline">Login</Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Register;

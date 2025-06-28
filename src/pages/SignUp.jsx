
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from 'react-redux';
import { register, resetAuth } from "../redux/authSlice";
import { useState, useEffect, useCallback } from "react";
import { ImSpinner2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { FiEye } from "react-icons/fi";
import { IoMdEyeOff } from "react-icons/io";
import { toast } from 'react-toastify';

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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(resetAuth());
  }, [dispatch]);

  const handleRegister = useCallback(() => {
    dispatch(register(formData));
    localStorage.setItem("justSignedUp", "true");
  }, [dispatch, formData]);

  useEffect(() => {
    let timer;

    if (status === 'succeeded' && data?.user) {
      setShowAlert(true);
      toast.success(`🎉 Welcome to Kleistic, ${data.user.username}!`, { autoClose: 3000});
      timer = setTimeout(() => {
        setShowAlert(false);
        navigate("/login");
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
              <div className="absolute p-2 top-9 left-[19vh] -translate-x-1/3 lg:fixed lg:top-40 lg:left-auto lg:right-10 lg:translate-x-0 z-50 w-fit bg-green-100 border border-green-400 text-green-700 px-1 lg:px-3 lg:py-2 rounded shadow-lg text-sm sm:text-base">
                <span>🎉 Registration successful! Redirecting to Login</span>
                <span className="dot-animated inline-block"><span>.</span><span>.</span><span>.</span></span>
              </div>
            )}

            {showAlert && error && (
              <div className="absolute p-2 top-9 left-[19vh] -translate-x-1/3 lg:fixed lg:top-40 lg:left-auto lg:right-10 lg:translate-x-0 z-50 w-fit bg-red-100 border border-red-700 text-red-700 px-1 lg:px-3 lg:py-2 rounded shadow-lg text-sm sm:text-base">
                {typeof error === "object" ? (
                  <ul>
                    {Object.entries(error).flatMap(([field, errors]) =>
                      errors.map((err, i) => <li key={field + i}>{field}: {err}</li>)
                    )}
                  </ul>
                ) : error}
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
                  className={`absolute left-0 text-gray-700 transition-all ${
                    formData[field].length > 0 || focused[field]
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
        <Footer />
      </div>
    </>
  );
};

export default Register; 





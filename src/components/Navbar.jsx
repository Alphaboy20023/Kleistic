import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBtn from "./SearchButton";
import { MdAccountCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { CgLogOut } from "react-icons/cg";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [openAccountDropdown, setOpenAccountDropdown] = useState(false);

  const [language, setLanguage] = useState("English");
  const dropdownRef = useRef(null);
  const langdropdownRef = useRef(null);
  const navigate = useNavigate();

  const changeLanguage = (lang) => {
    setLanguage(lang);
    setOpenDropDown(false);
    //  console.log("Language changed to:", lang);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!langdropdownRef.current && !langdropdownRef.current.contains(event.target)) {
        setOpenDropDown(false);
        setOpenAccountDropdown(false)
      }

      if (!dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropDown(false);
        setOpenAccountDropdown(false)
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAccountClick = () => {
    if (!isAuthenticated) {
      window.location.href = '/login';
    } else {
      setOpen(false);
      setOpenAccountDropdown((prev) => !prev);
    }
  }

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login')
  };

  const cartItems = useSelector(state => state.cart.items);
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const auth = useSelector(state => state.auth.data);
  const user = auth?.user
  const isAuthenticated = !!auth?.tokens?.access;

  return (
    <>
      {/* Top bar */}
      <div className="mb-[156px] lg:mb-[120px]">
        <div className="fixed top-0 left-0 right-0 z-40">
          <div className="w-full bg-orange-600 text-white flex items-center px-4 py-3 relative text-sm">

            <div className="flex-1 overflow-hidden">
              <div className="hover:[animation-play-state:paused] animate-marquee whitespace-nowrap flex items-center gap-8 min-w-max">
                {Array(5).fill(0).map((_, i) => (
                  <div key={i} className="flex items-center gap-2 text-[19px]">
                    <p>Winter sale for all swim suits and free express delivery - 50% off</p>
                    <Link to="#shop" className="underline whitespace-nowrap">Shop now</Link>
                  </div>
                ))}
              </div>
            </div>


            <div className="ml-4 relative z-50" ref={langdropdownRef}>
              <button
                onClick={() => setOpenDropDown(!openDropDown)}
                className="text-white font-semibold hover:underline"
              >
                {language}
              </button>
              {openDropDown && (
                <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded shadow-md z-20">
                  {["English", "French", "Spanish"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => changeLanguage(lang)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>


          {/* Main navbar */}
          <div className="bg-white text-black p-2 py-3 border-b">
            <div className="container mx-auto flex justify-between items-center flex-wrap gap-2 sm:gap-0">
              <h1 className="text-xl font-bold mr-4 text-blue-700">KLEISTIC</h1>


              <ul className="hidden sm:flex gap-6">
                <li><Link to="/" className="hover:underline hover:underline-offset-4">Home</Link></li>
                <li><Link to="/contact" className="hover:underline hover:underline-offset-4">Contact</Link></li>
                <li><Link to="/about" className="hover:underline hover:underline-offset-4">About</Link></li>
                {!isAuthenticated && (
                  <li><Link to="/register" className="hover:underline hover:underline-offset-4">Sign Up</Link></li>
                )}
              </ul>


              <div className="flex items-center justify-between gap-3">
                <div>
                  <SearchBtn />
                </div>

                <div className="relative" ref={dropdownRef}>
                  <button onClick={handleAccountClick} className="text-blue-700 text-2xl focus:outline-none">
                    <MdAccountCircle />
                  </button>
                  {openAccountDropdown && (
                    <div className="absolute right-0 w-[30vh] mt-2 bg-white p-3 space-y-1 text-black rounded bg-blur bg-gray-300 shadow-lg z-30">
                      <div className="w-full space-y-1">
                        {isAuthenticated && user && (
                          <p className="block text-blue-700 font-semibold text-[15px]">Hello, {user.username || user.name}</p>
                        )}
                        <Link to="#" className="block hover:bg-gray-100">Manage My Account</Link>
                        <Link to="/order" className="block hover:bg-gray-100">My Orders</Link>
                        <Link to="#" className="block hover:bg-gray-100">My Reviews</Link>
                      </div>

                      <div className="block hover:bg-gray-100">
                        {isAuthenticated ? (
                          <>
                            <button onClick={handleLogout} className="text-red-500 flex items-center  text-md"><CgLogOut className="text-[20px]" /> <span>Logout</span></button>
                          </>
                        ) : (
                          <Link to="/login">Login</Link>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 items-center">
                  <Link to="/wishlist">
                    <i className="bx bx-heart bx-flip-horizontal text-2xl text-[#837979]" />
                  </Link>
                  <Link to="/cart" className="flex items-center relative">
                    <i className="bx bx-cart bx-flip-horizontal text-3xl text-[#837979]" />
                    <span className="right-2 top-1 relative text-[13px] font-bold text-red-700">{itemCount}</span>
                  </Link>
                </div>


                <div className="flex items-center justify-between sm:hidden">
                  <button
                    className="text-4xl"
                    onClick={() => setOpen(!open)}
                  >
                    <i className={`bx ${open ? "bx-x" : "bx-menu"}`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile menu */}
            {open && (
              <ul className="sm:hidden flex flex-col gap-3 mt-2">
                <li><Link to="/" className="hover:underline hover:underline-offset-4">Home</Link></li>
                <li><Link to="/contact" className="hover:underline hover:underline-offset-4">Contact</Link></li>
                <li><Link to="/about" className="hover:underline hover:underline-offset-4">About</Link></li>
                {isAuthenticated ? (
                  <>
                    <li><button onClick={handleLogout} className="text-red-500 font-semibold flex items-center  text-md"><CgLogOut className="text-[20px]" /> <span>Logout</span></button></li>
                  </>
                ) : (
                  <li><Link to="/login">Login</Link></li>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>

    </>
  );
};

export default Navbar;

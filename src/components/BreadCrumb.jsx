// Breadcrumb.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Split the current URL path into segments
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="flex flex-wrap space-x-5 items-center mb-6">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 underline hover:text-blue-800 text-sm"
      >
        ← Back
      </button>

      {/* Breadcrumb trail */}
      <div className="text-sm text-gray-600 flex gap-1 flex-wrap">
        <Link to="/" className="text-blue-600 hover:underline">Home</Link>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return (
            <span key={index} className="flex items-center gap-1">
              <span className="text-gray-400">/</span>
              {isLast ? (
                <span className="font-semibold capitalize">{decodeURIComponent(name)}</span>
              ) : (
                <Link to={routeTo} className="text-blue-600 hover:underline capitalize">
                  {decodeURIComponent(name)}
                </Link>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Breadcrumb;

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams } from "react-router";
import defaultProducts from "../data/product";
import { Link } from "react-router-dom";

const AllProducts = () => {
    const { categoryId } = useParams();

    const filteredProducts = defaultProducts.filter((product) => product.category === categoryId);

    return (
        <>
            <Navbar />
            <div className="max-w-[1200px] mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-6">
                    {categoryId.replace(/([A-Z])/g, ' $1').trim()} Products
                </h2>

                {filteredProducts.length ? (
                    <div className="pt-[50px]">
                        <h1 className="text-2xl font-bold mb-4">{categoryId}</h1>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                            {filteredProducts.map(product => (
                                <div key={product.id} className="border p-4 rounded-lg shadow-md">
                                    <img src={product.image} alt={product.title} className="w-full h-40 object-cover mb-2" />
                                    <h3 className="text-lg font-semibold">{product.title}</h3>
                                    <p className="text-gray-700">${product.price}</p>
                                    <Link to={`/product_detail/${product.id}`} className="text-orange-600 underline mt-2 inline-block">
                                        View Details
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p>No products found in this category.</p>
                )}
            </div >
            <Footer />
        </>
    )
}
export default AllProducts
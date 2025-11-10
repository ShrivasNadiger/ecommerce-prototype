import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <Link to={`/product/${product._id}`}>
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-cover"
                />
            </Link>
            <div className="p-4">
                <Link to={`/product/${product._id}`}>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-blue-600 transition">
                        {product.title}
                    </h3>
                </Link>
                <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                    </span>
                    <div className="flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span className="text-gray-600 ml-1">{product.rating}</span>
                    </div>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                </p>
                <Link
                    to={`/product/${product._id}`}
                    className="block w-full text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;


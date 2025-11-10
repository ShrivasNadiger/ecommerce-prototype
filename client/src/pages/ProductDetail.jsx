import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { getProduct } from '../lib/api';
import useCartStore from '../store/cart';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const addItem = useCartStore((state) => state.addItem);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const data = await getProduct(id);
                setProduct(data);
                setError(null);
            } catch (err) {
                setError('Product not found.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            addItem(product, 1);
            alert('Product added to cart!');
        }
    };

    if (loading) {
        return <Loader />;
    }

    if (error || !product) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error || 'Product not found'}
                </div>
                <button
                    onClick={() => navigate('/')}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Back to Home
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <button
                onClick={() => navigate(-1)}
                className="text-blue-600 hover:text-blue-800 mb-4 transition"
            >
                ← Back
            </button>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="md:flex">
                    <div className="md:w-1/2">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="md:w-1/2 p-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">
                            {product.title}
                        </h1>
                        <div className="flex items-center mb-4">
                            <span className="text-yellow-500 text-2xl mr-2">★</span>
                            <span className="text-gray-600 text-lg">{product.rating}</span>
                        </div>
                        <p className="text-3xl font-bold text-gray-900 mb-6">
                            ${product.price.toFixed(2)}
                        </p>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            {product.description}
                        </p>
                        <div className="mb-4">
                            <span className="text-gray-600">Category: </span>
                            <span className="font-semibold text-gray-800">
                                {product.category}
                            </span>
                        </div>
                        <button
                            onClick={handleAddToCart}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-lg"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;


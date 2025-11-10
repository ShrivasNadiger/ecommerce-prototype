import { useNavigate } from 'react-router-dom';
import QuantitySelector from '../components/QuantitySelector';
import useCartStore, { useCartSubtotal } from '../store/cart';

const Cart = () => {
    const navigate = useNavigate();
    const items = useCartStore((state) => state.items);
    const removeItem = useCartStore((state) => state.removeItem);
    const inc = useCartStore((state) => state.inc);
    const dec = useCartStore((state) => state.dec);
    const subtotal = useCartSubtotal();

    const handleCheckout = () => {
        alert('Checkout functionality coming soon!');
    };

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <p className="text-gray-600 text-lg mb-4">Your cart is empty.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        {items.map((item) => (
                            <div
                                key={item.product._id}
                                className="border-b border-gray-200 last:border-b-0 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
                            >
                                <img
                                    src={item.product.image}
                                    alt={item.product.title}
                                    className="w-24 h-24 object-cover rounded"
                                />
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                        {item.product.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-2">
                                        ${item.product.price.toFixed(2)} each
                                    </p>
                                    <button
                                        onClick={() => removeItem(item.product._id)}
                                        className="text-red-600 hover:text-red-800 text-sm transition"
                                    >
                                        Remove
                                    </button>
                                </div>
                                <div className="flex items-center space-x-6">
                                    <QuantitySelector
                                        quantity={item.qty}
                                        onIncrement={() => inc(item.product._id)}
                                        onDecrement={() => dec(item.product._id)}
                                    />
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-gray-900">
                                            ${(item.product.price * item.qty).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">
                            Order Summary
                        </h2>
                        <div className="border-b border-gray-200 pb-4 mb-4">
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="font-semibold text-gray-900">
                                    ${subtotal.toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Items</span>
                                <span className="font-semibold text-gray-900">
                                    {items.reduce((total, item) => total + item.qty, 0)}
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-between mb-6">
                            <span className="text-lg font-bold text-gray-800">Total</span>
                            <span className="text-lg font-bold text-gray-900">
                                ${subtotal.toFixed(2)}
                            </span>
                        </div>
                        <button
                            onClick={handleCheckout}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-lg"
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;


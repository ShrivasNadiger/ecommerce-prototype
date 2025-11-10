import { Link } from 'react-router-dom';
import useAuthStore from '../store/auth';
import { useCartCount } from '../store/cart';

const Navbar = () => {
    const count = useCartCount();
    const user = useAuthStore((state) => state.user);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const logout = useAuthStore((state) => state.logout);

    const handleLogout = async () => {
        await logout();
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-gray-600">
                        🛍️ Store
                    </Link>
                    <div className="flex items-center space-x-6">
                        <Link
                            to="/"
                            className="text-gray-700 hover:text-gray-900 font-medium transition"
                        >
                            Home
                        </Link>
                        <Link
                            to="/cart"
                            className="relative text-gray-700 hover:text-gray-900 font-medium transition"
                        >
                            Cart
                            {count > 0 && (
                                <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {count}
                                </span>
                            )}
                        </Link>
                        {isAuthenticated && user ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-gray-700 font-medium">
                                    Hello, {user.name}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition font-medium"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link
                                    to="/login"
                                    className="text-gray-700 hover:text-gray-900 font-medium transition"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-medium"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;


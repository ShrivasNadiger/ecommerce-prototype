import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-8">Page not found</p>
            <Link
                to="/"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
                Go Home
            </Link>
        </div>
    );
};

export default NotFound;


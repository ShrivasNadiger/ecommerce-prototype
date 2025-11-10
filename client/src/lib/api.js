import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Include cookies in requests
});

/**
 * Fetch all products
 * @returns {Promise<Array>} Array of products
 */
export const getProducts = async () => {
    try {
        const response = await api.get('/api/products');
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

/**
 * Fetch single product by ID
 * @param {string} id - Product ID
 * @returns {Promise<Object>} Product object
 */
export const getProduct = async (id) => {
    try {
        const response = await api.get(`/api/products/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
};

/**
 * Health check
 * @returns {Promise<Object>} Health status
 */
export const healthCheck = async () => {
    try {
        const response = await api.get('/api/health');
        return response.data;
    } catch (error) {
        console.error('Error health check:', error);
        throw error;
    }
};

/**
 * Register a new user
 * @param {string} name - User name
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} Registration response
 */
export const register = async (name, email, password) => {
    try {
        const response = await api.post('/api/auth/register', {
            name,
            email,
            password,
        });
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

/**
 * Login user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} Login response
 */
export const login = async (email, password) => {
    try {
        const response = await api.post('/api/auth/login', {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

/**
 * Logout user
 * @returns {Promise<Object>} Logout response
 */
export const logout = async () => {
    try {
        const response = await api.post('/api/auth/logout');
        return response.data;
    } catch (error) {
        console.error('Error logging out:', error);
        throw error;
    }
};

/**
 * Get current authenticated user
 * @returns {Promise<Object>} User data
 */
export const getMe = async () => {
    try {
        const response = await api.get('/api/auth/me');
        return response.data;
    } catch (error) {
        console.error('Error getting user:', error);
        throw error;
    }
};


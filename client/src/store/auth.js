import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getMe as getMeApi, login as loginApi, logout as logoutApi, register as registerApi } from '../lib/api';

/**
 * Auth store using Zustand with localStorage persistence
 */
const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            isLoading: false,
            isAuthenticated: false,

            /**
             * Register a new user
             * @param {string} name - User name
             * @param {string} email - User email
             * @param {string} password - User password
             */
            register: async (name, email, password) => {
                try {
                    set({ isLoading: true });
                    const response = await registerApi(name, email, password);
                    set({
                        user: response.user,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                    return { success: true };
                } catch (error) {
                    set({ isLoading: false });
                    return {
                        success: false,
                        error: error.response?.data?.error || 'Registration failed',
                    };
                }
            },

            /**
             * Login user
             * @param {string} email - User email
             * @param {string} password - User password
             */
            login: async (email, password) => {
                try {
                    set({ isLoading: true });
                    const response = await loginApi(email, password);
                    set({
                        user: response.user,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                    return { success: true };
                } catch (error) {
                    set({ isLoading: false });
                    return {
                        success: false,
                        error: error.response?.data?.error || 'Login failed',
                    };
                }
            },

            /**
             * Logout user
             */
            logout: async () => {
                try {
                    await logoutApi();
                } catch (error) {
                    console.error('Logout error:', error);
                } finally {
                    set({
                        user: null,
                        isAuthenticated: false,
                    });
                }
            },

            /**
             * Get current user (hydrate from cookie)
             */
            getMe: async () => {
                try {
                    set({ isLoading: true });
                    const response = await getMeApi();
                    if (response.user) {
                        set({
                            user: response.user,
                            isAuthenticated: true,
                            isLoading: false,
                        });
                        return { success: true };
                    } else {
                        set({
                            user: null,
                            isAuthenticated: false,
                            isLoading: false,
                        });
                        return { success: false };
                    }
                } catch (error) {
                    set({
                        user: null,
                        isAuthenticated: false,
                        isLoading: false,
                    });
                    return { success: false };
                }
            },

            /**
             * Clear auth state
             */
            clearAuth: () => {
                set({
                    user: null,
                    isAuthenticated: false,
                });
            },
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);

export default useAuthStore;


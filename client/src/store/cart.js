import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

/**
 * Cart store using Zustand with localStorage persistence
 */
const useCartStore = create(
    persist(
        (set, get) => ({
            items: [], // [{ product, qty }]

            /**
             * Add item to cart
             * @param {Object} product - Product object
             * @param {number} qty - Quantity (default: 1)
             */
            addItem: (product, qty = 1) => {
                const items = get().items;
                const existingItem = items.find((item) => item.product._id === product._id);

                if (existingItem) {
                    set({
                        items: items.map((item) =>
                            item.product._id === product._id
                                ? { ...item, qty: item.qty + qty }
                                : item
                        ),
                    });
                } else {
                    set({
                        items: [...items, { product, qty }],
                    });
                }
            },

            /**
             * Remove item from cart
             * @param {string} id - Product ID
             */
            removeItem: (id) => {
                set({
                    items: get().items.filter((item) => item.product._id !== id),
                });
            },

            /**
             * Increase item quantity
             * @param {string} id - Product ID
             */
            inc: (id) => {
                set({
                    items: get().items.map((item) =>
                        item.product._id === id ? { ...item, qty: item.qty + 1 } : item
                    ),
                });
            },

            /**
             * Decrease item quantity
             * @param {string} id - Product ID
             */
            dec: (id) => {
                const items = get().items;
                const item = items.find((item) => item.product._id === id);

                if (item && item.qty > 1) {
                    set({
                        items: items.map((item) =>
                            item.product._id === id ? { ...item, qty: item.qty - 1 } : item
                        ),
                    });
                } else if (item && item.qty === 1) {
                    get().removeItem(id);
                }
            },

            /**
             * Clear all items from cart
             */
            clear: () => {
                set({ items: [] });
            },
        }),
        {
            name: 'cart-storage', // localStorage key
            storage: createJSONStorage(() => localStorage),
        }
    )
);

/**
 * Selector: Get total item count in cart
 */
export const useCartCount = () => {
    return useCartStore((state) =>
        state.items.reduce((total, item) => total + item.qty, 0)
    );
};

/**
 * Selector: Get cart subtotal
 */
export const useCartSubtotal = () => {
    return useCartStore((state) =>
        state.items.reduce((total, item) => total + item.product.price * item.qty, 0)
    );
};

export default useCartStore;


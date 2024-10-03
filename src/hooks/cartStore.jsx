import { create } from "zustand";
import axios from "axios";
import { useStore } from "./useStore";

// Define the Zustand store for the cart
export const useCartStore = create((set, get) => ({
    cartId: null, // Cart ID to be used for subsequent additions
    products: [], // Cart products
    addToCart: async (product) => {
        const { cartId, products } = get();

        let payload = {};

        // Check if the cart already has an ID
        if (!cartId) {
            // Case 1: No cart yet
            payload = {
                cart: {
                    items: [
                        {
                            id: product.id,
                            cost: product.cost,
                            currency: product.currency,
                            qty: product.quantity,
                        },
                    ],
                },
            };
        } else {
            // Case 2: Cart already exists
            payload = {
                cart: {
                    id: cartId, // Use existing cart ID
                    items: [
                        {
                            id: product.id,
                            cost: product.cost,
                            currency: product.currency,
                            qty: product.quantity,
                        },
                    ],
                },
            };
        }
        const jwt = useStore.getState().jwt;
        try {
            // Make the API call to add the product to the cart
            const response = await axios.post(
                "http://localhost:5200/v1/cart/addToCart",
                payload,
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-type": "Application/json",
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            console.log("🚀 ~ addToCart: ~ response.data:", response.data);

            // Update the cart ID if it's a new cart
            if (!cartId) {
                set({ cartId: response.data.data.id });
            }

            // Update the Zustand store to include the product
            const existingProduct = products.find((p) => p.id === product.id);
            if (existingProduct) {
                set({
                    products: products.map((p) =>
                        p.id === product.id
                            ? { ...p, quantity: p.quantity + product.quantity }
                            : p
                    ),
                });
            } else {
                set({ products: [...products, product] });
            }

            console.log("Product added to cart:", response.data);
        } catch (error) {
            console.error("Failed to add product to cart:", error);
        }
    },

    // Action to remove a product from the cart
    removeFromCart: (id) =>
        set((state) => ({
            products: state.products.filter((product) => product.id !== id),
        })),
    // Action to change product quantity
    updateQuantity: (id, quantity) =>
        set((state) => ({
            products: state.products.map((product) =>
                product.id === id ? { ...product, quantity } : product
            ),
        })),
    // Action to clear the cart
    clearCart: () =>
        set({
            cartId: null, // Reset the cart ID when the cart is cleared
            products: [],
        }),
}));

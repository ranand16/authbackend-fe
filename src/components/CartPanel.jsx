import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCartStore } from "../hooks/cartStore";
import { useStore } from "../hooks/useStore";

const CartPanel = () => {
    const { jwt } = useStore((s) => s);
    const { cartId, products, updateQuantity, removeFromCart, clearCart } =
        useCartStore((state) => state);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        // Calculate total price
        const calculatedTotal = products.reduce(
            (acc, product) => acc + product.cost * product.quantity,
            0
        );
        setTotal(calculatedTotal);
    }, [products]);

    const handleCheckout = async () => {
        try {
            console.log("🚀 ~ CartPanel ~ jwt:", jwt);
            const response = await axios.post(
                "http://localhost:5200/v1/cart/checkoutCart",
                { cart_id: cartId },
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-type": "Application/json",
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            console.log("Checkout successful", response.data);
            clearCart(); // Clear the cart after successful checkout
        } catch (error) {
            console.error("Checkout failed", error);
        }
    };

    return (
        <div style={styles.sidePanel}>
            <h2>Cart</h2>
            {products.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div>
                    {products.map((product) => (
                        <div key={product.id} style={styles.productItem}>
                            <img
                                src={product.image}
                                alt={product.id}
                                style={styles.productImage}
                            />
                            <div style={styles.productDetails}>
                                <p>{product.id}</p>
                                <p>
                                    Price: {product.cost} {product.currency}
                                </p>
                                <div style={styles.quantityControls}>
                                    <label htmlFor={`quantity-${product.id}`}>
                                        Quantity:{" "}
                                    </label>
                                    <input
                                        type="number"
                                        id={`quantity-${product.id}`}
                                        value={product.quantity}
                                        min="1"
                                        onChange={(e) =>
                                            updateQuantity(
                                                product.id,
                                                Number(e.target.value)
                                            )
                                        }
                                        style={styles.quantityInput}
                                    />
                                </div>
                                <button
                                    onClick={() => removeFromCart(product.id)}
                                    style={styles.removeButton}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    <div style={styles.cartActions}>
                        <button onClick={clearCart} style={styles.clearButton}>
                            Clear Cart
                        </button>
                        <h3>Total: {total} rs</h3>
                        <button
                            onClick={handleCheckout}
                            style={styles.checkoutButton}
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

// Styles
const styles = {
    sidePanel: {
        position: "fixed",
        right: 0,
        top: 0,
        width: "300px",
        height: "100%",
        backgroundColor: "#f8f8f8",
        padding: "20px",
        borderLeft: "1px solid #ddd",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    },
    productItem: {
        display: "flex",
        marginBottom: "15px",
    },
    productImage: {
        width: "50px",
        height: "50px",
        marginRight: "10px",
    },
    productDetails: {
        flex: 1,
    },
    quantityControls: {
        display: "flex",
        alignItems: "center",
    },
    quantityInput: {
        width: "50px",
        marginLeft: "10px",
    },
    removeButton: {
        backgroundColor: "#e74c3c",
        color: "#fff",
        padding: "5px 10px",
        border: "none",
        cursor: "pointer",
    },
    cartActions: {
        marginTop: "20px",
    },
    clearButton: {
        backgroundColor: "#f39c12",
        color: "#fff",
        padding: "10px",
        border: "none",
        cursor: "pointer",
        width: "100%",
    },
    checkoutButton: {
        backgroundColor: "#2ecc71",
        color: "#fff",
        padding: "10px",
        border: "none",
        cursor: "pointer",
        width: "100%",
        marginTop: "10px",
    },
};

export default CartPanel;

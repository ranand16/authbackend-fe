import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useCartStore } from "../hooks/cartStore";
import { useStore } from "../hooks/useStore";

const CartPanel = () => {
    const { jwt } = useStore((state) => state);
    const { cartId, products, updateQuantity, removeFromCart, clearCart } =
        useCartStore((state) => state);
    const [checkoutMsg, setCheckoutMsg] = useState("");

    // Memoize total calculation to avoid unnecessary re-renders
    const total = useMemo(() => {
        return products.reduce(
            (acc, product) => acc + product.cost * product.quantity,
            0
        );
    }, [products]);

    const handleCheckout = async () => {
        try {
            const response = await axios.post(
                "http://localhost:5200/v1/cart/checkoutCart",
                { cart_id: cartId },
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            console.log("Checkout successful", response.data);
            clearCart(); // Clear cart after successful checkout
            setCheckoutMsg("Checkout successful!");
        } catch (error) {
            setCheckoutMsg("Checkout failed. Please try again.");
            console.error("Checkout failed", error);
        } finally {
            setTimeout(() => {
                setCheckoutMsg("");
            }, 3000);
        }
    };

    return (
        <div style={styles.sidePanel}>
            <h2>Cart</h2>
            {products.length === 0 ? (
                <>
                    <p>Your cart is empty</p>
                    <p>{checkoutMsg}</p>
                </>
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
                        {checkoutMsg && <p>{checkoutMsg}</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

// Styles optimized for consistent UI and responsive design
const styles = {
    sidePanel: {
        position: "fixed",
        right: 0,
        top: 0,
        width: "320px",
        height: "100%",
        backgroundColor: "#ffffff",
        padding: "25px",
        borderLeft: "2px solid #e0e0e0",
        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.15)",
        zIndex: 1000,
        overflowY: "auto",
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    },
    productItem: {
        display: "flex",
        alignItems: "center",
        marginBottom: "20px",
        padding: "10px 0",
        borderBottom: "1px solid #f0f0f0",
    },
    productImage: {
        width: "60px",
        height: "60px",
        marginRight: "15px",
        borderRadius: "8px",
        objectFit: "cover",
    },
    productDetails: {
        flex: 1,
        color: "#333",
        fontSize: "1rem",
        lineHeight: "1.5",
    },
    quantityControls: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginTop: "8px",
    },
    quantityInput: {
        width: "60px",
        padding: "6px",
        border: "1px solid #ddd",
        borderRadius: "6px",
        textAlign: "center",
        fontSize: "1rem",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    },
    removeButton: {
        backgroundColor: "#e74c3c",
        color: "#fff",
        padding: "8px 12px",
        borderRadius: "6px",
        border: "none",
        cursor: "pointer",
        transition: "background-color 0.3s ease, transform 0.2s ease",
        boxShadow: "0 3px 8px rgba(231, 76, 60, 0.3)",
    },
    cartActions: {
        marginTop: "30px",
    },
    clearButton: {
        backgroundColor: "#f39c12",
        color: "#fff",
        padding: "12px",
        fontSize: "1.1rem",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        width: "100%",
        transition: "background-color 0.3s ease, transform 0.2s ease",
        boxShadow: "0 3px 8px rgba(243, 156, 18, 0.3)",
    },
    checkoutButton: {
        backgroundColor: "#2ecc71",
        color: "#fff",
        padding: "12px",
        fontSize: "1.1rem",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        width: "100%",
        marginTop: "15px",
        transition: "background-color 0.3s ease, transform 0.2s ease",
        boxShadow: "0 3px 8px rgba(46, 204, 113, 0.3)",
    },
};

export default CartPanel;

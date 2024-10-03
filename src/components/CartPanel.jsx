import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCartStore } from "../hooks/cartStore";
import { useStore } from "../hooks/useStore";

const CartPanel = () => {
    const { jwt } = useStore((s) => s);
    const { cartId, products, updateQuantity, removeFromCart, clearCart } =
        useCartStore((state) => state);
    const [total, setTotal] = useState(0);
    const [checkoutMsg, setCheckoutMsg] = useState("");
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
            setCheckoutMsg("Products added to cart successfully!");
        } catch (error) {
            setCheckoutMsg("Products were not added to cart. Try again later!");
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
                    </div>
                </div>
            )}
        </div>
    );
};
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
        zIndex: 1000, // Ensure it's on top
        overflowY: "auto", // Scrollable for long lists
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
        borderRadius: "8px", // Rounded edges for images
        objectFit: "cover", // Ensures the image covers the entire space
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
    quantityInputFocus: {
        borderColor: "#007bff",
        boxShadow: "0 0 5px rgba(0, 123, 255, 0.2)",
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
    removeButtonHover: {
        backgroundColor: "#c0392b",
        transform: "translateY(-2px)",
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
    clearButtonHover: {
        backgroundColor: "#e67e22",
        transform: "translateY(-2px)",
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
    checkoutButtonHover: {
        backgroundColor: "#27ae60",
        transform: "translateY(-2px)",
    },
};

export default CartPanel;

import React, { useRef } from "react";
import { useCartStore } from "../hooks/cartStore";

// Custom hook for managing product refs
const useProductRefs = (products) => {
    const quantityRefs = useRef(
        products.reduce((acc, product) => {
            acc[product.id] = React.createRef();
            return acc;
        }, {})
    );

    const getQuantity = (productId) => {
        const ref = quantityRefs.current[productId];
        return ref?.current?.value ? Number(ref.current.value) : 0;
    };

    return { quantityRefs, getQuantity };
};

const ProductList = ({ products }) => {
    const addToCart = useCartStore((state) => state.addToCart); // Access zustand store action
    const { quantityRefs, getQuantity } = useProductRefs(products); // Use custom hook

    const handleAddToCart = async (product) => {
        const quantity = getQuantity(product.id); // Get quantity from custom hook

        if (quantity === 0) {
            alert(
                `Cannot add "${product.id}" to cart. Quantity cannot be zero.`
            );
        } else {
            await addToCart({ ...product, quantity }); // Call addToCart with product details
        }
    };

    return (
        <div>
            <div style={styles.productGrid}>
                {products.map((product) => (
                    <div key={product.id} style={styles.productCard}>
                        <img
                            src={product.image}
                            alt={`Product ${product.id}`}
                            style={styles.productImage}
                        />
                        <div style={styles.productInfo}>
                            <p>ID: {product.id}</p>
                            <p>
                                Cost: {product.cost} {product.currency}
                            </p>
                            <div style={styles.quantityContainer}>
                                <label htmlFor={`quantity-${product.id}`}>
                                    Quantity:{" "}
                                </label>
                                <input
                                    type="number"
                                    id={`quantity-${product.id}`}
                                    defaultValue="0"
                                    ref={quantityRefs.current[product.id]} // Use ref from hook
                                    min="0"
                                    style={styles.quantityInput}
                                />
                            </div>
                            <button
                                onClick={() => handleAddToCart(product)}
                                style={styles.addToCartButton}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Styles with improved hover effects and transitions
const styles = {
    productGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "24px",
        padding: "30px",
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        justifyContent: "center",
    },
    productCard: {
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.08)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        textAlign: "center",
        backgroundColor: "#ffffff",
    },
    productCardHover: {
        transform: "scale(1.03)",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
    },
    productImage: {
        width: "100%",
        height: "auto",
        borderBottom: "1px solid #e0e0e0",
    },
    productInfo: {
        padding: "15px",
        color: "#333",
        fontSize: "1rem",
        fontWeight: "500",
    },
    quantityContainer: {
        marginTop: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
    },
    quantityInput: {
        width: "60px",
        padding: "8px",
        borderRadius: "8px",
        border: "1px solid #ddd",
        fontSize: "1rem",
        textAlign: "center",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    },
    quantityInputFocus: {
        borderColor: "#007bff",
        boxShadow: "0 0 5px rgba(0, 123, 255, 0.2)",
    },
    addToCartButton: {
        marginTop: "12px",
        padding: "10px 15px",
        fontSize: "1.1rem",
        backgroundColor: "#28a745",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "background-color 0.3s ease, transform 0.2s ease",
        boxShadow: "0 4px 12px rgba(40, 167, 69, 0.3)",
    },
    addToCartButtonHover: {
        backgroundColor: "#218838",
        transform: "translateY(-2px)",
    },
    disabledButton: {
        backgroundColor: "#e0e0e0",
        color: "#a0a0a0",
        cursor: "not-allowed",
        border: "1px solid #e0e0e0",
    },
};

export default ProductList;

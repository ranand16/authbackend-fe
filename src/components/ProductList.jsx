import React, { createRef } from "react";
import { useCartStore } from "../hooks/cartStore";

const ProductList = ({ products }) => {
    const addToCart = useCartStore((state) => state.addToCart); // Access addToCart action from zustand

    // Create refs for each product's quantity input
    const quantityRefs = products.reduce((acc, product) => {
        acc[product.id] = createRef();
        return acc;
    }, {});

    // Handle the add to cart action with quantity check
    const handleAddToCart = async (product) => {
        const quantity = Number(quantityRefs[product.id].current.value);

        if (quantity === 0) {
            alert(
                `Cannot add "${product.id}" to cart. Quantity cannot be zero.`
            );
        } else {
            await addToCart({ ...product, quantity }); // Add product to cart and call API
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
                                    ref={quantityRefs[product.id]}
                                    min="0" // Set minimum to 0
                                    style={styles.quantityInput}
                                />
                            </div>
                            {/* Add to Cart button */}
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

// Styles object
const styles = {
    productGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "20px",
        padding: "20px",
    },
    productCard: {
        border: "1px solid #ccc",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
    },
    productImage: {
        width: "100%",
        height: "auto",
    },
    productInfo: {
        padding: "10px",
    },
    quantityContainer: {
        marginTop: "10px",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
    },
    quantityInput: {
        width: "50px",
        marginLeft: "10px",
    },
    addToCartButton: {
        marginTop: "10px",
        padding: "8px 12px",
        backgroundColor: "#28a745",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
    disabledButton: {
        backgroundColor: "#c0c0c0", // Gray color for disabled button
        color: "#666666", // Lighter text color for disabled state
        cursor: "not-allowed", // Change cursor to not-allowed
        border: "1px solid #c0c0c0", // Add border to disabled button
    },
};

export default ProductList;

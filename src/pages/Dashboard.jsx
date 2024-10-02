import React, { createRef, useEffect } from "react";
import { useStore } from "../hooks/useStore";
import axios from "axios";

const Dashboard = () => {
    const { jwt, products, setProducts } = useStore((s) => s);
    useEffect(async function getProducts() {
        const products = await axios.get(
            "http://localhost:5200/v1/productlist",
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-type": "Application/json",
                    Authorization: `Bearer ${jwt}`,
                },
            }
        );
        console.log(products["data"]["products"]);
        setProducts(products["data"]["products"]);
    }, []);

    return (
        <section>
            <h1>This is your dashboard </h1>
            <ProductList products={products} />
        </section>
    );
};

export default Dashboard;

const ProductList = ({ products }) => {
    // Create refs for each product's quantity input
    const quantityRefs = products.reduce((acc, product) => {
        acc[product.id] = createRef();
        return acc;
    }, {});

    // Handle done button to fetch quantities from each input
    const handleDone = () => {
        const quantities = products
            .map((product) => {
                const quantity = quantityRefs[product.id].current.value;
                return {
                    id: product.id,
                    quantity: quantity,
                };
            })
            .filter((product) => product.quantity > 0);
        console.log("Collected Quantities:", quantities); // Process or display collected quantities
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
                                    defaultValue="1"
                                    ref={quantityRefs[product.id]}
                                    min="0"
                                    style={styles.quantityInput}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={handleDone} style={styles.doneButton}>
                Done
            </button>
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
        alignItems: "center",
        justifyContent: "center",
    },
    quantityInput: {
        width: "50px",
        marginLeft: "10px",
    },
    doneButton: {
        marginTop: "20px",
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
};

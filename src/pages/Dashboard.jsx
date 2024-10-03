import React, { createRef, useEffect } from "react";
import { useStore } from "../hooks/useStore";
import axios from "axios";
import ProductList from "../components/ProductList";
import CartPanel from "../components/CartPanel";

const Dashboard = () => {
    const { jwt, products, setProducts } = useStore((s) => s);
    useEffect(() => {
        async function getProducts() {
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
        }
        getProducts();
    }, []);

    return (
        <section>
            <div style={styles.dashboardContainer}>
                <h1 style={styles.heading}>This is your dashboard</h1>
                <p style={styles.description}>
                    You can select from multiple products and add them to your
                    cart.
                </p>
                <p style={styles.description}>
                    You can also proceed to checkout from the cart.
                </p>
                <p style={styles.callToAction}>
                    Start shopping and enjoy our seamless experience!
                </p>
            </div>

            <ProductList products={products} />
            <CartPanel />
        </section>
    );
};

export default Dashboard;

const styles = {
    dashboardContainer: {
        padding: "40px",
        backgroundColor: "#f5f7fa", // Soft background for readability
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        justifyContent: "center",
    },
    heading: {
        fontSize: "2.5rem",
        color: "#333",
        marginBottom: "20px",
        textAlign: "center",
        fontWeight: "700", // Bold and clear
        letterSpacing: "1px",
        textTransform: "uppercase", // Make the heading more prominent
    },
    description: {
        fontSize: "1.2rem",
        color: "#555",
        lineHeight: "1.8",
        maxWidth: "600px", // Limits the width for better readability
        textAlign: "center",
        marginBottom: "15px",
        padding: "0 20px", // Padding for mobile responsiveness
    },
    callToAction: {
        fontSize: "1.1rem",
        color: "#2ecc71", // Add color for emphasis
        fontWeight: "500",
        textAlign: "center",
    },
};

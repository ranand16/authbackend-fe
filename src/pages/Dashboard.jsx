import React, { useEffect } from "react";
import { useStore } from "../hooks/useStore";
import axios from "axios";
import ProductList from "../components/ProductList";
import CartPanel from "../components/CartPanel";

const API_URL = "http://localhost:5200/v1/productlist"; // API URL constant

const Dashboard = () => {
    const { jwt, products, setProducts } = useStore((s) => s);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get(API_URL, {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-type": "Application/json",
                        Authorization: `Bearer ${jwt}`,
                    },
                });
                setProducts(data.products); // Destructure directly
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts(); // Directly call the async function
    }, [jwt, setProducts]); // Dependency array

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
        backgroundColor: "#f5f7fa", // Soft background
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    },
    heading: {
        fontSize: "2.5rem",
        color: "#333",
        marginBottom: "20px",
        textAlign: "center",
        fontWeight: "700",
        letterSpacing: "1px",
        textTransform: "uppercase", // Prominent heading
    },
    description: {
        fontSize: "1.2rem",
        color: "#555",
        lineHeight: "1.8",
        maxWidth: "600px", // Limit text width for readability
        textAlign: "center",
        marginBottom: "15px",
        padding: "0 20px", // Mobile-friendly padding
    },
    callToAction: {
        fontSize: "1.1rem",
        color: "#2ecc71", // Emphasized call to action
        fontWeight: "500",
        textAlign: "center",
    },
};

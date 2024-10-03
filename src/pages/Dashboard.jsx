import React, { createRef, useEffect } from "react";
import { useStore } from "../hooks/useStore";
import axios from "axios";
import ProductList from "../components/ProductList";
import CartPanel from "../components/CartPanel";

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
            <h1>This is your dashboard</h1>
            <p>You can select from multiple products and add them to cart.</p>
            <p>You can checkout from the cart.</p>
            <ProductList products={products} />
            <CartPanel />
        </section>
    );
};

export default Dashboard;

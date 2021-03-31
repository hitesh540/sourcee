import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./cart";
import Search from "./Search";
import FooterPagePro from "./footer";
import EcoIcon from '@material-ui/icons/Eco';



const Home = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadProductsBySell = () => {
        getProducts("sold").then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
            }
        });
    };

    const loadProductsByArrival = () => {
        getProducts("createdAt").then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        });
    };

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, []);

    return (
        <Layout
            title="LEAF-MEALS"
            description="Find Here Something Great For Yourself"
            className="container-fluid"
        >
       
            <Search />
            <h2 className="mb-4">New Arrivals</h2>
            <div className="row">
                {productsByArrival.map((product, i) => (
                    <div key={i} className=" ml-2 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>

            <div  className="futer">
            <FooterPagePro/>
            </div>


        </Layout>
    );
};

export default Home;

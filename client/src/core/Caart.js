import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { getCart } from "./cartHelpers";
import Card from "./cart";
import FooterPagePro from "./footer";





const Cart = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(getCart());
    }, [items]);

    const showItems = items => {
        return (
            <div>
                <h2>You has {`${items.length}`} Saved items</h2>
                <hr />
                {items.map((product, i) => (
                    <Card
                        key={i}
                        product={product}
                        showAddToCartButton={false}
                        cartUpdate={true}
                        showRemoveProductButton={true}
                    />
                ))}
            </div>
        );
    };

    const noItemsMessage = () => (
        <h2>
            No Saved Post. <br /> <Link to="/shop">Continue Searching</Link>
        </h2>
    );

    return (
        <Layout
            title="Saved Items"
            description="Manage your Saved items. View or Remove ."
            className="container-fluid"
        >
            <div className="row">
                <div className="col-8">
                    {items.length > 0 ? showItems(items) : noItemsMessage()}
                </div>

              
            </div>



            
        </Layout>
    );
};

export default Cart;

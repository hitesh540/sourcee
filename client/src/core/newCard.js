import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import moment from "moment";
import { addItem, updateItem, removeItem } from "./cartHelpers";
import WatchLaterOutlinedIcon from '@material-ui/icons/WatchLaterOutlined';



const Curd = ({
    product,
    showViewProductButton = true,
    showAddToCartButton = true,
    cartUpdate = false,
    showRemoveProductButton = false
}) => {
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product);

    const showViewButton = showViewProductButton => {
        return (
            showViewProductButton && (
                <Link to={`/product/${product._id}`} className="mr-2">
                    <button className="btn btn-outline-primary mt-2 mb-2">
                        View Post
                    </button>
                </Link>
            )
        );
    };

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true);
        });
    };

    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to="/cart" />;
        }
    };

    const showAddToCart = showAddToCartButton => {
        return (
            showAddToCartButton && (
                <button
                    onClick={addToCart}
                    className="btn btn-outline-warning mt-2 mb-2"
                >
                    SAVE TO WATCH LATER<WatchLaterOutlinedIcon/>
                </button>
            )
        );
    };

    const showRemoveButton = showRemoveProductButton => {
        return (
            showRemoveProductButton && (
                <button
                    onClick={() => removeItem(product._id)}
                    className="btn btn-outline-danger mt-2 mb-2"
                >
                    Remove Post
                </button>
            )
        );
    };

    const showStock = quantity => {
        return quantity > 0 ? (
            <span className="badge badge-primary badge-pill"></span>
        ) : (
            <span className="badge badge-primary badge-pill"></span>
        );
    };

    const handleChange = productId => event => {
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if (event.target.value >= 1) {
            updateItem(productId, event.target.value);
        }
    };

    const showCartUpdateOptions = cartUpdate => {
        return (
            cartUpdate && (
                <div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            
                        </div>
                        
                    </div>
                </div>
            )
        );
    };

    return (
        <div className="card">
            <div className="card-header name">{product.name}</div>
            <div className="card-body">
                {shouldRedirect(redirect)}

                

                <p className="black-10">{product.address}</p>

                
              
                <p className="black-10"></p>
                <p className="black-9">
                    City: {product.category && product.category.name}
                </p>

                <p className="black-10">Contact Number - {product.number}</p>

               

                <p className="black-10">EMail-ID - {product.email}</p>

               
                <p className="black-8">
                    Added on {moment(product.createdAt).fromNow()}
                </p>
               
                <br />



                {showViewButton(showViewProductButton)}

                {showAddToCart(showAddToCartButton)}

                {showRemoveButton(showRemoveProductButton)}

                {showCartUpdateOptions(cartUpdate)}
            </div>
        </div>
    );
};

export default Curd;

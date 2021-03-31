import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/index";
import { Link, Redirect } from "react-router-dom";
import { getProduct, getCategories, updateProduct } from "./apiAdmin";

const UpdateProduct = ({ match }) => {
    const [values, setValues] = useState({
        name: "",
        address: "",
        description: "",
        number: "",
        email: "",
        text: "",
        fhoto: "",
        ghoto: "",
        para: "",

        // price: "",

        categories: [],
        category: "",

        // shipping: "",

        // quantity: "",

        photo: "",
       
        loading: false,
        error: false,
        createdProduct: "",
        redirectToProfile: false,
        formData: ""
    });

    const { user, token } = isAuthenticated();
    const {
        name,
        address,
        description,
        email,
        number,
        text,
        fhoto,
        ghoto,
        para,

        // price,

        categories,
        category,

        // shipping,
        // quantity,

        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;

    const init = productId => {
        getProduct(productId).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                // populate the state
                setValues({
                    ...values,
                    name: data.name,
                    address: data.address,
                    description: data.description,
                    number: data.number,
                    email: data.email,
                    text: data.text,
                    fhoto: data.fhoto,
                    ghoto: data.ghoto,
                    para: data.para,
                    

                    // price: data.price,

                    category: data.category._id,

                    // shipping: data.shipping,
                    // quantity: data.quantity,

                    formData: new FormData()
                });
                // load categories
                initCategories();
            }
        });
    };

    // load categories and set form data
    const initCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    categories: data,
                    formData: new FormData()
                });
            }
        });
    };

    useEffect(() => {
        init(match.params.productId);
    }, []);

    const handleChange = name => event => {
        const value =
            name === "photo"  ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };



    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });
         
        updateProduct(match.params.productId, user._id, token, formData).then(
            data => {
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    setValues({
                        ...values,
                        name: "",
                        address: "",
                        description: "",
                        photo: "",
                       
                        number: "",
                        email: "",
                        text: "",
                        fhoto: "",
                        ghoto: "",
                        para: "",

                        // price: "",

                        // quantity: "",

                        loading: false,
                        error: false,
                        redirectToProfile: true,
                        createdProduct: data.name
                    });
                }
            }
        );
    };

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <h4>Post Photo</h4>


            <div className="form-group">
                <label className="btn btn-secondary">
                    <input
                        onChange={handleChange("photo")}
                        type="file"
                        name="photo"
                        accept="image/*"
                    />
                </label>
            </div>


            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    onChange={handleChange("name")}
                    type="text"
                    className="form-control"
                    value={name}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Address</label>
                <input
                    onChange={handleChange("address")}
                    type="text"
                    className="form-control"
                    value={address}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Paragraph</label>
                <input
                    onChange={handleChange("para")}
                    type="text"
                    className="form-control"
                    value={para}
                />
            </div>

          


            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea
                    onChange={handleChange("description")}
                    className="form-control"
                    value={description}
                />
            </div>

           
   

            <div className="form-group">
                <label className="text-muted">Category</label>
                <select
                    onChange={handleChange("category")}
                    className="form-control"
                >
                    <option>Please select</option>
                    {categories &&
                        categories.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                </select>
            </div>



            <div className="form-group">
                <label className="text-muted">email</label>
                <input
                    onChange={handleChange("email")}
                    type="email"
                    className="form-control"
                    value={email}
                />
            </div>




            <div className="form-group">
                <label className="text-muted">Number</label>
                <input
                    onChange={handleChange("name")}
                    type="number"
                    className="form-control"
                    value={number}
                />
            </div>



            <div className="form-group">
                <label className="text-muted">Iframe</label>
                <input
                    onChange={handleChange("text")}
                    type="text"
                    className="form-control"
                    value={text}
                />
            </div>



            <div className="form-group">
                <label className="text-muted">Days</label>
                <input
                    onChange={handleChange("fhoto")}
                    type="text"
                    className="form-control"
                    value={fhoto}
                />
            </div>



            <div className="form-group">
                <label className="text-muted">Time</label>
                <input
                    onChange={handleChange("ghoto")}
                    type="text"
                    className="form-control"
                    value={ghoto}
                />
            </div>





            <button className="btn btn-outline-primary">Update Product</button>
        </form>
    );

    const showError = () => (
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    );

    const showSuccess = () => (
        <div
            className="alert alert-info"
            style={{ display: createdProduct ? "" : "none" }}
        >
            <h2>{`${createdProduct}`} is updated!</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );

    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
                return <Redirect to="/" />;
            }
        }
    };

    return (
        <Layout
            title="Add a new product"
            description={`G'day ${user.name}, ready to add a new product?`}
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                    {redirectUser()}
                </div>
            </div>
        </Layout>
    );
};

export default UpdateProduct;

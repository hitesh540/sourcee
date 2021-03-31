import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth/index";
import { Link } from "react-router-dom";
import { createProduct, getCategories } from "./apiAdmin";



const AddProduct = () => {
    const [values, setValues] = useState({
        name: "",
        description: "",
        address: "",
        email: "",
        number: "",
        text: "",
        fhoto: "",
        ghoto: "",
        para: "",

        // imageUrl: "",
        
        // price: "",

        categories: [],
        category: "",

        // shipping: "",

        // quantity: "",

         photo: "",


        loading: false,
        error: "",
        createdProduct: "",
        redirectToProfile: false,
        formData: ""
    });

    const { user, token } = isAuthenticated();
    const {
        name,
        description,
        address,
        email,
        number,
        text,
        fhoto,
        ghoto,
        para,

        // imageUrl,
        
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

    // load categories and set form data
    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    categories: data,
                    formData: new FormData()
                });
            }
        });
    };

    useEffect(() => {
        init();
    }, []);



    const handleChange = name => event => {

        const value =
            name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);

        setValues({ ...values, [name]: value  });

    };


   



    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });

        createProduct(user._id, token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: "",
                    description: "",
                    photo: "",
                    
                    address: "",
                    email: "",
                    number: "",
                    text: "",
                    fhoto: "",
                    ghoto: "",
                    para: "",

                    // imageUrl: "",

                    // price: "",

                    // quantity: "",

                    loading: false,
                    createdProduct: data.name
                });
            }
        });
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
                        multiple
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
                <label className="text-muted">Email</label>
                <input
                    onChange={handleChange("email")}
                    type="text"
                    className="form-control"
                    value={email}
                />
            </div>



            <div className="form-group">
                <label className="text-muted">Number</label>
                <input
                    onChange={handleChange("number")}
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

           

            <button className="btn btn-outline-primary">Create Product</button>
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
            <h2>{`${createdProduct}`} is created!</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );

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
                </div>
            </div>
        </Layout>
    );
};

export default AddProduct;

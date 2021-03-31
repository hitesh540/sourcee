import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { read, listRelated } from "./apiCore";
import Card from "./cart";
import Curd from "./newCard";
import ImageUpload from "./ImageUpload";
import FooterPagePro from "./footer";





const Product = props => {
    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
                // fetch related products
                listRelated(data._id).then(data => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setRelatedProduct(data);
                    }
                });
            }
        });
    };

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, [props]);

    return (

        <Layout
            title={"Post-Details"}
           className="container-fluid" >

            <div className="row">
                <div className="col-8">
                    {product && product.description && (

                        <Curd product={product} showViewProductButton={false} />

                    )}
                </div>

                <div className="col-10">
               <div className="card-body">

              <br/><br/>

               <ImageUpload item={product} url="product" />

                <br/>

                <h2><em>Description</em></h2>
                
                <p className="para" >{product.para}</p> 

                <p className="lead mt-2">
                    {product.description}
                </p>

                <br/>

                   <h3><em>Available</em></h3>
                   <h5> {product.fhoto}</h5>
                   <h5> {product.ghoto}</h5>

                   <br/><br/>

                <h4><em>Area From Where The Service is Available</em></h4>
                
                <iframe src={product.text} alt={product.name}   className="frame"  />
                  
               </div>
               </div>


                <div className="col-4" className="mb-3">
                    <h4>Related product</h4>
                    {relatedProduct.map((p, i) => (
                        <div className="mb-3">
                            <Card key={i} product={p} />
                        </div>
                    ))}
                </div>

               
            </div>

              <div  className="futer">
            <FooterPagePro/>
            </div>

        </Layout>
    );
};

export default Product;

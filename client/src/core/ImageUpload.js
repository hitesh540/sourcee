import React from "react";
import { API } from "../config";

const ImageUpload = ({ item, url }) => (
    <div className="product-img">
        <img
             
            src={`${API}/${url}/photo/${item._id}`}
            alt={item.name}
            className="mb-3"
            className="imagi"
        />
    </div>
);

export default ImageUpload;

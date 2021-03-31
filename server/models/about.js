const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const aboutSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            
        },
        description: {
            type: String,
           
        },
        fhoto: {
            type: String,
            trim: true
        },
        ghoto: {
            type: String,
            trim: true
        },
        para: {
            type: String,
            trim: true
        },
        address: {
            type: String,
            trim: true
            },
        email: {
        type: String,
        trim: true
        },
        text: {
            type: String,
            trim: true
            },
        number: {
        type: String
        }
    }
);


module.exports = mongoose.model("About", aboutSchema);

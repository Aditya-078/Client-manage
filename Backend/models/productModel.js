const mongoose = require("mongoose");

const productSchema = mongoose.Schema ({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: "User",
    },
    name:{
        type: String,
        required: [true, 'Please add a name'],
        trim: true

    },
    sku:{
        type: String,
        required: [true],
        default: "SKU",
        trin: true

    },
    category: {
        type: String,
        required: [true, "Please add a category"],
        trim:true,

    },
    quantity: {
        type: String,
        required: [true, "Please add a quantity"],
        trim:true,

    },

    Price: {
        type: String,
        required: [true, "Please add a price"],
        trim:true,

    },
    Description: {
        type: String,
        required: [true, "Please add a Description"],
        trim:true,

    },
    image: {
        type: Object,
        defaut:{}

    },

    
})

const Product = mongoose.model("Product", productSchema)

module.exports = Product;
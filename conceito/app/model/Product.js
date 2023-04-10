const mongoose = require('mongoose')

const Product = mongoose.model('Product',
{
    name: String,
    product_id: Number,
    description: String,
    stock: Number,
    image: String,
    variant: {v_name: String,v_image: String}
})
module.exports = Product
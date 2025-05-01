const fs = require('fs');
const path = require('path');
const Product = require('../Models/ProductModel');
const { serialize } = require('v8');

const addProduct = async (req, res) => {
    const product = new Product({
        ...req.body
    });
    console.log(product);
    await product.save();
    console.log("saved");
    res.json({
        success: true,
        name: req.body.name
    });
}

const deleteImage = (image) => {
    const imagePath = path.join(__dirname, '..', 'upload', 'images', path.basename(image));

    fs.unlink(imagePath, (err) => {
        if (err) {
            console.error("Error deleting image file:", err);
            return res.status(500).json({ success: false, message: 'Failed to delete image file' });
        }
    });
}

const deleteProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    const image = product.image;

    await Product.findByIdAndDelete(req.params.id);
    console.log("Deleted");
    res.json({
        success: true,
        name: req.body.name
    });
    
    deleteImage(image);
}

const updateProduct = async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    const previousImage = product.image;

    await Product.findByIdAndUpdate(id, req.body)

    if (req.body.discount === false && product.old_price) {
        await Product.findByIdAndUpdate(id, { $unset: { old_price: "" } });
    }

    if (req.body.image) {
        deleteImage(previousImage);
    }
    
    console.log(req.body);
    console.log("Updated");
    res.json({
        success: true,
        updates: req.body
    });
}

const getAllProducts = async (req, res) => {
    const products = await Product.find({});
    res.send(products);
}

const getSingleProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.send(product);
}

const getNewCollection = async (req, res) => {
    const products = await Product.find({});
    const new_collection = products.slice(1).slice(-8);
    res.send(new_collection);
}

const getStock = async (req, res) => {
    const product = await Product.findById(req.params.id);
    const stock = product.stock;
    res.send(stock);
}

const decrementStock = async (req, res) => {
    const size = req.body.size;
    const product = await Product.findById(req.params.id);
    product.stock[size] -= req.body.quantity;
    await product.save();
    res.send("Stock decremented.")
}

const incrementStock = async (req, res) => {
    const size = req.body.size;
    const product = await Product.findById(req.params.id);
    product.stock[size] += req.body.quantity;
    await product.save();
    res.send("Stock decremented.")
}

module.exports = {
    addProduct,
    deleteProduct,
    updateProduct,
    getAllProducts,
    getSingleProduct,
    getNewCollection,
    getStock,
    decrementStock,
    incrementStock
};
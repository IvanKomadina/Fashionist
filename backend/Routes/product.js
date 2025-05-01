const express = require('express');
const router = express.Router();

// controller functions
const { 
    addProduct, 
    deleteProduct, 
    updateProduct, 
    getAllProducts, 
    getSingleProduct, 
    getNewCollection,
    decrementStock,
    incrementStock, 
    getStock
} = require('../Controllers/productController')

// product routes
router.post('/addproduct', addProduct)
router.delete('/deleteproduct/:id', deleteProduct)
router.put('/updateproduct/:id', updateProduct)
router.get('/allproducts', getAllProducts)
router.get('/singleproduct/:id', getSingleProduct)
router.get('/newcollection', getNewCollection)
router.get('/getstock/:id', getStock)
router.patch('/decrementstock/:id', decrementStock)
router.patch('/incrementstock/:id', incrementStock)

module.exports = router;
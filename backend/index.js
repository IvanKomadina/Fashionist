require('dotenv').config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const multer = require("multer")
const path = require("path")
const cors = require("cors")
const productRoutes = require('./Routes/product');
const userRoutes = require('./Routes/user');
const orderRoutes = require('./Routes/order');
const { stripeWebhook } = require('./Controllers/orderController')

// image storage engine to save uploaded files to disk
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {                      // extracts the original file extension
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

app.use(cors())

app.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhook)

app.use(express.json())

// looks for requested file in this directory and serves it as static if found
app.use('/images', express.static('upload/images'))

// database connection
mongoose.connect(process.env.MONGO_URI)

// handle file upload from fieldname product, 
// multer saves it to the upload/images directory with the specified filename format
// req.file contains information about the uploaded file
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${process.env.PORT}/images/${req.file.filename}`
    })
})

// product API
app.use('/api/products', productRoutes)

// user API
app.use('/api/users', userRoutes)

// order API
app.use('/api/orders', orderRoutes)

app.listen(process.env.PORT, (error) => {
    if (!error) {
        console.log("Server running on port " + process.env.PORT);
    }
    else {
        console.log("Error:" + error)
    }
})
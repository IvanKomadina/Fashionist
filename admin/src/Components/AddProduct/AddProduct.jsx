import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './AddProduct.css'
import upload_icon from '../../assets/upload_icon.png'

const AddProduct = () => {
    const navigate = useNavigate();
    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
    const [image, setImage] = useState(null);
    const [error, setError] = useState(""); 
    const [stock, setStock] = useState({
        S: 0,
        M: 0,
        L: 0,
        XL: 0,
        XXL: 0
    })
    const [productDetails, setProductDetails] = useState({
        name: "",
        description: "",
        image: "",
        price: "",
        discount: false,
        old_price: "",
        category: "men",
        type: "t-shirt",
        stock: ""
    })
    
    // set uploaded image to image variable
    const imageHandler = (e) => {
        if(e.target.files[0].type.startsWith('image/')){
            setImage(e.target.files[0]);
        } else {
            //alert("Please upload a valid image file.");
            setError("Please fill all the fields correctly.");
        }
    }

    const changeHandler = (e) => {
        if (e.target.name.includes('stock')) {
            const size = e.target.name.split('-')[1];
            setStock({...stock, [size]: Number(e.target.value)});
        } else if (e.target.name === 'price' || e.target.name === 'old_price') {
            setProductDetails({...productDetails, [e.target.name]: Number(e.target.value)});
        } else if (e.target.name === 'discount') {
            setProductDetails({...productDetails, [e.target.name]: e.target.checked});
            if (!e.target.checked) {
                setProductDetails(prevDetails => {
                    const updatedDetails = {...prevDetails};
                    updatedDetails.old_price = "";
                    return updatedDetails;
                })
            }
        } else {
            setProductDetails({...productDetails, [e.target.name]: e.target.value})
        }
    }

    const addNewProduct = async () => {
        for (const key in productDetails) {
            if (key !== "old_price" && key != "image" && key != "stock" && productDetails[key] === "") {
                //alert("Please fill in all the product details.");
                setError("Please fill all the fields correctly.");
                return;
            }
        }

        for (const key in stock) {
            if (stock[key] === "") {
                //alert("Please fill in all the product details.");
                setError("Please fill all the fields correctly.");
                return;
            }
        }

        if (image === null) {
            //alert("Please upload the image.");
            setError("Please fill all the fields correctly.");
            return;
        }

        if (productDetails.price <= 0) {
            //alert("Please fill the price field correctly.");
            setError("Please fill all the fields correctly.");
            return;   
        }

        if (productDetails.discount) {
            if (productDetails.old_price <= 0 || productDetails.old_price <= productDetails.price) {
                //alert("Please fill the price fields correctly.");
                setError("Please fill all the fields correctly.");
                return;
            }
        }

        if (productDetails.discount && productDetails.old_price === "") {
            //alert("Please fill the old price field.");
            setError("Please fill all the fields correctly.");
            return;
        }

        let responseData;
        let product = { ...productDetails };

        if (!product.discount) {
            delete product.old_price;
        }

        let formData = new FormData();
        formData.append('product', image);

        await fetch("http://localhost:4000/upload", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formData,
        })
        .then((res) => res.json())
        .then((data) => {responseData = data})

        if (responseData.success) {
            product.image = responseData.image_url;
            product.stock = stock;
            await fetch('http://localhost:4000/api/products/addproduct', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    navigate('/productlist'); 
                } else {
                    alert("Failed");
                }
            })
        }
    }

  return (
    <div className="add-product">
        <div className="addproduct-itemfield">
            <p>Product title</p>
            <input type="text" value={productDetails.name} onChange={changeHandler} name='name' placeholder="Type here" />
        </div>
        <div className="addproduct-itemfield">
            <p>Product description</p>
            <textarea value={productDetails.description} onChange={changeHandler} name='description' placeholder='Type here'></textarea>
        </div>
        <div className="addproduct-price">
            <div className="addproduct-itemfield">
                <p>Price</p>
                <input type="number" value={productDetails.price} onChange={changeHandler} name='price' placeholder="Type here" />
            </div>
            <div className="addproduct-itemfield">
                <p>Old price</p>
                <input type="number" value={productDetails.old_price} onChange={changeHandler} name='old_price' placeholder="Type here" disabled={!productDetails.discount} />
            </div>
        </div>
        <div className="addproduct-itemfield discount">
            <p>Discount</p>
            <input type="checkbox" onChange={changeHandler} name='discount' />
        </div>
        <p className='stock-label'>Stock</p>
        <div className="addproduct-itemfield stock">
            {sizes.map((size) => (
            <div key={size} className='sizes'>
                <p>{size}</p>
                <input type="number" value={stock.size} onChange={changeHandler} name={`stock-${size}`}/>
            </div>
            ))}
        </div>
        <div className="selector-fields">
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select name="category" value={productDetails.category} onChange={changeHandler} className="add-product-selector">
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="kids">Kids</option>
                </select>
            </div>
            <div className="addproduct-itemfield">
                <p>Product Type</p>
                <select name="type" value={productDetails.type} onChange={changeHandler} className="add-product-selector">
                    <option value="t-shirt">T-shirt</option>
                    <option value="hoodie">Hoodie</option>
                    <option value="pants">Pants</option>
                    <option value="jacket">Jacket</option>
                </select>
            </div>
        </div>
        <div className="addproduct-itemfield">
            <label htmlFor="file-input">
                <img src={image ? URL.createObjectURL(image) : upload_icon} className="addproduct-thumbnail-img" alt="" />
            </label>
            <input onChange={imageHandler} type="file" name="image"  id="file-input" hidden />
        </div>
        {error && <p className="addProduct-error">{error}</p>} 
        <button onClick={() => {addNewProduct()}} className="addproduct-btn">ADD</button>
    </div>
  )
}

export default AddProduct
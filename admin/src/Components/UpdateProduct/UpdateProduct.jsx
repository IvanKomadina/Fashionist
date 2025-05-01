import React, { useState, useEffect } from 'react'
import './UpdateProduct.css'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const UpdateProduct = () => {
    const navigate = useNavigate();
    const {id} = useParams(); 
    const [imageChange, setImageChange] = useState(false);
    const [image, setImage] = useState('');
    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
    const [error, setError] = useState("");
    const [stock, setStock] = useState({
        S: 0,
        M: 0,
        L: 0,
        XL: 0,
        XXL: 0
    });
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
    });

    const fetchProduct = async () => {
        await fetch('http://localhost:4000/api/products/singleproduct/' + id)
        .then((res) => res.json())
        .then((data) => {
            setImage(data.image);
            setStock(data.stock);
            setProductDetails({
                name: data.name,
                description: data.description,
                image: data.image,
                price: data.price,
                discount: data.discount,
                old_price: data.old_price || '',
                category: data.category,
                type: data.type,
                stock: data.stock
            });
        })
    }

    useEffect(() => {
        fetchProduct();
        window.scrollTo(0, 0);
    }, [])

    // set uploaded image to image variable
    const imageHandler = (e) => {
        if(e.target.files[0].type.startsWith('image/')) {
            setImage(e.target.files[0]);
            setImageChange(true);
        } else {
            //alert("Please upload a valid image file.");
            setError("Please fill all the fields correctly.");
        }
    }

    const changeHandler = (e) => {
        if (e.target.name.includes('stock')) {
            const size = e.target.name.split('-')[1];
            setStock({...stock, [size]: Number(e.target.value)});
        } else if (e.target.name === 'price' || e.target.name === 'old_price' || e.target.name === 'stock') {
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

    const updateProductDetails = async () => {
        for (const key in productDetails) {
            if (key !== "old_price" && key != "image" && productDetails[key] === "") {
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

        if (productDetails.stock < 0) {
            //alert("Please fill the stock field correctly.");
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
        product.stock = stock;

        if (!product.discount) {
            delete product.old_price;
        }

        if (imageChange) {
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
            }
        } else {
            delete product.image;
        }

        await fetch('http://localhost:4000/api/products/updateproduct/' + id, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                alert("Product Updated");
                navigate('/productlist'); 
            } else {
                alert("Failed");
            }
        })
    }

  return (
    <div className="update-product">
         <div className="updateproduct-itemfield">
            <p>Product title</p>
            <input type="text" value={productDetails.name} onChange={changeHandler} name='name' placeholder="Type here" />
        </div>
        <div className="updateproduct-itemfield">
            <p>Product description</p>
            <textarea value={productDetails.description} onChange={changeHandler} name='description' placeholder='Type here'></textarea>
        </div>
        <div className="updateproduct-price">
            <div className="updateproduct-itemfield">
                <p>Price</p>
                <input type="number" value={productDetails.price} onChange={changeHandler} name='price' placeholder="Type here" />
            </div>
            <div className="updateproduct-itemfield">
                <p>Old price</p>
                <input type="number" value={productDetails.old_price} onChange={changeHandler} name='old_price' placeholder="Type here" disabled={!productDetails.discount} />
            </div>
        </div>
        <div className="updateproduct-itemfield discount">
            <p>Discount</p>
            <input type="checkbox" onChange={changeHandler} name='discount' checked={productDetails.discount} />
        </div>
        <p className='stock-label'>Stock</p>
        <div className="addproduct-itemfield stock">
            {sizes.map((size) => (
            <div key={size} className='sizes'>
                <p>{size}</p>
                <input type="number" value={stock[size]} onChange={changeHandler} name={`stock-${size}`}/>
            </div>
            ))}
        </div>
        <div className="selector-fields">
            <div className="updateproduct-itemfield">
                <p>Product Category</p>
                <select name="category" value={productDetails.category} onChange={changeHandler} className="update-product-selector">
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="kids">Kids</option>
                </select>
            </div>
            <div className="updateproduct-itemfield">
                <p>Product Type</p>
                <select name="type" value={productDetails.type} onChange={changeHandler} className="update-product-selector">
                    <option value="t-shirt">T-shirt</option>
                    <option value="hoodie">Hoodie</option>
                    <option value="pants">Pants</option>
                    <option value="jacket">Jacket</option>
                </select>
            </div>
        </div>
        <div className="updateproduct-itemfield">
            <label htmlFor="file-input">
                <img src={typeof image === 'object' ? URL.createObjectURL(image) : image}  className="updateproduct-thumbnail-img" alt="" />
            </label>
            <input onChange={imageHandler} type="file" name="image"  id="file-input" hidden />
        </div>
        {error && <p className="updateProduct-error">{error}</p>}
        <button onClick={() => {updateProductDetails()}} className="updateproduct-btn">UPDATE</button>
    </div>
  )
}

export default UpdateProduct
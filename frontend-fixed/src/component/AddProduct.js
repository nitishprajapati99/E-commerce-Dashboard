import React from 'react';
import { useState,} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../Context/SnackbarContext';


const AddProduct = () => {
    const [productName, setName] = useState("");
    const [productType, setType] = useState("");
    const [productPrice, setPrice] = useState("");
    const [brand, setBrand] = useState("");
    const [error, setError] = useState(false)
    const navigate =useNavigate();
    const {showSnackbar} = useSnackbar();


    const CollectProduct = async () => {
        if (!productName || !productPrice || !productType || !brand) {
            showSnackbar('Please fill all the details','error');
            // setError(true);
            return false;
        }
        let userId = JSON.parse(localStorage.getItem('user'))._id;

        let result = await fetch("http://localhost:5000/add-product", {
            method: 'post',
            body: JSON.stringify({
                productName,
                productType,
                productPrice,
                brand,
                userId
            }),
            headers: {
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`,
                'Content-Type': 'application/json'
            }
        });
        if (!result.ok) {
            throw new Error('failed to add product')
        } else {
            result = await result.json();
            console.log(result);
            
            setName("");
            setType("");
            setPrice("");
            setBrand("");
           showSnackbar('Product Added Successfully','success');
           navigate('/');
        }
    }
    return (
        <div id="Product-form-box">
            <h2>Add Product</h2>
            <input className="input-field" value={productName} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter Product Name" />
            {error && !productName && <span className='invalid-input'><small>Enter valid Name</small></span>}
            <input className="input-field" value={productPrice} onChange={(e) => setPrice(e.target.value)} type="Number" placeholder="Enter Product Price" />
            {error && !productPrice && <span className='invalid-input'><small>Enter valid Price</small></span>}
            <input className="input-field" value={productType} onChange={(e) => setType(e.target.value)} type="text" placeholder="Enter Product Type" />
            {error && !productType && <span className='invalid-input'><small>Enter valid category</small></span>}
            <input className="input-field" value={brand} onChange={(e) => setBrand(e.target.value)} type="text" placeholder="Enter Company Name" />
            {error && !brand && <span className='invalid-input'><small>Enter valid Company Name</small></span>}
            <button id="add-button" type="button"onClick={CollectProduct}> Add Product</button>
        </div>
    )
}

export default AddProduct;
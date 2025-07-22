import React from "react";
import { useParams , useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useSnackbar } from "../Context/SnackbarContext";


const UpdateProduct = () => {
    const [productName, setName] = useState("");
    const [productPrice, setPrice] = useState("");
    const [productType, setType] = useState("");
    const [brand, setBrand] = useState("");
    const params = useParams();
    const Navigate = useNavigate();
    const {showSnackbar} = useSnackbar();

    
        useEffect(() => {
          ProductDetails();
        }, []);

    const ProductDetails =async()=>{
        let result = await fetch(`http://localhost:5000/single-product/${params.id}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });

        result= await result.json();
       setName(result.productName);
       setPrice(result.productPrice);
       setType(result.productType);
       setBrand(result.brand);
    }

    const update = async()=>{
       let result = await fetch(`http://localhost:5000/update-product/${params.id}`,{
        method:'PUT',
        body:JSON.stringify({
             productName,
                productType,
                productPrice,
                brand,
        }),
        headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`,
            "Content-Type":'application/json'
        }
       })

       result = await result.json();
       if(result){
        showSnackbar('Product updated Successfully','success');
        Navigate('/');
       }else{
        showSnackbar('Invalid product id','error');
       }
       
    }
    return (
        <div id="Update-form-box">
            <h2>Update Product</h2>
            <input className="input-field" value={productName} onChange={(e) => { setName(e.target.value) }} type="text" placeholder="Enter Product Name" />
            <input className="input-field" value={productPrice} onChange={(e) => { setPrice(e.target.value) }} type="Number" placeholder="Enter Product Price" />
            <input className="input-field" value={productType} onChange={(e) => { setType(e.target.value) }} type="text" placeholder="Enter Product Type" />
            <input className="input-field" value={brand} onChange={(e) => { setBrand(e.target.value) }} type="text" placeholder="Enter Company Name" />
            <button type="button" onClick={(update)}  id="add-button" >Update Product</button>

        </div>
    )

}

export default UpdateProduct;
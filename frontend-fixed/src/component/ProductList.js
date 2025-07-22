import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import {useSnackbar} from '../Context/SnackbarContext';
const ProductList = () => {
    const [products, setProducts] = useState([]);
    const {showSnackbar} = useSnackbar();

    useEffect(() => {
        getProducts();

    }, [])
    //function for get the product
    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/product-list',{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setProducts(result);
    }
    //function for delete the product
    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5000/delete-product/${id}`, {
            headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            },
             method: "DELETE"
    });
        result = await result.json();
        if (result) {
            getProducts();
        } else {
          showSnackbar('Something wents Wrong')
        }
    }

    const SearchHandle = async (search) => {
        const key = search.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/search-product/${key}`,{
                method:'GET',
                headers:{
                    Authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            if (result) {
                setProducts(result.data);
            } else {
                alert('search for a product');
            }
        } else {
            getProducts();
        }
    }




    return (
        <body >
            
        <div className="product-list" style={{backgroundColor:"white"}}>
             <input id="search-box" type="text" placeholder='Search For Product' onChange={SearchHandle} />
            <h3>Product List</h3>
            <ul>
                <li>S.NO</li>
                <li>Product Name</li>
                <li>Price</li>
                <li>brand</li>
                <li>Operation</li>
            </ul>
            {
                products.length > 0 ? products.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.productName}</li>
                        <li>{item.productPrice}</li>
                        <li>{item.brand}</li>
                        <li>{<button id="delete-button" onClick={() => deleteProduct(item._id)}>Delete</button>
                        } <Link id="updateButton" to={"/update/" + item._id}>Update</Link> </li>

                    </ul>

                ) :
                    <h3 id="search-h3">No Record is Found</h3>
            }

        </div>
        </body>

    )
}
export default ProductList;
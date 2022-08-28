import React, {useEffect, useState} from "react";
import axios from "axios";
import { useFormik } from "formik";
import "./styles.css";
import { useNavigate } from 'react-router-dom';
import Layout from '../layout';

const AddCategoryForm = () => {
    const navigate = useNavigate();
    const [products,setProducts] = useState([]);
    const [productID,setProductID] = useState('');
    const [category,setCategory] = useState('');
    useEffect( () => {
        const session = localStorage.getItem('token');
        if(!session){
            navigate('/');
        }else{
            axios.get('http://localhost:2022/api/product/', {headers:{'Authorization':"Bearer "+localStorage.getItem('token')}}).then(function (response){
                setProducts(response.data.products)
            })
        }
    })

    const handleSubmit = async event => {
        event.preventDefault();
        let values = {productID,category};
        if(values.productID == ''){

            alert("Please Select an option");
            return;
        }
        else if(values.category == ''){
            alert("Category Name is required");
            return;
        }
        else{
            console.log(values);
            handleAddCategory(values.productID, values.category)
        }
    }

    const handleAddCategory = async (productID,category) =>{
        const requestData = {
            product:productID,category
        }
        await axios.post('http://localhost:2022/api/category/addcategory', requestData, {headers:{'Authorization':"Bearer "+localStorage.getItem('token')}}).then(function (response){
            if(response.data.message == 'Category added successfully'){
                alert(response.data.message);
                navigate("/category");
            }
            else{
                alert('Failed TO Add');
            }
        });
    };

    return (
        <Layout>
        <div className='signup_container'>
            <div className='signup_form_container'>
                <div className='left'>
                    <h1>Add Category</h1>
                </div>
                <div className='right'>
                    {/*<form className='form_container' onSubmit={formik.handleSubmit}>*/}
                    <form className='form_container' onSubmit={handleSubmit}>
                        <select
                            onChange={(e) => setProductID(e.target.value)}
                            name="product"
                            value={productID}
                        >
                            <option value=''>Select an Option</option>
                            {products.map(item =>
                                <option key={item._id} value={item._id}>{item.product_name}</option>
                            )}
                        </select>
                        <br/>
                        <input
                            id="category"
                            name="category"
                            type="text"
                            onChange={(e) => setCategory(e.target.value)}
                            value={category}
                            className="input"
                            placeholder="Enter Category"
                            required=''
                            />

                        {/*<select*/}
                        {/*    name='product'*/}
                        {/*    onValueChange={formik.handleChange}*/}
                        {/*    // value={formik.values.product}*/}
                        {/*>*/}
                        {/*    <option value=''>Select option</option>*/}
                        {/*    {products.map(item =>*/}
                        {/*        <option key={item._id} value={item._id}>{item.product_name}</option>*/}
                        {/*    )}*/}
                        {/*</select>*/}
                        {/*<input*/}
                        {/*    id="name"*/}
                        {/*    name="name"*/}
                        {/*    type="name"*/}
                        {/*    onChange={formik.handleChange}*/}
                        {/*    value={formik.values.name}*/}
                        {/*    className="input"*/}
                        {/*    placeholder="Enter Category"*/}
                        {/*    required=''*/}
                        {/*/><br/>*/}
                        <button type="submit" className="green_btn">Add</button>
                    </form>
                </div>
            </div>
        </div>
        </Layout>
    );
};

export default AddCategoryForm;
import React, {useEffect} from "react";
import axios from "axios";
import { useFormik } from "formik";
import "./styles.css";
import { useNavigate } from 'react-router-dom';
import Layout from '../layout';

const AddProductForm = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {name:""},
        onSubmit: values => {
            if(values.name == ''){
                alert("Name is required");
                return;
            }else{
                console.log(values);
                handleAddProduct(values.name)
            }
        }
    });
    const handleAddProduct = async (name) =>{
        const requestData = {
            product_name : name
        }
        await axios.post('http://localhost:2022/api/product/addproduct', requestData, {headers:{'Authorization':"Bearer "+localStorage.getItem('token')}}).then(function (response){
            if(response.data.message == 'Product added successfully'){
                alert(response.data.message);
                navigate("/products");
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
                    <h1>Add Product</h1>
                </div>
                <div className='right'>
                    <form className='form_container' onSubmit={formik.handleSubmit}>
                        <input
                            id="name"
                            name="name"
                            type="name"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            className="input"
                            placeholder="Enter Product"
                            required=''
                        /><br/>
                        <button type="submit" className="green_btn">Add</button>
                    </form>
                </div>
            </div>
        </div>
        </Layout>
    );
};

export default AddProductForm;
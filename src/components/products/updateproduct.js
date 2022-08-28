
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams , useNavigate} from "react-router-dom";
import Layout from '../layout';

const ProductUpdateForm =()=> {
    const navigate = useNavigate();
    const { id } = useParams();
    const [productName,setProductName] = useState("");
    const [_id,setProductId]=useState(null);

    useEffect( () => {
        const session = localStorage.getItem('token');
        if (!session) {
            navigate('/');
        } else {
            axios.get('http://localhost:2022/api/product/getproductdataforupdate/' + id, {headers: {'Authorization': "Bearer " + localStorage.getItem('token')}}).then(function (response) {
                let result = response.data.productData;
                setProductName(result.product_name);
                setProductId(result._id);
            });
        }
    },[]);

    const handleSubmit = async event => {
        event.preventDefault();
        let values = {_id,product_name:productName};
        if(values.product_name == ''){
            alert("Name is required");
            return;
        }
        await axios.post('http://localhost:2022/api/product/updateproduct/', values, {headers: {'Authorization': "Bearer " + localStorage.getItem('token')}}).then(function (response) {
            if (response.data.message == 'Product updated successfully') {
                navigate('/products');
            } else {
                alert(response.data.message);
                navigate("/products");
            }
        });
    }
    return (
        <Layout>
            <div className='signup_container'>
                <div className='signup_form_container'>
                    <div className='left'>
                        <h1>Update Form</h1>
                    </div>
                    <div className='right'>
                        <form onSubmit={handleSubmit}>
                            <input type='hidden' value={_id} name='_id' />
                            <input type="text"
                                   value={productName}
                                   name='product_name'
                                   onChange={(e)=>{setProductName(e.target.value)}}
                                   className="input"
                                   placeholder="Enter Product"
                            /> <br />
                            <button type='submit' className="green_btn">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ProductUpdateForm;

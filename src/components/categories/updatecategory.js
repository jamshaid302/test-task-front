import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams , useNavigate} from "react-router-dom";
import Layout from '../layout';

const CategoryUpdateForm =()=> {
    const navigate = useNavigate();
    const { id } = useParams();
    const [products,setProducts] = useState([]);
    const [productName,setProductNameInDropDown] = useState("");
    const [productID,setProductID] = useState("");
    const [category,setCategory] = useState("");
    const [_id,setCategoryId]=useState(null);

    useEffect( () => {
        axios.get('http://localhost:2022/api/product', {headers:{'Authorization':"Bearer "+localStorage.getItem('token')}}).then(function (response){
            setProducts(response.data.products)
        })
    })
    useEffect( () => {
        const session = localStorage.getItem('token');
        if (!session) {
            navigate('/');
        } else {
            axios.get('http://localhost:2022/api/category/getcategorydataforupdate/' + id, {headers: {'Authorization': "Bearer " + localStorage.getItem('token')}}).then(function (response) {
                let result = response.data.category;
                setProductNameInDropDown(result.product[0].product_name);
                setProductID(result.product[0]._id);
                setCategory(response.data.category.category)
                setCategoryId(result._id);
            });
        }
    },[]);
    const handleSubmit = async event => {
        event.preventDefault();
        let values = {_id:id,product:productID,category};
        if(values.productID == ''){
            alert("Please Select an Option");
            return;
        }else if(values.category == ''){
            alert("Category Name is required");
            return;
        }
        await axios.post('http://localhost:2022/api/category/updatecategory/', values, {headers: {'Authorization': "Bearer " + localStorage.getItem('token')}}).then(function (response) {
            if (response.data.message == 'Category updated successfully') {
                navigate('/category');
            } else {
                alert(response.data.message);
                navigate("/category");
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
                            <select
                                name='product'
                                value={productID}
                                onChange={(e)=> setProductID(e.target.value)}
                            >
                                {products.map(item =>
                                    <option key={item._id} value={item._id}>{item.product_name}</option>
                                )}
                            </select>
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
                            <br />
                            <button type='submit' className="green_btn">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CategoryUpdateForm;

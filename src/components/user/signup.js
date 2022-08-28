import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import "./styles.css";
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {name:"", email: "" ,password:""},
        onSubmit: values => {
            if(values.name == ''){
                alert("Name is required");
                return;
            }else if(values.password == ''){
                alert('Password is required');
                return;
            }else if( values.password.length < 6){
                alert('Password Should be of length 6');
                return;
            }else if(values.email == ''){
                alert('Please Enter Email Address');
            }else{
                console.log(values);
                handleSignUp(values.name,values.email,values.password)
            }
        }
    });
    const handleSignUp = async (name,email,password) =>{
        const requestData = {
            name , email  , password
        }
        await axios.post('http://localhost:2022/user/signup', requestData).then(function (response){
            if(response.data.message == 'User added successfully'){
                alert(response.data.message);
                navigate("/");
            }
            else{
                alert('Failed TO Add');
            }
        });
    };
    return (
            <div className='signup_container'>
                <div className='signup_form_container'>
                    <div className='left'>
                        <h1>SignUp Form</h1>
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
                                placeholder="Enter Name"
                                required=''
                            /><br/>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                className="input"
                                placeholder="Enter Email"
                                required=''
                            /><br/>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                className="input"
                                placeholder="Enter Password"
                                required=''
                            /><br/>
                            <button type="submit" className="green_btn">Register</button>
                        </form>
                    </div>
                </div>
            </div>
    );
};

export default SignupForm;
import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import "./styles.css";
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: { email: "" ,password:""},
        onSubmit: values => {
            if(values.email == ''){
                alert('Please Enter Email Address');
                return;
            }else if(values.password == ''){
                alert('Please Enter Password');
                return;
            }else if(values.password.length < 6){
                alert('Incomplete Password...Password Should be of length 6');
                return;
            }else{
                console.log(values);
                handleSignUp(values.email,values.password);
            }
        }
    });
    const handleSignUp = async (email,password) =>{
        const requestData = {
            email  , password
        }
        await axios.post('http://localhost:2022/user/login', requestData).then(function (response){
            if(response.data.message == 'Login successful') {
                localStorage.setItem("token", response.data.token);
                alert(response.data.message);
                navigate('/dashboard');
            }
            else{
                alert(response.data.message);
                localStorage.removeItem('token');
                navigate("/");
            }
        });
    };
    return (
            <div className='signup_container'>
                <div className='signup_form_container'>
                    <div className='left'>
                        <h1>Login Form</h1>
                    </div>
                    <div className='right'>
                        <form className='form_container' onSubmit={formik.handleSubmit}>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                className="input"
                                placeholder="Enter Email"
                            /><br/>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                className="input"
                                placeholder="***************"
                            /><br/>
                            <button type="submit" className="green_btn">Login</button>
                            <Link to="/signup" variant = "body2">
                                Not have an account ? Sign up here
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
    );
};
export default LoginForm
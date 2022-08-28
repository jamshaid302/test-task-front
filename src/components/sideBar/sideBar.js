import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import {useNavigate} from "react-router-dom";

const SideBar = () => {
    const navigate = useNavigate();
    const handleLogout = () =>{
        try {
            localStorage.removeItem("token");
            navigate("/");
        } catch (error) {
            console.log("handleLogout", error);
        }
    }
    return (
        <Menu>
            <a className="menu-item" href="/dashboard">
                Home
            </a>
            <a className="menu-item" href="/products">
                Products
            </a>
            <a className="menu-item" href="/category">
                Category
            </a>
            <a className="menu-item" href="/" onClick={handleLogout}>
                Logout
            </a>
        </Menu>
    );
}
export default SideBar
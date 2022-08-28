import React, {useEffect} from "react";
import Layout from '../layout';
import {useNavigate} from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    return(
        <Layout>
        <div>
            <h1>Welcome Dashboard</h1>
        </div>
        </Layout>
    )
}

export default Dashboard;
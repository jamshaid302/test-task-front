import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tooltip } from "primereact/tooltip";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import swal from "sweetalert";
import Layout from '../layout';

import  {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import React from "react";


const ProductTable =()=> {
    const onDelete = (e) => {
        setDelId(e._id);
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                onConfirm(e._id);
            }
        });
    };
    const onUpdate = (e) => {
        navigate('/updateproduct/'+ e._id);
    };

    const onConfirm = async (id) => {
        // navigate('/deleteproduct/'+ id);
        await axios.get('http://localhost:2022/api/product/deleteproduct/' + id, {headers: {'Authorization': "Bearer " + localStorage.getItem('token')}}).then(function (response) {
            if (response.data.message === 'Product deleted successfully') {
                alert("Record Delete Successfully");
                setData(data)
            } else {
                alert('Failed TO Delete');
                navigate("/products");
            }
        });
    };


    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-warning"
                    onClick={() => onDelete(rowData)}
                />
                <Button
                    icon="pi pi-book"
                    className="p-button-rounded p-dt-tooltip"
                    onClick={() => onUpdate(rowData)}
                />
                <Tooltip
                    target=".p-dt-tooltip"
                    content="Edit"
                    mouseTrack
                    mouseTrackLeft={10}
                />
            </React.Fragment>
        );
    };
    const header = (
        <div className="table-header">
            <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
            type="search"
            onInput={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search..."
        />
      </span>
        </div>
    );

    const navigate = useNavigate();
    const [data,setData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [delId, setDelId] = useState(0);

    useEffect(() => {
        const session = localStorage.getItem('token');
        if(!session){
            navigate('/');
        }
        else{
            axios.get('http://localhost:2022/api/product/' , {headers:{'Authorization':"Bearer "+localStorage.getItem('token')}}).then(function (response) {
                setData(response.data.products);
            });
        }

    }, [data]);
    const navigateToAddForm = () =>{
        navigate('/addproduct')
    }
    return (
        <Layout>
            <Button onClick={navigateToAddForm}>Add Product</Button>
            <DataTable
                // ref={dt}
                value={data}
                selection={selectedUser}
                onSelectionChange={(e) => setSelectedUser(e.value)}
                dataKey="id"
                paginator={true}
                rows={10}
                // paginationServer
                // pagination
                rowsPerPageOptions={[5, 10, 25,50]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Records"
                globalFilter={globalFilter}
                header={header}
            >
                <Column sortable header="Prodcuts" field="product_name" ></Column>
                <Column body={actionBodyTemplate} className="p-dt-tooltip" header='Actions'></Column>
            </DataTable>
        </Layout>
    );
}

export default ProductTable;

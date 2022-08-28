import { useState } from "react";
import "./style.css";
import SideBar from '../sideBar/sideBar'
import '../sideBar/sideBar.css';

function Layout(props) {
  return (
    <main>
      <SideBar />
      <div className="main-content">{props.children}</div>
    </main>
  );
}

export default Layout;

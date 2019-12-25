import React from 'react';
import Navbar from './Navbar';




const Layout = (props) =>{
    return(
        <div className="main">
            <Navbar />
        <div className="main-content">
            {props.children}
        </div>
        </div>
    )
}

export default Layout;
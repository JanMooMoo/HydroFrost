import React from 'react';
import './sidedrawer.css';
import {Link} from 'react-router-dom';


const SideDrawer = props => {
    let drawerClasses = 'side-drawer';
    if(props.show){
        drawerClasses='side-drawer open';
    }
    return(
    <nav className={drawerClasses}>
        <ul>
            <li></li>
            <li><Link to="/" className="nav-link"><h5 className="grass2">Hydro Frost</h5></Link></li>
            <li><Link to="/Ethereum" className="nav-link"><h5 className="grass2">Ethereum Explorer</h5></Link></li>
            <li><Link to="/Snowflake" className="nav-link"><h5 className="grass2">Snowflake Explorer</h5></Link></li> 
            <li><Link to="/Builders" className="nav-link"><h5 className="grass2">Builders</h5></Link></li> 
            </ul>
    </nav>
);
    }
export default SideDrawer;
import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {Container, Row,Col, Image,} from 'react-bootstrap';
import {Hydrosmall} from '../../Images/Hydrosmall.png';
import {logo} from '../../logo.svg';
import styled from 'styled-components';
import Center from 'react-center';


//<img src={require('../../Images/Hydrosmall.png')} alt="snow" height={70} width={60} className="navbar-brand"/>

export default class Navbar extends Component {
  render(){
  return (
   <NavWrapper className="navbar navbar-expand-sm px-sm-5">

     

     <ul className="navbar-nav align-items-center" >

     <li className="navlink2">
       <Link to='/Ethereum' className="nav-link">
       <h3 className="leaf">Ethereum</h3><h3 className="frost">Explorer</h3>
     </Link>
     </li>
     
     <Link to='/' className="nav-link">
       <li className="navlink2">
       <h3 className="banana2">HYDRO</h3><h3 className="frost">frost</h3>
       </li>
       </Link>
      
  
      

    
       <li className="navlink2">
       <Link to='/Snowflake' className="nav-link " >
       <h3 className="leaf">Snowflake</h3><h3 className="frost">Explorer</h3>
     </Link>

       </li>
     </ul>

     

   </NavWrapper>
  );
}
}

const NavWrapper = styled.nav`
height:90px;
max-height:90px;

background: linear-gradient(45deg, rgb(0, 28, 88), rgb(45, 63, 224),rgb(226, 188, 62))!important;
background: linear-gradient(to left, rgb(1, 1, 5), rgb(0, 28, 88), rgb(1, 1, 5))!important;
border-bottom:1px solid rgb(219, 206, 164);
border-bottom-left-radius:25px;
border-bottom-right-radius:25px;
overflow:hidden;
z-index:500;


.nav-link{
  font-size:1.3rem;
  text-transform:capitalize;
  color:white;
  cursor:pointer;
  transition:all 0.2s ease-in-out;

  &:hover
}

`



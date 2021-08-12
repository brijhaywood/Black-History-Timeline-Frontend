// import React from "react";
// import {
//     Nav,
//     NavLogo,
//     NavLink,
//     Bars,
//     NavMenu,
//     NavBtn,
//     NavBtnLink,
// } from "./NavbarElements";
// const Navbar = () => {
//     return (
//         <React.Fragment>
//            <Nav>
//             <NavLogo to="/">
//                 Logo
//             </NavLogo>
//             <Bars />

//             <NavMenu>
//                 <NavLink to="/login" activeStyle>
//                     Log In
//                 </NavLink>
//                 <NavBtn>
//                     <NavBtnLink to="/sign-up">Sign Up</NavBtnLink>                
//                 </NavBtn>
//             </NavMenu> 
//            </Nav> 
//         </React.Fragment>
//     );
// };
// export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';


function Navbar(props) {
    return (
        <React.Fragment>
        <nav className='navbar'>
            <div className='navbar-container'>
            <Link to='/' className='navbar-logo'>
                OUR STORY
                <i class='fab fa-typo3' />
            </Link>
            <Link to='/login' className='nav-links' activeStyle>
                Log-In
            </Link>
            <Link to="/sign-up">
                Sign Up                
            </Link>
            </div>
        </nav>
        </React.Fragment>
    );
}

export default Navbar;

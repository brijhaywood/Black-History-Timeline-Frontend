import React from "react";
import {
    Nav,
    NavLogo,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./NavbarElements";
const Navbar = () => {
    return (
        <React.Fragment>
           <Nav>
            <NavLogo to="/">
                Logo
            </NavLogo>
            <Bars />

            <NavMenu>
                <NavLink to="/login" activeStyle>
                    Log In
                </NavLink>
                <NavBtn>
                    <NavBtnLink to="/sign-up">Sign Up</NavBtnLink>                
                </NavBtn>
            </NavMenu> 
           </Nav> 
        </React.Fragment>
    );
};
export default Navbar;
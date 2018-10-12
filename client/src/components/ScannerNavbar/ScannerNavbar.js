import React, { Component } from "react";
import { Navbar, Nav, Button, ButtonGroup} from "react-bootstrap";
import "./ScannerNavbar.css";
// import API from "../../utils/API.js";

class ScannerNavbar extends Component {




    
       

    render() {
        return (
            // navbar
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#brand">Scanner</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>

                    <Nav pullRight className="buttions">
                        <ButtonGroup>
                            {/* { isLoggedIn ?
                                <button> Log Out</button>
                                : */}
                                <Button onClick={this.handleShowLoginModal} >Login</Button>
                                <Button onClick={this.handleShowNewUserModal} >Create User</Button>
                            {/* // } */}
                        
                        </ButtonGroup>
                    </Nav>
                </Navbar.Collapse>


               

            </Navbar>
        );
    }
}

export default ScannerNavbar;
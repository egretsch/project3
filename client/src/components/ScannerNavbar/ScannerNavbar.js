import React, { Component } from "react";
import { Navbar, Nav, Button, ButtonGroup} from "react-bootstrap";
import "./ScannerNavbar.css";
import Link from 'react-router-dom'


class ScannerNavbar extends Component {



    
       

    render() {
        // const pathButtions = p => <button key={p.id}>{p.name}</button>;
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
                            {this.props.buttons.map(el => <Button key={el.id} value={el.name} onClick={el.action}>{el.name}</Button>)}
                        </ButtonGroup>
                    </Nav>
                </Navbar.Collapse>


               

            </Navbar>
        );
    }
}

export default ScannerNavbar;
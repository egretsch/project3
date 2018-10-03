import React, { Component } from "react";
import { Navbar, Nav, Button, ButtonGroup, Modal, Form, FormGroup, ControlLabel, FormControl, Col } from "react-bootstrap";
import "./ScannerNavbar.css";
import API from "../../util/API";

class ScannerNavbar extends Component {




    constructor(props, context) {
        super(props, context);


        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleHideLoginModal = this.handleHideLoginModal.bind(this);
        this.handleShowLoginModal = this.handleShowLoginModal.bind(this);

        this.handleHideNewUserModal = this.handleHideNewUserModal.bind(this);
        this.handleShowNewUserModal = this.handleShowNewUserModal.bind(this);

        this.state = {
            showLoginModal: false,
            showNewUserModal: false,
            createName: "",
            createUsername: "",
            createEmail: "",
            createPassword: "",
            createGender: ""

        };
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }


    createUserState() {
        this.setState({
            createName: "",
            createUsername: "",
            createEmail: "",
            createPassword: "",
            createGender: ""
        });
    }

    createUser = () => {
        var userAry = [];
        var userObj = {
            name: `${this.state.createName}`,
            userName: `${this.state.createUsername}`,
            email: `${this.state.createEmail}`,
            password: `${this.state.createPassword}`,
            gender: `${this.state.createGender}`
        };
        userAry.push(userObj);
        API.postUser(userObj)
            .then(userAry => console.log(userAry, 1) )
            .catch(err => console.log(err));
    };



    handleSubmit(event) {
        //console.log(name)
        //let name = this.state.createName.trim();
        //var userAry = [];
       // //var userObj = {
            // "createName": `${this.state.createName}`,
            // "username": `${this.state.createUsername}`,
            // "email": `${this.state.createEmail}`,
            // "password": `${this.state.createPassword}`,
            // "gender": `${this.state.createGender}`
        //};
        //console.log(name)
        //userAry.push(userObj);
        alert(`An name was submitted:  ${this.state.createName}
        An username was submitted:  ${this.state.createUsername}
        An email was submitted:  ${this.state.createEmail}
        An password was submitted:  ${this.state.createPassword}
        An gender was submitted:  ${this.state.createGender}
        `);

        this.createUser();
        // this.createUserState();

        event.preventDefault();
    }

    handleShowLoginModal() {
        this.setState({ showLoginModal: true });
    }

    handleHideLoginModal() {
        this.setState({ showLoginModal: false });
    }

    handleShowNewUserModal() {
        this.setState({ showNewUserModal: true });
    }

    handleHideNewUserModal() {
        this.setState({ showNewUserModal: false });
    }

    render() {
        return (
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
                            <Button onClick={this.handleShowLoginModal} >Login</Button>
                            <Button onClick={this.handleShowNewUserModal} >Create User</Button>
                        </ButtonGroup>
                    </Nav>
                </Navbar.Collapse>



                <Modal
                    {...this.props}
                    show={this.state.showLoginModal}
                    onHide={this.handleHideLoginModal}
                    dialogClassName="custom-modal"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">
                            Login
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                            <FormGroup controlId="formHorizontalUsername">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Username
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="Username" placeholder="Username" />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="formHorizontalPassword">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Password
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="password" placeholder="Password" />
                                </Col>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <ButtonGroup>
                            <Button type="submit">Sign in</Button>
                            <Button onClick={this.handleHideLoginModal}>Close</Button>
                        </ButtonGroup>
                    </Modal.Footer>
                </Modal>

                <Modal
                    {...this.props}
                    show={this.state.showNewUserModal}
                    onHide={this.handleHideNewUserModal}
                    dialogClassName="custom-modal"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">
                            Create New Account
                        </Modal.Title>
                    </Modal.Header>
                    <Form horizontal onSubmit={this.handleSubmit}>
                        <Modal.Body>

                            <FormGroup controlId="formHorizontalName">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Name
                                </Col>
                                <Col sm={10}>
                                    <FormControl
                                        name="createName"
                                        type="name"
                                        placeholder="Enter Name"
                                        value={this.state.createName}
                                        onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="formHorizontalUsername">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Username
                                </Col>
                                <Col sm={10}>
                                    <FormControl
                                        name="createUsername"
                                        type="Username"
                                        placeholder="Enter Username"
                                        value={this.state.createUsername}
                                        onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="formHorizontalEmail">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Email
                                </Col>
                                <Col sm={10}>
                                    <FormControl
                                        name="createEmail"
                                        type="Email"
                                        placeholder="Enter Email"
                                        value={this.state.createEmail}
                                        onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="formHorizontalPassword">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Password
                                </Col>
                                <Col sm={10}>
                                    <FormControl
                                        name="createPassword"
                                        type="password"
                                        placeholder="Enter Password"
                                        value={this.state.createPassword}
                                        onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="formHorizontalGender">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Gender
                                </Col>
                                <Col sm={10}>
                                    <FormControl
                                        name="createGender"
                                        type="Gender"
                                        placeholder="Enter Gender"
                                        value={this.state.createGender}
                                        onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>



                        </Modal.Body>
                        <Modal.Footer>
                            <ButtonGroup className="createUserButtions">
                                <Button
                                    value="Submit"
                                    type="submit">
                                    Submit
                                </Button>
                                <Button onClick={this.handleHideNewUserModal}>Close</Button>
                            </ButtonGroup>

                        </Modal.Footer>
                    </Form>
                </Modal>

            </Navbar>
        );
    }
}

export default ScannerNavbar;
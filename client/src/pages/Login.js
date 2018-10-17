import React, { Component } from "react";
import API from "../utils/API";
import { Button, ButtonGroup, Modal, Form, FormGroup, ControlLabel, FormControl, Col } from "react-bootstrap";
import ScannerNavbar from "../components/ScannerNavbar";

import './pages.css';
//Parts of the app







class Login extends Component {



    constructor(props, context) {
        super(props, context);


        this.handleInputChange = this.handleInputChange.bind(this);


        this.handleCreateSubmit = this.handleCreateSubmit.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);

        this.handleHideNewUserModal = this.handleHideNewUserModal.bind(this);
        this.handleShowNewUserModal = this.handleShowNewUserModal.bind(this);

        this.state = {
            showLoginModal: false,
            showNewUserModal: false,
            createName: "",
            createUsername: "",
            createEmail: "",
            createPassword: "",
            createGender: "",
            loginUsername: "",
            loginPassword: "",
            createUserMessage: "",
            createColor: "black",
            createUsernameError: "",
            isLoggedIn: false,
            loginUserMessage: "",
            loginColor: "red",
            errorModal: false,

        };
    }
    // handles all input change
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        if (name === "createUsername") {
            if (name.length < 3) {
                this.setState({
                    createUsernameError: true,
                    [name]: value
                })
            } else {
                this.setState({
                    [name]: value
                });
            }
        } else {
            this.setState({
                [name]: value
            });
        }

    }

    hideErrorModal = () => {
        this.setState({
            errorModal: false
        });
    }

    showErrorModal = () => {
        this.setState({
            errorModal: true
        });
    }

    // clear user submit
    createUserState() {
        this.setState({
            createName: "",
            createUsername: "",
            createEmail: "",
            createPassword: "",
            createGender: ""
        });
    }
    // CREATe user data
    createUser = () => {
        var userAry = [];
        var userObj = {
            name: this.state.createName,
            userName: this.state.createUsername,
            email: this.state.createEmail,
            password: this.state.createPassword,
            gender: this.state.createGender
        };
        userAry.push(userObj);
        API.postUser(userObj)
            .then(res => {
                console.log("submited data and here is res: ", res)

                if (!res.data) {
                    console.log("we made it to the second layer");
                    // alert("Username already exists! Please use another");
                    this.setState({
                        createUserMessage: "Username or Password already exsists",
                        createColor: "red"
                    })
                }

            })
            .catch(err => console.log(err));
    };

    // Create USER Submit

    handleCreateSubmit(event) {
        this.createUser();
        this.createUserState();

        event.preventDefault();
    }
    // CLEAR login state
    clearLoginState() {
        this.setState({
            loginUsername: "",
            loginPassword: ""
        });
    }

    // handle Login Submit
    handleLoginSubmit(event) {
        event.preventDefault();

        if (this.state.loginUsername && this.state.loginPassword) {
            const loginObj = {
                userName: this.state.loginUsername,
                password: this.state.loginPassword
            }

            API.loginUser({
                loginObj
            })
                .then(res => {
                    window.location = '/search';
                })
                .catch(err => {
                    console.log(err)
                    this.showErrorModal();
                });
        }
        this.clearLoginState()
    }
    // shows modals and hides them



    handleShowNewUserModal() {
        this.setState({ showNewUserModal: true, createUserMessage: "Create New Account" });
    }

    handleHideNewUserModal() {
        this.setState({ showNewUserModal: false });
    }

    render() {
        const buttons = [
            
        ]
        return (
            <div>
                {/* navbar */}
                <ScannerNavbar buttons={buttons} />


                <div className="Login">

                    {/* login modal */}
                    <form onSubmit={this.handleLoginSubmit}>
                        <div style={{ color: this.state.loginColor }}>{this.state.loginUserMessage}</div>
                        <FormGroup controlId="email" bsSize="large">
                            <ControlLabel>Username</ControlLabel>
                            <FormControl
                                autoFocus
                                name="loginUsername"
                                type="Username"
                                placeholder="Enter Username (Case Sensitive)"
                                value={this.state.loginUsername}
                                onChange={this.handleInputChange} />
                        </FormGroup>
                        <FormGroup controlId="password" bsSize="large">
                            <ControlLabel>
                                Password
                            </ControlLabel>


                            <FormControl
                                autoFocus
                                name="loginPassword"
                                type="password"
                                placeholder="Enter Password"
                                value={this.state.loginPassword}
                                onChange={this.handleInputChange} />

                        </FormGroup>
                        <Button className="loginButtion"
                            block
                            bsSize="large"

                            type="submit"
                        >
                            Login
                    </Button>
                        <Button
                            className="loginButtion"
                            block
                            bsSize="large"
                            onClick={this.handleShowNewUserModal} >Create User</Button>
                    </form>


                    {/* create user modal */}
                    <Modal
                        {...this.props}
                        show={this.state.showNewUserModal}
                        onHide={this.handleHideNewUserModal}
                        dialogClassName="custom-modal"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-lg">
                                <div style={{ color: this.state.createColor }}>{this.state.createUserMessage}</div>
                            </Modal.Title>
                        </Modal.Header>
                        <Form horizontal onSubmit={this.handleCreateSubmit}>
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
                                            placeholder="Enter Username (Case Sensitive)"
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
                                        type="submit"
                                    // onClick={this.handleHideNewUserModal}
                                    >
                                        Submit
                                         </Button>
                                    <Button onClick={this.handleHideNewUserModal}>Close</Button>
                                </ButtonGroup>

                            </Modal.Footer>
                        </Form>
                    </Modal>

                    <Modal show={this.state.errorModal}>
                        <div className='modal-content'>

                            <div className='modal-header'>
                                <h3 style={{ color: 'red' }} className='modal-title'>
                                    ERROR!
                                </h3>
                            </div>

                            <div style={{ color: 'red' }} className='modal-body'>

                                <p>Invalid Username or password.</p>
                                <p>Please try again!</p>


                                <div className='modal-footer'>
                                    <button className='btn btn-danger' onClick={this.hideErrorModal}>Close</button>
                                </div>
                            </div>
                        </div>
                    </Modal>

                </div>
            </div>
        );
    }
}

export default Login;
import React, { Component } from "react";
import { Col as MyCol, Row, Container } from "../components/Grid";

import { Button, ButtonGroup, Modal, Form, FormGroup, ControlLabel, FormControl, Col } from "react-bootstrap";
//Should this be here? (Look at questions)
import { Input, TextArea, FormBtn } from "../components/Form";


import { List, ListItem } from "../components/List";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import './pages.css';


class Profile extends Component {

    constructor(props, context) {
        super(props, context);


        this.handleInputChange = this.handleInputChange.bind(this);

        this.handleShowUpdateUserModal = this.handleShowUpdateUserModal.bind(this);
        this.handleHideUpdateUserModal = this.handleHideUpdateUserModal.bind(this);

        this.state = {
            profileName: "",
            email: "",
            userName: "",
            gender: "",
            favoriteProducts: ['Asprin', 'Gummy Vitamins', 'Honey Chapstick', 'Nyquil'],
            starredIngredients: ['Peanuts', 'Lead', 'Uranium', 'Cyanide'],
            showUpdateUserModal: false,
            updateName: "",
            updateEmail: "",
            updateUserName: "",
            updatePassword: "",
            updateGender: "",
        };
    }


    // TO DOs
    //1. Connect to Database where user profiles are.
    //2. Connect current logged in user with state information.
    //3. Let User change preferences 
    //     -- Text input fields, and a check for gender (male female don't want to specify, etc.)

    getFavoriteProducts = () => {
        console.log("This gets the Products saved in the database")
    }

    getStarredIngredients = () => {
        console.log("This gets the saved user ingredients")
    }


    //Make Dummy Data.
    //Get dummy data to fill in the sections
    //get buttons to pop up a modal for updating stuff.

    componentDidMount() {
        this.loadCurrentUser();
    }

    // handles all input change
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    loadCurrentUser = () => {
        API.currentUser()
            .then(res =>
                // console.log(res)
                this.setState({ profileName: res.data.name, userName: res.data.userName, email: res.data.email, gender: res.data.gender })
            )
            .catch(err => console.log(err));
    };

    handleShowUpdateUserModal() {
        this.setState({ showUpdateUserModal: true });
    }

    handleHideUpdateUserModal() {
        this.setState({ showUpdateUserModal: false });
    }


    render() {
        return (
            <Container>
                <Row>
                    <Jumbotron>
                        <h3>Your Profile</h3>
                    </Jumbotron>
                </Row>
                <Row>
                    <Col size='md-6'>
                        <h3 id='info'>User Information</h3>
                        <p>Name: {this.state.profileName}</p>
                        <p>Username: {this.state.userName}</p>
                        <p>Email: {this.state.email}</p>
                        <p>Gender: {this.state.gender}</p>
                        <button onClick={this.handleShowUpdateUserModal} className='btn btn-success'>Profile Update</button>
                    </Col>
                    <Modal
                        {...this.props}
                        show={this.state.showUpdateUserModal}
                        onHide={this.handleHideUpdateUserModal}
                        dialogClassName="custom-modal"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-lg">
                                <div style={{ color: this.state.color }}>{this.state.userMessage}</div>
                            </Modal.Title>
                        </Modal.Header>
                        <Form horizontal onSubmit={this.handleCreateSubmit}>
                            <Modal.Body>

                                <FormGroup controlId="formHorizontalName">
                                    <Col componentClass={ControlLabel} sm={2}>
                                        Update Name
                                </Col>
                                    <Col sm={10}>
                                        <FormControl
                                            name="updateName"
                                            type="name"
                                            placeholder="Enter Name"
                                            value={this.state.updateName}
                                            onChange={this.handleInputChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup controlId="formHorizontalUsername">
                                    <Col componentClass={ControlLabel} sm={2}>
                                        Update Username
                                </Col>
                                    <Col sm={10}>
                                        <FormControl
                                            name="updateUserName"
                                            type="Username"
                                            placeholder="Enter Username"
                                            value={this.state.updateUserName}
                                            onChange={this.handleInputChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup controlId="formHorizontalEmail">
                                    <Col componentClass={ControlLabel} sm={2}>
                                        Update Email
                                </Col>
                                    <Col sm={10}>
                                        <FormControl
                                            name="updateEmail"
                                            type="Email"
                                            placeholder="Enter Email"
                                            value={this.state.updateEmail}
                                            onChange={this.handleInputChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup controlId="formHorizontalPassword">
                                    <Col componentClass={ControlLabel} sm={2}>
                                        Update Password
                                </Col>
                                    <Col sm={10}>
                                        <FormControl
                                            name="updatePassword"
                                            type="password"
                                            placeholder="Enter Password"
                                            value={this.state.updatePassword}
                                            onChange={this.handleInputChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup controlId="formHorizontalGender">
                                    <Col componentClass={ControlLabel} sm={2}>
                                        Update Gender
                                </Col>
                                    <Col sm={10}>
                                        <FormControl
                                            name="updateGender"
                                            type="Gender"
                                            placeholder="Enter Gender"
                                            value={this.state.updateGender}
                                            onChange={this.handleInputChange} />
                                    </Col>
                                </FormGroup>



                            </Modal.Body>
                            <Modal.Footer>
                                <ButtonGroup className="createUserButtions">
                                    <Button
                                        value="Submit"
                                        type="submit"
                                        onClick={this.handleHideUpdateUserModal}
                                        >
                                        
                                        Submit
                                </Button>
                                    <Button onClick={this.handleHideUpdateUserModal}>Close</Button>
                                </ButtonGroup>

                            </Modal.Footer>
                        </Form>
                    </Modal>

                    <MyCol size='md-4'>
                        <h3 id='warning'>Ingredient Warnings</h3>
                        {this.state.starredIngredients.length ? (
                            <List>
                                {/* Ternary Operation to see if User has any marked Ingredients */}
                                {this.state.starredIngredients.map(ingredient => (
                                    <ListItem key={ingredient}>
                                        <p>{ingredient}</p>
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                                <h2>No Ingredients Warnings Found</h2>
                            )}
                        <button className='btn btn-success'>Placeholder Update Ingredients Warnings</button>
                    </MyCol>
                </Row>

                <Row>
                    <MyCol size='md-4'>
                        <h3 id='favorite'>Favorite Products</h3>
                        {this.state.favoriteProducts.length ? (
                            <List>
                                {/* Ternary Operation to see if User has any favorite products */}
                                {this.state.favoriteProducts.map(product => (
                                    <ListItem key={product}>
                                        <p>{product}</p>
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                                <h2>No Favorite Products Found</h2>
                            )}
                        <button className='btn btn-success'>Placeholder Update Favorites</button>
                    </MyCol>
                </Row>

            </Container>
        )
    }

}

export default Profile;



import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";

//Should this be here? (Look at questions)
import { Input, TextArea, FormBtn } from "../components/Form";



import { List, ListItem } from "../components/List";
import Jumbotron from "../components/Jumbotron";
import ConfirmationModal from "../components/ConfirmationModal";

import API from "../utils/API";
import './pages.css';
import ScannerNavbar from "../components/ScannerNavbar";


class Profile extends Component {


    state = {
        username: "Test Account",
        email: "test@email.com",
        gender: "None Specified",
        bookmarkedProducts: ['Chapstick', 'Sunscreen', 'Mints'],
        savedIngredients: ['cyanide', 'lead', 'nuclear waste'],
        confirmIngredient: "",
        confirmProduct: "",
        show: false,
    }

    showModal = () => {
        this.setState({ show: true });
    };
    hideModal = () => {
        this.setState({ show: false });
    };


    getBookmarkedProducts = () => {
        API.getBookmarkedProducts()
            .then(res => this.setState({ bookmarkedProducts: res.data.bookmarkedProducts.split(',') }))
            .catch(err => console.log(err))
    }

    getSavedIngredients = () => {
        API.getSavedIngredients()
            .then(res =>
                this.setState({ savedIngredients: res.data.ingredients.split(',') })
                // console.log(res.data.ingredients.split(','))
            )
            .catch(err => console.log(err));
    }

    deleteSavedIngredient = event => {
        event.preventDefault();
        this.setState({
            confirmIngredient: event.target.value
        })
        this.showModal();
    }

    deleteBookmarkedProduct = event => {
        event.preventDefault();
        this.setState({
            confirmProduct: event.target.value
        })
        this.showModal();

    }

    reset = () => {
        this.setState({
            confirmProduct: "",
            confirmIngredient: "",
        })
    }


    confirmDelete = () => {
        if (this.state.confirmProduct) {
            let product = {
                product: this.confirmProduct
            }
            API.deleteBookmarkedProduct(product)
                .then(res => this.getBookmarkedProducts(), this.reset())
                .then(err => console.log(err))
        }
        else if (this.state.confirmIngredient) {
            let ingredient = {
                ingredient: this.confirmIngredient
            }
            API.deleteSavedIngredient(ingredient)
                .then(res => this.getSavedIngredients(), this.reset())
                .catch(err => console.log(err))
        }
    }



render() {
    return (
        <Container fluid>
        
            <Row>
                <Jumbotron>
                    <h3>Your Profile</h3>
                </Jumbotron>
            </Row>

            <Row>
                <Col size='md-6'>
                    <h3 id='info'>User Information</h3>
                    <p>Username: {this.state.username}</p>
                    <p>Email: {this.state.email}</p>
                    <p>Gender: {this.state.gender}</p>
                    <button className='btn btn-success'>Place Holder Update</button>
                </Col>

                <Col size='md-4'>
                    <h3 id='warning'>Ingredient Warnings</h3>
                    {this.state.savedIngredients.length ? (
                        <List>
                            {/* Ternary Operation to see if User has any marked Ingredients */}
                            {this.state.savedIngredients.map(ingredient => (
                                <ListItem key={ingredient}>
                                    {ingredient}
                                    <button value={ingredient} onClick={this.deleteSavedIngredient} className=' delete-button btn-danger'>Delete</button>
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                            <h4 style={{ textAlign: 'center' }}>No Ingredients Warnings Found</h4>
                        )}
                </Col>
            </Row>

            <Row>
                <Col size='md-4'>
                    <h3 id='favorite'>Favorite Products</h3>
                    {this.state.bookmarkedProducts.length ? (
                        <List>
                            {/* Ternary Operation to see if User has any favorite products */}
                            {this.state.bookmarkedProducts.map(product => (
                                <ListItem key={product}>
                                    {product}
                                    <button value={product} onClick={this.deleteBookmarkedProduct} className=' delete-button btn-danger'>Delete</button>
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                            <h4 style={{ textAlign: 'center' }}>No Favorite Products Found</h4>
                        )}
                </Col>
            </Row>

            {this.state.confirmIngredient ? 
                (

                    <ConfirmationModal show={this.state.show}>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h4 className='modal-title'>
                                    Confirm Delete
                                </h4>
                            </div>

                            <div className='modal-body'>
                            Are you sure you want to delete {this.state.confirmIngredient}?
                            </div>

                            <div className='modal-footer'>
                                <button className='btn btn-secondary' onClick={() => { this.hideModal(); this.reset() }}>Cancel</button>
                                <button className='btn btn-danger'onClick={() => { this.hideModal(); this.confirmDelete();}}>Confirm</button>
                            </div>

                        </div>
                    </ConfirmationModal>

                ) : 
                (
                    <ConfirmationModal show={this.state.show}>
                        <div className='modal-content'>

                            <div className='modal-header'>
                                <h4 className='modal-title'>
                                Confirm Delete
                                </h4>
                            </div>

                            <div className='modal-body'>
                            Are you sure you want to delete {this.state.confirmProduct}?
                            </div>

                            <div className='modal-footer'>
                                <button className='btn btn-secondary' onClick={() => { this.hideModal(); this.reset() }}>Cancel</button>
                                <button className='btn btn-danger' onClick={() => { this.hideModal(); this.confirmDelete();}}>Confirm</button>
                            </div>

                        </div>
                    </ConfirmationModal>
                )
            }
        </Container>
    )
}

}

export default Profile;



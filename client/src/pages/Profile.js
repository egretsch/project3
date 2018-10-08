import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";

//Should this be here? (Look at questions)
import { Input, TextArea, FormBtn } from "../components/Form";


import { List, ListItem } from "../components/List";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import './pages.css';
import ScannerNavbar from "../components/ScannerNavbar";


class Profile extends Component {


    state = {
        username: "Test Account",
        email: "test@email.com",
        gender: "None Specified",
        bookmarkedProducts: [],
        savedIngredients: []
    }


    getBookmarkedProducts = () => {
        API.getBookmarkedProducts()
            .then(res => this.setState({bookmarkedProducts: res.data.bookmarkedProducts.split(',')}))
            .catch(err => console.log(err))
    }

    getSavedIngredients = () => {
        API.getSavedIngredients()
            .then(res =>
               this.setState({savedIngredients: res.data.ingredients.split(',')})
            // console.log(res.data.ingredients.split(','))
             )
            .catch(err => console.log(err));
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
                                        <p>{ingredient}</p>
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                                <h4 style={{textAlign: 'center'}}>No Ingredients Warnings Found</h4>
                            )}
                        <button className='btn btn-success'>Placeholder Update Ingredients Warnings</button>
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
                                        <p>{product}</p>
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                                <h4 style={{textAlign: 'center'}}>No Favorite Products Found</h4>
                            )}
                        <button className='btn btn-success'>Placeholder Update Favorites</button>
                    </Col>
                </Row>

            </Container>
        )
    }

}

export default Profile;



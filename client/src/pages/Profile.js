import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";

//Should this be here? (Look at questions)
import { Input, TextArea, FormBtn } from "../components/Form";


import { List, ListItem } from "../components/List";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import './pages.css';


class Profile extends Component {


    state = {
        username: "Test Account",
        email: "test@email.com",
        gender: "None Specified",
        favoriteProducts: ['Asprin', 'Gummy Vitamins', 'Honey Chapstick', 'Nyquil'],
        starredIngredients: ['Peanuts', 'Lead', 'Uranium', 'Cyanide']
    }


    getSavedProducts = () => {
        API.getSavedProducts().then(res => {
            console.log("This gets ingredients.")
        })
        .catch(err => console.log(err))
    }

    getSavedIngredients = () => {
        API.getSavedIngredients().then(res => {
            console.log("This gets the saved user ingredients")
        }).catch(err => console.log(err))
    }


    //Make Dummy Data.
    //Get dummy data to fill in the sections
    //get buttons to pop up a modal for updating stuff.





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
                        <p>Username: {this.state.username}</p>
                        <p>Email: {this.state.email}</p>
                        <p>Gender: {this.state.gender}</p>
                        <button className='btn btn-success'>Place Holder Update</button>
                    </Col>

                    <Col size='md-4'>
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
                    </Col>
                </Row>

                <Row>
                    <Col size='md-4'>
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
                    </Col>
                </Row>

            </Container>
        )
    }

}

export default Profile;



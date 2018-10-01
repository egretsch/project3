import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";

//Should this be here? (Look at questions)
import { Input, TextArea, FormBtn } from "../components/Form";


import { List, ListItem } from "../components/List";
import Jumbotron from "../components/Jumbotron";

class Profile extends Component {


    state = {
        username: "Test Account",
        email: "test@email.com",
        gender: "None Specified",
        favoriteProducts: ['Asprin', 'Gummy Vitamins', 'Honey Chapstick', 'Nyquil'],
        starredIngredients: ['Peanuts', 'Lead', 'Uranium', 'Cyanide']
    }
    
    // TO DOs
    //1. Connect to Database where user profiles are.
    //2. Connect current logged in user with state information.
    //3. Let User change preferences 
    
    //Questions:
    //Should users be able to search ingredients in here?
    //Should users be able tp search products in here?
    //What else should be in this profile?





    render() {
        return (
            <Container>
                <Row>
                    <Jumbotron style={{ width: '100%', backgroundColor: 'maroon' }}>
                        <h3 style={{ color: 'pink', textAlign: 'center' }}>Your Profile</h3>
                    </Jumbotron>
                </Row>
                <Row>
                    <Col size='md-6'>
                        <h3>User Information</h3>
                        <p>Username: {this.state.username}</p>
                        <p>Email: {this.state.email}</p>
                        <p>Gender: {this.state.gender}</p>
                        <button className='btn btn-success'>Place Holder Update</button>
                    </Col>

                    <Col size='md-4'>
                    <h3>Ingredients Warnings</h3>
                        {this.state.starredIngredients.length ? (
                            <List>
                                {/* Ternary Operation to see if User has any marked Ingredients */}
                                {this.state.starredIngredients.map(ingredient => (
                                    <ListItem key={ingredient}>
                                        <p style={{ color: 'red' }}>{ingredient}</p>
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
                    <h3>Favorite Products</h3>
                        {this.state.favoriteProducts.length ? (
                            <List>
                                {/* Ternary Operation to see if User has any favorite products */}
                                {this.state.favoriteProducts.map(product => (
                                    <ListItem key={product}>
                                        <p style={{ color: 'green' }}>{product}</p>
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



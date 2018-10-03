import React, { Component } from "react";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { Input, TextArea, FormBtn } from "../components/Form";
import { List, ListItem } from "../components/List";
import Jumbotron from "../components/Jumbotron";
import './pages.css';


//To do -
//Save product/ingredients to the USER profile (gotta wait for user profiles)
//Match searched result ingredients to SAVED user ingredients. (Check allergens or any starred ingredients)
// ---- For this to work we need check if user data is still persistent throughout the pages.
//
//Stuff to check - Confirmation modals. 
//Perhaps putting the rendered list into a pop up modal to save screen space.
//Perhaps getting a search list from typing a letter?
//



class Search extends Component {
    state = {
        searchedProduct: "",
        searchResults: [],

    }
    
    //basic input change handler.
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    //HANDLES A PRODUCT SEARCH
    handleFormSubmit = event => {

        //Prevents page from refreshing.
        event.preventDefault();

        //makes a empty array so we can set this as the searched results later on.
        const brandNameArray = [];

        //Our API Call.
        API.getProduct(this.state.searchedProduct)
            .then(res => {
                // console.log(res.data.results)

                //Using a forEach to look for the brand name.
                res.data.results.forEach(element => {
                    const brandName = element.openfda.brand_name
                    const activeIngredient = element.active_ingredient
                    const inactiveIngredient = element.inactive_ingredient
                    const activeArray = activeIngredient.toString().replace('Active ingredient', '')
                    console.log(activeArray)

                    if (inactiveIngredient) {

                        //splits the inactive ingredients array and puts each ingredient into a string.
                        const inactiveArray = inactiveIngredient.toString().replace('Inactive ingredients ', '').split(', ');
                        // console.log(inactiveArray)


                        // if a brand name doesn't exist, we skip over it. 
                        //The brand names, active ingredients, and inactive ingredients are pushed into the empty array.
                        if (brandName) {
                            brandNameArray.push({
                                brandName: brandName,
                                activeIngredient: activeIngredient,
                                inactiveIngredient: inactiveArray
                            });
                        }

                    }

                });

                //Sets the state when we are done.
                this.setState({ searchResults: brandNameArray })
            }).catch(err => console.log(err));
    };

    //renders the page.

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size='md-6'>
                        <Jumbotron>
                            <h1>Test Search</h1>
                        </Jumbotron>
                        <form>
                            <Input
                                value={this.state.searchedProduct}
                                onChange={this.handleInputChange}
                                name="searchedProduct"
                                placeholder="Product (required)"
                            />
                            <FormBtn
                                disabled={!this.state.searchedProduct}
                                onClick={this.handleFormSubmit}
                            >
                                Search Product
                            </FormBtn>
                        </form>
                    </Col>
                    <Col size="md-6 sm-12">
                        <Jumbotron>
                            <h2>Search Results</h2>
                        </Jumbotron>
                        {/* Ternary Operation to see if there are results for a product */}
                        {this.state.searchResults.length ? (
                            <List>
                                {this.state.searchResults.map(product => (
                                    <ListItem key={product.brandName}>
                                        <h2 id='info'>{product.brandName}</h2>
                                        <h4>{product.activeIngredient}</h4>
                                        <h4 id='info'>Inactive Ingredients</h4>
                                        <List>
                                            {product.inactiveIngredient.map(ingredient => (
                                                <ListItem key={product.brandName + ingredient}>
                                                    {ingredient}
                                                </ListItem>
                                            ))}
                                        </List>
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                                <h2 id='info'>No results to display</h2>
                            )}
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default Search;
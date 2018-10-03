import React, { Component } from "react";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { Input, TextArea, FormBtn } from "../components/Form";
import { List, ListItem } from "../components/List";
import Scanner from "../components/Scanner";
import SearchModal from "../components/SearchModal";
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
        show: false
    }

    //basic input change handler.
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    //Modal Functions
    showModal = () => {
        this.setState({ show: true });
    };
    hideModal = () => {
        this.setState({ show: false });
    };


    //Dunno how to use specific regex so I rigged this up to search for ALL TYPES OF ACTIVE INGREDIENTS
    handleActiveIngredients = activeIngredient => {
        console.log(activeIngredient)
        activeIngredient = activeIngredient.toString();
        if (activeIngredient.includes('Active ingredients')) {
            activeIngredient = activeIngredient.replace(/Active ingredients/i, '');
            return activeIngredient
        }
        else if (activeIngredient.includes('ACTIVE INGREDIENTS')) {
            activeIngredient = activeIngredient.replace(/ACTIVE INGREDIENTS/i, '');
            return activeIngredient
        }
        else if (activeIngredient.includes('Active Ingredients')) {
            activeIngredient = activeIngredient.replace(/Active Ingredients/i, '');
            return activeIngredient
        }
        else if (activeIngredient.includes('Active ingredient')) {
            activeIngredient = activeIngredient.replace(/Active ingredient/i, '');
            return activeIngredient
        }
        else if (activeIngredient.includes('Active Ingredient')) {
            activeIngredient = activeIngredient.replace(/Active ingredient/i, '');
            return activeIngredient
        }
        else if (activeIngredient.includes('ACTIVE INGREDIENT')) {
            activeIngredient = activeIngredient.replace(/ACTIVE INGREDIENT/i, '');
            return activeIngredient
        }
        else {
            return activeIngredient
        }

    }


    handleInactiveIngredients = inactiveIngredient => {
        //splits the inactive ingredients array and puts each ingredient into a string.
        inactiveIngredient = inactiveIngredient.toString().replace('Inactive ingredients ', '').split(', ');
        return inactiveIngredient;
    }


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

                    // if a brand name doesn't exist, we skip over it. 
                    //The brand names, active ingredients, and inactive ingredients are pushed into the empty array.
                    if (brandName && activeIngredient && inactiveIngredient) {
                        brandNameArray.push({
                            brandName: brandName,
                            activeIngredient: this.handleActiveIngredients(activeIngredient),
                            inactiveIngredient: this.handleInactiveIngredients(inactiveIngredient)
                        });
                    }

                });

                //Sets the state when we are done.
                this.setState({ searchResults: brandNameArray })
                this.showModal();
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
                </Row>
                <Row>
                    {/* Scanner Camera */}
                    {/* <Col size='md-6'>
                        <Scanner />
                        <button className='btn btn-primary'>Scan Item</button>
                    </Col> */}
                </Row>

                <SearchModal show={this.state.show}>
                    <button onClick={this.hideModal}>Close</button>
                    <Jumbotron>
                        <h2>Search Results</h2>
                    </Jumbotron>
                    {/* Ternary Operation to see if there are results for a product */}
                    {this.state.searchResults.length ? (
                        <List>
                            {this.state.searchResults.map(product => (
                                <ListItem key={product.brandName}>
                                    <h2 id='info'>{product.brandName}</h2>
                                    <h4 id='info'>Active Ingredient(s)</h4>
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
                            <h2 id='info'>No results to display!</h2>
                        )}
                </SearchModal>

            </Container >
        );
    }
}

export default Search;
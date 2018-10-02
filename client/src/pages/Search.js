import React, { Component } from "react";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { Input, TextArea, FormBtn } from "../components/Form";
import { List, ListItem } from "../components/List";
import Jumbotron from "../components/Jumbotron";


class Search extends Component {
    state = {
        searchedProduct: "",
        searchResults: [],

    }

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
                console.log(res.data.results)

                //I use a forEach to look for the brand name.
                res.data.results.forEach(element => {
                    const brandName = element.openfda.brand_name
                    const activeIngredient = element.active_ingredient
                    const inactiveIngredient = element.inactive_ingredient

                    // if a brand name doesn't exist, we skip over it. 
                    //The brand names, active ingredients, and inactive ingredients are pushed into the empty array.
                    if (brandName) {
                        brandNameArray.push({
                            brandName: brandName,
                            activeIngredient: activeIngredient,
                            inactiveIngredient: inactiveIngredient
                        });
                    }

                });

                //Sets the state when we are done.
                this.setState({ searchResults: brandNameArray })
            }).catch(err => console.log(err));
    };

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size='md-6'>
                        <Jumbotron>
                            <h1 style={{ color: 'red' }}>Test Search</h1>
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
                            <h2 style={{ color: 'lightblue' }}>Search Results</h2>
                        </Jumbotron>
                        {/* Ternary Operation to see if there are results for a product */}
                        {this.state.searchResults.length ? (
                            <List>
                                {this.state.searchResults.map(product => (
                                    <ListItem key={product.brandName}>
                                        <p style={{ color: 'red' }}>{product.brandName}</p>
                                        <p>{product.activeIngredient}</p>
                                        <p>{product.inactiveIngredient}</p>

                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                                <h2>No results to display</h2>
                            )}
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default Search;
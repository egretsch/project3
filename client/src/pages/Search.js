
import React, { Component } from "react";
import API from "../utils/API";

//Parts of the app
import { Col, Row, Container } from "../components/Grid";
import { Input, TextArea, FormBtn } from "../components/Form";
import { List, ListItem } from "../components/List";
import SearchModal from "../components/SearchModal";
import Jumbotron from "../components/Jumbotron";
import ScannerNavbar from "../components/ScannerNavbar";

//The Scanner
import Scanner from "../components/Scanner";

//for the collapsable list.
import { Collapse } from 'reactstrap';

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

    constructor(props) {
        super(props);
        this.toggleCollapse = this.toggleCollapse.bind(this);
        this.state = {
            user: "jason", //placeholder
            searchedProduct: "",
            collapse: false,
            show: false,
            savedIngredients: [],
            bookmarkedProducts: [],
            searchResults: [],
            match: 0,
            disableSave: false
        }
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

    //Shows or Collapses the list on tap.
    toggleCollapse = (brandName, inactiveIngredient) => {

        //The click sets the list to true, which shows the list.
        //Another click will put it to false. 

        this.setState({
            [brandName + inactiveIngredient]: !this.state[brandName + inactiveIngredient]
        });
    }

    // componentDidMount(){
    //     this.getSavedIngredients();
    //     this.getBookmarkedProducts();
    // }

    //button to save products
    bookmarkProduct = event => {
        event.preventDefault();
        let product = {
            product: event.target.value
        }

        API.bookmarkProduct(product).then(
            console.log(product.product + " saved to database")
        )
            .catch(err => console.log(err))
    }

    getBookmarkedProducts = () => {
        API.getBookmarkedProducts()
            .then(res => {
                if (res.data.bookmarkedProducts) {
                    this.setState({ bookmarkedProducts: res.data.bookmarkedProducts.split(',') })
                }
                else {
                    this.setState({ bookmarkedProducts: ["No Bookmarked Products"] })
                }
            })
            .catch(err => console.log(err))
    }

    //button to save ingredients
    saveIngredient = event => {
        event.preventDefault();
        let ingredient = {
            ingredient: event.target.value
        }
        // console.log(ingredient)
        API.saveIngredient(ingredient)
            .then(res => this.getSavedIngredients())
            .catch(err => console.log(err))
    }

    getSavedIngredients = () => {
        API.getSavedIngredients()
            .then(res => {
                // console.log(res.data.ingredients);
                if (res.data.ingredients) {
                    this.setState({ savedIngredients: res.data.ingredients.split(',') })
                    // console.log(res)
                }
                else {
                    this.setState({ savedIngredients: ["No Ingredients Saved"] })
                }
            })
            .catch(err => console.log(err));
    }



    //I don't know how to use specific regex so I rigged this up to search for ALL TYPES OF ACTIVE INGREDIENTS
    handleActiveIngredients = activeIngredient => {
        // console.log(activeIngredient)
        if (activeIngredient === undefined) {
            return activeIngredient = ["No Results"]
        }
        else {
            activeIngredient = activeIngredient.toString();
        }

        if (activeIngredient.includes('Active Ingredients:')) {
            activeIngredient = activeIngredient.replace(/Active Ingredients:/i, '');
            return activeIngredient
        }
        else if (activeIngredient.includes('Active ingredient:')) {
            activeIngredient = activeIngredient.replace(/Active Ingredient:/i, '');
            return activeIngredient
        }
        else if (activeIngredient.includes('Active Ingredient:')) {
            activeIngredient = activeIngredient.replace(/Active Ingredient:/i, '');
            return activeIngredient
        }
        else if (activeIngredient.includes('Active ingredients')) {
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
        if (inactiveIngredient === undefined) {
            inactiveIngredient = ['No Results']
            console.log(inactiveIngredient)
            return inactiveIngredient
        }
        else {
            inactiveIngredient = inactiveIngredient.toString()
        }

        if (inactiveIngredient.includes('Inactive Ingredients:')) {
            inactiveIngredient = inactiveIngredient.replace('Inactive Ingredients: ', '').split(', ')
            console.log(inactiveIngredient)
            return inactiveIngredient
        }
        else if (inactiveIngredient.includes('Inactive ingredient:')) {
            inactiveIngredient = inactiveIngredient.replace('Inactive ingredient: ', '').split(', ')
            // console.log(inactiveIngredient)

            return inactiveIngredient
        }
        else if (inactiveIngredient.includes('INACTIVE INGREDIENTS:')) {
            inactiveIngredient = inactiveIngredient.replace('INACTIVE INGREDIENTS: ', '').split(', ')
            // console.log(inactiveIngredient)

            return inactiveIngredient
        }
        else if (inactiveIngredient.includes('Inactive ingredients')) {
            inactiveIngredient = inactiveIngredient.replace('Inactive ingredients ', '').split(', ')
            // console.log(inactiveIngredient)

            return inactiveIngredient
        }
        else if (inactiveIngredient.includes('INACTIVE INGREDIENTS')) {
            inactiveIngredient = inactiveIngredient.replace('INACTIVE INGREDIENTS ', '').split(', ')
            // console.log(inactiveIngredient)
            return inactiveIngredient
        }
        else if (inactiveIngredient.includes('Inactive Ingredients')) {

            inactiveIngredient = inactiveIngredient.replace('Inactive Ingredients ', '').split(', ')
            // console.log(inactiveIngredient)

            return inactiveIngredient
        }
        else if (inactiveIngredient.includes('Inactive ingredient')) {

            inactiveIngredient = inactiveIngredient.replace('Inactive ingredient ', '').split(', ')
            // console.log(inactiveIngredient)

            return inactiveIngredient
        }
        else if (inactiveIngredient.includes('Inactive Ingredient')) {

            inactiveIngredient = inactiveIngredient.replace('Inactive Ingredient ', '').split(', ')
            // console.log(inactiveIngredient)

            return inactiveIngredient
        }
        else if (inactiveIngredient.includes('INACTIVE INGREDIENT')) {
            inactiveIngredient = inactiveIngredient.replace(/INACTIVE INGREDIENT/i, '').split(', ')
            // console.log(inactiveIngredient)

            return inactiveIngredient
        }
        else {
            // console.log(inactiveIngredient)

            return inactiveIngredient.split(', ')
        }
    }

    handleMatch = (searchedElement, savedElement) => {

        const inCommon = savedElement.filter(function (val) {
            return searchedElement.indexOf(val) != -1;
        });

        if (inCommon) {
            this.setState({
                disableSave: true
            });
        }
    }


    //HANDLES A PRODUCT SEARCH
    handleFormSubmit = event => {
        //Prevents page from refreshing.
        event.preventDefault(); 0
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
                    if (brandName) {
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

                //Creates a state for each list, and sets them to false so the lists are collapsed.
                for (let i = 0; i < brandNameArray.length; i++) {
                    this.setState({
                        [brandNameArray[i].brandName + brandNameArray[i].inactiveIngredient]: false
                    });


                }

            }).catch(err => this.setState({
                show: true
            }));

    };

    //renders the page.
    render() {
        return (
            <Container fluid>
                <ScannerNavbar />
                <Row>
                    <Col size='md-12'>
                        <Jumbotron>
                            <h1>Product Search</h1>
                        </Jumbotron>
                        <form className='text-center'>
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
                    <Jumbotron style={{ margin: 0 }}>
                        <h2>Search Results</h2>
                        <button className='btn btn-danger text-center' onClick={this.hideModal}>Close</button>
                    </Jumbotron>

                    {/* Ternary Operation to see if there are results for a product */}
                    {this.state.searchResults.length ? (
                        <List>
                            {this.state.searchResults.map((product, index) => {
                                // console.log(product);
                                let button = <button value={product.brandName} onClick={this.bookmarkProduct} className='btn btn-primary'>Save</button>;

                                for (let e = 0; e < product.brandName.length; e++) {
                                    for (let s = 0; s < this.state.bookmarkedProducts.length; s++) {
                                        if (this.state.bookmarkedProducts[s] === product.brandName[e]) {
                                            button = <button disabled value={product.brandName} onClick={this.bookmarkProduct} className='btn btn-primary'>Save</button>
                                        }
                                        // Test ForEach End
                                    }
                                }
                                return <ListItem key={product.brandName + product.activeIngredient}>
                                    <h2 style={{ textAlign: 'center' }}>{product.brandName}</h2>
                                    {button}
                                    <h4 id='info'>Active Ingredient(s)</h4>
                                    <h4 style={{ textAlign: 'center' }}>{product.activeIngredient}</h4>



                                    {/*This is to let the list be collapsable */}
                                    {/* On click is an anonymous function that must be clicked to use the toggleCollapse function */}
                                    <button value={index} onClick={() => { this.toggleCollapse(product.brandName, product.inactiveIngredient) }} className='btn btn-success'>Tap for Inactive Ingredients</button>

                                    <Collapse isOpen={this.state[product.brandName + product.inactiveIngredient]}>
                                        <List>
                                            {product.inactiveIngredient.map(ingredient => {
                                                let button = <button value={ingredient} onClick={this.saveIngredient} className='save-ingredients-button'>Save</button>;
                                                let style = {textAlign: 'center', fontSize: '10px'}
                                                let warning = {textAlign: 'center', fontSize: '10px', backgroundColor: "#f2dede", color: "#a94442"}
                                                for (let n = 0; n < this.state.savedIngredients.length; n++) {
                                                    if (this.state.savedIngredients[n] === ingredient) {
                                                        button = <button disabled className='save-ingredients-button btn-danger'>DANGER!</button>;
                                                        style = warning

                                                    }
                                                }
                                                return <ListItem style={style} key={product.brandName + 'inactive_' + ingredient}>
                                                    {ingredient}
                                                    {button}
                                                </ListItem>
                                            })}
                                        </List>
                                    </Collapse>
                                </ListItem>
                            })}
                        </List>
                    ) : (
                            <h2 id='info'>No results to display!</h2>
                        )}
                </SearchModal>







                {/* Saved Data test */}
                {/* WILL BE DELETED ONCE FINISHED WITH LOGIN SESSION COMPLETED */}
                <h3>Saved Ingredients</h3>
                <button onClick={this.getSavedIngredients}>Get Saved Ingredients</button>
                <List>
                    {this.state.savedIngredients.map((ingredient, index) => (
                        <ListItem key={ingredient + this.state.user + index}>
                            {ingredient}
                        </ListItem>
                    ))}
                </List>


                <h3>Bookmarked Products</h3>
                <button onClick={this.getBookmarkedProducts}>Get Bookmarked Products</button>
                <List>
                    {this.state.bookmarkedProducts.map((product, index) => (
                        <ListItem key={product + this.state.user + index}>
                            {product}
                        </ListItem>
                    ))}
                </List>
            </Container>
        );
    }
}

export default Search;
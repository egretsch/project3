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
import ScannerSettings from "../components/Scanner/ScannerSettings.js";
import ScannerResults from "../components/Scanner/ScannerResults.js";

//for the collapsable list.
import { Collapse } from 'reactstrap';

import './pages.css';

class Search extends Component {

    constructor(props) {
        super(props);
        this.toggleCollapse = this.toggleCollapse.bind(this);
        this.state = {
            searchedProduct: "",
            collapse: false,
            scannerModalShow: false,
            show: false,
            savedIngredients: [],
            bookmarkedProducts: [],
            searchResults: [],
            scanResults: [],
            toggleScanner: false,
            scannedProductName: ""
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

    //for the scanner modal
    showScannerModal = () => {
        this.setState({ scannerModalShow: true });
    };
    hideScannerModal = () => {
        this.setState({ scannerModalShow: false });
    };


    //Shows or Collapses the list on tap.
    toggleCollapse = (brandName, inactiveIngredient) => {

        //The click sets the list to true, which shows the list.
        //Another click will put it to false. 

        this.setState({
            [brandName + inactiveIngredient]: !this.state[brandName + inactiveIngredient]
        });
    }

    //Gets the data once the user logs on and the page loads.
    // componentDidMount(){
    //     this.getSavedIngredients();
    //     this.getBookmarkedProducts();
    // }


    //function to get bookmarked products
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

    //function to get saved ingredients.
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

    //function for click event to bookmark products.
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

    //function for the click event to save ingredients
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

    // Scanner functions
    _scan = () => {
        this.setState({ toggleScanner: !this.state.toggleScanner });
    };

    //when something is detected
    _onDetected = result => {
        if (this.state.scanResults.length < 1) {
            this.setState({ scanResults: this.state.scanResults.concat([result]) });
            console.log("RESULT:", this.state.scanResults);

        //     API.getProductByScan(result.codeResult.code)
        //         .then(res => {
        //             console.log(res);

        //         })
        //         .catch(err => {
        //             console.log(res);
        //         });
        }
    };

    saveScannedProduct = () => {
        API.saveScannedProduct
    }

    // End Scanner Functions


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

    //HANDLES A PRODUCT SEARCH
    handleProductSearch = event => {
        //Prevents page from refreshing.
        event.preventDefault(); 0
        //makes a empty array so we can set this as the searched results later on.
        const brandNameArray = [];

        //Our API Call.
        API.getProducts(this.state.searchedProduct)
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
                                onClick={this.handleProductSearch}
                            >
                                Search Product
                            </FormBtn>
                        </form>
                    </Col>
                </Row>

                {/* Search Modal begins */}
                <SearchModal show={this.state.show}>
                    <Jumbotron style={{ margin: 0 }}>
                        <h2>Search Results</h2>
                        <button className='btn btn-danger text-center' onClick={this.hideModal}>Close</button>
                    </Jumbotron>

                    {/* Ternary Operation to see if there are results for a product */}
                    {this.state.searchResults.length ? (
                        <List>
                            {this.state.searchResults.map((product, index) => {


                                //Makes a button variable for our for loop. The regular Save Button
                                let button = <button value={product.brandName} onClick={this.bookmarkProduct} className='btn btn-primary'>Save</button>;

                                //A For loop to compare both bookmarked products and our searched products
                                for (let e = 0; e < product.brandName.length; e++) {
                                    for (let s = 0; s < this.state.bookmarkedProducts.length; s++) {

                                        //If they match, it disables the save button and makes sure the user knows its saved.
                                        if (this.state.bookmarkedProducts[s] === product.brandName[e]) {
                                            button = <button disabled value={product.brandName} onClick={this.bookmarkProduct} className='btn btn-warning'>Saved</button>
                                        }
                                    }
                                }

                                //Else it returns the regular buttons and brand names
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

                                                //Similar to the code above in the product area, we save variables for what's going to be the outliers.

                                                let button = <button value={ingredient} onClick={this.saveIngredient} className='save-ingredients-button'>Save</button>;

                                                //the usual style
                                                let style = { textAlign: 'center', fontSize: '10px' }

                                                //the style if the user's saved ingredients match up with the searched ingredients.
                                                let warning = { textAlign: 'center', fontSize: '10px', backgroundColor: "#f2dede", color: "#a94442" }

                                                //the for loop that compares it all.
                                                for (let n = 0; n < this.state.savedIngredients.length; n++) {
                                                    if (this.state.savedIngredients[n] === ingredient) {
                                                        button = <button disabled className='save-ingredients-button btn-danger'>DANGER!</button>;
                                                        style = warning
                                                    }
                                                }

                                                //else it just returns the above variables to be saved. 
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
                            //If nothing comes from the API.
                            <h2 id='info'>No results to display!</h2>
                        )}
                </SearchModal>
                {/* Search Modal ends */}


                {/* Scanner Start */}
                <div className='text-center' style={{ margin: '10px' }}>
                    <button className='btn btn-primary' onClick={this._scan}>
                        {this.state.toggleScanner ? "Stop Scanner" : "Use Scanner"}
                    </button>
                    <ul className="results">
                        {this.state.scanResults.map(result => (
                            <ScannerResults key={result.codeResult.code} result={result} />
                        ))}
                    </ul>
                    {this.state.toggleScanner ? <ScannerSettings onDetected={this._onDetected} /> : null}
                </div>

                <SearchModal scannerModalShow={this.state.scannerModalShow}>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h4 className='modal-title'></h4>
                        </div>

                        <div className='modal-body'>
                            <form className='text-center'>
                                <Input
                                    value={this.state.scannedProductName}
                                    onChange={this.handleInputChange}
                                    name="scannerProductName"
                                    placeholder="Brand Name (required)"
                                />
                                <FormBtn
                                    disabled={!this.state.scannedProductName}
                                    onClick={this.handleFormSubmit}
                                >
                                    Submit
                                </FormBtn>
                            </form>
                        </div>

                        <div className='modal-footer'>
                            <button className='btn btn-secondary' onClick={() => { this.hideScannerModal() }}>Cancel</button>
                            <button className='btn btn-primary' onClick={() => { this.hideScannerModal() }}>Confirm</button>
                        </div>
                    </div>
                </SearchModal>

                {/* Scanner End */}


                {/* Saved Data test */}
                {/* WILL BE DELETED ONCE LOGIN SESSION COMPLETED, aka when the componentmounts is uncommented */}
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
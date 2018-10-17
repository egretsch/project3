import React, { Component } from "react";
import API from "../utils/API";

//Parts of the app
import { Col, Row, Container } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";
import { List, ListItem } from "../components/List";
import Jumbotron from "../components/Jumbotron";
import ScannerNavbar from "../components/ScannerNavbar";
import { Modal } from 'react-bootstrap'

//The Scanner
import ScannerSettings from "../components/Scanner/ScannerSettings.js";

//for the collapsable list.
import { Collapse } from 'reactstrap';

import './pages.css';

class Search extends Component {

    constructor(props) {
        super(props);
        this.toggleCollapse = this.toggleCollapse.bind(this);
        // this.logoutUser = this.logoutUser.bind(this);
        this.state = {
            searchedProduct: "",
            collapse: false,
            scannerModalShow: false,
            resultsModalShow: false,
            errorModal: false,
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
    showResultsModal = () => {
        this.setState({ resultsModalShow: true });
    };

    hideResultsModal = () => {
        this.setState({
            resultsModalShow: false,
            scanResults: [],
            searchResults: [],
            scannedProductName: "",
            searchedProduct: "",

        });
    };

    //for the scanner modal
    showScannerModal = () => {
        this.setState({ scannerModalShow: true });
    };
    hideScannerModal = () => {
        this.setState({
            scannerModalShow: false,
            scanResults: [],
            searchResults: [],
            scannedProductName: "",
            searchedProduct: "",
        });
    };

    showErrorModal = () => {
        this.setState({
            errorModal: true,
            scanResults: [],
            searchResults: [],
            searchedProduct: "",
            scannedProductName: "",
        });

    }
    hideErrorModal = () => {
        this.setState({ errorModal: false })
    }

    //Shows or Collapses the list on tap.
    toggleCollapse = (brandName, inactiveIngredient) => {

        //The click sets the list to true, which shows the list.
        //Another click will put it to false. 

        this.setState({
            [brandName + inactiveIngredient]: !this.state[brandName + inactiveIngredient]
        });
    }

    // Gets the data once the user logs on and the page loads.
    componentDidMount() {
        this.getSavedIngredients();
        this.getBookmarkedProducts();
    }

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
            .catch(err => {
                console.log("ERR on L121: ", err);
                this.showErrorModal();
            });
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
            .catch(err => {
                console.log("ERR on L140: ", err);
                this.showErrorModal();
            });
    }

    //function for click event to bookmark products.
    bookmarkProduct = event => {
        event.preventDefault();
        let product = {
            product: event.target.value
        }
        API.bookmarkProduct(product)
            .then(res => {
                this.getBookmarkedProducts()

            })
            .catch(err => {
                console.log("ERR on L157: ", err);
                this.showErrorModal();
            });
    }

    //function for the click event to save ingredients
    saveIngredient = event => {
        event.preventDefault();
        let ingredient = {
            ingredient: event.target.value
        }
        // console.log(ingredient)
        API.saveIngredient(ingredient)
            .then(res => {
                this.getSavedIngredients();
            })
            .catch(err => {
                console.log("Error on L174: ", err);
                this.showErrorModal();
            });
    }

    // Scanner functions
    _scan = () => {
        this.setState({ toggleScanner: !this.state.toggleScanner });
    };

    //when something is detected
    _onDetected = result => {
        if (this.state.scanResults.length < 1) {
            // console.log(result);
            this.setState({ scanResults: this.state.scanResults.concat(result.codeResult.code) });
            // console.log(result.codeResult.code)


            // console.log("Hey 148: ", this.state.scanResults)
            API.getScannedProduct(this.state.scanResults)
                .then(res => {
                    // console.log('Name: ', res.data.brandName,
                    //     'upcCode: ', res.data.upcCode)
                    this.setState({ scannedProductName: res.data.brandName })
                    this.searchScannedProduct();

                })
                .catch(err => {
                    console.log("Error on L202: ", err);
                    this.setState({
                        scannerModalShow: true
                    })
                })
        }
    };

    saveScannedProduct = event => {
        event.preventDefault();
        // console.log(
        //     "The Brand Name in save: ", this.state.scannedProductName,
        //     "The UPC Code: ", this.state.scanResults
        // )

        API.saveScannedProduct({
            brandName: this.state.scannedProductName,
            upcCode: this.state.scanResults,
        })
            .then(res => {
                // console.log(res);
                this.searchScannedProduct();
                this.hideScannerModal();
            })
            .catch(err => {
                console.log("Error on L230: ", err);
                this.hideScannerModal();
                this.searchScannedProduct();
            });
    }

    searchScannedProduct = () => {
        let brandNameArray = [];
        // console.log("The Search in ScannedProduct, 241: ", this.state.scannedProductName);
        API.getProductByScan(this.state.scannedProductName.replace(/ /g, "+"))
            .then(res => {
                res.data.results.forEach(element => {
                    let brandName = element.openfda.brand_name
                    let activeIngredient = element.active_ingredient
                    let inactiveIngredient = element.inactive_ingredient


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
                this.showResultsModal();

                //Creates a state for each list, and sets them to false so the lists are collapsed.
                for (let i = 0; i < brandNameArray.length; i++) {
                    this.setState({
                        [brandNameArray[i].brandName + brandNameArray[i].inactiveIngredient]: false
                    });


                }
            }).catch(
                err => {
                    console.log("ERR on L271: ", err)
                    this.showResultsModal();
                });
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
            // console.log(inactiveIngredient)
            return inactiveIngredient
        }
        else {
            inactiveIngredient = inactiveIngredient.toString()
        }

        if (inactiveIngredient.includes('Inactive Ingredients:')) {
            inactiveIngredient = inactiveIngredient.replace('Inactive Ingredients: ', '').split(', ')
            // console.log(inactiveIngredient)
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
        event.preventDefault();
        //makes a empty array so we can set this as the searched results later on.
        let brandNameArray = [];


        //Regex code for spaces, replaces it with +
        let noSpaces =  this.state.searchedProduct.replace(/ /g, "+")
        // console.log("No Spaces: ", noSpaces)

        //Our API Call.
        API.getProducts(noSpaces)
            .then(res => {
                // console.log(res.data.results)

                //Using a forEach to look for the brand name.
                res.data.results.forEach(element => {
                    let brandName = element.openfda.brand_name
                    let activeIngredient = element.active_ingredient
                    let inactiveIngredient = element.inactive_ingredient


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
                this.showResultsModal();

                //Creates a state for each list, and sets them to false so the lists are collapsed.
                for (let i = 0; i < brandNameArray.length; i++) {
                    this.setState({
                        [brandNameArray[i].brandName + brandNameArray[i].inactiveIngredient]: false
                    });


                }
            }).catch(err => {
                console.log("ERR on L449: ", err);
                this.setState({ showResultsModal: true })

            });
    };
    logoutButtonAction = () => {

        this.logoutUser()
        window.location = "/"
    };

    profileButtonAction = () => {
        window.location = "/Profile"
    };

    logoutUser() {
        API.logoutUser({
        })
            .then(res => {
                console.log("logout")

            })
            .catch(err => console.log(err));

    }

    //renders the page.
    render() {

        const buttons = [
            { id: 1, name: "Logout", action: this.logoutButtonAction },
            { id: 2, name: "Profile", action: this.profileButtonAction }
        ]
        return (
            <div>
                <ScannerNavbar buttons={buttons} />
                <Jumbotron>
                    <h1>Product Search</h1>
                </Jumbotron>
                <Container fluid>
                    <Row>
                        <Col size='md-12'>
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
                    <Modal show={this.state.resultsModalShow}>
                        <Jumbotron style={{ margin: 0 }}>
                            <h2>Search Results</h2>
                            <button className='btn btn-danger text-center' onClick={this.hideResultsModal}>Close</button>
                        </Jumbotron>

                        {/* Ternary Operation to see if there are results for a product */}
                        {this.state.searchResults.length ? (
                            <List>
                                {this.state.searchResults.map((product, index) => {


                                    //Makes a button variable for our for loop. The regular Save Button
                                    let button = <button value={product.brandName} onClick={event => { this.bookmarkProduct(event); this.getBookmarkedProducts(); }} className='btn btn-primary'>Save</button>;

                                    //A For loop to compare both bookmarked products and our searched products
                                    for (let e = 0; e < product.brandName.length; e++) {
                                        for (let s = 0; s < this.state.bookmarkedProducts.length; s++) {

                                            //If they match, it disables the save button and makes sure the user knows its saved.
                                            if (this.state.bookmarkedProducts[s] === product.brandName[e]) {
                                                button = <button disabled value={product.brandName} className='btn btn-warning'>Saved</button>
                                            }
                                        }
                                    }

                                    //Else it returns the regular buttons and brand names
                                    return <ListItem key={product + index + index}>
                                        <h2 style={{ textAlign: 'center' }}>{product.brandName}</h2>
                                        {button}
                                        <h4 id='info'>Active Ingredient(s)</h4>
                                        <h4 style={{ textAlign: 'center' }}>{product.activeIngredient}</h4>



                                        {/*This is to let the list be collapsable */}
                                        {/* On click is an anonymous function that must be clicked to use the toggleCollapse function */}
                                        <button value={index} onClick={() => { this.toggleCollapse(product.brandName, product.inactiveIngredient) }} className='btn btn-success'>Tap for Inactive Ingredients</button>

                                        <Collapse isOpen={this.state[product.brandName + product.inactiveIngredient]}>
                                            <List>
                                                {product.inactiveIngredient.map((ingredient, index) => {

                                                    //Similar to the code above in the product area, we save variables for what's going to be the outliers.

                                                    let button = <button value={ingredient} onClick={event => { this.saveIngredient(event); this.getSavedIngredients(); }} className='save-ingredients-button'>Save</button>;

                                                    //the usual style
                                                    let style = { textAlign: 'left', fontSize: '13px' }

                                                    //the style if the user's saved ingredients match up with the searched ingredients.
                                                    let warning = { textAlign: 'left', fontSize: '13px', backgroundColor: "#f2dede", color: "#a94442" }
                                                    let noResults = { textAlign: 'center', fontSize: '13px', backgroundColor: "#f2dede", color: "#a94442" }
                                                     
                                                    //the for loop that compares it all.

                                                    for (let n = 0; n < this.state.savedIngredients.length; n++) {
                                                        if (this.state.savedIngredients[n] === ingredient) {
                                                            button = <button disabled className='save-ingredients-button btn-danger'>DANGER!</button>;
                                                            style = warning
                                                        } else if ('No Results' === ingredient) {
                                                            button = ""
                                                            style = noResults
                                                        }
                                                    }

                                                    //else it just returns the above variables to be saved. 
                                                    return <ListItem style={style} key={ingredient + index}>
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
                    </Modal>
                    {/* Search Modal ends */}


                    {/* Scanner Start */}
                    <div className='text-center' style={{ margin: '10px' }}>
                        <button className='btn btn-primary' onClick={this._scan}>
                            {this.state.toggleScanner ? "Stop Scanner" : "Use Scanner"}
                        </button>

                        {this.state.toggleScanner ? <ScannerSettings onDetected={this._onDetected} /> : null}
                    </div>

                    <Modal show={this.state.scannerModalShow}>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h3 style={{ color: 'red' }} className='modal-title'>Product Not Found!</h3>
                            </div>

                            <div className='modal-body'>
                                <form className='text-center'>
                                    <h4>Is this UPC code correct?</h4>
                                    <Input
                                        value={this.state.scanResults}
                                        onChange={this.handleInputChange}
                                        name="scanResults"
                                        placeholder={this.state.scanResults}
                                    />

                                    <h4>Please input product's brand name!</h4>
                                    <Input
                                        value={this.state.scannedProductName}
                                        onChange={this.handleInputChange}
                                        name="scannedProductName"
                                        placeholder="Brand Name (required)"
                                    />

                                    <div className='modal-footer'>
                                        <button style={{ marginLeft: '3px' }} className='btn btn-secondary' onClick={event => { event.preventDefault(); this.hideScannerModal(); }}>Cancel</button>
                                        <FormBtn
                                            disabled={!this.state.scannedProductName && !this.state.scanResults}
                                            onClick={this.saveScannedProduct}
                                        >
                                            Submit
                                </FormBtn>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Modal>
                    {/* Scanner End */}



                    <Modal show={this.state.errorModal}>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h3 style={{ color: 'red' }} className='modal-title'>
                                    ERROR
                        </h3>
                            </div>

                            <div style={{ color: 'red' }} className='modal-body'>
                                <p>SORRY SOMETHING WENT WRONG!</p>

                                <p>Please try logging in again.</p>


                                <div className='modal-footer'>
                                    <a href="/" className='btn btn-primary'>Log In</a>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </Container>
            </div>
        );
    }
}
export default Search;
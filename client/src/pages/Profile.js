import React, { Component } from "react";
import Link from "react-router-dom";
import { Row, Container } from "../components/Grid";
import {
  Button,
  ButtonGroup,
  Modal,
  Panel,
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  Col
} from "react-bootstrap";
import { List, ListItem } from "../components/List";
import Jumbotron from "../components/Jumbotron";
import ConfirmationModal from "../components/ConfirmationModal";
import API from "../utils/API";
import "./pages.css";
import ScannerNavbar from "../components/ScannerNavbar";

class Profile extends Component {

    constructor(props, context) {
        super(props, context);
        this.handleInputChange = this.handleInputChange.bind(this);

        this.updateUserState = this.updateUserState.bind(this);
        this.handleUpdateUserSubmit = this.handleUpdateUserSubmit.bind(this);

        this.handleShowUpdateUserModal = this.handleShowUpdateUserModal.bind(this);
        this.handleHideUpdateUserModal = this.handleHideUpdateUserModal.bind(this);
        this.state = {
            profileName: "",
            email: "",
            userName: "",
            gender: "",
            showUpdateUserModal: false,
            updateName: "",
            updateEmail: "",
            updateUserName: "",
            updatePassword: "",
            updateGender: "",
            bookmarkedProducts: [],
            savedIngredients: [],
            confirmIngredient: "",
            confirmProduct: "",
            userUpdateMessage: "",
            show: false,
        };

    }


    componentDidMount() {
        this.loadCurrentUser();
        this.getBookmarkedProducts();
        this.getSavedIngredients();
    }

    

    showModal = () => {
        this.setState({ show: true });
    };
    hideModal = () => {
        this.setState({ show: false });
    };


    getBookmarkedProducts = () => {
        API.getBookmarkedProducts()
            .then(res => {
                if (res.data.bookmarkedProducts) {
                    this.setState({ bookmarkedProducts: res.data.bookmarkedProducts.split(',') })
                }
            })
            .catch(err => console.log(err))
    }

    getSavedIngredients = () => {
        API.getSavedIngredients()
            .then(res => {
                if (res.data.ingredients) {
                    this.setState({ savedIngredients: res.data.ingredients.split(',') })
                    
                }
            })
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

  getSavedIngredients = () => {
    API.getSavedIngredients()
      .then(res => {
        if (res.data.ingredients) {
          this.setState({ savedIngredients: res.data.ingredients.split(",") });
          // console.log(res)
        }
      })
      .catch(err => console.log(err));
  };

  deleteSavedIngredient = event => {
    event.preventDefault();
    this.setState({
      confirmIngredient: event.target.value
    });
    this.showModal();
  };

  deleteBookmarkedProduct = event => {
    event.preventDefault();
    this.setState({
      confirmProduct: event.target.value
    });
    this.showModal();
  };

  reset = () => {
    this.setState({
      confirmProduct: "",
      confirmIngredient: ""
    });
  };

  confirmDelete = () => {
    if (this.state.confirmProduct) {
      let product = {
        product: this.state.confirmProduct
      };

      // console.log("product you want to delete: " + product.product)
      API.deleteBookmarkedProduct(product)
        .then(res => {
          // console.log(product.product + " should be deleted. Here's the response: \n" + res.data)
          this.getBookmarkedProducts();
          this.reset();
        })
        .catch(err => {
          console.log(err);
          this.reset();
        });
    } else if (this.state.confirmIngredient) {
      let ingredient = {
        ingredient: this.state.confirmIngredient
      };

      // console.log("ingredient you want to delete: " + ingredient.ingredient)

      API.deleteSavedIngredient(ingredient)
        .then(res => {
          // console.log(ingredient.ingredient + " should be deleted. Here's the response: \n" + res.data)
          this.getSavedIngredients();
          this.reset();
        })
        .catch(err => {
          console.log(err);
          this.reset();
        });
    } else {
      console.log("Error on Confirmation");
    }
  };

  // handles all input change
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  loadCurrentUser = () => {
    API.currentUser()
      .then(res =>
        // console.log(res)
        this.setState({
          profileName: res.data.name,
          userName: res.data.userName,
          email: res.data.email,
          gender: res.data.gender
        })
      )
      .catch(err => console.log(err));
  };

  handleShowUpdateUserModal() {
    this.setState({
      showUpdateUserModal: true,
      updateName: this.state.profileName,
      updateEmail: this.state.email,
      updateUserName: this.state.userName,
      updatePassword: "",
      updateGender: this.state.gender
    });
  }

  handleHideUpdateUserModal() {
    this.setState({ showUpdateUserModal: false });
  }

  updateUser = () => {
    var updateUserObj = {
      name: this.state.updateName,
      userName: this.state.updateUserName,
      email: this.state.updateEmail,
      password: this.state.updatePassword,
      gender: this.state.updateGender
    };
    console.log(updateUserObj, 1);
    API.updateUser(updateUserObj)
      .then(res => {
        //console.log("submited data and here is res: ", res)
        console.log(res, 2);

        //if (!res.data) {
        //    console.log("we made it to the second layer");
        // alert("Username already exists! Please use another");
        //    this.setState({
        //        userMessage: "Username or Password already exsists",
        //        color: "#FF000"
        //    })
        //}
      })
      .catch(err => console.log(err));
  };

  // update USER Submit

  handleUpdateUserSubmit(event) {
    event.preventDefault();
    this.updateUserState();
    // console.log(state)
    this.updateUser();
    // this.createUserState();
  }
  updateUserState() {
    this.setState({
      profileName: this.state.updateName,
      email: this.state.updateEmail,
      userName: this.state.updateUserName,
      gender: this.state.updateGender
    });
  }

  logoutButtonAction = () => {
    this.logoutUser();
    this.props.history.push("/");
  };

  searchButtonAction = () => {
    this.props.history.push("/search");
  };

  logoutUser() {
    API.logoutUser({})
      .then(res => {
        console.log("logout");
      })
      .catch(err => console.log(err));
  }

  render() {
    const buttons = [
      { id: 1, name: "Logout", action: this.logoutButtonAction },
      { id: 2, name: "Search", action: this.searchButtonAction }
    ];
    return (
      <div>
        <ScannerNavbar buttons={buttons} />
        <Jumbotron>
          <h3>Your Profile</h3>
        </Jumbotron>
        <Container fluid>
          <Row>
            <Col sm={4}>
              <Panel>
                <Panel.Body>
                  <h3 id="info">User Information</h3>
                  <p>Name: {this.state.profileName}</p>
                  <p>Username: {this.state.userName}</p>
                  <p>Email: {this.state.email}</p>
                  <p>Gender: {this.state.gender}</p>
                  <div className="text-center">
                    <button
                      onClick={this.handleShowUpdateUserModal}
                      className="btn btn-success justify-self-center"
                    >
                      Profile Update
                    </button>
                  </div>
                </Panel.Body>
              </Panel>
            </Col>

            {/* Ingredients Here */}
            <Col sm={8}>
              <h3 id="warning">Ingredient Warnings</h3>
              {this.state.savedIngredients.length ? (
                <List>
                  {/* Ternary Operation to see if User has any marked Ingredients */}
                  {this.state.savedIngredients.map(ingredient => (
                    <ListItem key={ingredient}>
                      {ingredient}
                      <button
                        value={ingredient}
                        onClick={this.deleteSavedIngredient}
                        className=" delete-button btn-danger"
                      >
                        Delete
                      </button>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <h4 style={{ textAlign: "center" }}>
                  No Ingredients Warnings Found
                </h4>
              )}
              {/* Ingredients End */}

              {/* Products Here */}
              <h3 id="favorite">Favorite Products</h3>
              {this.state.bookmarkedProducts.length ? (
                <List>
                  {/* Ternary Operation to see if User has any favorite products */}
                  {this.state.bookmarkedProducts.map(product => (
                    <ListItem key={product}>
                      {product}
                      <button
                        value={product}
                        onClick={this.deleteBookmarkedProduct}
                        className=" delete-button btn-danger"
                      >
                        Delete
                      </button>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <h4 style={{ textAlign: "center" }}>
                  No Favorite Products Found
                </h4>
              )}
            </Col>
            {/* Products end */}
          </Row>

          <Modal
            {...this.props}
            show={this.state.showUpdateUserModal}
            onHide={this.handleHideUpdateUserModal}
            dialogClassName="custom-modal"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-lg">
                Update Profile
              </Modal.Title>
            </Modal.Header>
            <Form horizontal onSubmit={this.handleUpdateUserSubmit}>
              <Modal.Body>
                <FormGroup controlId="formHorizontalName">
                  <Col componentClass={ControlLabel} sm={2}>
                    Update Name
                  </Col>
                  <Col sm={10}>
                    <FormControl
                      name="updateName"
                      type="text"
                      placeholder="Enter Name"
                      value={this.state.updateName}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalUsername">
                  <Col componentClass={ControlLabel} sm={2}>
                    Update Username
                  </Col>
                  <Col sm={10}>
                    <FormControl
                      name="updateUserName"
                      type="text"
                      placeholder="Enter Username"
                      value={this.state.updateUserName}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalEmail">
                  <Col componentClass={ControlLabel} sm={2}>
                    Update Email
                  </Col>
                  <Col sm={10}>
                    <FormControl
                      name="updateEmail"
                      type="email"
                      placeholder="Enter Email"
                      value={this.state.updateEmail}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalPassword">
                  <Col componentClass={ControlLabel} sm={2}>
                    Update Password
                  </Col>
                  <Col sm={10}>
                    <FormControl
                      name="updatePassword"
                      type="password"
                      placeholder="Enter New Password"
                      value={this.state.updatePassword}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup controlId="formHorizontalGender">
                  <Col componentClass={ControlLabel} sm={2}>
                    Update Gender
                  </Col>
                  <Col sm={10}>
                    <FormControl
                      name="updateGender"
                      type="text"
                      placeholder="Enter Gender"
                      value={this.state.updateGender}
                      onChange={this.handleInputChange}
                    />
                  </Col>
                </FormGroup>
              </Modal.Body>
              <Modal.Footer>
                <ButtonGroup className="createUserButtions">
                  <Button
                    value="Submit"
                    type="submit"
                    onClick={this.handleHideUpdateUserModal}
                  >
                    Submit
                  </Button>
                  <Button onClick={this.handleHideUpdateUserModal}>
                    Close
                  </Button>
                </ButtonGroup>
              </Modal.Footer>
            </Form>
          </Modal>

          {/* Confirmation Modal Here */}
          {this.state.confirmIngredient ? (
            <ConfirmationModal show={this.state.show}>
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Confirm Delete</h4>
                </div>

                <div className="modal-body">
                  Are you sure you want to delete {this.state.confirmIngredient}
                  ?
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      this.hideModal();
                      this.reset();
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      this.confirmDelete();
                      this.hideModal();
                    }}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </ConfirmationModal>
          ) : (
            <ConfirmationModal show={this.state.show}>
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Confirm Delete</h4>
                </div>

                <div className="modal-body">
                  Are you sure you want to delete {this.state.confirmProduct}?
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      this.hideModal();
                      this.reset();
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      this.confirmDelete();
                      this.hideModal();
                    }}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </ConfirmationModal>
          )}
          {/* Confirmation Modal End */}
        </Container>
      </div>
    );
  }
}

export default Profile;

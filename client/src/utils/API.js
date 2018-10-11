import axios from "axios";

//Gets products from our API website. Limit 20 because I don't want to break their server or something.
export default {

    //Search through products in the API.
    getProducts: product => {
        return axios.get("https://api.fda.gov/drug/label.json?search=brand_name=" + product + "&limit=20")
    },


    //Get the exact scanned product. 
    getProductByScan: product => {
        return axios.get("https://api.fda.gov/drug/label.json?search=brand_name=" + product + "&limit=1")
    },

    saveScannedProduct: product => {
        return axios.post('/api/product', product)
    },

    // submit user info
    postUser: function (userArray) {
        return axios.post("/api/user", userArray);
    },

    currentUser: function (currentUserObject) {
        return axios.get("/api/user", currentUserObject);
    },
    // compare user info against login info
    loginUser: function (loginObj) {
        return axios.post("/api/user/login", loginObj);
    },

    // API TO GET USER DATA
    getSavedIngredients: () => {
        return axios.get('/api/user/ingredients')   
    },

    //METHOD TO POST STUFF FOR USERS
    saveIngredient: ingredient => {
        return axios.post('/api/user/ingredients', ingredient)
    },


    //METHOD TO DELETE STUFF FOR USERS
    deleteSavedIngredient: (ingredient) => {
        return axios.post('/api/user/ingredients/delete', ingredient);

    },

    getBookmarkedProducts: () => {
        return axios.get('/api/user/products');
    },

    bookmarkProduct: (product) => {
        // console.log("inside API", product);
        return axios.post('/api/user/products', product);

    },
    
    deleteBookmarkedProduct: (product) => {
        return axios.post('/api/user/products/delete', product);

    },

    


}
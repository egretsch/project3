import axios from "axios";

//Gets products from our API website. Limit 20 because I don't want to break their server or something.
export default {
    getProduct: product => {
        return axios.get("https://api.fda.gov/drug/label.json?search=brand_name=" + product + "&limit=20")
    },

    // getproductbyScan: product => {
    //     return axios.get() <--- put API for scanner in here.
    // },

    // submit user info
    postUser: function (userArray) {
        return axios.post("/api/user", userArray);
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
        return axios.delete('/api/user', ingredient);

    },

    getBookmarkedProducts: () => {
        return axios.get('/api/user/products');
    },

    bookmarkProduct: (product) => {
        // console.log("inside API", product);
        return axios.post('/api/user/products', product);

    },
    
    deleteBookmarkedProduct: (product) => {
        return axios.delete('/api/user', product);

    },

    


}
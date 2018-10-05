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
    postUser: function (userAry) {
        return axios.post("/api/user", userAry);
    },
    // compare user info against login info
    loginUser: function (loginObj) {
        return axios.post("/api/user/login", loginObj);
    },

    // API TO GET USER DATA
    getAllSavedIngredients: user => {
        return axios.get('/api/' + user + '/ingredient')   
    },


    //METHOD TO POST STUFF FOR USERS
    saveIngredient: (user, ingredientData) => {
        return axios.post('/api/' + user + '/ingredient', ingredientData)
    },


    //METHOD TO DELETE STUFF FOR USERS
    deleteSavedIngredient: (user, ingredient) => {
        return axios.post('/api/' + user + '/ingredient/', ingredient);

    },

    getAllSavedProducts: user => {
        return axios.get('/api/' + user + '/product');
    },

    saveProduct: (user, productData) => {
        return axios.post('/api/' + user + '/product', productData);

    },
    deleteSavedProduct: (user, product) => {
        return axios.post('/api/' + user + '/product', product);

    },

    


}
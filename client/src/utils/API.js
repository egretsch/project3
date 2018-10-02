import axios from "axios";

//Gets products from our API website. Limit 20 because I don't want to break their server or something.
export default {
    getProduct: product => {
        return axios.get("https://api.fda.gov/drug/label.json?search=brand_name=" + product + "&limit=20")
    },


    //Need user model and data.


    // API TO GET USER DATA
    getAllSavedIngredients: user => {
        return axios.get('/api/' + user + '/ingredient')   
    },


    //METHOD TO POST STUFF FOR USERS
    saveIngredient: (user, ingredientData) => {
        return axios.post('/api/' + user + '/ingredient', ingredientData)
    },


    //METHOD TO DELETE STUFF FOR USERS
    deleteSavedProduct: (user, id) => {
        return axios.post('/api/' + user + '/product/', id);

    },

    getAllSavedProducts: user => {
        return axios.get('/api/' + user + '/product');
    },

    saveProduct: (user, productData) => {
        return axios.post('/api/' + user + '/product', productData);

    },
    deleteSavedProduct: (user, id) => {
        return axios.post('/api/' + user + '/product', id);

    },

    


}
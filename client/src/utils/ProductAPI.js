import axios from "axios";

//Gets products from our API website. Limit 20 because I don't want to break their server or something.
export default {
    getProduct: function (product) {
        return axios.get("https://api.fda.gov/drug/label.json?search=brand_name=" + product + "&limit=20")

    },
}
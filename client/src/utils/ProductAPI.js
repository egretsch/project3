import axios from "axios";

export default {
    getProduct: function (product) {
        return axios.get("https://api.fda.gov/drug/label.json?search=brand_name=" + product + "&limit=20")

    },
}
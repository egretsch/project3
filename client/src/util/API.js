import axios from "axios";

export default {
    // submit user info
    postUser: function (userAry) {
        return axios.post("/api/user", userAry);
    },
    // compare user info against login info
    loginUser: function (loginObj) {
        return axios.post("/api/user/login", loginObj);
    }
};

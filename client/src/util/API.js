import axios from "axios";

export default {
    // Gets all books
    postUser: function (userAry) {
        return axios.post("/api/user", userAry);
    },
    // Gets the book with the given id
    getBook: function (id) {
        return axios.get("/api/books/" + id);
    },
    // Deletes the book with the given id
    deleteBook: function (id) {
        return axios.delete("/api/books/" + id);
    },
    // Saves a book to the database
    loginUser: function (loginObj) {
        return axios.post("/api/user/login", loginObj);
    }
};
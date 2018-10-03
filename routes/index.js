const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");

// API Routes
router.use("/api/", apiRoutes);

//test route (it works)
router.use('/api/JasonF', function(req, res) {
  res.send({
    "name": "jason",
    "userName": "JasonF",
    "email": "jasonrfelipe@gmail.com",
    "password": "123abc",
    "gender": "male"
  });
}); 

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/public/index.html"));
});

module.exports = router;

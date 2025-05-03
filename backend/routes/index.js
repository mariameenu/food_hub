var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("GET / route hit");
  res.json({ message: "Helloo" });
});

module.exports = router;

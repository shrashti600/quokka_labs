const express = require('express');
const userRoute = require('./api/user');
const articleRoute = require('./api/articles')
const router = express.Router();


router.use("/user", userRoute);
router.use("/article", articleRoute);


module.exports = router;
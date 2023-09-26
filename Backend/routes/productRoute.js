const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const protect = require("../middleWare/authMiddleware");
const router = express.Router();



router.post("/", protectct, createProduct)

module.exports = router;
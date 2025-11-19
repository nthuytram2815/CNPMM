const express = require('express');
const { createUser, handleLogin, getUser, getAccount } = require('../controllers/userController');
const auth = require('../middleware/auth');
const delay = require('../middleware/delay');
const { validateRegister, validateLogin } = require('../middleware/validation');
const limiter = require('../middleware/rateLimit');
const authorize = require('../middleware/authorization');
const { getProductsByCategory } = require('../controllers/productController');

const routerAPI = express.Router();

routerAPI.all(/.*/, auth);
routerAPI.get("/", (req, res) => {
    return res.status(200).json({ message: "API is working!" });
})

routerAPI.post("/register", limiter, validateRegister, createUser);
routerAPI.post("/login", limiter, validateLogin, handleLogin);
routerAPI.get("/user", auth, getUser);
routerAPI.get("/account", auth, authorize(['admin']), getAccount);
routerAPI.get('/products', auth, getProductsByCategory);

module.exports = routerAPI;
// Middleware for handling auth
const {Admin} = require('../db/index')
const jwt = require('jsonwebtoken')
const jwtPassword = 'a_secure_password';

async function adminExists(username, password) {
    const foundAdmin = await Admin.findOne({
        username: username,
        password: password,
    })
    return foundAdmin != null;
}

async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    console.log(req.headers);
    let token = req.headers['authorization'];
    console.log(token);
    token = token.split(" ")[1];
    
    let payload;
    try{
        payload = jwt.verify(token,jwtPassword);
        
    } catch (e) {
        res.status(404).send('invalid token');
        return;
    }
    
    const adminInDb = await adminExists(payload.username, payload.password);
    if(!adminInDb) {
        res.status(404).send("Invalid credentials: admin not found");
        return;
    }
    next();
}

module.exports = adminMiddleware;
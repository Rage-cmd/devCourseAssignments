// Middleware for handling auth
const {User} = require('../db/index')
const jwt = require('jsonwebtoken')
const jwtPassword = 'a_secure_password';

async function userExists(username, password) {
    const foundUser = await User.findOne({
        username: username,
        password: password,
    })
    return foundUser != null;
}

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    let token = req.headers['authorization'];
    token = token.split(" ")[1];
    
    let payload;
    try{
        payload = jwt.verify(token,jwtPassword);
        
    } catch (e) {
        res.status(404).send('invalid token');
        return;
    }
    
    const userInDb = await userExists(payload.username, payload.password);
    if(!userInDb) {
        res.status(404).send("Invalid credentials: admin not found");
        return;
    }

    req.headers["username"] = payload.username;
    req.headers["password"] = payload.password;

    next();
}

module.exports = userMiddleware;
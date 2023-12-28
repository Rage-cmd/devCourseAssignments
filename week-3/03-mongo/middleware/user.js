const {User} = require('../db/index')

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
    const username = req.headers["username"];
    const password = req.headers["password"];
    
    console.log("Got username and passowrd", username, password)
    
    const userInDb = await userExists(username, password);

    if(!userInDb) {
        res.status(404).send("Invalid credentials: admin not found");
        return;
    }
    next();   
}

module.exports = userMiddleware;
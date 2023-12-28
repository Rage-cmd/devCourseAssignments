// Middleware for handling auth
const {Admin} = require('../db/index')

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
    const username = req.headers["username"];
    const password = req.headers["password"];
    
    console.log("Got username and passowrd", username, password)
    
    const adminInDb = await adminExists(username, password);

    if(!adminInDb) {
        res.status(404).send("Invalid credentials: admin not found");
        return;
    }
    next();
}

module.exports = adminMiddleware;
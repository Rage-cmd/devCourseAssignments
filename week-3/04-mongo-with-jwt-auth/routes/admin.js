const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const mongoose = require("mongoose");
const {Admin, User, Course} = require("../db/index")
const jwt = require('jsonwebtoken')

const jwtPassword = "a_secure_password"

async function adminExists(username, password) {
    const foundAdmin = await Admin.findOne({
        username: username,
        password: password,
    })
    return foundAdmin != null;
}

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    console.log("Got username and passowrd", username, password)

    const adminInDb = await adminExists(username, password);

    if(adminInDb) {
        res.status(404).json("User already exists");
        return;
    }

    const admin = new Admin({
        username: username,
        password: password,
    })

    await admin.save();

    res.status(200).json({
        message: 'Admin created successfully'
    });

});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const adminInDb = await adminExists(username, password);
    if(!adminInDb) {
        res.status(404).send("Admin not found");
        return;
    }

    const token = jwt.sign({
        username: username,
        password: password
    },jwtPassword)

    res.json({
        token
    });

});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const newCourse = new Course(req.body);
    newCourse.published = true;
    await newCourse.save();

    console.log("coures added")
    
    res.json({
        message: 'Course created successfully',
        courseId: newCourse._id.toString(),
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const courses = await Course.find();
    res.json({
        courses
    })
});

module.exports = router;
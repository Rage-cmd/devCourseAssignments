const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {Admin, User, Course} = require("../db/index")
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
const jwtPassword = "a_secure_password"

async function userExists(username, password) {
    const foundUser = await User.findOne({
        username: username,
        password: password
    })
    return foundUser != null;
}


// User Routes
router.post('/signup',async  (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;

    console.log("Got username and passowrd", username, password)

    const userInDb = await userExists(username, password);

    if(userInDb) {
        res.status(404).json("User already exists");
        return;
    }

    const user = new User({
        username: username,
        password: password
    })

    await user.save();
    res.json({
        message: 'User created successfully'
    });
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const userInDb = await userExists(username, password);
    if(!userInDb) {
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

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const courses = await Course.find();
    res.json({
        courses
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    let id = req.params.courseId;
    const username = req.headers["username"];
    const password = req.headers["password"];

    console.log(username, password)
    
    const filter = {username: username, password: password};
    const update = {
        $addToSet : {
            purchasedCourses : id
        }
    }

    await User.findOneAndUpdate(filter, update);
    res.json({
        message: 'Course purchased successfully'
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.headers["username"];
    const password = req.headers["password"];

    // console.log(username, password)
    const user = await User.findOne({username: username, password: password})
    // console.log(user)
    let purchasedCourseIds = user.purchasedCourses;
    // console.log(purchasedCourseIds)

    purchasedCourseIds = purchasedCourseIds.map((id) => new mongoose.Types.ObjectId(id));

    const purchasedCourses = await Course.find({
        _id : {
            $in: purchasedCourseIds
        }
    })

    // console.log(purchasedCourses)

    res.json({
        purchasedCourses
    })

});

module.exports = router
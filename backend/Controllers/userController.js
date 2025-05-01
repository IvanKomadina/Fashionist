const User = require('../Models/UserModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('validator')

const createToken = (id) => {
    return jwt.sign({id}, process.env.SECRET, {expiresIn: '3d'})
}

const loginUser = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.login(email, password)

        if (user.admin && user.admin === true) {
            return res.json({
                success: false,
                error: "Incorrect email"
            });
        }

        // create token
        const token = createToken(user._id)

        return res.json({
            success: true,
            token: token
        });
    } catch (error) {
        res.json({error: error.message})
    }
}

const loginAdmin = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.login(email, password)
        if (user.admin && user.admin === true) {
            const token = createToken(user._id)

            res.json({
                success: true,
                token: token
            });
        } else {
            res.json({
                success: false,
                error: "You don't have access to admin panel."
            });
        }
    } catch (error) {
        res.json({error: error.message})
    }
}

const signupUser = async (req, res) => {
    const {name, email, password} = req.body

    try {
        const user = await User.signup(name, email, password)

        // create token
        const token = createToken(user._id)
    
        res.json({
            success: true,
            token: token
        });
    } catch (error) {
        res.json({error: error.message})
    }
}

// middleware to get userID
const fetchUserId = async (req, res, next) => {
    const token = req.header('auth-token');
    try {
        const data = jwt.verify(token, process.env.SECRET);
        req.id = data.id;
        next();
    } catch (error) {
        res.status(401).send({error:"Please authenticate using valid token"});
    }
} 
 
const addToFavorites = async (req, res) => {
    const productID = req.body.itemID; 

    try {
        let user = await User.findById(req.id);
        user.favorites.push(productID);
        await user.save();
        res.status(200).json({ 
            success: true, 
            favorites: user.favorites 
        });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

const getFavorites = async (req, res) => {
    try {
        let user = await User.findById(req.id);
        res.status(200).json({ success: true, favorites: user.favorites });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

const removeFromFavorites = async (req, res) => {
    const productID = req.body.itemID; 

    try {
        let user = await User.findById(req.id);
        const index = user.favorites.indexOf(productID);
        user.favorites.splice(index, 1);
        await user.save();

        res.status(200).json({ success: true, favorites: user.favorites });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }   
}

const getAllUsers = async (req, res) => {
    let users = await User.find({});
    res.send(users);
}

const getSingleUser = async (req, res) => {
    let user = await User.findById(req.id);
    res.send(user);
}

const deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    console.log("User deleted");
    res.status(200).json("User deleted")
}

const updateUser = async (req, res) => {
    if (req.body.password) {
        if (!validator.isStrongPassword(req.body.password)) {
            res.json({
                success: false, 
                message: "Password not strong enough"
            })
            return
        } else {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
    }
                                                         // return user with updated data  
    let user = await User.findByIdAndUpdate(req.id, req.body, { new: true });
    res.json({
        success: true, 
        name: user.name,
        message: "Profile updated"
    })
}

module.exports = { 
    signupUser, 
    loginUser, 
    loginAdmin,
    fetchUserId,
    addToFavorites,
    getFavorites,
    removeFromFavorites,
    getAllUsers,
    getSingleUser,
    deleteUser, 
    updateUser
}
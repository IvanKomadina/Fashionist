const express = require('express');
const router = express.Router();

// controller functions
const { 
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
} = require('../Controllers/userController')

// product routes
router.post('/signup', signupUser)
router.post('/login', loginUser)
router.post('/loginadmin', loginAdmin)
router.post('/addtofavorites', fetchUserId, addToFavorites)
router.get('/getfavorites', fetchUserId, getFavorites)
router.patch('/removefromfavorites', fetchUserId, removeFromFavorites)
router.get('/allusers', getAllUsers)
router.get('/singleuser', fetchUserId, getSingleUser)
router.delete('/deleteuser/:id', deleteUser)
router.patch('/updateuser', fetchUserId, updateUser)

module.exports = router;
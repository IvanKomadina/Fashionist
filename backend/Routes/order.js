const express = require('express');
const router = express.Router();

// controller functions
const { 
    checkoutSession, 
    getAllOrders, 
    getOrdersByUser, 
    getOrderCount, 
    getCustomerCount ,
    getTotalEarnings,
    getEarningsByMonth,
    getTshirtCount,
    getHoodieCount,
    getPantsCount,
    getJacketCount, 
    getTotalSoldClothes
} = require('../Controllers/orderController')

// order routes
router.post('/checkoutsession', checkoutSession)
router.get('/allorders', getAllOrders)
router.get('/ordersbyuser/:id', getOrdersByUser)
router.get('/ordercount', getOrderCount)
router.get('/customercount', getCustomerCount)
router.get('/totalearnings', getTotalEarnings)
router.get('/earningsbymonth', getEarningsByMonth)
router.get('/tshirtcount', getTshirtCount)
router.get('/hoodiecount', getHoodieCount)
router.get('/pantscount', getPantsCount)
router.get('/jacketcount', getJacketCount)
router.get('/clothescount', getTotalSoldClothes)

module.exports = router;
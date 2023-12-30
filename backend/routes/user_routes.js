const express = require('express')
const router = express.Router()
const usersController = require('../controller/usersController')
const verifyJWT= require("../middleware/verifyJWT")

// router.use(verifyJWT)
router
    .get('/get',usersController.getAllUsers)
    .get('/get/:id',usersController.getuser)
    .post('/create',usersController.createNewUser)
    .patch('/update',usersController.updateUser)
    .delete('/delete',usersController.deleteUser)

module.exports = router
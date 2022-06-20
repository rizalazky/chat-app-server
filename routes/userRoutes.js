const router = require('express').Router();
const { userController } = require('../controllers');


router.post('/', userController.getDataUser)

module.exports = router
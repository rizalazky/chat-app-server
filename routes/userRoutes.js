const router = require('express').Router();
const { userController } = require('../controllers');


router.post('/login', userController.getDataUser)
router.post('/register',userController.register)

module.exports = router
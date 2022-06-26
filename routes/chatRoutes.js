const router = require('express').Router();
const { chatController } = require('../controllers');

router.get('/:username',chatController.findUserToChat)
router.get('/getlistchatroom/:username',chatController.getListChatRoom)
router.get('/getdatamessage/:roomID',chatController.getDataMessage)

module.exports = router
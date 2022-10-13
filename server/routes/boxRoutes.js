const router = require('express').Router()
const {getBoxes} = require('../controllers/boxControllers')
const {access} = require('../middlewares/accessMiddleware')
router.use(access)

router.route('/').get(getBoxes)

module.exports = router
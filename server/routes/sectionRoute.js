const router = require('express').Router()
const {getSections} = require('../controllers/sectionControllers')
const {access} = require('../middlewares/accessMiddleware')
router.use(access)

router.route('/').get(getSections)

module.exports = router
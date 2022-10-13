const router = require('express').Router()
const {getModules} = require('../controllers/ModuleController')
const {access} = require('../middlewares/accessMiddleware')
router.use(access)

router.route('/').get(getModules)

module.exports = router
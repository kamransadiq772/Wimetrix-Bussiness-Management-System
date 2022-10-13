const router = require('express').Router()
const {getLines,deleteLine,createLine,updateLine} = require('../controllers/lineController')
const {access} = require('../middlewares/accessMiddleware')
router.use(access)

router.route('/').get(getLines).post(createLine).put(updateLine);
router.route('/:id').delete(deleteLine)

module.exports = router
const router = require('express').Router()
const {createFault,updateFault,getFaults,deleteFault} = require('../controllers/faultController')
const {access} = require('../middlewares/accessMiddleware')
router.use(access)

router.route('/').get(getFaults).post(createFault).put(updateFault);
router.route('/:id').delete(deleteFault)

module.exports = router
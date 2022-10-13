const router = require('express').Router()
const {createMachine,updateMachine,deleteMachine,getMachines} = require('../controllers/machineController')
const {access} = require('../middlewares/accessMiddleware')
router.use(access)

router.route('/').get(getMachines).post(createMachine).put(updateMachine);
router.route('/:id').delete(deleteMachine)

module.exports = router
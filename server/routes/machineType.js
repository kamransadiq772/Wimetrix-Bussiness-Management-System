const router = require('express').Router()
const {createMachineType,updateMachineType,deleteMachineType,getMachineTypes} = require('../controllers/machineTypeController')
const {access} = require('../middlewares/accessMiddleware')
router.use(access)

router.route('/').get(getMachineTypes).post(createMachineType).put(updateMachineType);
router.route('/:id').delete(deleteMachineType);

module.exports = router
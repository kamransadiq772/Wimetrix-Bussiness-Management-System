const router = require('express').Router()
const {createWorker,deleteWorker,updateWorker,getWorkers} = require('../controllers/workerController')
const {access} = require('../middlewares/accessMiddleware')
router.use(access)

router.route('/').get(getWorkers).post(createWorker).put(updateWorker);
router.route('/:id').delete(deleteWorker)

module.exports = router
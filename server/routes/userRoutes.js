const router = require('express').Router()
const {createUser,updateUser,deleteUser,getUsers} = require('../controllers/userController')
const {access} = require('../middlewares/accessMiddleware')
router.use(access)

router.route('/').get(getUsers).post(createUser).put(updateUser);
router.route('/:id').delete(deleteUser);

module.exports = router

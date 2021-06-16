const router = require('express').Router();
const checkToken = require('../middelwers/verify-token')
const { create, login} = require('../controllers/userController');
//users

// router.post('/createUser',createUser);
router.post('/create', create)
router.post('/login', login)
// router.post('/loginUser',loginUser);
// router.get('/getImages/:userId',getI)

module.exports = router

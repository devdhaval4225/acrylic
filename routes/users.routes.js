const router = require('express').Router();
const { verifyUser } = require("../middleware/user.auth");


const { user } = require("../controllers/user");


router.post('/register', user.register);
router.post('/login', user.login);
router.get('/getUser', verifyUser, user.getUser);
router.post('/delete', verifyUser, user.userDelete);
router.post('/forgetPassword', user.forgetPassword)
router.get('/logout', verifyUser,user.logout)


module.exports = router;

const express = require('express')
const router = express.Router()
const User = require('../controllers/User')
const passport = require('passport');
//passport config
require('../config/passport')(passport)



router.get('/signin', User.getsignin)
router.get('/signup', User.getsignup)
router.post('/signup', User.postsignup)
router.post('/signin', passport.authenticate('local', {
    failureRedirect: '/user/signin',
    failureFlash: true
}), User.postsignin)
router.get('/profile/:slug', User.getuserprofile)



module.exports = router
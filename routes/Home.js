const express = require('express')
const router = express.Router()
const Home = require('../controllers/Home')


router.get('/', Home.gethomepage)
router.get('/category/:categories', Home.geteachcategory)


module.exports = router
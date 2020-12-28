const express = require('express')
const app = express()
const router = express.Router()
const Ads = require('../controllers/Ads')
const path = require('path')
const multer = require('multer');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');


const storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, './public/uploads/Ads');
    },
    filename: async function (request, file, callback) {
        if (request.Articles) {
            return callback(null, request.Articles.id.toString());
        }
        return callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 3,
    },
});

//middleware
app.use(express.urlencoded({ extended: false }))
router.post('/sell', upload.single('file'), Ads.postsell)
router.get('/sell', Ads.getsell)
router.get('/ads/:slug', Ads.geteachads)
router.post('/categories', Ads.postcategory)


module.exports = router
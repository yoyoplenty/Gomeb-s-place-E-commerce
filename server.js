const express = require('express')
const app = express();
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars')
let PORT = process.env.PORT || 3300
const Homeroutes = require('./routes/Home')
const Adsroutes = require('./routes/Ads')
const Userroutes = require('./routes/User')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const passport = require('passport')
const session = require('express-session')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const Helpers = require('./helpers/home')

mongoose.connect('mongodb://localhost/Gomebsmall', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}, () => {
    console.log('Database connected')
});
//view engine
var hbs = exphbs.create({
    helpers: {
        amount: Helpers.amount
    },
    handlebars: allowInsecurePrototypeAccess(Handlebars)
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
//middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
//initialize the session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));
//initialize passport and flash
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())
//Global variables
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.err = req.flash('err');
    next();
})
//Routes
app.use(Homeroutes)
app.use(Adsroutes)
app.use('/user', Userroutes)

//server port
app.listen(PORT, () => {
    console.log(`server up and running on port ${PORT}`)
})
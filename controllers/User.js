const express = require('express')
const app = express();
const bcrypt = require('bcryptjs')
const passport = require('passport');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const User = require('../models/User')


//initialize the global variable here to be on a safer side
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.err = req.flash('err');
    next();
})

module.exports = {
    getsignin: (req, res) => {
        res.render('signin', {
            src: 'main.css',
            Title: `Gomeb's place`
        })
    },
    getsignup: (req, res) => {
        res.render('signup', {
            src: 'main.css',
            Title: `Gomeb's place`
        })
    },
    postsignup: async (req, res) => {
        const { name, email, password, password2 } = req.body
        let errors = [];
        //check fields
        if (!name || !email || !password || !password2) {
            errors.push({ msg: 'please fill in all fields' })
        }
        //password match
        if (password !== password2) {
            errors.push({ msg: 'password does not match' })
        }
        //check password length
        if (password.length < 6) {
            errors.push({ msg: 'password should be at least 6 characters' })
        }

        if (errors.length > 0) {
            res.render('signup', {
                src: 'main.css',
                Title: `Gomeb's place`,
                errors,
                name,
                email,
                password,
                password2
            })
        } else {
            //validation is passed here
            await User.findOne({ email: email })
                .then(user => {
                    if (user) {
                        //user exist while trying to register a new one
                        errors.push({ msg: 'Email is already registered' })
                        res.render('signup', {
                            src: 'main.css',
                            Title: `Gomeb's place`,
                            errors,
                            name,
                            email,
                            password,
                            password2
                        })
                    } else {
                        //everything goes well here, no email found with the one in the Databse
                        let newUser = new User({
                            name,
                            email,
                            password
                        });
                        //hash the password before saving it
                        bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err
                            //set password to hash;
                            newUser.password = hash
                            //save the user input for registration
                            newUser.save()
                                .then(user => {
                                    req.flash("success", 'you are now registered and can login in')
                                    res.redirect('/user/signin')
                                }).catch(err => {
                                    console.log(err)
                                })
                        }))
                    }
                })
        }
    },
    postsignin: async (req, res,) => {
        //deconstruct your body
        const { email } = req.body
        //find your req to render each users profile
        await User.findOne({ email: email }, (err, user) => {
            if (err) {
                throw err
            } if (user) {
                res.redirect('/user/profile/' + user.slug)
            }
        })
    },
    getuserprofile: async (req, res) => {
        //since you are getting a request, you find your user through the req.params
        await User.findOne({ slug: req.params.slug }, (err, user) => {
            if (err) {
                return console.log(err)
            } if (user) {
                res.render('profile', {
                    src: 'main.css',
                    Title: `Gomeb's place`,
                    user: user
                })
            }
        })
    },
}
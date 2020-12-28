const Ads = require('../models/Ads')
const Category = require('../models/categories')

module.exports = {
    getsell: (req, res) => {
        res.render('sellcategory', {
            src: 'main.css',
            Title: `Gomeb's place`
        })
    },
    postcategory: async (req, res) => {
        let theCategory = await Category.findOne({ categories: req.body.categories })

        if (!theCategory) {
            newCategory = new Category({
                categories: req.body.categories
            })
            newCategory.save()
                .then(catego => {
                    res.render('sell', {
                        src: 'main.css',
                        Title: `Gomeb's place`
                    })
                }).catch(err => {
                    return err
                })
        }
        if (theCategory) {
            if (theCategory.categories === req.body.categories) {
                theCategory.NoOfPost++
                theCategory.save()
                res.render('sell', {
                    src: 'main.css',
                    Title: `Gomeb's place`
                })
            }
        }
    },
    postsell: (req, res) => {
        let newAds = new Ads({
            categories: req.body.categories,
            seller: req.body.seller,
            title: req.body.title,
            AdsImage: req.file.filename,
            description: req.body.description,
            price: req.body.price
        })
        newAds.save()
            .then(ads => {
                res.redirect('/')
            }).catch(err => {
                return err
            })
    },
    geteachads: async (req, res) => {
        await Ads.findOne({ slug: req.params.slug }, (err, eachAds) => {
            if (err) {
                return err
            }
            if (eachAds) {
                res.render('eachAd', {
                    src: 'main.css',
                    Title: `Gomeb's place`,
                    eachads: eachAds
                })
            } else {
                res.redirect('/')
            }
        })
    }
}






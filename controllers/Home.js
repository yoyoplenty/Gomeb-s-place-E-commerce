const Ads = require('../models/Ads')
const Categories = require('../models/categories')
module.exports = {
    gethomepage: async (req, res) => {
        let Category = await Categories.find({})
        let allCategory = Category.slice(0)
        //each Categories has to be filtered
        let eachElectronics = allCategory.filter(function (cat) {
            return cat.categories === 'electronics'
        })
        let eachProperties = allCategory.filter(function (cat) {
            return cat.categories === 'properties'
        })
        let eachVehicles = allCategory.filter(function (cat) {
            return cat.categories === 'vehicles'
        })
        let eachFashion = allCategory.filter(function (cat) {
            return cat.categories === 'fashion'
        })
        let eachMobile = allCategory.filter(function (cat) {
            return cat.categories === 'mobile&tablets'
        })
        let eachHealth = allCategory.filter(function (cat) {
            return cat.categories === 'health&beauty'
        })
        let eachAgriculture = allCategory.filter(function (cat) {
            return cat.categories === 'agriculture&food'
        })
        let eachAnimal = allCategory.filter(function (cat) {
            return cat.categories === 'animal&pets'
        })
        let eachSport = allCategory.filter(function (cat) {
            return cat.categories === 'sports'
        })
        let eachBaby = allCategory.filter(function (cat) {
            return cat.categories === 'babies'
        })

        await Ads.find({}, (err, ads) => {
            var adsgoods = ads.slice(1, 7)
            var Goodschunk = [];
            var chunkSize = 3;
            for (var i = 0; i < adsgoods.length; i += chunkSize) {
                Goodschunk.push(adsgoods.slice(i, i + chunkSize))
            }
            res.render('Home', {
                src: 'main.css',
                Title: `Gomeb's place`,
                goods: Goodschunk,
                eachproperties: eachProperties,
                eachelectronics: eachElectronics,
                eachvehicles: eachVehicles,
                eachfashion: eachFashion,
                eachmobile: eachMobile,
                eachhealth: eachHealth,
                eachagriculture: eachAgriculture,
                eachanimal: eachAnimal,
                eachsport: eachSport,
                eachbaby: eachBaby
            })
        })
    },
    geteachcategory: async (req, res) => {
        let eachcategory = await Ads.find({})
        let each = eachcategory.slice(0)
        let eachElectronics = each.filter(function (cat) {
            return cat.categories === 'electronics'
        })
        let eachProperties = each.filter(function (cat) {
            return cat.categories === 'properties'
        })
        let eachVehicles = each.filter(function (cat) {
            return cat.categories === 'vehicles'
        })
        let eachFashion = each.filter(function (cat) {
            return cat.categories === 'fashion'
        })
        let eachMobile = each.filter(function (cat) {
            return cat.categories === 'mobile&tablets'
        })
        let eachHealth = each.filter(function (cat) {
            return cat.categories === 'health&beauty'
        })
        let eachAgriculture = each.filter(function (cat) {
            return cat.categories === 'agriculture&food'
        })
        let eachAnimal = each.filter(function (cat) {
            return cat.categories === 'animal&pets'
        })
        let eachSport = each.filter(function (cat) {
            return cat.categories === 'sports'
        })
        let eachBaby = each.filter(function (cat) {
            return cat.categories === 'babies'
        })
        console.log(req.params)
        //for mobile
        if (req.params.categories === 'mobile&tablets') {
            res.render('alleachcategories', {
                src: 'main.css',
                Title: `Gomeb's place`,
                eachmobile: eachMobile,
            })
        }
        //for electronics
        if (req.params.categories === 'electronics') {
            res.render('alleachcategories', {
                src: 'main.css',
                Title: `Gomeb's place`,
                eachelectronics: eachElectronics,
            })
        }
        //for properties
        if (req.params.categories === 'properties') {
            res.render('alleachcategories', {
                src: 'main.css',
                Title: `Gomeb's place`,
                eachproperties: eachProperties,
            })
        }
        //for vehicles
        if (req.params.categories === 'vehicles') {
            res.render('alleachcategories', {
                src: 'main.css',
                Title: `Gomeb's place`,
                eachvehicles: eachVehicles,
            })
        }
        //for fashion
        if (req.params.categories === 'fashion') {
            res.render('alleachcategories', {
                src: 'main.css',
                Title: `Gomeb's place`,
                eachfashion: eachFashion,
            })
        }
        //for health&beauty
        if (req.params.categories === 'health&beauty') {
            res.render('alleachcategories', {
                src: 'main.css',
                Title: `Gomeb's place`,
                eachhealth: eachHealth,
            })
        }
        //for agriculture&food
        if (req.params.categories === 'agriculture&food') {
            res.render('alleachcategories', {
                src: 'main.css',
                Title: `Gomeb's place`,
                eachagriculture: eachAgriculture,
            })
        }
        //for animal&pets
        if (req.params.categories === 'animal&pets') {
            res.render('alleachcategories', {
                src: 'main.css',
                Title: `Gomeb's place`,
                eachanimal: eachAnimal,
            })
        }
        //for sports
        if (req.params.categories === 'sports') {
            res.render('alleachcategories', {
                src: 'main.css',
                Title: `Gomeb's place`,
                eachsport: eachSport,
            })
        }
        //for baby
        if (req.params.categories === 'babies') {
            res.render('alleachcategories', {
                src: 'main.css',
                Title: `Gomeb's place`,
                eachbaby: eachBaby,
            })
        }
    }
}

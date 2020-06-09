var mongoose = require('mongoose');
var Product = require('../product');
var Category = require('../category');

mongoose
.connect('mongodb+srv://fadeadmin:Jt5F2ahjf6eH8y4c@fadeskincare-g2mqj.azure.mongodb.net/fadeskincare?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("Successfully connected to MongoDB."))
.catch(err => console.error("Connection error", err));

var db = mongoose.connection;

var categoryArr = [
    {
        name: "Fade Out Acne",
        description: "simple, natural formulations designed to fade out your acne. *all ingredients are rated 1 (the safest category) of the [EWG Skin Deep](https://www.ewg.org/skindeep) database.*",
        priority: 1,
    }, 
    {
        name: "Our Favorites",
        description: "some of our favorites -- individually researched and tested on acne-prone skin.",
        priority: 2,
    }
];

var prodArr = [
    {
        name: "WAKEUP Oil",
        description: "an oil moisturizer designed to wake up your skin. formulated with powerful antibacterial essential oils and other oils to regulate your skin's production of sebum\
        \
        ingredients: *safflower oil, jojoba oil, *frankincense serrata* essential oil, oregano essential oil, lavendar essential oil, eucalyptus essential oil*\
        \
        each ingredient is rated 1 (safest rating) by EWG Skin Deep.",
        price: 30,
        imagePath: "../../images/wakeup_oil_bottle.png",
        categories: [],
    },
    {
        name: "Cranberry cleanser",
        description: "ultra gentle yet exfoliating cleanser. designed for oily/blemish-prone skin. [EWG verified💙](https://www.ewg.org/skindeep/products/642095-mychelle-dermaceuticals-clear-skin-cranberry-cleanser/)",
        price: 20,
        imagePath: "https://cdn.shopify.com/s/files/1/2537/6576/products/Correct-2048x2048-cscc-front_1200x.jpg?v=1583897270",
        categories: [],
    },
];


function seedCategories() {
    Category.insertMany(categoryArr)
    .then(() => {
        console.log("Categories successfully seeded.");
    })
    .catch(err => console.error("Could not save Categories." + err));
}


function seedProducts() {
    Product.insertMany(prodArr)
    .then(() => {
        console.log("products seeded.");
    })
    .catch(err => console.error("could not save products." + err));
}




function categorizeProducts() {


Category.findOne({
    name: "Our Favorites",
}).exec()
.then((res) => res._id )
.then((res) => {
    Product.
        findOne({ name: "Cranberry cleanser"}).
        updateOne(
            { $push: {categories: res}}
        ).
        exec();
})
.then(() => {
    return Category.findOne({
        name: "Fade Out Acne",
    }).exec() })
.then((res) => res._id )
.then((res) => {
    Product.
        findOne({ name: "WAKEUP Oil"}).
            updateOne(
                { $push: {categories: res}}
            ).
            exec();
    console.log("WAIT DID IT WORK");
})
.catch((err) => {
    console.error(err);
 } );

}


categorizeProducts();
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = require('../models/product');
var Category = require('../models/category');
var Cart = require('../models/cart');
var Visit = require('../models/visit');
var handleOrder = require('../order');

const fs = require('fs').promises;
const fetch = require('node-fetch');


//----------CSRF protection
var csrf = require('csurf');
var csrfProtection = csrf();
//--------------------------



/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find().exec()
  .then((prods) => {
    if(req.query.src) {
      var newVisit = {ip: req.ip, src: req.query.src, date: new Date()};
      Visit.create(newVisit);
    }

    res.render('index',
    { title: 'FADE skincare',
    products: prods,
    cart: req.session.cart ? req.session.cart : {totalQty: 0},
    });
  })
  .catch((err) => console.error(err));

});

router.get('/product/:product_slug', function(req,res) {
  Product.findOne({slug: req.params.product_slug.toString()}).exec()
  .then(
    function(doc) {
      return doc.toJSON();
    }
  ).then(
    function(prod) {
      console.log('page for '+prod.name);
      res.render('single_product',
        {
          title: prod.name + " | FADE skincare",
          prod: prod,
          cart: req.session.cart ? req.session.cart : {totalQty: 0}
        }
      );
    }
  )
  .catch(
    function(err) {
      console.error(err);
      res.redirect("/");
    }
  );

});



// ADD TO CART
router.post('/add-to-cart', function(req, res, next) {
  console.log('product to add: ' + req.body.prodId);
  console.log('current cart: ' + req.session.cart);

  var productId = req.body.prodId;
  var cart = new Cart(req.session.cart ? req.session.cart : { items: {}, totalQty: 0, totalPrice: 0 });

  Product.findById(productId, function(err, prod) {
    if (err) {
      console.error(err);
      res.redirect('/');
    } else {
      cart.add(prod, prod._id);
      req.session.cart = cart;
      console.log(req.session.cart);
    }


  });

  res.end();


});


//TO DO: remove from cart
router.post('/remove-from-cart', function(req, res) {

  var productId = req.body.prodId;

  // if cart exists, we can remove something
  if (req.session.cart) {
    var cart = new Cart(req.session.cart);
    cart.remove(productId);

    req.session.cart = cart;
    console.log('new cart: ' + req.session.cart);
  }


  res.end();

});





router.get('/get-cart', function(req, res) {
  res.send(req.session.cart ? req.session.cart : "cart is empty.");
});

router.get('/cart', function(req,res) {

  if (req.session.cart) {
    res.render('cart', {
      title: "Cart | FADE skincare",
      cart: new Cart(req.session.cart),
    });
  } else {
    res.render('cart', {
      title: "Cart — Fade",
      cart: null,
    });
  }

});

router.post('/handle-order', function(req,res) {
  handleOrder(req,res);
});


router.get('/test-session', function(req,res) {
  req.session.test = req.session.test ? req.session.test+1 : 0;
  res.send('test val is '+req.session.test);
});


module.exports = router;

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = require('../models/product');
var Category = require('../models/category');
var Cart = require('../models/cart');
var handleOrder = require('../order');
// var $ = require('jquery');
const md = require('markdown').markdown;
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
    res.render('index', 
    { title: 'FADE skincare',
    products: prods,
    cart: req.session.cart ? req.session.cart : {totalQty: 0},
    });
  })
  .catch((err) => console.error(err));

});

router.get('/product/:product_slug', function(req,res) {
  Product.findOne({slug: req.params.product_slug},
    function(err,prod) {
      res.render('single_product', 
        {
          title: prod.name + " | FADE skincare",
          products: prod,
          cart: req.session.cart ? req.session.cart : {totalQty: 0}
        });
      });
});

router.post('/add-to-cart/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : { items: {}, totalQty: 0, totalPrice: 0 });

  Product.findById(productId, function(err, prod) {
    if (err) {
      console.error(err);
      res.redirect('/');
    }

    cart.add(prod, prod._id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/');

  });
});

router.get('/get-cart', function(req, res) {
  res.send(req.session.cart);
});

router.get('/cart', function(req,res) {

  if (req.session.cart) {
    res.render('cart', {
      title: "Cart | FADE skincare",
      md: md,
      cart: new Cart(req.session.cart),     
    });
  } else {
    res.render('cart', {
      title: "Cart — Fade",
      md: md,
      cart: null,     
    });
  }
  
});

router.post('/handle-order', function(req,res) {
  handleOrder(req,res);
});


module.exports = router;

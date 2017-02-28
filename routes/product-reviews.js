const express = require('express');
const Product = require('../models/product.js');
const Review = require('../models/review.js');

const reviewsRoutes = express.Router();

reviewsRoutes.get('/products/:productId/reviews/new', (req, res, next) => {
  const productId = req.params.productId;

  Product.findById(productId, (err, prodDoc) => {
    if (err) {
      next(err);
      return;
    }
    res.render('product-reviews/new', {
      product: prodDoc
    });
  });
});

reviewsRoutes.post('/products/:productId/reviews', (req, res, next) => {
const productId = req.params.productId;

Product.findById(productId, (err, prodDoc) => {
  if (err) {
    next(err);
    return;
  }

  const reviewInfo = {
    content: req.body.content,
    stars: req.body.stars,
    author: req.body.author
  };
// console.log(reviewInfo);
  const theReview = new Review(reviewInfo);

  prodDoc.reviews.push(theReview);

  prodDoc.save((err) => {
    if (err) {
      res.render('products/new', {
        errorMessage: 'Oh no! Validation Failzsed!',
        errors: theProduct.errors
      });
      return;
    }
    res.redirect(`/products/${productId}`);
    });
  });
});

module.exports = reviewsRoutes;

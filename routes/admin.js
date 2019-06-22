const express = require('express');
const { body } = require('express-validator/check');

const adminControllers = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', isAuth, adminControllers.getAddProduct);

// /admin/product => GET
router.get('/products', isAuth, adminControllers.getProducts);

// /admin/product => POST
router.post(
  '/add-product',
  [
    body('title')
      .isAlphanumeric()
      .isLength({ min: 3 })
      .trim(),
    body('imageUrl').isURL(),
    body('price').isFloat(),
    body('imageUrl')
      .isLength({ min: 5, max: 400 })
      .trim()
  ],
  isAuth,
  adminControllers.postAddProduct
);

router.get('/edit-product/:productId', isAuth, adminControllers.getEditProduct);

router.post(
  '/edit-product',
  [
    body('title')
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body('imageUrl').isURL(),
    body('price').isFloat(),
    body('imageUrl')
      .isLength({ min: 5, max: 400 })
      .trim()
  ],
  isAuth,
  adminControllers.postEditProduct
);

router.post('/delete-product', isAuth, adminControllers.postDeleteProduct);

module.exports = router;

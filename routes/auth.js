const express = require('express');
const { check, body } = require('express-validator/check');

const authControllers = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authControllers.getLogin);
router.post('/login', authControllers.postLogin);

router.get('/signup', authControllers.getSignup);
router.post(
  '/signup',
  [
    check('email')
      .isEmail()
      .withMessage('Please enter a vaild email.')
      .custom((value, { req }) => {
        // if (value === 'test@test.com') {
        //   throw new Error('This email address if forbidden.');
        // }
        // return true;
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject('Email exists already.');
          }
        });
      }),
    body('password', 'Please enter a password with only numbers and text and at least 5 characters.')
      .isLength({ min: 5 })
      .isAlphanumeric(),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password have to match!');
      }
      return true;
    })
  ],
  authControllers.postSignup
);

router.post('/logout', authControllers.postLogout);

router.get('/reset', authControllers.getReset);
router.post('/reset', authControllers.postReset);

router.get('/reset/:token', authControllers.getNewPassword);
router.post('/new-password', authControllers.postNewPassword);

module.exports = router;

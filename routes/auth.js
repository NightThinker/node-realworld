const express = require('express');
const { check } = require('express-validator/check');

const authControllers = require('../controllers/auth');

const router = express.Router();

router.get('/login', authControllers.getLogin);
router.post('/login', authControllers.postLogin);

router.get('/signup', authControllers.getSignup);
router.post(
  '/signup',
  check('email')
    .isEmail()
    .withMessage('Please enter a vaild email.')
    .custom((value, { req }) => {
      if (value === 'test@test.com') {
        throw new Error('This email address if forbidden.');
      }
      return true;
    }),
  authControllers.postSignup
);

router.post('/logout', authControllers.postLogout);

router.get('/reset', authControllers.getReset);
router.post('/reset', authControllers.postReset);

router.get('/reset/:token', authControllers.getNewPassword);
router.post('/new-password', authControllers.postNewPassword);

module.exports = router;

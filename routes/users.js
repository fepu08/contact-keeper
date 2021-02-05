const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route   POST api/users
// @desc    Register a user
// @acc     public
router.post(
  '/',
  [
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Please include a valid email'),
    check('password')
      .isLength({ min: 6 })
      .withMessage('Please enter a password with 6 or more characters'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.json({ msg: 'passed' });
  }
);

module.exports = router;

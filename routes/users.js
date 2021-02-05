const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email }); // same as email:email
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      // because all the fields are the same name as the variable (e.g. name: name) we can use the ES6 syntax and write only the name of the field
      user = new User({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);

      await user.save();
      res.send('user saved');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;

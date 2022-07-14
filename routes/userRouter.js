const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { getAllUsers, getUser, createUser, updateUser, deleteUser } = userController;
const { signup, signin } = authController;

router.route('/signup').post(signup);
router.route('/signin').post(signin);
router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;

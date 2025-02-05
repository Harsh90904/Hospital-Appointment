const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// View routes
router.get('/login', (req, res) => res.render('login'));
router.get('/register', (req, res) => res.render('register'));

// API routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/me', authController.protect, authController.getMe);
router.patch('/update-password', authController.protect, authController.updatePassword);
router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);

module.exports = router; 
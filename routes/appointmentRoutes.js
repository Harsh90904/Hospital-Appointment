const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const authController = require('../controllers/authController');

// Protect all routes
router.use(authController.protect);

router.get('/', appointmentController.getAllAppointments);
router.post('/', appointmentController.createAppointment);
router.patch('/:id/status', appointmentController.updateAppointmentStatus);

module.exports = router; 
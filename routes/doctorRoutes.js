const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

router.get('/', doctorController.getAllDoctors);
router.post('/', doctorController.createDoctor);
router.get('/:id', doctorController.getDoctorById);

module.exports = router; 
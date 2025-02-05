const Patient = require('../models/patientModel');

exports.getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.render('patient', { patients });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createPatient = async (req, res) => {
    try {
        const patient = new Patient(req.body);
        await patient.save();
        res.redirect('/patients');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.json(patient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 
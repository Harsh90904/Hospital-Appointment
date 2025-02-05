const Doctor = require('../models/doctorModel');

exports.getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.render('doctor', { doctors });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createDoctor = async (req, res) => {
    try {
        const doctor = new Doctor(req.body);
        await doctor.save();
        res.redirect('/doctors');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getDoctorById = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.json(doctor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 
const Appointment = require('../models/appointmentModel');
const Doctor = require('../models/doctorModel');
const Patient = require('../models/patientModel');

exports.getAllAppointments = async (req, res) => {
    try {
        let appointments;
        
        // Filter appointments based on user role
        if (req.user.role === 'admin') {
            appointments = await Appointment.find()
                .populate('doctor')
                .populate('patient');
        } else if (req.user.role === 'doctor') {
            appointments = await Appointment.find({ doctor: req.user.profile })
                .populate('doctor')
                .populate('patient');
        } else {
            appointments = await Appointment.find({ patient: req.user.profile })
                .populate('doctor')
                .populate('patient');
        }

        const doctors = await Doctor.find();
        const patients = await Patient.find();
        
        res.render('appointment', { 
            appointments, 
            doctors, 
            patients,
            userRole: req.user.role 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createAppointment = async (req, res) => {
    try {
        // Only admin and patients can create appointments
        if (!['admin', 'patient'].includes(req.user.role)) {
            return res.status(403).json({ message: 'Not authorized to create appointments' });
        }

        const appointment = new Appointment({
            ...req.body,
            patient: req.user.role === 'patient' ? req.user.profile : req.body.patient
        });
        
        await appointment.save();
        res.redirect('/appointments');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateAppointmentStatus = async (req, res) => {
    try {
        // Only admin and doctors can update appointment status
        if (!['admin', 'doctor'].includes(req.user.role)) {
            return res.status(403).json({ message: 'Not authorized to update appointment status' });
        }

        const appointment = await Appointment.findById(req.params.id);
        
        // Check if doctor is updating their own appointment
        if (req.user.role === 'doctor' && 
            appointment.doctor.toString() !== req.user.profile.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this appointment' });
        }

        appointment.status = req.body.status;
        await appointment.save();

        res.json(appointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}; 
const mongoose = require('mongoose');

const visaApplicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  visaType: { type: String, required: true },
  country: { type: String, required: true },
  appointmentDate: { type: Date, required: true },
  documents: {
    applicationForm: { type: String, required: true, enum: ['Yes', 'No'] },
    passport: { type: String, required: true, enum: ['Yes', 'No'] },
    passportPhotos: { type: String, required: true, enum: ['Yes', 'No'] },
    travelItinerary: { type: String, required: true, enum: ['Yes', 'No'] },
    financialProof: { type: String, required: true, enum: ['Yes', 'No'] },
    travelInsurance: { type: String, required: true, enum: ['Yes', 'No'] },
    accommodationProof: { type: String, required: true, enum: ['Yes', 'No'] },
    purposeProof: { type: String, required: true, enum: ['Yes', 'No'] },
    visaFee: { type: String, required: true, enum: ['Yes', 'No'] },
  },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('VisaApplication', visaApplicationSchema);

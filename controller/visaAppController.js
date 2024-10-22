// controllers/visaController.js
const VisaApplication = require('../model/visaApplication');

// Create a new visa application
const createApplication = async (req, res) => {
  try {
    const newApplication = new VisaApplication(req.body);
    await newApplication.save();
    res.status(201).json(newApplication);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all visa applications
const getApplications = async (req, res) => {
  try {
    const applications = await VisaApplication.find();
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single visa application by ID
const getApplicationById = async (req, res) => {
  try {
    const application = await VisaApplication.findById(req.params.id);
    if (!application) return res.status(404).json({ message: 'Application not found' });
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a visa application
const updateApplication = async (req, res) => {
  try {
    const application = await VisaApplication.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!application) return res.status(404).json({ message: 'Application not found' });
    res.status(200).json(application);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a visa application
const deleteApplication = async (req, res) => {
  try {
    const application = await VisaApplication.findByIdAndDelete(req.params.id);
    if (!application) return res.status(404).json({ message: 'Application not found' });
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {createApplication, getApplications,getApplicationById}
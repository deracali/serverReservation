const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Establish connection to MongoDB
    await mongoose.connect(`mongodb+srv://chideracalistus:economic00@cluster0.aryyobw.mongodb.net/TicketReservation`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected successfully');

    // Connection events logging
    mongoose.connection.on('connected', () => {
      console.log('MongoDB connection established.');
    });

    mongoose.connection.on('disconnected', () => {
      console.error('MongoDB connection is disconnected.');
    });

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected.');
    });

    mongoose.connection.on('close', () => {
      console.log('MongoDB connection closed.');
    });

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;

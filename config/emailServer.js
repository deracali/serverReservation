const nodemailer = require('nodemailer');

// Create a transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use your email service (e.g., Gmail, SMTP)
    auth: {
        user: 'support@etktglobal.com',
        pass: 'Adebiyi12@'
    },
});

// Function to send email
const sendBookingEmail = (to, flightDetails) => {
    const mailOptions = {
        from: process.env.EMAIL_USER, // Sender's email
        to, // Recipient's email
        subject: 'Your Flight Booking Confirmation',
        html: `
            <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                <h2 style="color: #007BFF;">Thank You for Your Booking!</h2>
                <p>We are pleased to confirm your flight booking. Below are the details of your flight:</p>
                <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                    <tr>
                        <th style="border: 1px solid #ccc; padding: 8px; background-color: #f2f2f2;">Detail</th>
                        <th style="border: 1px solid #ccc; padding: 8px; background-color: #f2f2f2;">Information</th>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #ccc; padding: 8px;">Flight ID</td>
                        <td style="border: 1px solid #ccc; padding: 8px;">${flightDetails.flightId}</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #ccc; padding: 8px;">Airline</td>
                        <td style="border: 1px solid #ccc; padding: 8px;">${flightDetails.airline}</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #ccc; padding: 8px;">Origin</td>
                        <td style="border: 1px solid #ccc; padding: 8px;">${flightDetails.origin}</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #ccc; padding: 8px;">Destination</td>
                        <td style="border: 1px solid #ccc; padding: 8px;">${flightDetails.destination}</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #ccc; padding: 8px;">Departure Time</td>
                        <td style="border: 1px solid #ccc; padding: 8px;">${new Date(flightDetails.departureTime).toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #ccc; padding: 8px;">Arrival Time</td>
                        <td style="border: 1px solid #ccc; padding: 8px;">${new Date(flightDetails.arrivalTime).toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #ccc; padding: 8px;">Price</td>
                        <td style="border: 1px solid #ccc; padding: 8px;">${flightDetails.price} EUR</td>
                    </tr>
                </table>
                <p style="margin-top: 20px;">We wish you a pleasant journey!</p>
                <p>Best regards,<br>Your Booking Team</p>
            </div>
        `,
    };

    return transporter.sendMail(mailOptions);
};

module.exports = { sendBookingEmail };

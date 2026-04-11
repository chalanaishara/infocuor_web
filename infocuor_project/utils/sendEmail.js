import nodemailer from "nodemailer";

const sendEmail = async (bookingData) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,   // your company email
                pass: process.env.EMAIL_PASS    // app password
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // send to your company email
            subject: "New Photography Booking 📸",
            html: `
                <h2>New Booking Received</h2>
                <p><strong>Name:</strong> ${bookingData.name}</p>
                <p><strong>Event:</strong> ${bookingData.event}</p>
                <p><strong>Contact:</strong> ${bookingData.contactNumber}</p>
                <p><strong>Email:</strong> ${bookingData.email}</p>
            `
        };

        await transporter.sendMail(mailOptions);

    } catch (error) {
    console.log("Email Error:", error);
    throw error;
}
};

export default sendEmail;
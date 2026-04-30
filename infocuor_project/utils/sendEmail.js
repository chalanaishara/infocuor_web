// import nodemailer from "nodemailer";

// const sendEmail = async (bookingData) => {
//     try {
//         const transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 user: process.env.EMAIL_USER,  
//                 pass: process.env.EMAIL_PASS    
//             }
//         });

//         const mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: process.env.EMAIL_USER, 
//             subject: "New Photography Booking 📸",
//             html: `
//                 <h2>New Booking Received</h2>
//                 <p><strong>Name:</strong> ${bookingData.name}</p>
//                 <p><strong>Event:</strong> ${bookingData.event}</p>
//                 <p><strong>Contact:</strong> ${bookingData.contactNumber}</p>
//                 <p><strong>Email:</strong> ${bookingData.email}</p>
//             `
//         };

//         await transporter.sendMail(mailOptions);

//     } catch (error) {
//     console.log("Email Error:", error);
//     throw error;
// }
// };

// export default sendEmail;


import nodemailer from "nodemailer";

const sendEmail = async (data) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,

      // If RECEIVER_EMAIL exists use it, otherwise fallback to your email
      to: process.env.RECEIVER_EMAIL || process.env.EMAIL_USER,

      subject: data.subject || "New Booking Notification",

      html: `
        <h2>New Booking Received</h2>

        <p><strong>Name:</strong> ${data.fullName || data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Contact:</strong> ${data.contactNumber}</p>
        <p><strong>Event:</strong> ${data.event}</p>

        ${
          data.eventDate
            ? `<p><strong>Date:</strong> ${new Date(
                data.eventDate
              ).toLocaleDateString()}</p>`
            : ""
        }

        ${
          data.reason
            ? `<p><strong>Reason:</strong> ${data.reason}</p>`
            : ""
        }
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Email Error:", error);
    throw error;
  }
};

export default sendEmail;
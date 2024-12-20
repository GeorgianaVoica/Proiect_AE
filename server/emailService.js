// emailService.js
const nodemailer = require("nodemailer");

// Crearea unui transportor pentru trimiterea e-mailurilor
const transporter = nodemailer.createTransport({
  service: "gmail", // Folosim Gmail ca serviciu de e-mail, dar poți folosi și alt serviciu
  auth: {
    user: process.env.EMAIL_USER, // Adresa ta de e-mail
    pass: process.env.EMAIL_PASS, // Parola ta de e-mail sau un App Password (dacă folosești Gmail)
  },
});

// Funcția pentru trimiterea unui e-mail de confirmare a comenzii
const sendOrderConfirmation = (orderDetails, customerEmail) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: customerEmail, // E-mailul destinatarului (utilizatorul)
    subject: "Order Confirmation", // Subiectul
    text: `Thank you for your order!\n\nOrder Details:\nName: ${orderDetails.name}\nAddress: ${orderDetails.address}\nTotal: ${orderDetails.total} RON\n\nItems: ${orderDetails.items.map(item => `\nProduct: ${item.title}, Quantity: ${item.quantity}, Price: ${item.price}`).join('')}`,
  };

  // Trimiterea e-mailului
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

module.exports = { sendOrderConfirmation };

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nodirbekqobilov332@gmail.com',
        pass: 'copzymkjwxzpabah'
    }
});
export const sendConfirmationEmail = async (userEmail, confirmationCode) => {
    const mailOptions = {
        from: 'nodirbekqobilov332@gmail.com',
        to: userEmail,
        subject: 'Please confirm your account',
        html: `<p>http://localhost:5000/pass/code/${confirmationCode}</p>`
    };
    try {
        const result = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + result.response);
    } catch (error) {
        console.log(error);
    }
};

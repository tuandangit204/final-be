import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const auth = {
    type: 'OAuth2',
    user: 'contact.tuandang@gmail.com',
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN
}

console.log('auth', auth);

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: auth
});

export const mailOptionsHtml = {
    from: '"Tên người gửi" ',
    to: 'tuandangit2004@gmail.com',
    subject: 'Email với HTML',
    html: '<h1>Tiêu đề lớn</h1><p>Nội dung <b>HTML</b> ở đây.</p>'
};
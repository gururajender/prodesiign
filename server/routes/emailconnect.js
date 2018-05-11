import express from 'express';
import emailjs from 'emailjs';

let router = express.Router();

const emailconnect = emailjs.server.connect({
    user: "k.saravananoct25@gmail.com",
    password: "anbu12345",
    host: "smtp.gmail.com",
    port: 465,
    ssl: true
});

export default emailconnect;

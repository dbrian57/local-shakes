'use strict';

/*
Use this script to test your Twilio text message configuration.
*/

require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const message = 'This text message is a test from Local Shakes.';

const phoneArray = process.env.PHONE_NUMBER_TO_TEXT.split(',');
console.log(phoneArray);

let sendText = (message) => {
   phoneArray.forEach(phoneNumber => {
      client.messages
      .create({
         body: message,
         messagingServiceSid: process.env.MESSAGING_SERVICE_ID,
         to: phoneNumber
         })
      .then(message => console.log(message.sid));
   } )

  };

  sendText(message);
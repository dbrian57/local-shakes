'use strict';

/*
Use this script to test your Twilio text message configuration.
*/

require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const message = 'This text message is a test.';

let sendText = (message) => {
  client.messages
  .create({
     body: message,
     messagingServiceSid: process.env.MESSAGING_SERVICE_ID,
     to: `+${process.env.PHONE_NUMBER_TO_TEXT}`
     })
  .then(message => console.log(message.sid));
  };

  sendText(message);
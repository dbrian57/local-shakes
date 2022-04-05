'use strict';

require('dotenv').config();
const axios = require('axios');

// Twilio client configuration
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const phoneArray = process.env.PHONE_NUMBER_TO_TEXT.split(',');

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

sendText('Local Shakes has been deployed for this phone number');

// Configure the location to monitor
const yourLatitude = '43.209572';
const yourLongitude = '-71.676826';
const yourTimezone = '-05:00';
const radius = 100; //in kilometers

/*
For testing purposes, you can use the following coordinates to monitor a 600km radius of the 
southwestern United States. The app will usually pick up a new earthquake every three to ten 
minutes.

Latitude: 35.9477244
Longitude: -117.9020186
Radius: 600
*/

// Storage or recent quakes
let recentQuakes = [];

// USGS API request
const fetchQuakeData = async () => {
   const aMinuteAgo = new Date( Date.now() - 60000 );
   let dateString = aMinuteAgo.toISOString();

   let url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&updatedafter=${dateString}${yourTimezone}&latitude=${yourLatitude}&longitude=${yourLongitude}&maxradiuskm=${radius}`;

   const rawData = await axios.get(url);


// Check USGS data for new earthquakes


   if (rawData.data.features.length > 0) {
      let latestQuake = rawData.data.features[0];
      let latestQuakeId = rawData.data.features[0].id;

/* 
If USGS returns a new earthquake object, check its earthquake ID 
against the IDs in stored recentQuakes.
*/
      if (!recentQuakes.includes(latestQuakeId)) {
         recentQuakes.unshift(latestQuakeId);
         let magnitude = latestQuake.properties.mag;
         let location = latestQuake.properties.place;
         let quakeUrl = latestQuake.properties.url;
         let message = `There was a ${magnitude} magnitude earthquake ${location}. USGS link: ${quakeUrl}`;
         sendText(message);

         if (recentQuakes.length > 10) {
            recentQuakes.pop();
         }

      } else {
         console.log('only old quakes here');
         console.log(recentQuakes);
      }
   } else {
      console.log('No new quakes.');
   }
}; 


// Run function every 60 seconds

setInterval(fetchQuakeData, 60000);

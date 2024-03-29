# local-shakes

**Author**: Dan Brian
**Version**: 1.0.0

## Overview
Local Shakes is a Node app that allows you to receive text messages about recent earthquakes in your local area. The app uses the [USGS API](https://earthquake.usgs.gov/fdsnws/event/1/) to monitor for earthquakes and the [Twilio API](https://www.twilio.com/docs/libraries/node) to send text messages when the app detects a new earthquake. The app checks for new quakes every 60 seconds.

Because the USGS often updates earthquakes with new information and the API presents updated earthquakes as new, the app stores the IDs of the previous 10 earthquakes in an array and then checks the ID of any new quakes against the list of stored IDs. This keeps the app from sending multiple text messages about the same earthquake.

## Getting Started

### Prerequistites
• `npm node` installed on your local machine or server.

• `nodemon` installed on your local machine for local testing.
  
• An active Twilio account with an outgoing phone number or message service ID.

• The latitude and longitude of the location you would like to monitor for earthquakes. You can find these coordinates using [Maps.ie](https://www.maps.ie/coordinates.html).

### Installation and Running

To install Local Shakes, first fork this repository. Once you have forked the repository, clone it using the following command:

```
git clone https://github.com/<YOUR-GIT-USERNAME>/local-shakes.git
```

Once cloned, navigate to the `local-shakes` directory on your local machine and install the app's dependencies:

```
npm install
```

Next, open the `.env.sample` file in a text editor and update the values of each variable with your Twilio credentials and the phone number you would like the app to text. Save the file as `.env` in the root directory of the app. The `PHONE_NUMBER_TO_TEXT` value should be a ten digit phone number starting with `1`, such as `16036661075`.

After adding your Twilio crendentials to the `.env` file, open the `src/index.cjs` file and replace the values for the `yourLatitude`, `yourLongitude`, `yourTimezone`, and `radius` variables with your desired values. 

The `yourTimezone` variable defines your UTC offsets. The offsets for EST, CST, MST, and PST are `-05:00`, `-06:00`, `-07:00`, and `-08:00`, respectively. These values may be different depending on your region's use of Daylight Savings Time.

Save the changes to the file and run the app with `node`:

```
node src/index.cjs
```

The app runs on your local machine and checks for new earthquakes in the defined location every 60 seconds.

### Deploying the App to the Cloud
You can deploy this app on a service like [DigitalOcean's App Platform](https://docs.digitalocean.com/products/app-platform/how-to/create-apps) or [Heroku](https://devcenter.heroku.com/articles/preparing-a-codebase-for-heroku-deployment).

When you deploy the app on a cloud service, you need to add the app's environment variables (the ones in the `.env` file) to the service you deploy on. Review your service's documentation to see how this is done.

If you are deploying this on a Linux virtual machine (VM), such as a DigitalOcean Droplet, you can install this tool using the same steps above. To keep the script running in perpetuity on the VM, run the `screen` command to create virtual terminal for the script and then run the script normally with `node src/index.cjs`. `screen` allows you to disconnect from the VM without stopping the script.

When you reconnect to the VM, you can open the virtual terminal the script is running in by running `screen -r`.

## Licensing
Local Shakes is licensed under Creative Commons. You can do whatever you want with it.

## Change Log
04-4-2022 - Pushed version 1.0.

## Roadmap

**Twitter support:** I hope to provide the app with Twitter support by the end of April 2022. This will allow the app to post earthquake updates to your account.
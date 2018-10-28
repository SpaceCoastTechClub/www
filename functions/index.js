const functions = require('firebase-functions');
const admin = require('firebase-admin');
const request = require('request');

admin.initializeApp(functions.config().firebase);

API_URL = 'https://api.meetup.com';
API_KEY = '5c483b7f507144933403e5d4311e48';
CATEGORY_IDS_TO_INCLUDE = '34';
ZIP_CODES_TO_INCLUDE = '32901,32922,32780';
SEARCH_RADIUS = 20;
GROUP_IDS_TO_EXCLUDE = '27306031,25219234,26307553,25328430'; //Unrelated or outside of Brevard County
GROUP_IDS_TO_INCLUDE = [5292112]; //Groundswell to start
LAT = 28.07;
LON = -80.63;
FIND_GROUP_IDS_URL = `${API_URL}/find/groups?photo-host=secure&zip=${ZIP_CODES_TO_INCLUDE}&page=100&radius=${SEARCH_RADIUS}&category=${CATEGORY_IDS_TO_INCLUDE}&key=${API_KEY}`;


exports.addUpcomingMeetupTechEvents = functions.https.onRequest((req, res) => {
  let getGroupIDs = request(`${FIND_GROUP_IDS_URL}`, { json: true }, (err, res, body) => {
    if (err) { return console.log(err);}
    GROUP_IDS_TO_INCLUDE = GROUP_IDS_TO_INCLUDE.concat(body.map(group => group.id));
  });
  console.log(GROUP_IDS_TO_INCLUDE);
});

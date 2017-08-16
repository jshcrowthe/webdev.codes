const functions = require('firebase-functions');
const firebase = require('firebase-admin');
firebase.initializeApp(functions.config().firebase);
/**
 * Content Functions
 */
const tc39 = require('./contentSources/tc39');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.tc39Content = functions.https.onRequest((req, res) => {
  return tc39.scrapeTC39Github()
    .catch(err => {
      console.error('ERROR: Unable to scrape/parse TC39 Github');
      throw err
    })
    .then(rawData => {
      console.log('Succesfully parsed TC39 Github Page')
      return firebase.database().ref('content/tc39/proposals').set(rawData)
        .then(() => console.log('Succesfully saved the data to firebase'))
        .then(() => rawData)
        .catch(err => {
          console.error('ERROR: Unable to save data to Firebase');
          throw err;
        });
    })
    .then(rawData => {
      res.status(200).send(rawData);
    })
    .catch(err => {
      console.error(err);
      res.status(400).send(err);
    });
});

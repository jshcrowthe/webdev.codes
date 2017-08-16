const functions = require("firebase-functions");
const firebase = require("firebase-admin");
firebase.initializeApp(functions.config().firebase);
/**
 * Content Functions
 */
const tc39 = require("./contentSources/tc39");
const githubTrending = require("./contentSources/githubTrending");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.tc39Content = functions.https.onRequest((req, res) => {
  return tc39
    .scrapeTC39Github()
    .catch(err => {
      console.error("ERROR: Unable to scrape/parse TC39 Github");
      throw err;
    })
    .then(rawData => {
      console.log("Succesfully parsed TC39 Github page");
      return firebase
        .database()
        .ref("content/tc39/proposals")
        .set(rawData)
        .then(() => console.log("Succesfully saved the data to firebase"))
        .then(() => rawData)
        .catch(err => {
          console.error("ERROR: Unable to save data to firebase");
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

function refreshGithubTrending() {
  return Promise.all([
    githubTrending.scrapeGithubTrending("javascript"),
    githubTrending.scrapeGithubTrending("typescript")
  ])
    .catch(err => {
      console.error("ERROR: Unable to scrape/parse Github trending");
      throw err;
    })
    .then(([jsData, tsData]) => {
      console.log("Succesfully parsed Github trending page");

      const jsUpload = firebase
        .database()
        .ref("content/github/trending/javascript")
        .set(jsData)
        .then(() => jsData)
        .catch(err => {
          console.error("ERROR: Couldnt uplod Javascript trending stats");
          throw err;
        });

      const tsUpload = firebase
        .database()
        .ref("content/github/trending/typescript")
        .set(tsData)
        .then(() => tsData)
        .catch(err => {
          console.error("ERROR: Couldnt uplod Typescript trending stats");
          throw err;
        });
      return Promise.all([jsUpload, tsUpload]);
    });
}

exports.githubTrending = functions.https.onRequest((req, res) => {
  refreshGithubTrending()
    .then(rawData => {
      res.status(200).send(rawData);
    })
    .catch(err => {
      console.error(err);
      res.status(400).send(err);
    });
});

functions.pubsub.topic("daily-tick").onPublish(event => {
  refreshGithubTrending();
});

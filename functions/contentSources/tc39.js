// `window.fetch` polyfill
require('isomorphic-fetch');
const cheerio = require('cheerio');

function parseTC39GithubHTML(text) {
  const $ = cheerio.load(text);
  
  const rawDataArray = $('table tbody tr').toArray();
  
  return rawDataArray
    .map(tr => $(tr).find('td').toArray())
    .map(tdArray => tdArray.map(td => $(td).html()))
    .map(dataArray => dataArray.reduce((map, val, idx) => {
      switch(idx) {
        case 0: map.updateImminent = !!val; break;
        case 1: map.proposal = val; break;
        case 2: map.champion = val; break;
        case 3: map.stage = val; break;
      }
      return map;
    }, {}));
}

function scrapeTC39Github() {
  return fetch('https://github.com/tc39/proposals/blob/master/README.md')
    .then(req => req.text())
    .then(htmlString => parseTC39GithubHTML(htmlString))
    .catch(err => console.error(err));
}

exports.scrapeTC39Github = scrapeTC39Github;

// For testing purposes
// scrapeTC39Github();
// `window.fetch` polyfill
require('isomorphic-fetch');
const cheerio = require('cheerio');

function parseGithubTrendingHTML(text) {
  const $ = cheerio.load(text);

  const rawNodesArray = $('ol.repo-list li').toArray();
  return rawNodesArray
  .map(li => {

    // Format Title Node
    const titleNode = $(li).find('h3');
    const relativeRepoLink = titleNode.find('a').attr('href');
    titleNode.find('a').attr('href', `https://github.com${relativeRepoLink}`);
    titleNode.find('span').removeClass('text-normal');

    // Description Node
    const descriptionNode = $(li).find('.py-1 p');
    
    // Star count
    const starCount = $(li).find('.text-gray a.mr-3').first();
    starCount.removeClass('muted-link d-inline-block mr-3');

    const forkCount = $(li).find('.text-gray a.mr-3').last();
    forkCount.removeClass('muted-link d-inline-block mr-3');

    const incomingStars = $(li).find('.text-gray .float-sm-right');
    incomingStars.removeClass('d-inline-block float-sm-right');

    return [
      titleNode.html(),
      descriptionNode.text(),
      starCount.html(),
      forkCount.html(),
      incomingStars.html()
    ];
  })
  .map(dataArray => dataArray.reduce((map, val, idx) => {
    switch(idx) {
      case 0: map.repoTitle = val; break;
      case 1: map.repoDescription = val; break;
      case 2: map.stars = val; break;
      case 3: map.forks = val; break;
      case 4: map.incomingStars = val; break;
    }
    return map;
  }, {}));
}

function scrapeGithubTrending(language = 'javascript') {
  return fetch(`https://github.com/trending/${language}?since=daily`)
    .then(req => req.text())
    .then(htmlString => parseGithubTrendingHTML(htmlString))
    .catch(err => console.error(err));
}

exports.scrapeGithubTrending = scrapeGithubTrending;

// For testing purposes
// scrapeGithubTrending().then(data => console.log(data));
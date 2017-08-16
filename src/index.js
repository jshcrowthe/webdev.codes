import { loadFirebase } from './firebase';
import { buildGithubTrendingWidget, buildTC39Widget } from './widget';

function buildContentWidgets() {
  [
    buildTC39Widget(),
    buildGithubTrendingWidget('typescript'),
    buildGithubTrendingWidget('javascript')
  ].forEach(widget => {
    document.querySelector('#content').appendChild(widget);    
  });
}

loadFirebase();
buildContentWidgets();
import { loadFirebase } from './firebase';
import { buildTC39Widget } from './widget';

function buildContentWidgets() {
  [
    buildTC39Widget()
  ].forEach(widget => {
    document.querySelector('#content').appendChild(widget);    
  });
}

loadFirebase();
buildContentWidgets();
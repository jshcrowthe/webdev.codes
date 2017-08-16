import { getRefData } from './firebase';

function buildWidget() {
  const section = document.createElement('section');
  section.classList.add('content-widget');
  return section;
}

export function buildTC39Widget() {
  const widget = buildWidget();

  const h1 = document.createElement('h1');
  h1.innerText = 'Active TC39 Proposals';
  widget.appendChild(h1);
  
  getRefData('content/tc39/proposals')
    .then(data => {
      const ul = document.createElement('ul');
      
      data
        .map(obj => {
          const li = document.createElement('li');
          li.innerHTML = `${obj.proposal} (Stage ${obj.stage})`
          return li;
        })
        .forEach(li => {
          ul.appendChild(li);
        });
      
      widget.appendChild(ul);
    });

  return widget;
}

export function buildGithubTrendingWidget(language = 'javascript') {
  const widget = buildWidget();

  const h1 = document.createElement('h1');
  h1.innerHTML = `Trending <code>${language}</code> Repos`;
  widget.appendChild(h1);
  
  // TODO: Customize this UI to make it involve all of the
  // rest of the data available here
  getRefData(`content/github/trending/${language}`)
    .then(data => {
      const ul = document.createElement('ul');
      
      data
        .map(obj => {
          const li = document.createElement('li');
          li.innerHTML = `${obj.repoTitle}`
          return li;
        })
        .forEach(li => {
          ul.appendChild(li);
        });
      
      widget.appendChild(ul);
    });

  return widget;
}
import { getTC39Data } from './firebase';

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
  
  getTC39Data()
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
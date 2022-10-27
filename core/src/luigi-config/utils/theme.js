export function setTheme(name) {
  localStorage.setItem('busola.luigi-theme', JSON.stringify(name));
  const link = document.querySelector('head #_theme');
  if (name === 'light' && link) {
    link.parentNode.removeChild(link);
  }
  if (!link) {
    addLinkNode();
    return setTheme(name);
  }
  link.href = `/assets/libs/themes/${name}.css`;

  const logo = document.querySelector('[data-testid="luigi-topnav-logo"]');
  if (logo !== null) {
    logo.src = name === 'hcw' ? 'assets/logo-black.svg' : 'assets/logo.svg';
  }
}

function addLinkNode() {
  const newLink = document.createElement('link');
  newLink.id = '_theme';
  newLink.rel = 'stylesheet';
  document.head.appendChild(newLink);
}

export const getTheme = () => {
  const x = localStorage.getItem('busola.luigi-theme') || 'hcb';
  console.log('luigi', x);
  return x;
};

export function initTheme() {
  setTheme(getTheme());

  window.addEventListener(
    'message',
    event => {
      if (event.data.msg === 'busola.getCurrentTheme') {
        event.source &&
          event.source.postMessage(
            { msg: 'busola.getCurrentTheme.response', name: getTheme() },
            event.origin,
          );
      }
    },
    false,
  );
}

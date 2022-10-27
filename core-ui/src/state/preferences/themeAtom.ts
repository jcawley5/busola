import { atom, RecoilState, AtomEffect } from 'recoil';
import { localStorageEffect, luigiMessageEffect } from '../utils/effects';

type Theme = 'dark' | 'light' | 'light_dark' | 'hcw' | 'hcb' | 'default';

const THEME_STORAGE_KEY = 'busola.theme';
const DEFAULT_THEME = 'light_dark';

export function applyThemeToLinkNode(name = 'light_dark', publicUrl = ''): any {
  const link = document.querySelector('head #_theme') as HTMLLinkElement;
  if (name === 'light' && link) {
    link.parentNode?.removeChild(link);
  }
  if (!link) {
    addLinkNode();
    return applyThemeToLinkNode(name, publicUrl);
  }

  link.href = `${publicUrl || ''}/themes/${name}.css`;
}

function addLinkNode() {
  const newLink = document.createElement('link');
  newLink.id = '_theme';
  newLink.rel = 'stylesheet';
  document.head.appendChild(newLink);
}
type AddLinkEffect = () => AtomEffect<Theme>;
export const addLinkEffect: AddLinkEffect = () => ({ onSet, setSelf }) => {
  setSelf(param => {
    applyThemeToLinkNode(param as Theme, process.env.PUBLIC_URL);
    return param as Theme;
  });

  onSet(newTheme => {
    applyThemeToLinkNode(newTheme, process.env.PUBLIC_URL);
  });
};

// const setThemeWhenReadingLocalStorage = (newTheme: Theme) => {
//   applyThemeToLinkNode(newTheme, process.env.PUBLIC_URL);
// };

export const themeState: RecoilState<Theme> = atom<Theme>({
  key: 'themeState',
  default: DEFAULT_THEME,
  effects: [
    localStorageEffect<Theme>(
      THEME_STORAGE_KEY,
      // setThemeWhenReadingLocalStorage,
    ),
    luigiMessageEffect('busola.luigi-theme', 'name'),
    addLinkEffect(),
  ],
});

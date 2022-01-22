import { render, h } from 'preact';

export function parseFromString(code: string) {
  const doc = document.implementation.createHTMLDocument('');
  doc.documentElement.innerHTML = code;
  return doc;
}

export function renderToDom(Component: () => h.JSX.Element) {
  const wrapElement = document.createElement('div');
  render(h(Component, null), wrapElement);
  return wrapElement.children[0] as HTMLElement;
}

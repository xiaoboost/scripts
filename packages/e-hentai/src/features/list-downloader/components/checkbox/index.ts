import style from './style.jss';

import { addStyle } from "@scripts/utils";

addStyle(style.toString());

export function Checkbox(name: string, cb: (val: boolean) => void) {
  const div = document.createElement('div');
  const label = document.createElement('label');
  const input = document.createElement('input');
  const span = document.createElement('span');

  label.setAttribute('class', 'lc');
  input.setAttribute('type', 'checkbox');
  input.setAttribute('name', name);
  input.addEventListener('input', () => {
    cb(input.checked);
  });

  label.appendChild(input);
  label.appendChild(span);

  div.appendChild(label);
  div.setAttribute('class', style.classes.heataiCheckbox);

  return div;
}

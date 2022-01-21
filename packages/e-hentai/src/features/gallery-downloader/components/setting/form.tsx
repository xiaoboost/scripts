import style from './style.jss';

import { h, ComponentChildren } from 'preact';

export interface FormBoxProps {
  title: string;
  children?: ComponentChildren;
}

export function FormBox(props: FormBoxProps) {
  return (
    <section className={style.classes.formBox}>
      <h2 className={style.classes.formBoxTitle}>{props.title}</h2>
      <div className={style.classes.formBoxBody}>{props.children}</div>
    </section>
  );
}

export interface FormRowProps {
  label: string;
  children?: ComponentChildren;
}

export function FormRow(props: FormRowProps) {
  return (
    <section className={style.classes.formRow}>
      <label className={style.classes.formRowLabel}>{props.label}</label>
      <div className={style.classes.formRowBody}>{props.children}</div>
    </section>
  );
}

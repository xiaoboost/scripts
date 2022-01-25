import style from "./style.jss";

import { h, ComponentChildren } from "preact";
import { addStyle } from "@scripts/utils";
import { IconClose } from "@scripts/components";
import { stringifyClass as cln } from "@xiao-ai/utils";
import { hentaiKind, HentaiKind } from "src/utils";

addStyle(style.toString());

export interface ModalProps {
  visible: boolean;
  children?: ComponentChildren;
  onClose(): void;
}

export function Modal(props: ModalProps) {
  if (!props.visible) {
    return null;
  }

  return (
    <div className={style.classes.modalMask}>
      <div
        className={cln(style.classes.modal, {
          [style.classes.modalEx]: hentaiKind === HentaiKind.Ex,
          [style.classes.modalNormal]: hentaiKind === HentaiKind.Normal,
        })}
      >
        {props.children}
        <IconClose
          className={style.classes.closeBtn}
          onClick={props.onClose}
        />
      </div>
    </div>
  );
}

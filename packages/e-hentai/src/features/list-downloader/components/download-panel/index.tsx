import style from "./style.jss";

import { h } from "preact";
import { useState, useRef } from 'preact/hooks';
import { addStyle, download } from "@scripts/utils";
import { Tabs, IconClose } from "@scripts/components";
import { delay, stringifyClass as cln } from "@xiao-ai/utils";

import {
  hentaiKind,
  HentaiKind,
  HentaiGallery,
  HentaiImage,
  format,
} from "src/utils";

import { Modal } from 'src/components/modal';
import { Log, LogData } from "src/components/log";

addStyle(style.toString());

export interface Props {
  visible: boolean;
  onClose(): void;
}

export function DownloadPanel(props: Props) {
  if (!props.visible) {
    return null;
  }

  return (
    <Modal
      visible={props.visible}
      onClose={props.onClose}
    >
      面板
    </Modal>
  );
}

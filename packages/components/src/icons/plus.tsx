import { h } from "preact";
import { IconCreator, IconProps } from "./icons";

export function IconPlus(props: IconProps) {
  return (
    <IconCreator {...props} name="tags">
      <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
        <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path>
        <path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"></path>
      </svg>
    </IconCreator>
  );
}

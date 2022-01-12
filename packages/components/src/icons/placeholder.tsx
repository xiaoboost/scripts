import { h } from "preact";
import { IconCreator, IconProps } from "./icons";

export function IconPlaceholder(props: IconProps) {
  return (
    <IconCreator {...props} name="placeholder">
      <svg width="1em" height="1em" viewBox="64 64 896 896" fill="currentColor">
      </svg>
    </IconCreator>
  );
}

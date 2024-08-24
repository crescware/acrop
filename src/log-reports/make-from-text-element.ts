import { gray, green, red, underline, yellow } from "yoctocolors";

import { TextElement } from "../log-tree/log-node";

export function makeFromTextElement(el: TextElement) {
  return (el.attributes ?? []).reduce((acc, attr) => {
    if (attr.type === "color") {
      switch (attr.value) {
        case "red":
          return red(acc);

        case "green":
          return green(acc);

        case "yellow":
          return yellow(acc);

        case "gray":
          return gray(acc);

        default:
          return acc;
      }
    }

    if (attr.type === "modifier") {
      switch (attr.value) {
        case "underline":
          return underline(acc);

        default:
          return acc;
      }
    }

    return acc;
  }, el.text);
}

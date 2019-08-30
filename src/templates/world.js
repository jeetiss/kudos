import { createElement } from "react";
import pretty from "pretty-bytes";
import Count from "../components/count";

export default ({ vr } = {}) =>
  createElement(
    "div",
    {},
    "Hello ",
    vr,
    pretty(1200),
    createElement(Count, { initial: 10 })
  );

import { createElement } from "react";
import pretty from "pretty-bytes";
import Count from "../components/count";

export default ({ user } = {}) =>
  createElement(
    "div",
    {},
    "Hello ",
    user,
    pretty(1200),
    createElement(Count, { initial: 10 })
  );

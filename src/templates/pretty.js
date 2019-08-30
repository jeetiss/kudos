import { createElement } from "react";
import pretty from "pretty-bytes";
import Count from "../components/count";

export default ({ number }) =>
  createElement(
    "div",
    {},
    "price: ",
    pretty(number),
    createElement(Count, { initial: 10 })
  );

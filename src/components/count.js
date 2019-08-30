import { createElement as h, useState } from "react";

export default ({ initial = 0 }) => {
  const [count, setCount] = useState(initial);

  return h(
    "div",
    {},
    h("button", { onClick: () => setCount(count + 1) }, "inc"),
    h("button", { onClick: () => setCount(count - 1) }, "dec"),

    h("div", {}, count)
  );
};

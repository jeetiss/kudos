const { join, resolve, basename } = require("path");
const {
  lstatSync,
  readdirSync,
  statSync,
  mkdirSync,
  writeFileSync
} = require("fs");
const webpack = require("webpack");

const OUTPUT_PATH = "./dist";
const PUBLIC_PATH = __dirname;

const getFilename = path => basename(path, ".js");

const temaplate = path => `
import { createElement } from 'react'
import DOM from 'react-dom'
import App from '../${path}'

const point = document.querySelector('${getFilename(path)}')
DOM.render(createElement(App), point)
`;

const isFile = source => !lstatSync(source).isDirectory();
const getFiles = source =>
  readdirSync(source)
    .map(name => join(source, name))
    .filter(isFile);

const createEntries = path => {
  try {
    statSync("./.cache");
  } catch (e) {
    mkdirSync("./.cache");
  }

  const files = getFiles(path);

  return files
    .map(file => {
      const name = getFilename(file);
      const path = `./.cache/${name}.js`;

      writeFileSync(path, temaplate(file));

      return {
        [name]: path
      };
    })
    .reduce((all, entry) => ({ ...all, ...entry }), {});
};

const main = () => {
  const entry = createEntries("./src/templates");

  console.log(entry);

  const config = {
    mode: "development",
    context: __dirname,
    entry,
    output: {
      path: resolve(OUTPUT_PATH),
      filename: "[name].js",
      publicPath: PUBLIC_PATH
    }
  };

  const compiler = webpack(config, (err, stats) => {
    console.log(err, stats);
  });

  // compiler.run((err, stats) => {
  //   console.log(err, stats);
  // });
};

main();

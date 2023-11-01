const fs = require("fs");
const utils = require("../utils/request");
const process = require("process");

function pwd(print) {
  print(process.cwd());
}

function date(print) {
  print(Date());
}

function echo(print, args) {
  print(args);
}

function ls(print) {
  fs.readdir(".", (error, files) => {
    if (error) {
      throw error;
    }
    print(files.toString());
  });
}

function cat(print, args) {
  fs.readFile(args, "utf-8", (error, data) => {
    if (error) {
      throw error;
    }
    print(data);
  });
}

function head(print, args) {
  fs.readFile(args, "utf-8", (error, data) => {
    if (error) {
      throw error;
    }
    const separar_por_lineas = data.split("\n");
    print(separar_por_lineas[0]);
  });
}

function tail(print, args) {
  fs.readFile(args, "utf-8", (error, data) => {
    if (error) {
      throw error;
    }
    const separar_por_lineas = data.split("\n");
    print(separar_por_lineas[separar_por_lineas.length - 1].trim());
  });
}

function curl(print, args) {
  utils.request(args, (error, response) => {
    if (error) {
      throw error;
    }
    print(response);
  });
}

module.exports = { pwd, date, echo, ls, cat, head, tail, curl };

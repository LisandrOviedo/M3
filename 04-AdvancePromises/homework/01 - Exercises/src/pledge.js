"use strict";
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:

function $Promise(executor) {
  if (typeof executor !== "function")
    throw TypeError("executor is not a function");

  this._state = "pending";
  this._value = undefined;
  this._handlerGroups = [];

  executor(this._internalResolve.bind(this), this._internalReject.bind(this));
}

$Promise.prototype._internalResolve = function (data) {
  if (this._state === "pending") {
    this._state = "fulfilled";
    this._value = data;
    this._callHandlers();
  }
};

$Promise.prototype._internalReject = function (reason) {
  if (this._state === "pending") {
    this._state = "rejected";
    this._value = reason;
    this._callHandlers();
  }
};

$Promise.prototype.then = function (successCb, errorCb) {
  if (typeof successCb !== "function") successCb = false;

  if (typeof errorCb !== "function") errorCb = false;

  let downstreamPromise = new $Promise(() => {});

  this._handlerGroups.push({ successCb, errorCb, downstreamPromise });

  if (this._state !== "pending") this._callHandlers();
  return downstreamPromise;
};

$Promise.prototype._callHandlers = function () {
  while (this._handlerGroups.length) {
    let handler = this._handlerGroups.shift();

    if (this._state === "fulfilled") {
      if (!handler.successCb) {
        handler.downstreamPromise._internalResolve(this._value);
      } else {
        try {
          let result = handler.successCb(this._value);

          if (result instanceof $Promise) {
            let sH = (value) => {
              handler.downstreamPromise._internalResolve(value);
            };
            let eH = (reason) => {
              handler.downstreamPromise._internalReject(reason);
            };

            result.then(sH, eH);
          } else {
            handler.downstreamPromise._internalResolve(result);
          }
        } catch (error) {
          handler.downstreamPromise._internalReject(error);
        }
      }
    }

    if (this._state === "rejected") {
      if (!handler.errorCb) {
        handler.downstreamPromise._internalReject(this._value);
      } else {
        try {
          let result = handler.errorCb(this._value);

          if (result instanceof $Promise) {
            let sH = (value) => {
              handler.downstreamPromise._internalResolve(value);
            };
            let eH = (reason) => {
              handler.downstreamPromise._internalReject(reason);
            };

            result.then(sH, eH);
          } else {
            handler.downstreamPromise._internalResolve(result);
          }
        } catch (error) {
          handler.downstreamPromise._internalReject(error);
        }
      }
    }
  }
};

$Promise.prototype.catch = function (errorCb) {
  return this.then(null, errorCb);
};

module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/

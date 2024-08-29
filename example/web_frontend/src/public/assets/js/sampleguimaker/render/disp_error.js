"use strict";

/**
 * Submodule of render in ES Module type
 * @module error
 */

export default await (() => {
  let library, sys, interfaces;
  return new Promise(async (resolve, reject) => {
    try {
      let lib = {};

      lib.load = (...args) => {
        const [obj] = args;
        const [kernel, sysmodule, interfacing] = obj;
        library = kernel;
        sys = sysmodule;
        interfaces = interfacing;
      };

      lib.error = (...args) => {
        const [error, innermsg] = args;
        const { utils } = library;
        const { handler } = utils;
        let output = handler.dataformat;
        alert(error.msg);
        console.log(innermsg);
        return output;
      };

      resolve(lib);
    } catch (error) {
      reject(error);
    }
  });
})();

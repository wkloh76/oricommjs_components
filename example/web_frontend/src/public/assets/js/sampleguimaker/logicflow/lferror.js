"use strict";
/**
 * Submodule of logicflow in ES Module type
 * @module upload
 */

export default await (() => {
  let library, sys, interfaces, atom;
  return new Promise(async (resolve, reject) => {
    try {
      const failure = (...args) => {
        const [error] = args;
        const { utils } = library;
        const { handler } = utils;
        let output = handler.dataformat;
        output.data = error.msg;
        console.log(error.msg);
        return output;
      };

      let lib = {
        load: (...args) => {
          const [obj, opt] = args;
          const [kernel, sysmodule, interfacing] = obj;
          library = kernel;
          sys = sysmodule;
          interfaces = interfacing;
          atom = opt;
        },
        failure,
      };
      resolve(lib);
    } catch (error) {
      reject(error);
    }
  });
})();

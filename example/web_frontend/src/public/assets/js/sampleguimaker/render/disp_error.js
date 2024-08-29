"use strict";

/**
 * Submodule of render in ES Module type
 * @module error
 */

export default await (() => {
  let library, sys, interfaces, htmllogicflow, htmlrender;
  return new Promise(async (resolve, reject) => {
    try {
      const error = (...args) => {
        const [error, innermsg] = args;
        const { utils } = library;
        const { handler } = utils;
        let output = handler.dataformat;
        alert(error.msg);
        console.log(innermsg);
        return output;
      };

      let lib = {
        load: (...args) => {
          const [obj] = args;
          const [kernel, sysmodule, interfacing] = obj;
          library = kernel;
          sys = sysmodule;
          interfaces = interfacing;
        },
        error,
      };

      resolve(lib);
    } catch (error) {
      reject(error);
    }
  });
})();

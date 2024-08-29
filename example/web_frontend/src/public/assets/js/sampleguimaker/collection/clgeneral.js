"use strict";
/**
 * Submodule of logicflow in ES Module type
 * @module upload
 */
export default await (() => {
  let library, sys, interfaces, atom;
  return new Promise(async (resolve, reject) => {
    try {
      let lib = {};

      lib.load = (...args) => {
        const [obj, opt] = args;
        const [kernel, sysmodule, interfacing] = obj;
        library = kernel;
        sys = sysmodule;
        interfaces = interfacing;
        atom = opt;
      };

      lib.getfuncname = (...args) => {
        const [param] = args;
        const { utils } = library;
        const { handler } = utils;

        let output = handler.dataformat;
        let attrs = param.currentTarget.attributes;
        let func = attrs["func"].nodeValue;
        if (func) output.data = func;
        else {
          output.code = -1;
          output.msg = "Undefined function name!";
        }

        return output;
      };

      resolve(lib);
    } catch (error) {
      reject(error);
    }
  });
})();

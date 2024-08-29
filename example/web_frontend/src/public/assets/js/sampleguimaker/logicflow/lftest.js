"use strict";
/**
 * Submodule of logicflow in ES Module type
 * @module upload
 */

export default await (() => {
  let library, sys, interfaces, atom;
  return new Promise(async (resolve, reject) => {
    try {
      const validate = (...args) => {
        const [param] = args;
        const { utils } = library;
        const { datatype, handler } = utils;
        let output = handler.dataformat;
        try {
          let dtype = datatype(param);
          if (dtype != "string") {
            output.code = -1;
            output.msg =
              "Unknown data type of param. The correct type is string!";
          } else output.data = param;
        } catch (error) {
        } finally {
          return output;
        }
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
        validate,
      };
      resolve(lib);
    } catch (error) {
      reject(error);
    }
  });
})();

"use strict";

/**
 * Submodule of workflow in ES Module type
 * @module wfinit
 */

export default await (() => {
  let library, sys, interfaces, atom;
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

    lib.initial = (...args) => {
      const [param] = args;
      const { utils } = library;
      const { handler } = utils;
      const { fmtseries } = handler;
      let input = fmtseries;

      try {
        input.err = [
          {
            name: "error_console",
            func: "lferror.failure",
          },
        ];

        input.workflow = [
          {
            name: "display",
            func: "disp_test.alert",
          },
        ];
        return [[input]];
      } catch (error) {
        console.log(error);
        return;
      }
    };

    return lib;
  } catch (error) {
    return error;
  }
})();

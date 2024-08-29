"use strict";

/**
 * Submodule of quotation in ES Module type
 * @module render
 */

export default await (() => {
  let library, sys, interfaces;
  try {
    let lib = {};

    lib.load = (...args) => {
      const [obj] = args;
      const [kernel, sysmodule, interfacing] = obj;
      library = kernel;
      sys = sysmodule;
      interfaces = interfacing;
    };
    lib.show = (...args) => {
      const [data] = args;
      const { utils } = library;
      const { handler } = utils;
      let output = handler.dataformat;
      console.log(data);
      output.data = data;
      return output;
    };

    lib.alert = (...args) => {
      const [data] = args;
      const { utils } = library;
      const { handler } = utils;
      let output = handler.dataformat;
      alert(data);
      return output;
    };

    return lib;
  } catch (error) {
    return error;
  }
})();

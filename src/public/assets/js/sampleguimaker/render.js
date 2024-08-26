"use strict";

/**
 * Submodule of quotation in ES Module type
 * @module render
 */

export default await (() => {
  let library, sys, interfaces;
  try {
    const display = (...args) => {
      const [data] = args;
      const { utils } = library;
      const { handler } = utils;
      let output = handler.dataformat;
      alert(data);
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
      display,
    };

    return lib;
  } catch (error) {
    return error;
  }
})();

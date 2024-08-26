"use strict";

/**
 * Submodule of quotation in ES Module type
 * @module logicflow
 */

export default await (() => {
  let library, sys, interfaces;
  try {
    const getfuncname = (...args) => {
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

    const failure = (error) => {
      throw error;
    };

    let lib = {
      load: (...args) => {
        const [obj] = args;
        const [kernel, sysmodule, interfacing] = obj;
        library = kernel;
        sys = sysmodule;
        interfaces = interfacing;
      },
      getfuncname,
      validate,
      failure,
    };

    return lib;
  } catch (error) {
    return error;
  }
})();

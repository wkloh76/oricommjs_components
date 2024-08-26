"use strict";

/**
 * Submodule of quotation in ES Module type
 * @module event
 */

export default await (() => {
  let library, sys, interfaces, objfuncs;
  try {
    const click_testclick = async (event) => {
      const { utils } = library;
      const { sanbox } = utils;
      event.preventDefault();
      let attrs = event.currentTarget.attributes;
      let func = attrs["func"].nodeValue;
      if (func) await sanbox(objfuncs[func](event));
    };

    const register = (...args) => {
      const [param, _objfuncs] = args;
      const { reaction } = interfaces;
      objfuncs = _objfuncs;
      reaction.regevents(param, {
        click_testclick,
      });
    };

    let lib = {
      load: (...args) => {
        const [obj] = args;
        const [kernel, sysmodule, interfacing] = obj;
        library = kernel;
        sys = sysmodule;
        interfaces = interfacing;
      },
      register,
    };

    return lib;
  } catch (error) {
    return error;
  }
})();

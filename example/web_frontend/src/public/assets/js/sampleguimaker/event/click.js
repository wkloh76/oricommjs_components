/**
 * Submodule of event in ES Module type
 * @module click
 */

export default await (() => {
  let library, sys, interfaces, helper;
  return new Promise(async (resolve, reject) => {
    try {
      let lib = {};

      lib.load = (...args) => {
        const [obj, opt] = args;
        const [kernel, sysmodule, interfacing] = obj;
        library = kernel;
        sys = sysmodule;
        interfaces = interfacing;
        helper = opt;
      };

      lib.click_testclick = async (event) => {
        const { utils } = library;
        const { sanbox } = utils;
        event.preventDefault();
        let attrs = event.currentTarget.attributes;
        let func = attrs["func"].nodeValue;
        if (func) await sanbox(objfuncs[func](event));
      };

      resolve(lib);
    } catch (error) {
      reject(error);
    }
  });
})();

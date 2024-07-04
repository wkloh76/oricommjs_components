"use strict";
/**
 * The submodule of testapi
 * @module testapi
 */
module.exports = (...args) => {
  return new Promise(async (resolve, reject) => {
    const [params, obj] = args;
    const [pathname, curdir, compname] = params;
    const [library, sys, cosetting] = obj;
    try {
      let {
        components,
        utils: { mergeDeep },
      } = library;

      let lib = mergeDeep(
        await require("./controller/db")(params, obj),
        await require("./controller/nodb")(params, obj)
      );
      let regulation = components[compname].rules.regulation.api;
      console.log(regulation);
      resolve(lib);
    } catch (error) {
      reject(error);
    }
  });
};

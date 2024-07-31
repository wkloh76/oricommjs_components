"use strict";
/**
 * The submodule of testgui
 * @module testgui
 */
module.exports = (...args) => {
  return new Promise(async (resolve, reject) => {
    const [params, obj] = args;
    const [pathname, curdir, compname] = params;
    const [library, sys, cosetting] = obj;
    try {
      let {
        utils: { mergeDeep },
      } = library;

      let lib = mergeDeep(
        await require("./controller/none")(params, obj),
        await require("./controller/nostrict")(params, obj)
      );

      resolve(lib);
    } catch (error) {
      reject(error);
    }
  });
};

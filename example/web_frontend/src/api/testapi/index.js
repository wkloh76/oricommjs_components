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
        utils: { mergeDeep },
      } = library;

      let lib = mergeDeep(
        await require("./controller/db")(params, obj),
        await require("./controller/nodb")(params, obj)
      );

      let json = {};
      let permission = {
        code: false,
        name: "Jerry",
        city: "johor",
        state: "senai",
        location: "VS89",
      };

      const inclusivePick = (obj, ...keys) =>
        Object.fromEntries(keys.map((key) => [key, obj[key]]));
      json = inclusivePick(permission, "city", "state", "location");
      resolve(lib);
    } catch (error) {
      reject(error);
    }
  });
};

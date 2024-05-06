"use strict";

/**
 * testnoapi
 * @model testnoapi
 */
module.exports = (...args) => {
  const [params, obj] = args;
  const [pathname, curdir, compname] = params;
  const [library, sys, cosetting] = obj;
  const { handler } = library.utils;
  var lib = {};

  lib.testjson = (input) => {
    return new Promise(async (resolve, reject) => {
      var output = handler.dataformat;
      try {
        let test = handler.getprm(input.data.req);
        output.data = {};
        output.data[
          "testjson"
        ] = `Success call testjson. The return value is object of -- ${JSON.stringify(
          test
        )}`;
        resolve(output);
      } catch (error) {
        reject({
          code: -1,
          msg: "System error!",
          data: error,
        });
      }
    });
  };

  try {
    return lib;
  } catch (error) {
    return error;
  }
};

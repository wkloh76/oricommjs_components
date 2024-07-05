"use strict";
/**
 * user model
 * @model user
 */
module.exports = (...args) => {
  const [params, obj] = args;
  const [pathname, curdir, compname] = params;
  const [library, sys, cosetting] = obj;
  const {
    engine: { sqlmanager },
    utils: { handler, errhandler },
  } = library;
  // let [setting, database, dbengine] = cosetting;
  try {
    let lib = {};
    let db = "device";
    lib.namelist = () => {
      return ["Albert", "Jhon"];
    };
    return lib;
  } catch (error) {
    return error;
  }
};

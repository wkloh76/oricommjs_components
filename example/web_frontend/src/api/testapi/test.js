"use strict";
/**
 * test model
 * @model test
 */
module.exports = (...args) => {
  const [params, obj] = args;
  const [pathname, curdir, compname] = params;
  const [library, sys, cosetting] = obj;
  const {
    engine: { sqlmanager },
    utils: { handler, errhandler },
  } = library;
  try {
    let lib = {};
    lib.sleep = (ms, infinate = null) => {
      return new Promise((resolve) => {
        if (infinate !== null) setTimeout(resolve, ms);
      });
    };

    lib.test_promise_error = async () => {
      return new Promise((resolve, reject) => {
        try {
          basva = 1;
          resolve(basva);
        } catch (error) {
          reject(error);
        }
      });
    };

    lib.test_promise = async () => {
      return new Promise((resolve, reject) => {
        try {
          let basva = 1;
          resolve(basva);
        } catch (error) {
          reject(error);
        }
      });
    };

    lib.test_async_await = async () => {
      try {
        let basva = 1;
        await lib.sleep(1000, 1);
        return basva;
      } catch (error) {
        return error;
      }
    };

    lib.test_async_await_error = async () => {
      try {
        basva = 1;
        await lib.sleep(1000, 1);
        return basva;
      } catch (error) {
        return error;
      }
    };
    return lib;
  } catch (error) {
    return error;
  }
};

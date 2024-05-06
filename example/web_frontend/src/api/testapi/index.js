"use strict";
/**
 * The submodule of testgui
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
        utils: { handler, renameObjectKeys },
      } = library;
      let { fs, path } = sys;

      let lib = handler.restfulapi;
      let { DELETE, HEAD, GET, PATCH, POST, PUT } = lib;

      POST["testjson"] = async (...args) => {
        let [request, response] = args;
        try {
          let { render } = response;

          let input = handler.dataformat;
          input.data = {
            req: request,
          };

          let rtn = handler.getprm(input.data.req);
          if (!handler.check_empty(rtn)) {
            let test = {
              abc: 1,
              wait: { abc: 13, wait: { abc: 130 }, hole: [{ abc: 1200 }] },
            };
            console.log(JSON.stringify(test));
            console.log(cosetting.owner);
            render.options["json"] = {
              ...rtn,
              ...renameObjectKeys(test, { abc: "abb" }),
              ...renameObjectKeys(test, { wait: "wait1" }),
              ...cosetting.owner,
            };
          }
        } catch (error) {
          response.err.error = error.message;
        } finally {
          return response;
        }
      };

      resolve(lib);
    } catch (error) {
      reject(error);
    }
  });
};

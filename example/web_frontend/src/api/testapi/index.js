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
      let test = require(join(pathname, "test"))(params, obj);

      POST["testjson"] = async (...args) => {
        let [request, response] = args;
        try {
          let { render } = response;
          let { user } = components[compname].common.models;

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
              namelist: user.namelist(),
            };
          }
        } catch (error) {
          response.err.error = error.message;
        } finally {
          return response;
        }
      };

      POST["upload"] = (...args) => {
        return new Promise(async (resolve, reject) => {
          let [request, response] = args;
          try {
            let { render, upload } = response;

            let input = handler.dataformat;
            input.data = {
              req: request,
            };
            let rtn = await webstorage(request, cosetting.ongoing.upload, true);
            if (rtn.code == 0) {
              render.options["json"] = {
                message: rtn.data,
              };
            } else throw rtn;
            resolve(response);
          } catch (error) {
            response.err.error = error.message;
            resolve(response);
          }
        });
      };

      GET["test-promiss-error"] = (...args) => {
        return new Promise((resolve, reject) => {
          let [request, response] = args;
          try {
            let { render } = response;

            insp = 1;
            render.options["json"] = {
              code: 0,
              msg: "",
              data: insp,
            };
            resolve(response);
          } catch (error) {
            reject(error);
          }
        });
      };

      GET["test-error"] = (...args) => {
        let [request, response] = args;
        try {
          let { render } = response;

          insp = 1;
          render.options["json"] = {
            code: 0,
            msg: "",
            data: insp,
          };
          return response;
        } catch (error) {
          return error;
        }
      };

      GET["test-async-error"] = async (...args) => {
        let [request, response] = args;
        try {
          let { render } = response;

          insp = 1;
          await test.sleep(1000, 1);
          render.options["json"] = {
            code: 0,
            msg: "",
            data: insp,
          };
          return response;
        } catch (error) {
          return error;
        }
      };

      GET["test-inspect-promiss-error"] = (...args) => {
        return new Promise(async (resolve, reject) => {
          let [request, response] = args;
          try {
            let { render, inspector } = response;

            let getprm = handler.getprm(request);
            render.options["json"] = {
              code: 0,
              msg: "",
              data: null,
            };

            let insp;
            if (getprm.options) {
              switch (parseInt(getprm.options)) {
                case 1:
                  insp = await inspector(test.test_promise_error, []);
                  break;
                case 2:
                  insp = await inspector(test.test_promise, []);
                  break;
                case 3:
                  insp = await inspector(test.test_async_await, []);
                  break;
                case 4:
                  insp = await inspector(test.test_async_await_error, []);
                  break;
              }

              if (insp.err) throw insp;
            } else {
              render.options["json"] = {
                code: -1,
                msg: "Cannot find the the parameter(options)!",
                data: null,
              };
            }

            resolve(response);
          } catch (error) {
            // response.err.error = error;
            reject(error);
          }
        });
      };
      resolve(lib);
    } catch (error) {
      reject(error);
    }
  });
};

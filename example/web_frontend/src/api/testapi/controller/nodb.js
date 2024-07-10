"use strict";
/**
 * The submodule of testapi
 * @module nodb
 */
module.exports = (...args) => {
  return new Promise(async (resolve, reject) => {
    const [params, obj] = args;
    const [pathname, curdir, compname] = params;
    const [library, sys, cosetting] = obj;
    try {
      let {
        dir,
        components,
        engine: { sqlmanager },
        utils: { arr_diff, handler, webstorage, errhandler, concatobj },
      } = library;
      let {
        fs,
        path: { join },
      } = sys;

      let lib = handler.restfulapi;
      let { DELETE, HEAD, GET, PATCH, POST, PUT } = lib;
      let {
        remote: { cdn, apiserver, wsserver },
      } = cosetting.ongoing;

      let test = require(join(pathname, "model", "test"))(params, obj);

      let { none: regnone } = components[compname].rules.regulation.api;
      regnone[curdir] = concatobj([], regnone[curdir], [
        "testjson",
        "upload",
        "test-inspect-promiss-error",
        "test-promiss-error",
        "test-error",
        "test-async-error",
        "test-utils",
      ]);

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

      GET["test-utils"] = async (...args) => {
        let [request, response] = args;
        let {
          utils: {
            arr_objectjson,
            pick_arrayofobj,
            arr_diffidx,
            pick_arrayobj2list,
          },
        } = library;
        try {
          let { render, inspector } = response;

          let getprm = handler.getprm(request);
          render.options["json"] = handler.dataformat;

          var input1 = "test";
          var input2 = 23;
          var input3 = [
            {
              key1: "value1",
              key2: "value2",
              key3: `{"key3.1":"value3.1"}`,
              key4: "",
            },
            {
              key1: "value1.1",
              key2: "value2.1",
              key3: `{"key3.1":"value3.1.1"}`,
              key4: "",
            },
          ];
          var input4 = `{"key5":"value5"}`;
          var input5 = "";
          var input6 = {
            key6: "value6",
          };
          var input7 = [
            {
              location_id: 2,
              line_id: 1,
              device_id: null,
              location_label: "Main PCBA Pairing",
              settings: '{"prodorder":"52"}',
              token:
                '{"unit_id":null,"token":"62a1149ca3","dt":"2022-02-15 18:31:33"}',
              station_id: 2,
              station_code: "mainpcb",
              station_name: "Main PCBA Pairing",
              task: '{"upair":[2]}',
              input: '["uhf","barcode"]',
              first: 1,
            },
          ];

          render.options["json"]["data"] = {};
          render.options["json"]["data"]["pick_arrayofobj"] = pick_arrayofobj(
            input3,
            ["key1", "key2"]
          );

          render.options["json"]["data"]["arr_diffidx"] = arr_diffidx(
            ["code", "kids", "perm_json", "conn_id"],
            ["code", "perm_json", "conn_id", "db"]
          );

          render.options["json"]["data"]["pick_arrayobj2list"] =
            pick_arrayobj2list(input3, ["key1", "key2"]);
          
          return response;
        } catch (error) {
          response.err.error = errhandler(error);
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

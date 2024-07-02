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
        dir,
        components,
        engine: { sqlmanager },
        utils: { arr_diff, handler, webstorage, errhandler },
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

      let test = require(join(pathname, "test"))(params, obj);

      let regulation = components[compname].rules.regulation.api;
      regulation.strict["auth-sqlite"][curdir] = ["test-sqlite"];
      regulation.strict["permit-mariadb-strict"][curdir] = ["test-mariadb"];
      regulation.nostrict["basic-mariadb"][curdir] = [
        "test-sqltemplate-select",
      ];
      regulation.none[curdir] = [
        "testjson",
        "upload",
        "test-inspect-promiss-error",
        "test-promiss-error",
        "test-error",
        "test-async-error",
      ];

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

      GET["test-mariadb"] = async (...args) => {
        let [request, response] = args;
        try {
          let { render, rule } = response;

          let cond = rule["db"].workdb.rules;
          let dboption = rule["db"].workdb.dboption;
          cond.transaction = true;

          let isempty = await rule["db"].workdb.ischema("testdb1");
          let data1 = await rule["db"].workdb.query(
            [
              {
                type: "INSERT",
                sql: "INSERT INTO testdb.sys (taskname,describle,valid) VALUES('create_sflow','Create system flow',1),('create_uflow','Create user flow',1),('create_pflow','Create process flow',1);",
              },
              // {
              //   type: "INSERT",
              //   sql: "INSERT INTO testdb.sys (syid,taskname,describle,valid) VALUE(2,'create_uflow','Create user flow',1);",
              // },
              {
                type: "UPDATE",
                sql: "UPDATE testdb.sys SET valid=0  WHERE taskname='create_sflow';",
              },
              {
                type: "SELECT",
                sql: "SELECT * FROM testdb.sys;",
              },
            ],
            cond
          );

          if (data1.code == 0) render.options["json"] = data1.data;
          else throw data1.data;

          cond.transaction = false;
          cond.queryone = true;
          let data = await rule["db"].workdb.query(
            [
              {
                type: "SELECT",
                sql: "SELECT * FROM web_cs.`cs`  WHERE valid=1;",
              },
              {
                type: "SELECT",
                sql: "SELECT *  FROM oqc_mgmt.`cs_pcs` WHERE valid=1 LIMIT 5;",
              },
            ],
            cond
          );

          if (data.code == 0)
            for (let itm of data.data) render.options["json"].push(itm);
          else throw data.data;
          return response;
        } catch (error) {
          return error;
        }
      };

      GET["test-sqlite"] = async (...args) => {
        let [request, response] = args;
        try {
          let { render, rule } = response;

          let cond = rule.db.mgmtdb.rules;
          let dboption = rule.db.mgmtdb.dboption;
          cond.transaction = true;

          let data1 = rule.db.mgmtdb.query(
            [
              {
                type: "INSERT",
                sql: "INSERT INTO cats (name, age) VALUES(@name, @age);",
                value: [
                  { name: "Joey", age: 2 },
                  { name: "Sally", age: 4 },
                  { name: "Junior", age: 1 },
                ],
              },
              // {
              //   type: "INSERT",
              //   sql: "INSERT INTO cats (pid,name, age) VALUES(@pid,@name, @age);",
              //   value: [
              //     { pid: 1, name: "Joey", age: 2 },
              //     { pid: 2, name: "Sally", age: 4 },
              //     { pid: 3, name: "Junior", age: 1 },
              //   ],
              // },
              {
                type: "INSERT",
                sql: "INSERT INTO cats (name, age) VALUES('wkloh', 10);",
              },
              {
                type: "UPDATE",
                sql: "UPDATE cats SET age=15 WHERE name='wkloh';",
              },
              {
                type: "SELECT",
                sql: "SELECT * FROM cats;",
              },
            ],
            cond
          );

          if (data1.code == 0) {
            render.options["json"] = data1.data;
          } else throw data1.data;
          return response;
        } catch (error) {
          let err = {};
          err.code = error.code;
          err.message = error.message;
          err.stack = error.stack;
          let yy = JSON.stringify(err);
          let kk = error.message;
          response.err.error = error;
          return response;
        }
      };

      GET["test-sqltemplate-select"] = async (...args) => {
        let [request, response] = args;
        try {
          let { render, rule } = response;
          let getprm = handler.getprm(request);

          let { DB, DEFAULT, INSERT, SELECT, UPDATE, TABLE, WHERE } =
            handler.sqlgeneric;
          DB = "testdb";
          TABLE = ["products"];

          INSERT = [
            {
              name: "wkloh",
              price: 33,
              stock: 5555,
              attribute: JSON.stringify({ side: "L", color: "purple" }),
            },
          ];

          let prepare1 = await sqlmanager.sqltemplate.generate({
            DB,
            DEFAULT,
            INSERT,
            TABLE,
          });

          UPDATE = [
            {
              stock: 55,
            },
          ];

          WHERE.OR = { stock: [555, 5555] };
          let prepare2 = await sqlmanager.sqltemplate.generate({
            DB,
            DEFAULT,
            UPDATE,
            TABLE,
            WHERE,
          });

          SELECT = [
            {
              name: "username",
              price: "saleprice",
              stock: "balancestock",
              attribute: "specification",
            },
          ];

          WHERE = handler.sqlgeneric.WHERE;
          WHERE.AND = { name: `${getprm.username}` };
          WHERE.OR = { stock: [3, 5] };

          let prepare = await sqlmanager.sqltemplate.generate({
            DB,
            DEFAULT,
            SELECT,
            TABLE,
            WHERE,
          });

          let cond = rule["db"].workdb.rules;
          let dboption = rule["db"].workdb.dboption;
          // cond.transaction = true;

          let isempty = await rule["db"].workdb.ischema("testdb");
          let data1 = await rule["db"].workdb.query(
            [
              {
                type: prepare1.data.cmd,
                sql: prepare1.data.value,
              },
              {
                type: prepare2.data.cmd,
                sql: prepare2.data.value,
              },
              {
                type: prepare.data.cmd,
                sql: prepare.data.value,
              },
            ],
            cond
          );

          if (data1.code == 0)
            render.options["json"] = {
              cmd: prepare.data.value,
              data: data1.data,
            };
          // for (let itm of data1.data) render.options["json"].push(itm);
          else throw data1.data;
          return response;
        } catch (error) {
          let err = {};
          err.code = error.code;
          err.message = error.message;
          err.stack = error.stack;
          let yy = JSON.stringify(err);
          let kk = error.message;
          response.err.error = error;
          return response;
        }
      };
      resolve(lib);
    } catch (error) {
      reject(error);
    }
  });
};

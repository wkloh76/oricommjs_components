"use strict";
/**
 * The submodule of testapi
 * @module db
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

      let rname = ["auth-sqlite", "permit-mariadb-strict", "basic-mariadb"];
      let { strict: regstrict, nostrict: regnostrict } =
        components[compname].rules.regulation.api;

      regstrict[rname[0]][curdir] = concatobj([], regstrict[rname[0]][curdir], [
        "test-sqlite",
      ]);
      regstrict[rname[1]][curdir] = concatobj([], regstrict[rname[1]][curdir], [
        "test-mariadb",
      ]);
      regnostrict[rname[2]][curdir] = concatobj(
        [],
        regnostrict[rname[2]][curdir],
        ["test-sqltemplate-select"]
      );

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

          if (data.code == 0) {
            for (let itm of data.data) {
              if (itm.length < 2)
                // https://attacomsian.com/blog/javascript-convert-array-of-objects-to-object
                // Merge all array objects into single object
                render.options["json"].push(Object.assign({}, ...itm));
              else render.options["json"].push(itm);
            }
          } else throw data.data;
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

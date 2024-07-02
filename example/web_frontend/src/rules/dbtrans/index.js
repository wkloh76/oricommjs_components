/**
 * Copyright (c) 2024   Loh Wah Kiang
 *
 * openGauss is licensed under Mulan PSL v2.
 * You can use this software according to the terms and conditions of the Mulan PSL v2.
 * You may obtain a copy of Mulan PSL v2 at:
 *
 *          http://license.coscl.org.cn/MulanPSL2
 *
 * THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND,
 * EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
 * MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
 * See the Mulan PSL v2 for more details.
 * -------------------------------------------------------------------------
 */
"use strict";
/**
 * auth
 * @module src_rules_auth_index
 */
module.exports = (...args) => {
  return new Promise(async (resolve, reject) => {
    const [params, obj] = args;
    const [pathname, curdir, compname] = params;
    const [library, sys, cosetting] = obj;
    try {
      let {
        utils: { handler },
        engine: { sqlmanager },
      } = library;
      let lib = {};

      lib["start_mariadb"] = async (...args) => {
        let [request, response] = args;
        try {
          let { session } = request;
          let { err, fname, rule } = response;

          console.log("start_mariadb");
          let conn = await sqlmanager.mariadb.connector("workdb", compname);
          if (conn.code == 0) {
            rule["db"] = {
              workdb: conn.data["workdb"],
            };
          } else throw { message: "Undefined mariadb connection!" };

          return response;
        } catch (error) {
          response.err.error = error.message;
          return response;
        }
      };

      lib["start_sqlite3"] = async (...args) => {
        let [request, response] = args;
        try {
          let { session } = request;
          let { err, fname, rule } = response;

          console.log("start_sqlite3");
          let conn = await sqlmanager.sqlite3.connector("mgmtdb", compname);
          if (conn.code == 0) {
            rule["db"] = {
              mgmtdb: conn.data["mgmtdb"],
            };
          }

          return response;
        } catch (error) {
          response.err.error = error.message;
          return response;
        }
      };
      lib["force_closedb"] = async (...args) => {
        let [request, response] = args;
        try {
          let { session } = request;
          let { err, fname, rule } = response;
          if (rule.db)
            for (let [, database] of Object.entries(rule.db)) {
              await database.disconnect();
            }

          return response;
        } catch (error) {
          response.err.error = error.message;
          return response;
        }
      };

      resolve(lib);
    } catch (error) {
      reject(error);
    }
  });
};

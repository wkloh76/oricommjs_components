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
 * db
 * @module src_services_db_index
 */
module.exports = (...args) => {
  return new Promise(async (resolve, reject) => {
    const [params, obj] = args;
    const [pathname, curdir, compname] = params;
    const [library, sys, cosetting] = obj;
    const {
      fs,
      path: { join },
    } = sys;
    const {
      engine: { sqlmanager },
    } = library;

    try {
      let lib = {};
      let dbengine = "mariadb";

      lib["startup"] = async (...args) => {
        let [setting] = args;
        let output;
        try {
          output = await sqlmanager[dbengine].createlog(
            sqlmanager,
            setting[dbengine]
          );
          if (output.code == 0) {
            let err;
            for (let [key] of Object.entries(setting[dbengine]["db"])) {
              let { ...dbconf } = setting[dbengine]["db"][key];
              dbconf["engine"] = dbengine;
              output = await sqlmanager[dbengine].register(
                dbconf,
                key,
                compname
              );
              if (output.code !== 0)
                err += `Unable establish ${key} database connection to ${dbengine} server!`;
            }
            if (err)
              throw {
                message: "Failure to create all database!",
                stack: err,
              };
          } else throw output;
          return;
        } catch (error) {
          return error;
        }
      };
      resolve(lib);
    } catch (error) {
      reject(error);
    }
  });
};

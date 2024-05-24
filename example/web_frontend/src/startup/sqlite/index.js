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
      utils: { handler, getNestedObject },
      engine: { sqlmanager },
    } = library;

    try {
      let lib = {};
      let database = {
        mgmtdb: {
          import: join(pathname, "device.sql"),
          backup: join(pathname, "mgmtdb.bak"),
        },
        operationdb: {
          import: join(pathname, "testfile.sql"),
          backup: join(pathname, "operationdb.bak"),
        },
      };
      let dbengine = "sqlite3";

      lib["startup"] = async (...args) => {
        let [setting, backup = true] = args;
        let output;
        try {
          output = await sqlmanager[dbengine].create(setting[dbengine]);
          if (output.code == 0) {
            for (let [key] of Object.entries(setting[dbengine]["db"])) {
              output = sqlmanager[dbengine].status(key);

              if (output.code == 0) {
                console.log(`${key} database status:`, JSON.stringify(output));
                if (output.data.connected && !output.data.schema) {
                  sqlmanager[dbengine].import(key, database[key].import);
                  console.log(
                    `${key} Import Status:`,
                    JSON.stringify(sqlmanager[dbengine].status(key))
                  );
                }

                await sqlmanager[dbengine].backup(key, database[key].backup);
                console.log(`Backup ${dbengine}.bak done!`);
              } else throw output;
            }
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

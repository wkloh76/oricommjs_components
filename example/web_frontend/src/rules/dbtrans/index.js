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
 * @module src_rules_detrans_index
 */
module.exports = (...args) => {
  return new Promise(async (resolve, reject) => {
    const [params, obj] = args;
    const [pathname, curdir, compname] = params;
    const [library, sys, cosetting] = obj;
    try {
      let lib = {};

      lib["mystart"] = async (...args) => {
        let [request, response] = args;
        try {
          let { fname } = response;
          let conn_id = 1;

          console.log(`${fname} done`);

          response.rule = {
            ...response.rule,
            ...{ track_sys: conn_id },
          };
          console.log(`Create ${conn_id}`);

          return response;
        } catch (error) {
          response.err.error = error.message;
          return response;
        }
      };
      lib["mystop"] = (...args) => {
        let [request, response] = args;
        try {
          // Here can't get response value
          let { fname } = response;

          console.log(`${fname} done end ${response.rule["track_sys"]}`);

          return response;
        } catch (error) {
          response.err.error = error.message;
          return response;
        }
      };
      resolve(lib);
    } catch (e) {
      reject(e);
    }
  });
};

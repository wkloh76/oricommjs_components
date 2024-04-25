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
      let lib = {};

      lib["auth_text"] = (...args) => {
        let [request, response] = args;
        try {
          let { headers, protocol, session } = request;
          let { err, fname, render } = response;

          if (session.loginid != "" && session.loginid != undefined) {
            session.cookie.expires = new Date(Date.now() + renewexpire);
            session.cookie.maxAge = renewexpire;
          } else {
            err.render.options.text = `Forbidden <a href="${protocol}://${headers.host}">Back to home</a>`;
          }
          console.log(`${fname} done`);
          return response;
        } catch (error) {
          response.err.error = error.message;
          return response;
        }
      };
      lib["auth_json"] = (...args) => {
        let [request, response] = args;
        try {
          let { session } = request;
          let { err, fname, render } = response;

          if (session.loginid != "" && session.loginid != undefined) {
            session.cookie.expires = new Date(Date.now() + renewexpire);
            session.cookie.maxAge = renewexpire;
          } else {
            err.render.options.json = {
              code: -1,
              msg: `Authentication failure!`,
              data: null,
            };
          }
          console.log(`${fname} done`);
          return response;
        } catch (error) {
          response.err.error = error.message;
          return response;
        }
      };
      lib["auth_pass"] = (...args) => {
        let [request, response] = args;
        try {
          let { fname } = response;

          console.log(`${fname} done`);
          return response;
        } catch (error) {
          response.err.error = error.message;
          return response;
        }
      };

      lib["permit"] = (...args) => {
        let [request, response] = args;
        try {
          let { fname } = response;

          console.log(`${fname} done`);
          return response;
        } catch (error) {
          response.err.error = error.message;
          return response;
        }
      };
      lib["combine"] = (...args) => {
        let [request, response] = args;
        try {
          let { fname } = response;

          console.log(`${fname} done`);
          return response;
        } catch (error) {
          response.err.error = error.message;
          return response;
        }
      };
      lib["end"] = (...args) => {
        let [request, response] = args;
        try {
          let { fname } = response;

          console.log(`${fname} done`);
          return response;
        } catch (error) {
          response.err.error = error.message;
          return response;
        }
      };
      lib["auth_syserr"] = (...args) => {
        let [request, response] = args;
        try {
          let { headers, protocol, session } = request;
          let { err, fname, render } = response;

          if (session.loginid != "" && session.loginid != undefined) {
            session.cookie.expires = new Date(Date.now() + renewexpire);
            session.cookie.maxAge = renewexpire;
          } else {
            err.render.options.text = `Forbidden <a href="${protocol}://${headers.host}">Back to home</a>`;
          }
          console.log(`${fname} done`);
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

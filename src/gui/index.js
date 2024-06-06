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
 * The controller of web gui
 * @module src_gui_index
 */
module.exports = (...args) => {
  return new Promise(async (resolve, reject) => {
    const [params, obj] = args;
    const [pathname, curdir, compname] = params;
    const [library, sys, cosetting] = obj;
    const { dir_module, import_cjs, errhandler } = library.utils;
    const { excludefile } = cosetting.general;
    try {
      let lib = {};

      let route = {
        controller: undefined,
        url: undefined,
        method: undefined,
        rules: undefined,
        from: undefined,
        name: undefined,
      };

      let arr_modname = dir_module(pathname, excludefile);
      let arr_modules = await import_cjs(
        [pathname, arr_modname, compname],
        library.utils,
        [library, sys, cosetting]
      );
      for (let [modname, module] of Object.entries(arr_modules)) {
        for (let [module_key, module_val] of Object.entries(module)) {
          // let format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
          if (Object.keys(module_val).length > 0) {
            for (let [key, val] of Object.entries(module_val)) {
              let url, controller;
              let rtn = { ...route };

              rtn["from"] = "gui";
              rtn["method"] = module_key;
              rtn["name"] = key;
              rtn["strict"] = false;
              if (/[|]/.test(key)) {
                let keyitem = key.split("|");
                url = keyitem[0];
                rtn["rules"] = keyitem[1];
                if (keyitem[2] && keyitem[2] == "strict") rtn["strict"] = true;
              } else url = key;
              controller = val;

              let pos = url.indexOf("@");
              if (pos > -1) {
                rtn["url"] = `/${compname}/${url.substring(1)}`;
              } else rtn["url"] = `/${compname}/${modname}/${url}`;
              if (rtn?.["url"] && rtn?.["method"]) {
                rtn["controller"] = controller;
                lib[rtn["url"]] = rtn;
              }
            }
          }
        }
      }

      resolve(lib);
    } catch (error) {
      reject(errhandler(error));
    }
  });
};

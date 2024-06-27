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
    const {
      utils: { dir_module, import_cjs, errhandler },
      components,
    } = library;
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
      let { gui } = components[compname].rules.regulation;

      for (let [modname, RESTAPI] of Object.entries(arr_modules)) {
        for (let [module_key, module_val] of Object.entries(RESTAPI)) {
          if (Object.keys(module_val).length > 0) {
            for (let [key, val] of Object.entries(module_val)) {
              let url, controller;
              let rtn = { ...route };

              rtn["from"] = "gui";
              rtn["method"] = module_key;
              rtn["strict"] = false;

              if (gui.none[modname] && gui.none[modname].includes(key)) {
                rtn["name"] = key;
                url = key;
              } else {
                if (!rtn["rules"]) {
                  Object.keys(gui.nostrict).map((value) => {
                    if (gui.nostrict[value][modname])
                      if (gui.nostrict[value][modname].includes(key)) {
                        rtn["name"] = key;
                        rtn["rules"] = value;
                        url = key;
                      }
                  });
                }

                if (!rtn["rules"]) {
                  Object.keys(gui.strict).map((value) => {
                    if (gui.strict[value][modname]) {
                      if (gui.strict[value][modname].includes(key)) {
                        rtn["name"] = key;
                        rtn["rules"] = value;
                        rtn["strict"] = true;
                        url = key;
                      }
                    }
                  });
                }
              }

              controller = val;
              rtn["url"] = `/${compname}/${modname}/${url}`;
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

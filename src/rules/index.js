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
 * Handle access right for the controller before and after
 * @module src_rules_index
 */
module.exports = (...args) => {
  return new Promise(async (resolve, reject) => {
    const [params, obj] = args;
    const [pathname, curdir, compname] = params;
    const [library, sys, cosetting] = obj;
    const { dir_module, import_cjs, errhandler } = library.utils;
    const { excludefile } = cosetting.general;
    try {
      const { fs, path } = sys;
      let lib = { rule: {} };
      let rulespath = path.join(pathname, "rule.json");
      let arr_modname = dir_module(pathname, excludefile);
      let modules = await import_cjs(
        [pathname, arr_modname, compname],
        library.utils,
        [library, sys, cosetting]
      );
      for (let [, val] of Object.entries(modules)) {
        lib["module"] = { ...lib["module"], ...val };
      }

      lib["regulation"] = {
        api: { strict: {}, nostrict: {}, none: {} },
        gui: { strict: {}, nostrict: {}, none: {} },
      };
      if (fs.existsSync(rulespath))
        lib["rule"] = JSON.parse(fs.readFileSync(rulespath));

      Object.keys(lib["rule"]).map((value) => {
        lib["regulation"]["api"]["strict"][value] = {};
        lib["regulation"]["gui"]["strict"][value] = {};
        lib["regulation"]["api"]["nostrict"][value] = {};
        lib["regulation"]["gui"]["nostrict"][value] = {};
      });

      resolve(lib);
    } catch (error) {
      reject(errhandler(error));
    }
  });
};

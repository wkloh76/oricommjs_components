/**
 * Copyright (c) 2024   Loh Wah Kiang at V.S.
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
 * The asistant of main module which is handle the submodule in each sub folder.
 * @module src_index
 */
module.exports = (...args) => {
  return new Promise(async (resolve, reject) => {
    const [params, obj] = args;
    const [prjsrc, compname] = params;
    const [library, sys, cosetting] = obj;

    const { fs, path, logger } = sys;
    const {
      engine: { deskelectron, webnodejs },
      utils: { errhandler },
    } = library;

    try {
      let lib = {};
      let { components } = library;

      /**
       * Define the workflow for each method in controller
       * @alias module:src_index.pattern
       * @param {...Object} args - 2 parameters
       * @param {Array} args[0] - fn modules
       * @param {Array} args[1] - services modules
       * @returns
       */
      const pattern = (...args) => {
        try {
          let [fn, rules] = args;
          let output,
            idx = 0;

          if (fn["rules"]) {
            output = [];
            let rule = rules.rule[fn["rules"]];
            let check = /[:]/.test(rule);
            let objname = {};
            if (check) {
              let cond = rule.split(":");
              let chk_before = /[-]/.test(cond[0]);
              let chk_after = /[-]/.test(cond[1]);
              if (chk_before) {
                let before = cond[0].split("-");
                for (let brules of before) {
                  objname[brules] = rules["module"][brules];
                  output.push(objname);
                  objname = {};
                  idx += 1;
                }
              } else if (cond[0] != "") {
                objname[cond[0]] = rules["module"][cond[0]];
                output.push(objname);
                objname = {};
                idx += 1;
              }

              objname[fn["name"]] = fn["controller"];
              output.push(objname);
              objname = {};

              if (chk_after) {
                let after = cond[1].split("-");
                for (let arules of after) {
                  objname[arules] = rules["module"][arules];
                  output.push(objname);
                  objname = {};
                }
              } else if (cond[1] != "") {
                objname[cond[1]] = rules["module"][cond[1]];
                output.push(objname);
                objname = {};
              }
            } else {
              let chk_before = /[-]/.test(rule);
              if (chk_before) {
                let before = rule.split("-");
                for (let brules of before) {
                  objname[brules] = rules["module"][brules];
                  output.push(objname);
                  objname = {};
                  idx += 1;
                }
              } else {
                objname[rule] = rules["module"][rule];
                output.push(objname);
                objname = {};
                idx += 1;
              }
              objname[fn["name"]] = fn["controller"];
              output.push(objname);
              objname = {};
            }
          } else {
            output = [];
            let objname = {};
            objname[fn["name"]] = fn["controller"];
            output.push(objname);
          }

          return [output, idx];
        } catch (error) {
          throw Error(error);
        }
      };

      /**
       * Define the workflow for each method in controller
       * @alias module:src_index.prepare_rules
       * @param {...Object} args - 1 parameters
       * @param {Array} args[0].api - api modules
       * @param {Array} args[0].gui - gui modules
       * @param {Array} args[0].rules - services modules
       * @returns
       */
      const prepare_rules = (...args) => {
        return new Promise(async (resolve, reject) => {
          try {
            let [{ api, gui, rules }] = args;

            for (let [key] of Object.entries(api)) {
              let [controller, idx] = pattern(api[key], rules);
              api[key]["controller"] = controller;
              api[key]["idx"] = idx;
            }

            for (let [key] of Object.entries(gui)) {
              let [controller, idx] = pattern(gui[key], rules);
              gui[key]["controller"] = controller;
              gui[key]["idx"] = idx;
            }

            let routedoc = {
              api: { ...api },
              gui: { ...gui },
              rules: { ...rules },
            };
            let routefilename = path.join(prjsrc, "route.json");
            let routefile;
            if (fs.existsSync(routefilename))
              routefile = JSON.parse(fs.readFileSync(routefilename, "utf8"));

            if (!routefile)
              fs.writeFileSync(routefilename, JSON.stringify(routedoc));
            else if (JSON.stringify(routedoc) !== JSON.stringify(routefile))
              fs.writeFileSync(routefilename, JSON.stringify(routedoc));

            resolve();
          } catch (error) {
            return errhandler(error);
          }
        });
      };

      /**
       * Initialize
       * @alias module:src_index.init
       * @returns
       */
      const init = async () => {
        try {
          let setting = { ...cosetting };
          let initialurl = JSON.parse(
            fs.readFileSync(path.join(prjsrc, "default.json"), "utf8")
          );

          setting.dir = path.join(library.dir, "core");

          setting.share = {};
          setting.share[`/${compname}/public`] = path.join(prjsrc, "public");
          setting.share[`/atomic`] = path.join(library.dir, "atomic");

          components[compname] = {
            ...components[compname],
            ...(await library.utils.import_cjs(
              [prjsrc, ["common", "services", "api", "gui", "rules"], compname],
              library.utils
            )),
          };

          await prepare_rules(components[compname]);
          let dataset = {};
          dataset[compname] = components[compname];

          if (!setting.ongoing.internalurl) setting.ongoing.internalurl = {};
          setting.ongoing.internalurl[
            `${compname}`
          ] = `/${compname}/public/assets`;

          if (compname.indexOf("desktop_") > -1) {
            deskelectron.config(dataset);

            setting.ongoing.initialurl = initialurl.desktop;
            await deskelectron.start(setting);
          } else if (compname.indexOf("web_") > -1) {
            webnodejs.config(dataset);

            setting.ongoing.initialurl = initialurl.web;
            let rtnwebnodejs = webnodejs.start(compname, setting);
            if (rtnwebnodejs) throw rtnwebnodejs;
          }
          let less = `@remote: "${setting.ongoing.remote.cdn}";@internal: "/${compname}/lib/assets";`;
          fs.writeFileSync(
            path.join(prjsrc, "public", "assets", "less", "config.less"),
            less,
            { encoding: "utf8" }
          );

          return;
        } catch (error) {
          return errhandler(error);
        }
      };

      lib["done"] = () => {
        if (compname.indexOf("desktop_") > -1) deskelectron.done();
        else if (compname.indexOf("web_") > -1) webnodejs.done();
      };

      let error = await init();
      if (error) throw error;
      // if(components.status)
      resolve(lib);
    } catch (error) {
      reject(errhandler(error));
    }
  });
};

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
 * The main module in components project
 * @module main_index
 */
module.exports = (...args) => {
  return new Promise(async (resolve, reject) => {
    let [params, obj] = args;
    const [prjsrc, compname] = params;
    let [library, sys, cosetting] = obj;
    const {
      fs,
      path: { join },
      toml,
    } = sys;
    const {
      engine: { deskelectron, webnodejs },
      utils: { errhandler, getNestedObject },
    } = library;

    try {
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
              } else if (rule) {
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

            resolve(routedoc);
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
      const init = async (...args) => {
        try {
          let [setting, mergeDeep] = args;
          let output = { code: 0, msg: "", data: null };

          let tomlpath = join(prjsrc, "coresetting.toml");

          if (fs.existsSync(tomlpath)) {
            let psetting = toml.parse(fs.readFileSync(tomlpath), {
              bigint: false,
            });
            let mode = setting.args.mode;
            let { debug, production, ...settingtmp } = psetting;
            setting = mergeDeep(setting, settingtmp);
            setting[mode] = mergeDeep(setting[mode], psetting[mode]);
            setting["ongoing"] = mergeDeep(setting["ongoing"], psetting[mode]);
          }

          let comp_engine = library.engine[setting.general.engine.name];

          setting.share = {};
          setting.share[`/${compname}/public`] = join(prjsrc, "src", "public");
          if (!setting.share[`/atomic`])
            setting.share[`/atomic`] = join(library.dir, "atomic");

          components[compname] = {
            ...components[compname],
            ...(await library.utils.import_cjs(
              [join(prjsrc, "src"), ["startup"], compname],
              library.utils,
              [library, sys, setting]
            )),
          };

          // let commmodel = library.utils.dir_module(
          //   join(prjsrc, "src", "common", "models")
          // );

          components[compname] = {
            ...components[compname],
            common: {
              models: await library.utils.import_cjs(
                [
                  join(prjsrc, "src", "common", "models"),
                  library.utils.dir_module(
                    join(prjsrc, "src", "common", "models"),
                    setting.general.excludefile
                  ),
                  compname,
                ],
                library.utils,
                [library, sys, setting]
              ),
              viewspath: join(prjsrc, "src", "common", "views"),
            },
          };

          let load_module = [];
          if (setting.general.engine.type !== "app")
            load_module = ["rules", "api", "gui"];
          else load_module = ["app"];

          for (let item of load_module) {
            components[compname] = {
              ...components[compname],
              ...(await library.utils.import_cjs(
                [join(prjsrc, "src"), [item], compname],
                library.utils,
                [library, sys, setting]
              )),
            };
          }

          let routejson = await prepare_rules(components[compname]);
          let dataset = {};
          dataset[compname] = components[compname];

          if (!setting.ongoing.internalurl) setting.ongoing.internalurl = {};
          setting.ongoing.internalurl[
            `${compname}`
          ] = `/${compname}/public/assets`;

          dataset[compname].defaulturl = setting.ongoing.defaulturl;
          comp_engine.register(dataset, compname, setting.general.engine);

          let less = `@remote: "${setting.ongoing.remote.cdn}";@internal: "/${compname}/public/assets";`;
          fs.writeFileSync(
            join(prjsrc, "src", "public", "assets", "less", "config.less"),
            less,
            { encoding: "utf8" }
          );
          components.done.push(setting.general.engine);
          if (!components.start) components.start = comp_engine.start;

          if (Object.keys(components[compname]["startup"]).length > 0) {
            for (let [, module] of Object.entries(
              components[compname]["startup"]
            )) {
              if (!components.startup) components.startup = [];
              components.startup.push(module.startup);
            }
          }
          if (!components.routejson) components.routejson = { ...routejson };
          else
            components.routejson = mergeDeep(components.routejson, routejson);
          output.data = setting;
          return output;
        } catch (error) {
          return errhandler(error);
        }
      };

      let rtninit = await init(cosetting, library.utils.mergeDeep);
      if (rtninit.code !== 0) throw rtninit;
      resolve(rtninit.data);
    } catch (error) {
      reject(errhandler(error));
    }
  });
};

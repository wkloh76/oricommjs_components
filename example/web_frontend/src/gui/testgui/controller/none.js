"use strict";
/**
 * The submodule of testgui
 * @module none
 */
module.exports = (...args) => {
  return new Promise(async (resolve, reject) => {
    const [params, obj] = args;
    const [pathname, curdir, compname] = params;
    const [library, sys, cosetting] = obj;
    try {
      let {
        dir,
        components,
        engine: { sqlmanager },
        utils: { arr_diff, handler, webstorage, errhandler, concatobj },
      } = library;
      let {
        fs,
        path: { join },
      } = sys;

      let lib = handler.restfulapi;
      let { DELETE, HEAD, GET, PATCH, POST, PUT } = lib;
      let {
        remote: { cdn, apiserver, wsserver },
      } = cosetting.ongoing[compname];

      let testnoapi = require(join(pathname, "model", "testgui"))(params, obj);
      let commonviews = components[compname].common.viewspath;

      let regulation = components[compname].rules.regulation.gui;
      regulation.none[curdir] = concatobj([], regulation.none[curdir], [
        "dashboard-pass",
        "dashboard-layout-pass",
        "test-json",
      ]);

      GET["dashboard-pass"] = (...args) => {
        let [request, response] = args;
        try {
          let {
            render: {
              options: { css, js, layer, less, params },
              options: {
                layer: { childs },
              },
              options,
            },
            render: renderer,
          } = response;
          renderer.view = `${pathname}/index1.html`;
          options.params = {
            title: "Test Graphic User Interface",
            remotely: cdn,
            locally: `/${compname}`,
          };

          return response;
        } catch (error) {
          response.err.error = error.message;
          return response;
        }
      };

      GET["dashboard-layout-pass"] = (...args) => {
        let [request, response] = args;
        try {
          let {
            render: {
              options: { css, js, layer, less, params },
              options: {
                layer: { childs },
              },
              options,
            },
            render: renderer,
          } = response;
          renderer.view = `${pathname}/index.html`;
          layer.layouts = path.join(commonviews, "sample.html");
          options.params = {
            title: "Test Graphic User Interface",
            remotely: cdn,
            locally: `/${compname}`,
          };

          childs.path = path.join(commonviews, "sample");
          childs.excluded = ["header.html", "prescript.html", "script.html"];

          css.remotely.push("/npm/uikit@3.18.3/dist/css/uikit-rtl.min.css");
          js.remotely.push("/npm/uikit@3.18.3/dist/js/uikit.min.js");
          js.remotely.push("/npm/uikit@3.18.3/dist/js/uikit-icons.min.js");

          js.locally.push("/public/assets/js/model/sample.js");
          mjs.initialize["sample.init"] = [[layer.params.title]];
          less.engine.remotely = "/npm/less@4.2.0/dist/less.min.js";
          less.style.locally = ["/less/plugin/wi.less"];

          return response;
        } catch (error) {
          response.err.error = error.message;
          return response;
        }
      };

      POST["test-json"] = async (...args) => {
        let [request, response] = args;
        try {
          let { render } = response;

          let input = handler.dataformat;
          input.data = {
            req: request,
          };
          let rtn = await testnoapi.testjson(input);
          if (rtn.code == 0) {
            render.options["json"] = rtn.data;
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

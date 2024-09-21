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
    const { atomic, components, dir, utils } = library;
    const { handler, concatobj } = utils;
    const { atom } = atomic;
    const { guimaker } = atom;
    const { path } = sys;
    const { join } = path;
    try {
      let lib = handler.restfulapi;
      let { DELETE, HEAD, GET, PATCH, POST, PUT } = lib;
      let { cdn } = cosetting.ongoing[compname].remote;

      let testnoapi = require(join(pathname, "model", "testgui"))(params, obj);
      let commonviews = components[compname].common.viewspath;

      let regulation = components[compname].rules.regulation.gui;
      regulation.none[curdir] = concatobj([], regulation.none[curdir], [
        "dashboard-pass",
        "dashboard-layout-pass",
        "test-json",
        "test-webengine",
      ]);

      GET["dashboard-pass"] = (...args) => {
        let [request, response] = args;
        try {
          let { render } = response;
          let { options } = render;

          render.view = `${pathname}/index1.html`;
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
          let { render } = response;
          let { options } = render;
          let { css, js, layer, less } = options;
          let { childs } = layer;

          render.view = `${pathname}/index.html`;
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

      GET["test-webengine"] = (...args) => {
        let [request, response] = args;
        try {
          let { render } = response;
          let { options } = render;
          let { css, js, layer, less, mjs, injectionjs } = options;
          let { childs } = layer;

          render.view = `${pathname}/index.html`;
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

          let webengine = handler.webengine;
          webengine.path = `/${compname}/public/assets/js/`;

          // Empty array mean select all from the folders else excluded
          webengine.load = {
            htmlevent: { sampleguimaker: [] },
            htmlrender: { sampleguimaker: [] },
            htmllogicflow: { sampleguimaker: [] },
            htmlcollection: { sampleguimaker: [] },
            htmlworkflow: { sampleguimaker: [] },
          };
          webengine.trigger = {
            "mouse.click": {
              "#testclick": {
                evt: "click_testclick",
                attr: { func: "action_testclick" },
              },
            },
          };
          webengine.startup = "initial";

          webengine.load = guimaker.grabscript(
            [dir, `/${compname}`, `components/${compname}/src`],
            webengine
          );

          injectionjs["variables"] = {
            webengine: webengine,
          };

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

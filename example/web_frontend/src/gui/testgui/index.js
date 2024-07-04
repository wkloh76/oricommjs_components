"use strict";
/**
 * The submodule of testgui
 * @module testgui
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
        utils: { handler, concatobj },
      } = library;
      let { fs, path } = sys;
      let lib = handler.restfulapi;
      let { DELETE, HEAD, GET, PATCH, POST, PUT } = lib;
      let {
        remote: { cdn, apiserver, wsserver },
      } = cosetting.ongoing;

      let testnoapi = require("./testgui")(params, obj);

      let commonviews = components[compname].common.viewspath;

      let regulation = components[compname].rules.regulation.gui;
      regulation.none[curdir] = concatobj([], regulation.none[curdir], [
        "dashboard-pass",
        "dashboard-layout-pass",
        "test-json",
      ]);
      regulation.nostrict["r0"][curdir] = ["test-dashboard-text"];
      regulation.nostrict["r10"][curdir] = ["test-dashboard-json"];
      regulation.nostrict["r4"][curdir] = ["test-dashboard-pass"];
      regulation.nostrict["r30"][curdir] = ["test-dashboard-syserr"];
      regulation.nostrict["r1"][curdir] = ["dashboard"];

      GET["test-dashboard-text"] = (...args) => {
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
            title: "Test Graphic User Interface with rule 0",
            remotely: cdn,
            locally: `/${compname}`,
          };
          childs.path = path.join(commonviews, "sample");
          childs.excluded = [
            "head.html",
            "header.html",
            "prescript.html",
            "script.html",
          ];

          css.remotely.push("/npm/uikit@3.18.3/dist/css/uikit-rtl.min.css");
          js.remotely.push("/npm/uikit@3.18.3/dist/js/uikit.min.js");
          js.remotely.push("/npm/uikit@3.18.3/dist/js/uikit-icons.min.js");
          less.engine.remotely = "/npm/less@4.2.0/dist/less.min.js";
          less.style.locally = ["/public/assets/less/plugin/wi.less"];

          return response;
        } catch (error) {
          response.err.error = error.message;
          return response;
        }
      };
      GET["test-dashboard-json"] = (...args) => {
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
            title: "Test Graphic User Interface with rule 10",
            remotely: cdn,
            locally: `/${compname}`,
          };
          layer.childs = {
            path: path.join(commonviews, "sample"),
            excluded: [
              "head.html",
              "header.html",
              "prescript.html",
              "script.html",
            ],
          };

          childs.path = path.join(commonviews, "sample");
          childs.excluded = [
            "head.html",
            "header.html",
            "prescript.html",
            "script.html",
          ];

          css.remotely.push("/npm/uikit@3.18.3/dist/css/uikit-rtl.min.css");
          js.remotely.push("/npm/uikit@3.18.3/dist/js/uikit.min.js");
          js.remotely.push("/npm/uikit@3.18.3/dist/js/uikit-icons.min.js");
          less.engine.remotely = "/npm/less@4.2.0/dist/less.min.js";
          less.style.locally = ["/public/assets/less/plugin/wi.less"];

          return response;
        } catch (error) {
          response.err.error = error.message;
          return response;
        }
      };
      GET["test-dashboard-pass"] = (...args) => {
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
            title: "Test Graphic User Interface with rule 4",
            remotely: cdn,
            locally: `/${compname}`,
          };

          childs.path = path.join(commonviews, "sample");
          childs.excluded = [
            "head.html",
            "header.html",
            "prescript.html",
            "script.html",
          ];

          css.remotely.push("/npm/uikit@3.18.3/dist/css/uikit-rtl.min.css");
          js.remotely.push("/npm/uikit@3.18.3/dist/js/uikit.min.js");
          js.remotely.push("/npm/uikit@3.18.3/dist/js/uikit-icons.min.js");
          less.engine.remotely = "/npm/less@4.2.0/dist/less.min.js";
          less.style.locally = ["/public/assets/less/plugin/wi.less"];

          return response;
        } catch (error) {
          response.err.error = error.message;
          return response;
        }
      };
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
          mjs.initialize["sample.init"] = [l[ayer.params.title]];
          less.engine.remotely = "/npm/less@4.2.0/dist/less.min.js";
          less.style.locally = ["/public/assets/less/plugin/wi.less"];

          return response;
        } catch (error) {
          response.err.error = error.message;
          return response;
        }
      };

      GET["test-dashboard-syserr"] = (...args) => {
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
            title: "Test Graphic User Interface with rule 30",
            remotely: cdn,
            locally: `/${compname}`,
          };
          childs.path = path.join(commonviews, "sample");
          childs.excluded = [
            "head.html",
            "header.html",
            "prescript.html",
            "script.html",
          ];

          css.remotely.push("/npm/uikit@3.18.3/dist/css/uikit-rtl.min.css");
          js.remotely.push("/npm/uikit@3.18.3/dist/js/uikit.min.js");
          js.remotely.push("/npm/uikit@3.18.3/dist/js/uikit-icons.min.js");
          less.engine.remotely = "/npm/less@4.2.0/dist/less.min.js";
          less.style.locally = ["/public/assets/less/plugin/wi.less"];
        } catch (error) {
          response.err.error = error.message;
          return response;
        }
      };

      GET["dashboard"] = (...args) => {
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
            title: "Test Graphic User Interface with rule 1",
            remotely: cdn,
            locally: `/${compname}`,
          };
          lchilds.path = path.join(commonviews, "sample");
          childs.excluded = [
            "head.html",
            "header.html",
            "prescript.html",
            "script.html",
          ];

          css.remotely.push("/npm/uikit@3.18.3/dist/css/uikit-rtl.min.css");
          js.remotely.push("/npm/uikit@3.18.3/dist/js/uikit.min.js");
          js.remotely.push("/npm/uikit@3.18.3/dist/js/uikit-icons.min.js");
          less.engine.remotely = "/npm/less@4.2.0/dist/less.min.js";
          less.style.locally = ["/public/assets/less/plugin/wi.less"];

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

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

    let {
      dir,
      components,
      utils: { handler },
    } = library;
    let { fs, path } = sys;
    // let { layouts } = components[compname];
    let lib = handler.restfulapi;
    let { DELETE, HEAD, GET, PATCH, POST, PUT } = lib;
    let {
      remote: { cdn, apiserver, wsserver },
    } = cosetting.ongoing;

    let compath = path.join(dir, "components", compname, "src");
    let commonviews = path.join(compath, "common", "views");
    let testnoapi = require("./testgui")(params, obj);

    GET[`@test/dashboard/text|r0`] = (...args) => {
      let [request, response] = args;
      try {
        let {
          render: {
            options: { css, elcontent, js, layer, less, params },
          },
          render: renderer,
        } = response;
        renderer.view = `${pathname}/index.html`;
        layer.layouts = path.join(commonviews, "sample.html");
        layer.childs = {
          path: path.join(commonviews, "sample"),
          excluded: [
            "head.html",
            "header.html",
            "prescript.html",
            "script.html",
          ],
        };

        elcontent.title = "Test Graphic User Interface with rule 0";
        params.remotely = cdn;
        params.locally = `/${compname}`;
        css.remotely = ["/npm/uikit%403.18.3/dist/css/uikit-rtl.min.css"];
        js.remotely = [
          "/npm/uikit@3.18.3/dist/js/uikit.min.js",
          "/npm/uikit@3.18.3/dist/js/uikit-icons.min.js",
        ];
        less.engine = {
          domain: "remotely",
          location: "/npm/less@4.2.0/dist/less.min.js",
        };
        less.style.locally = ["/public/assets/less/wi.less"];

        return response;
      } catch (error) {
        response.err.error = error.message;
        return response;
      }
    };
    GET[`@test-dashboard-json|r10`] = (...args) => {
      let [request, response] = args;
      try {
        let {
          render: {
            options: { css, elcontent, js, layer, less, mjs, params },
          },
          render: renderer,
        } = response;
        renderer.view = `${pathname}/index.html`;
        layer.layouts = path.join(commonviews, "sample.html");
        layer.childs = {
          path: path.join(commonviews, "sample"),
          excluded: [
            "head.html",
            "header.html",
            "prescript.html",
            "script.html",
          ],
        };

        elcontent.title = "Test Graphic User Interface with rule 10";
        params.remotely = cdn;
        params.locally = `/${compname}`;
        css.remotely = ["/npm/uikit%403.18.3/dist/css/uikit-rtl.min.css"];
        js.remotely = [
          "/npm/uikit@3.18.3/dist/js/uikit.min.js",
          "/npm/uikit@3.18.3/dist/js/uikit-icons.min.js",
        ];
        less.engine = {
          domain: "remotely",
          location: "/npm/less@4.2.0/dist/less.min.js",
        };
        less.style.locally = ["/public/assets/less/wi.less"];

        mjs = {
          jslib: JSON.stringify({}),
        };

        return response;
      } catch (error) {
        response.err.error = error.message;
        return response;
      }
    };
    GET[`@test-dashboard-pass|r4`] = (...args) => {
      let [request, response] = args;
      try {
        let {
          render: {
            options: { css, elcontent, js, layer, less, params },
          },
          render: renderer,
        } = response;
        renderer.view = `${pathname}/index.html`;
        layer.layouts = path.join(commonviews, "sample.html");
        layer.childs = {
          path: path.join(commonviews, "sample"),
          excluded: [
            "head.html",
            "header.html",
            "prescript.html",
            "script.html",
          ],
        };

        elcontent.title = "Test Graphic User Interface with rule 4";
        params.remotely = cdn;
        params.locally = `/${compname}`;
        css.remotely = ["/npm/uikit%403.18.3/dist/css/uikit-rtl.min.css"];
        js.remotely = [
          "/npm/uikit@3.18.3/dist/js/uikit.min.js",
          "/npm/uikit@3.18.3/dist/js/uikit-icons.min.js",
        ];
        less.engine = {
          domain: "remotely",
          location: "/npm/less@4.2.0/dist/less.min.js",
        };
        less.style.locally = ["/public/assets/less/wi.less"];

        return response;
      } catch (error) {
        response.err.error = error.message;
        return response;
      }
    };
    GET[`dashboard-pass`] = (...args) => {
      let [request, response] = args;
      try {
        let {
          render: {
            options: { elcontent, params },
          },
          render: renderer,
        } = response;
        renderer.view = `${pathname}/index1.html`;
        elcontent.title = "Test Graphic User Interface";
        params.remotely = cdn;
        params.locally = `/${compname}`;

        return response;
      } catch (error) {
        response.err.error = error.message;
        return response;
      }
    };

    GET[`dashboard-layout-pass`] = (...args) => {
      let [request, response] = args;
      try {
        let {
          render: {
            options: { css, elcontent, js, layer, less, params },
          },
          render: renderer,
        } = response;
        renderer.view = `${pathname}/index.html`;
        layer.layouts = path.join(commonviews, "sample.html");
        layer.childs = {
          path: path.join(commonviews, "sample"),
          excluded: [
            "head.html",
            "header.html",
            "prescript.html",
            "script.html",
          ],
        };

        elcontent.title = "Test Graphic User Interface";
        params.remotely = cdn;
        params.locally = `/${compname}`;
        css.remotely = ["/npm/uikit%403.18.3/dist/css/uikit-rtl.min.css"];
        js.remotely = [
          "/npm/uikit@3.18.3/dist/js/uikit.min.js",
          "/npm/uikit@3.18.3/dist/js/uikit-icons.min.js",
        ];
        less.engine = {
          domain: "remotely",
          location: "/npm/less@4.2.0/dist/less.min.js",
        };
        less.style.locally = ["/public/assets/less/wi.less"];

        return response;
      } catch (error) {
        response.err.error = error.message;
        return response;
      }
    };

    GET[`@test/dashboard/syserr|r30`] = (...args) => {
      let [request, response] = args;
      try {
        let {
          render: {
            options: { css, elcontent, js, layer, less, mjs, params },
          },
          render: renderer,
        } = response;
        renderer.view = `${pathname}/index.html`;
        layer.layouts = path.join(commonviews, "sample.html");
        layer.childs = {
          path: path.join(commonviews, "sample"),
          excluded: [
            "head.html",
            "header.html",
            "prescript.html",
            "script.html",
          ],
        };

        elcontent.title = "Test Graphic User Interface with rule 30";
        params.remotely = cdn;
        params.locally = `/${compname}`;
        css.remotely = ["/npm/uikit%403.18.3/dist/css/uikit-rtl.min.css"];
        js.remotely = [
          "/npm/uikit@3.18.3/dist/js/uikit.min.js",
          "/npm/uikit@3.18.3/dist/js/uikit-icons.min.js",
        ];
        less.engine = {
          domain: "remotely",
          location: "/npm/less@4.2.0/dist/less.min.js",
        };
        less.style.locally = ["/public/assets/less/wi.less"];

        mjs = {
          jslib: JSON.stringify({}),
        };
      } catch (error) {
        response.err.error = error.message;
        return response;
      }
    };

    GET[`dashboard|r1`] = (...args) => {
      let [request, response] = args;
      try {
        let {
          render: {
            options: { css, elcontent, js, layer, less, mjs, params },
          },
          render: renderer,
        } = response;
        renderer.view = `${pathname}/index.html`;
        layer.layouts = path.join(commonviews, "sample.html");
        layer.childs = {
          path: path.join(commonviews, "sample"),
          excluded: [
            "head.html",
            "header.html",
            "prescript.html",
            "script.html",
          ],
        };

        elcontent.title = "Test Graphic User Interface with rule 1";
        params.remotely = cdn;
        params.locally = `/${compname}`;
        css.remotely = ["/npm/uikit%403.18.3/dist/css/uikit-rtl.min.css"];
        js.remotely = [
          "/npm/uikit@3.18.3/dist/js/uikit.min.js",
          "/npm/uikit@3.18.3/dist/js/uikit-icons.min.js",
        ];
        less.engine = {
          domain: "remotely",
          location: "/npm/less@4.2.0/dist/less.min.js",
        };
        less.style.locally = ["/public/assets/less/wi.less"];

        mjs = {
          jscss: JSON.stringify({}),
        };

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

        let input = handler.dataformat2;
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

    try {
      resolve(lib);
    } catch (error) {
      reject(error);
    }
  });
};

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

    let testnoapi = require("./testgui")(params, obj);

    GET[`@eta/dashboard/text|r0`] = (...args) => {
      let [request, response] = args;
      try {
        let { render } = response;

        render["view"] = `${pathname}/index.eta`;
        render.options["layer"] = path.join(
          kernel.dir,
          "components",
          layouts.sample
        );
        render.options["params"] = {
          title: "Test Graphic User Interface",
          jslib: JSON.stringify({}),
        };

        return response;
      } catch (error) {
        response.err.error = error.message;
        return response;
      }
    };
    GET[`@eta-dashboard-json|r10`] = (...args) => {
      let [request, response] = args;
      try {
        let { render } = response;

        render["view"] = `${pathname}/index.eta`;
        render.options["layer"] = path.join(
          kernel.dir,
          "components",
          layouts.sample
        );
        render.options["params"] = {
          title: "Test Graphic User Interface",
          jslib: JSON.stringify({}),
        };

        return response;
      } catch (error) {
        response.err.error = error.message;
        return response;
      }
    };
    GET[`@eta-dashboard-pass|r4`] = (...args) => {
      let [request, response] = args;
      try {
        let { render } = response;

        render["view"] = `${pathname}/index.eta`;
        render.options["layer"] = path.join(
          kernel.dir,
          "components",
          layouts.sample
        );
        render.options["params"] = {
          title: "Test Graphic User Interface",
          // jscss: JSON.stringify({
          //   internal: {
          //     js: {
          //       url: "/web/lib/assets/js/",
          //       lists: ["model/sample"],
          //     },
          //     css: {
          //       url: "/web/lib/assets/css/",
          //       lists: ["404"],
          //     },
          //   },
          //   external: {
          //     js: {
          // url: "/web/lib/assets/js/",
          // lists: ["/plugin/toolbox/cbtoolbox"],
          // loads: ["/npm/sweetalert2@11.7.3/dist/sweetalert2.all.min"],
          //     },
          //   },
          // initialize: {
          //     methods: ["testing.test"],
          //     argv: [["welcome", "vsrnd"]],
          // },
          // }),
        };

        return response;
      } catch (error) {
        response.err.error = error.message;
        return response;
      }
    };
    GET[`eta-dashboard-pass`] = (...args) => {
      let [request, response] = args;
      try {
        let { render } = response;

        render["view"] = `${pathname}/index1.html`;

        render.options["params"] = {
          title: "Test Graphic User Interface",
          remote: cdn,
          compname: compname,
        };

        return response;
      } catch (error) {
        response.err.error = error.message;
        return response;
      }
    };
    GET[`@eta/dashboard/syserr|r30`] = (...args) => {
      let [request, response] = args;
      try {
        let { render } = response;

        render["view"] = `${pathname}/index.eta`;
        render.options["layer"] = path.join(
          kernel.dir,
          "components",
          layouts.sample
        );
        render.options["params"] = {
          title: "Test Graphic User Interface",
          jslib: JSON.stringify({}),
        };

        return response;
      } catch (error) {
        response.err.error = error.message;
        return response;
      }
    };

    GET[`eta-dashboard|r1`] = (...args) => {
      let [request, response] = args;
      try {
        let { render } = response;

        render["view"] = `${pathname}/index.ejs`;
        render.options["layer"] = path.join(
          kernel.dir,
          "components",
          layouts.sample
        );
        render.options["params"] = {
          title: "Test Graphic User Interface",
          jscss: JSON.stringify({}),
        };

        return response;
      } catch (error) {
        response.err.error = error.message;
        return response;
      }
    };

    POST["test-json"] = async (...args) => {
      let [request, response, gift] = args;
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

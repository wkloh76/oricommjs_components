module.exports = (...args) => {
  return new Promise(async (resolve, reject) => {
    const [params, obj] = args;
    const [pathname, curdir, compname] = params;
    const [library, sys, cosetting] = obj;
    try {
      let {
        dir,
        atomic: {
          atom: { paletttools, smfetch },
        },
        components,
        utils: { arr_diff, handler },
      } = library;
      let {
        fs,
        path: { join },
      } = sys;
      let lib = handler.restfulapi;
      let { DELETE, HEAD, GET, PATCH, POST, PUT } = lib;
      let {
        remote: { cdn, apiserver, wsserver },
      } = cosetting.ongoing;

      let commonviews = components[compname].common.viewspath;

      let regulation = components[compname].rules.regulation.gui;
      regulation.none[curdir] = ["index"];

      GET[`index`] = (...args) => {
        let [request, response] = args;
        try {
          let {
            render: {
              options: { css, elcontent, js, layer, less, params },
            },
            render: renderer,
          } = response;
          renderer.view = `${pathname}/index.html`;
          layer.layouts = path.join(commonviews, "bricker.html");
          layer.params = {
            title: "Bricker Main Page",
            remotely: cdn,
            locally: `/${compname}`,
          };
          layer.childs = {
            path: path.join(commonviews, "bricker"),
            excluded: [],
          };

          elcontent.title = "Main Page";
          params.remotely = cdn;
          params.locally = `/${compname}`;
          return response;
        } catch (error) {
          return error;
        }
      };

      resolve(lib);
    } catch (error) {
      reject(error);
    }
  });
};

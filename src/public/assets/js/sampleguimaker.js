"use strict";

/**
 * ES Module type
 * @module measurement
 */
export default await (async () => {
  const [library, sys, interfaces] = Object.values(glib.guimaker);
  const { utils } = library;
  try {
    let lib = {};
    let share = {};
    let { default: htmlevent } = await import("./sampleguimaker/event.js");
    let { default: htmlrender } = await import("./sampleguimaker/render.js");
    let { default: htmllogicflow } = await import(
      "./sampleguimaker/logicflow.js"
    );
    let { default: htmlworkflow } = await import(
      "./sampleguimaker/workflow.js"
    );

    htmlevent.load([library, sys, interfaces]);
    htmlrender.load([library, sys, interfaces]);
    htmllogicflow.load([library, sys, interfaces]);
    htmlworkflow.load([library, sys, interfaces]);

    lib.init = () => {
      const { handler } = utils;
      let html_objevents = handler.winevents;
      let { mouse } = html_objevents;

      mouse.click = {
        "#testclick": {
          evt: "click_testclick",
          attr: { func: "action_testclick" },
        },
      };

      htmlworkflow.register(htmllogicflow, htmlrender, share);
      htmlevent.register(html_objevents, htmlworkflow);
    };

    return lib;
  } catch (error) {
    return error;
  }
})();

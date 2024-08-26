"use strict";

/**
 * Submodule of quotation in ES Module type
 * @module workflow
 */

export default await (() => {
  let library, sys, interfaces, htmllogicflow, htmlrender, wfshare;
  try {
    const action_testclick = async (...args) => {
      const [event] = args;
      const { utils } = library;
      const { handler, objpick, serialize } = utils;
      const { dataformat, fmtseries } = handler;
      let output = dataformat;
      let input = fmtseries;

      try {
        input.func = {
          ...objpick(
            htmllogicflow,
            "getfiles validate uploadapi call_message handlezip failure"
          ),
          ...objpick(htmlrender, "tnode_upload"),
        };
        input.err = [
          {
            name: "general_failure",
            func: "failure",
          },
        ];
        input.share = {
          result: { callback: output.data },
          treenode: {},
        };

        input.workflow = [
          {
            name: "get_function_name",
            func: "getfuncname",
            param: [[event]],
          },
          {
            name: "validate_param",
            func: "validate",
            pull: [["get_function_name.detail"]],
          },
          {
            name: "show_message",
            func: "display",
            pull: [["validate_param.detail"]],
          },
        ];

        let rtn = await serialize(input, [library, sys]);

        console.log(rtn.data);
      } catch (error) {
        console.log(error);
      }
    };

    let lib = {
      load: (...args) => {
        const [obj] = args;
        const [kernel, sysmodule, interfacing] = obj;
        library = kernel;
        sys = sysmodule;
        interfaces = interfacing;
      },
      register: (...args) => {
        const [logicflow, render, share] = args;
        htmllogicflow = logicflow;
        htmlrender = render;
        wfshare = share;
      },
      action_testclick,
    };

    return lib;
  } catch (error) {
    return error;
  }
})();

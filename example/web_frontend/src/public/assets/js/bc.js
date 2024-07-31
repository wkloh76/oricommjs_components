"use strict";

/**
 * ES Module type in BroadcastChannel example
 * @module BroadcastChannel
 */

export default await (() => {
  return new Promise(async (resolve, reject) => {
    try {
      let {
        smfetch: { request },
      } = glib;

      let {
        jscss: { rserver },
      } = injectionjs;
      let data, datasets, wiproc;

      let lib = {};

      let $section;
      let ontap = false;
      let slidindex = 0;

      lib.onintercom = (...args) => {
        let [customevent] = args;
        console.log(customevent.data);
      };

      lib.init = async () => {
        lib.addchannel();
        await load();
      };

      lib.addchannel = () => {
        const bc = new BroadcastChannel("intercom");
        bc.onmessage = lib.onintercom;
      };
      lib.fire = () => {
        const bc = new BroadcastChannel("intercom");
        bc.postMessage("param");
        bc.close();
      };

      resolve(lib);
    } catch (error) {
      reject(error);
    }
  });
})();

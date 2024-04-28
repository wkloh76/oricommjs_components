/**
 * Copyright (c) 2023   Loh Wah Kiang at V.S. Industry Berhad WKLOH
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
var glib = {};
window.addEventListener("DOMContentLoaded", async () => {
  if (jscss) {
    if (jscss.external) {
      if (jscss.external?.css) await loadcss(jscss.external.css, "css");
      if (jscss.external?.js) await loadlib(jscss.external.js);
    }

    if (jscss.internal) {
      if (jscss.internal.css) await loadcss(jscss.internal.css, "css");
      if (jscss.internal.js) await loadlib(jscss.internal.js);
    }

    if (jscss.less) {
      if (jscss.less.style) await loadcss(jscss.less.style, "less");
      if (jscss.less.js) await loadlib(jscss.less.js);
    }

    if (jscss.initialize) await initialize(jscss.initialize);
  }
});

const initialize = async (...args) => {
  let [param] = args;
  if (glib?.cbtoolbox) {
    for (let [idx, val] of param.methods.entries()) {
      let func = glib.cbtoolbox.getNestedObject(glib, val);
      if (func) await func.apply(null, param.argv[idx]);
    }
  }
  return;
};

const loadlib = async (...args) => {
  try {
    let [param] = args;
    if (param?.lists) {
      for (let item of param.lists) {
        let fn = item.split("/").pop();
        let { default: df } = await import(`${param.url}${item}.js`);
        glib[fn] = { ...df };
      }
    }
    if (param?.loads) {
      for (let item of param.loads) {
        await loadjscssfile(`${param.url}${item}.js`, "script");
      }
    }
    return;
  } catch (error) {
    console.log(error);
  }
};

const loadcss = async (...args) => {
  try {
    let [param, filetype] = args;
    for (let item of param.lists) {
      if (filetype == "css")
        await loadjscssfile(`${param.url}${item}.${filetype}`, filetype);
      if (filetype == "less")
        await loadlessfile(`${param.url}${item}.${filetype}`, filetype);
    }
  } catch (error) {
    console.log(error);
  }
};

const loadjscssfile = (...args) => {
  return new Promise(function (resolve, reject) {
    try {
      const [filename, filetype] = args;
      let nodekey = [];
      let nodevalue = [];
      let attrcss = ["rel", "type", "href"];
      let attrjs = ["type", "src"];
      let css = ["stylesheet", "text/css"];
      let js = ["text/javascript"];
      let el = document.getElementsByTagName("head").item(0);
      let targetelement = "none"; //determine element type to create nodelist from

      if (filetype == "script") {
        targetelement = "script";
        nodekey = attrjs;
        nodevalue = js;
      } else if (filetype == "css") {
        targetelement = "link";
        nodekey = attrcss;
        nodevalue = css;
      }
      nodevalue.push(`${filename}`);

      let gfgData = document.createElement(targetelement);
      for (let i in nodekey) {
        gfgData.setAttribute(nodekey[i], nodevalue[i]);
      }

      gfgData.async = false;
      gfgData.onload = () => {
        resolve();
      };
      gfgData.onerror = () => {
        reject(filename);
      };
      el.appendChild(gfgData);
    } catch (error) {
      reject(error);
    }
  });
};

const loadlessfile = (...args) => {
  return new Promise(function (resolve, reject) {
    try {
      const [filename, filetype] = args;
      let nodekey = [];
      let nodevalue = [];
      let attrcss = ["rel", "type", "href"];
      let attrjs = ["type", "src"];
      let css = ["stylesheet/less", "text/css"];
      let js = ["text/javascript"];
      let el = document.getElementsByTagName("head").item(0);
      let targetelement = "none"; //determine element type to create nodelist from

      if (filetype == "script") {
        targetelement = "script";
        nodekey = attrjs;
        nodevalue = js;
      } else if (filetype == "less") {
        targetelement = "link";
        nodekey = attrcss;
        nodevalue = css;
      }
      nodevalue.push(`${filename}`);

      let gfgData = document.createElement(targetelement);
      for (let i in nodekey) {
        gfgData.setAttribute(nodekey[i], nodevalue[i]);
      }

      el.appendChild(gfgData);
      if (filetype == "less") {
        resolve();
      } else {
        gfgData.async = false;
        gfgData.onload = () => {
          resolve();
        };
        gfgData.onerror = () => {
          reject(filename);
        };
      }
    } catch (error) {
      reject(error);
    }
  });
};

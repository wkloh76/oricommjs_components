/**
 * Copyright (c) 2023   Loh Wah Kiang at V.S. Industry Berhad 2RD
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
/**
 * The main module in components project
 * @module main_index
 */
module.exports = (...args) => {
  return new Promise(async (resolve, reject) => {
    const [params, obj] = args;
    const [pathname, curdir] = params;
    const [library, sys, cosetting] = obj;
    const { errhandler } = kernel.utils;
    const { path } = sys;
    try {
      let dir = path.join(pathname, "src");
      resolve(await require(dir)([dir, curdir], obj));
    } catch (error) {
      reject(errhandler(error));
    }
  });
};

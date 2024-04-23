"use strict";

/**
 * auth
 * @module auth
 */

module.exports = (compname) => {
    return new Promise(async (resolve, reject) => {
        try {
            let lib = {};

            lib["auth_text"] = (...args) => {
                let [request, response] = args;
                try {
                    let { headers, protocol, session } = request;
                    let { err, fname, render } = response;

                    if (session.loginid != "" && session.loginid != undefined) {
                        session.cookie.expires = new Date(
                            Date.now() + renewexpire
                        );
                        session.cookie.maxAge = renewexpire;
                    } else {
                        err.render.options.text = `Forbidden <a href="${protocol}://${headers.host}">Back to home</a>`;
                    }
                    console.log(`${fname} done`);
                    return response;
                } catch (error) {
                    response.err.error = error.message;
                    return response;
                }
            };
            lib["auth_json"] = (...args) => {
                let [request, response] = args;
                try {
                    let { session } = request;
                    let { err, fname, render } = response;

                    if (session.loginid != "" && session.loginid != undefined) {
                        session.cookie.expires = new Date(
                            Date.now() + renewexpire
                        );
                        session.cookie.maxAge = renewexpire;
                    } else {
                        err.render.options.json = {
                            code: -1,
                            msg: `Authentication failure!`,
                            data: null,
                        };
                    }
                    console.log(`${fname} done`);
                    return response;
                } catch (error) {
                    response.err.error = error.message;
                    return response;
                }
            };
            lib["auth_pass"] = (...args) => {
                let [request, response] = args;
                try {
                    let { fname } = response;

                    console.log(`${fname} done`);
                    return response;
                } catch (error) {
                    response.err.error = error.message;
                    return response;
                }
            };

            lib["permit"] = (...args) => {
                let [request, response] = args;
                try {
                    let { fname } = response;

                    console.log(`${fname} done`);
                    return response;
                } catch (error) {
                    response.err.error = error.message;
                    return response;
                }
            };
            lib["combine"] = (...args) => {
                let [request, response] = args;
                try {
                    let { fname } = response;

                    console.log(`${fname} done`);
                    return response;
                } catch (error) {
                    response.err.error = error.message;
                    return response;
                }
            };
            lib["end"] = (...args) => {
                let [request, response] = args;
                try {
                    let { fname } = response;

                    console.log(`${fname} done`);
                    return response;
                } catch (error) {
                    response.err.error = error.message;
                    return response;
                }
            };
            lib["auth_syserr"] = (...args) => {
                let [request, response] = args;
                try {
                    let { headers, protocol, session } = request;
                    let { err, fname, render } = respons;

                    if (session.loginid != "" && session.loginid != undefined) {
                        session.cookie.expires = new Date(
                            Date.now() + renewexpire
                        );
                        session.cookie.maxAge = renewexpire;
                    } else {
                        err.render.options.text = `Forbidden <a href="${protocol}://${headers.host}">Back to home</a>`;
                    }
                    console.log(`${fname} done`);
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

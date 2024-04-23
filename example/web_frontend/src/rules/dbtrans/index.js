"use strict";

/**
 * mariadb
 * @module auth
 */

module.exports = (compname) => {
    return new Promise(async (resolve, reject) => {
        try {
            let lib = {};

            lib["mystart"] = async (...args) => {
                let [request, response] = args;
                try {
                    let { fname } = response;
                    let conn_id = 1;

                    console.log(`${fname} done`);

                    response.rule = {
                        ...response.rule,
                        ...{ track_sys: conn_id },
                    };
                    console.log(`Create ${conn_id}`);

                    return response;
                } catch (error) {
                    response.err.error = error.message;
                    return response;
                }
            };
            lib["mystop"] = (...args) => {
                let [request, response] = args;
                try {
                    // Here can't get response value
                    let { fname } = response;

                    console.log(
                        `${fname} done end ${response.rule["track_sys"]}`
                    );

                    return response;
                } catch (error) {
                    response.err.error = error.message;
                    return response;
                }
            };
            resolve(lib);
        } catch (e) {
            reject(e);
        }
    });
};

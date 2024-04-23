export default (() => {
    return new Promise(async (resolve, reject) => {
        try {
            let lib = {};
            console.log("sample.js say hello!");

            resolve(lib);
        } catch (error) {
            reject(error);
        }
    });
})();

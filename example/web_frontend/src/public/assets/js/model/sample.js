export default (() => {
  return new Promise(async (resolve, reject) => {
    try {
      let lib = {};
      lib.init = (data) =>
        console.log(`sample.js call init function and data is ${data}`);

      resolve(lib);
    } catch (error) {
      reject(error);
    }
  });
})();

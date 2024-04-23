module.exports = (compname) => {
  return new Promise(async (resolve, reject) => {
    try {
      let lib = {};
      lib.sleep = (ms, infinate = null) => {
        return new Promise((resolve) => {
          if (infinate !== null) setTimeout(resolve, ms);
        });
      };
      var c = 0;
      setInterval(function () {
        console.log(`hello web_frontend ${c}`);
        c += 1;
      }, 2000);
      resolve(lib);
    } catch (e) {
      reject(e);
    }
  });
};

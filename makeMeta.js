// //requiring path and fs modules
// const path = require('path');
// const promisify = require('promisify-node')
// const fs = promisify('fs');
// const { exec, spawn, fork, execFile } = require('promisify-child-process');
// const fileName = 'styleguide.js'
// async function exec_it() {

//     try {
//         const { stdout, stderr } = await exec('npm run build');

//         const directoryPath = path.join(__dirname, 'dist');

//         const files = await fs.readdir(directoryPath);

//         file = files.filter((f)=>f.endsWith(fileName))
//         if(file.length) {
//             hash = file[0].split('-')[0]
//             await fs.writeFile(`${directoryPath}/meta.txt`, hash)
//             console.log(file)
//         }

//     } catch (e) {
//         throw (e)
//     }

// }
// exec_it()

//requiring path and fs modules
const path = require("path");
const promisify = require("promisify-node");

const fs = promisify("fs");

const { exec, spawn, fork, execFile } = require("promisify-child-process");
// const fileName = 'root-config.js';

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

// sequentially
const asyncFilter = async (arr, predicate) =>
  arr.reduce(
    async (memo, e) => [...(await memo), ...((await predicate(e)) ? [e] : [])],
    []
  );
async function exec_it() {
  try {
    const { stdout, stderr } = await exec("npm run build");

    const directoryPath = path.join(__dirname, "dist");

    let files = await fs.readdir(directoryPath);
    let hash = "";
    files = files.filter(function (file) {
      const stat = fs.statSync(directoryPath + "/" + file);

      if (stat.isDirectory()) {
        hash = file;
        return false;
      }
      return true;
    });

    asyncForEach(files, async function (file) {
      await fs.rename(
        path.join(directoryPath, file),
        path.join(directoryPath, hash, file)
      );
    });

    await fs.writeFile(`${directoryPath}/meta.txt`, hash);
  } catch (e) {
    throw e;
  }
}
exec_it();

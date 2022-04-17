var path = require('path'),
    fs = require("fs");

//joining path of directory
const directoryPath = path.join(__dirname, 'responses');
var responseFiles = [];
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        console.log(file);
        let key = file.replace(/\.[^/.]+$/, "");
        responseFiles[key] = path.join(directoryPath,file);
    });
});
async function processLineByLine() {
    const fileStream = fs.createReadStream('datos_nomivac_covid19');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    for await (const line of rl) {
        // Each line in input.txt will be successively available here as `line`.
        console.log(`Line from file: ${line}`);
    }
}

processLineByLine();
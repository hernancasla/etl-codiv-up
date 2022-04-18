/*var path = require('path'),
    fs = require("fs");
const readline = require('readline');

const directoryPath = path.join(__dirname, 'responses');
var responseFiles = [];

async function processLineByLine() {
    const fileStream = fs.createReadStream('resources/head-10.csv');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        // Each line in input.txt will be successively available here as `line`.
        console.log(`Line from file: ${line}`);
    }
}

processLineByLine();*/

const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
var i = 0;

function processUnitaryData(data){
    console.log(i++);
}

fs.createReadStream(path.resolve(__dirname, 'resources', 'head-10.csv'))
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', processUnitaryData)
    .on('end', rowCount => console.log(`Parsed ${rowCount} rows`));
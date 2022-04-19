const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
var i = 0;
var index = 0;
const modValue = 11;
const outputDirectory = path.resolve(__dirname, 'output');

fs.readdir(outputDirectory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
        fs.unlink(path.join(outputDirectory, file), err => {
            if (err) throw err;
        });
    }
});

function processUnitaryData(data){
    let insert = "";
    let separator = ","
    if(i%modValue==modValue-1){
        separator = ";"
    }
    if(i%modValue==0){
        index = i/modValue;
        insert = "insert into vactination(row1,row2,row3,row4,row5) values\n";
    }
    let sentence = `${insert}(\'${data.sexo}','${data.grupo_etario}\',\'${data.jurisdiccion_residencia_id}\',\'${data.depto_residencia}\',${data.fecha_aplicacion})${separator}\n`;
    let filePath = path.resolve(__dirname, 'output', `example_file_${index}.txt`);
    fs.appendFileSync(filePath, sentence, {encoding:"utf8",flag:"a"}, (err) => {if(err) console.log(err)});
    i++;
}

fs.createReadStream(path.resolve(__dirname, 'resources', 'head-10.csv'))
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', processUnitaryData)
    .on('end', rowCount => console.log(`Parsed ${rowCount} rows`));
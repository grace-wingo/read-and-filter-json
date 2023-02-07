const fs = require("fs");
const StreamArray = require('stream-json/streamers/StreamArray');

const files = ['records1.json', 'records2.json', 'records3.json', 'records4.json', 'records5.json', 'records6.json'];
const writableStream = fs.createWriteStream("filteredRecord.json", { flags: 'a' });

function readAndFilterJSON(files) {
    // Create an array to store the json in. 
    writableStream.write('[')

    writableStream.on('error', (error) => {
        console.log('Error writing data', error)
    })

    // Loop through each file to read, filter, and write the data to a new file.
    let readStream;

    for (let i = 0; i < files.length; i++) {

        // Create a read stream for each file.
        readStream = fs.createReadStream(files[i]).pipe(StreamArray.withParser());

        // On receiving data, filter according to the specified criteria and write the data as we recieve it. 
        readStream
            .on("data", (chunk) => {
                let tempBalance = chunk.value.balance.replace(/[^0-9.-]+/g, "");

                if (chunk.value.isActive == true && parseFloat(tempBalance) > 2000 && compareTime(chunk.value.registered, 'January 1 2016')) {
                    // Write the filtered data to the new file, with two spaces for indentation
                    writableStream.write(JSON.stringify(chunk.value, null, 2) + ",", 'utf-8');
                }
            })
    }

    // On end, close the brackets to finish the array of filtered data. 
    readStream.on("end", () => {
        console.log("Job complete.");
        writableStream.write(']')
    });

    // Handle errors on each stream
    readStream
        .on('error', function (e) {
            console.log("There was an error reading the data", data)
            handleError(e)
        })
        .pipe(writableStream)
        .on('error', function (e) {
            console.log("There was an error writing the data", err.stack);
            handleError(e)
        })
}

function compareTime(time1, time2) {
    return new Date(time1) > new Date(time2);
}

readAndFilterJSON(files);

module.exports = { readAndFilterJSON };
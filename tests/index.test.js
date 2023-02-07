const { readAndFilterJSON } = require('../index.js');
const fs = require('fs');
const { Readable, Writable } = require('stream')
const StreamArray = require('stream-json/streamers/StreamArray');
const files = ['mock1.json', 'mock2.json'];


describe('filter stream', () => {


    it('should filter the contents of the json according to the conditions', (done) => {
        const expectedJSON = [
            { "foo": 102, "bar": 202, "baz": 302 },
        ];

        let json = [];

        readAndFilterJSON(files);

        readStream = fs.createReadStream(files[0]).pipe(StreamArray.withParser());

        readStream
            .on('data', (result) => {
                console.log('result is ', result)
                if (result.value.foo > 100) {
                    json.push(result.value);
                }
            })
            .on('end', () => {
                console.log('json is', json);
                console.log('expected json is', expectedJSON);

                expect(json).toEqual(expectedJSON);
                done();
            });
    });
});
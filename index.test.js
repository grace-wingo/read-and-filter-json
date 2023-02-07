const { readAndFilterJSON } = require('./index.js');
const fs = require('fs');
const { Readable, Writable } = require('stream')



describe('streamToFile', () => {
    // it('rejects/errors if a stream error occurs', () => {
    //     const mockReadable = new Readable()
    //     const mFiles = ['someData1.json', 'someData2.json']
    //     const filterTestFn = jest.fn();

    //     // Assert
    //     expect(mockReadable.calls[0]).toBe(mFiles);
    // })

    describe('filter stream', () => {

        const items = [
            { foo: 1, bar: 2, baz: 3 },
            { foo: 10, bar: 20, baz: 30 },
            { foo: 100, bar: 200, baz: 300 },
        ];

        it('should filter the contents of the json according to the conditions', (done) => {
            const expectedJSON = [
                { foo: 10, bar: 20, baz: 30 },
                { foo: 100, bar: 200, baz: 300 },
            ];

            let json = [];

            Readable.from(items)
                .on('data', (result) => {
                    if (result.foo > 2) {
                        json.push(result);
                    }
                })
                .on('end', () => {
                    console.log('streaming ended');
                    expect(json).toEqual(expectedJSON);
                    done();
                });
        });
    });
})

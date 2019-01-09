const fs = require('fs');
const {
    readJSON,
    writeJSON
} = require('./jsonFS');

describe('jsonFs', () => {
    describe('readJson', () => {
        it('reads a JSON file from a disk', done => {
            const obj = { snack: 'almonds' };
            const str = JSON.stringify(obj);
            // make a test file and put the str into the file so we can test it
            fs.writeFile('./testData/test', str, err => {
                //invoke function to be tested and use above data to test
                readJSON('./testData/test', (err, data) => {
                    expect(err).toBeFalsy(); 
                    //expect data to be equal to original obj because it's parsed in readJSON
                    expect(data).toEqual(obj);
                    done();
                });
            });
        });

        it('throws an error if the object is not JSON', done => {
            fs.writeFile('./testData/testNotJSON', 'sladjf', err => {
               readJSON('./testData/testNotJSON', (err, data) => {
                expect(err).toBeTruthy(); 
                done();
                }); 
            });
        });
    });

    describe('writeJSON', () => {
        it('writes JSON to disk', done => {
            const obj = { snack: 'mango' };
            writeJSON('./testData/test', obj, err => {
                const writtenJSON = obj;
                readJSON('./testData/test', (err, data) => {
                    expect(err).toBeFalsy();
                    expect(data).toEqual(writtenJSON); 
                    done();
                });
            });
        });
        
        it('throws an error if the object is not JSON', done => {
            fs.writeFile('./testData/testNotJSON', 'sladjf', err => {
               readJSON('./testData/testNotJSON', (err, data) => {
                expect(err).toBeTruthy(); 
                done();
                }); 
            });
        });
    });
});
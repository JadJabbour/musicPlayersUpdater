import CSVReader from '../../src/services/csv-reader.service';
import CSVData from '../../src/interfaces/csv-data.interface';

const onRow = (list: CSVData[]) => (data: CSVData) => list.push(data);

describe('testing CSV Reader service', () => {

    test('should throw an exception for x.csv (file does exist)', done => {
        const t = () => {
            const reader = new CSVReader('./csv/x.csv'); 
        }
        expect(t).toThrow(Error);
        done();
    });

    test('should read 16 rows from input.csv', done => {
        const reader = new CSVReader('./csv/input.csv'); 
        const list: CSVData[] = [];
        reader.read(onRow(list), () => {
            expect(list.length).toBe(16);
            done();
        });
    });
    
    test('row object should have a property of mac_addresses from input.csv', done => {
        const reader = new CSVReader('./csv/input.csv'); 
        const list: CSVData[] = [];
        reader.read(onRow(list), () => {
            list.forEach((data: CSVData) => {
                if (!data.hasOwnProperty('mac_addresses')) {
                    throw new Error('failed test');
                }
            });
            done();
        });
    });

    test('should read 13 rows from input1.csv', done => {
        const reader = new CSVReader('./csv/input1.csv'); 
        const list: CSVData[] = [];
        reader.read(onRow(list), () => {
            expect(list.length).toBe(13);
            done();
        });
    });
    
    test('row object should NOT have a property of mac_addresses from input1.csv', done => {
        const reader = new CSVReader('./csv/input1.csv'); 
        const list: CSVData[] = [];
        reader.read(onRow(list), () => {
            list.forEach((data: CSVData) => {
                if (data.hasOwnProperty('mac_addresses')) {
                    throw new Error('failed test');
                }
            });
            done();
        });
    });

    test('should read 9 rows from input2.csv', done => {
        const reader = new CSVReader('./csv/input2.csv'); 
        const list: CSVData[] = [];
        reader.read(onRow(list), () => {
            expect(list.length).toBe(9);
            done();
        });
    });
    
    test('row object should have a property of mac_addresses from input2.csv', done => {
        const reader = new CSVReader('./csv/input2.csv'); 
        const list: CSVData[] = [];
        reader.read(onRow(list), () => {
            list.forEach((data: CSVData) => {
                if (!data.hasOwnProperty('mac_addresses')) {
                    throw new Error('failed test');
                }
            });
            done();
        });
    });

});
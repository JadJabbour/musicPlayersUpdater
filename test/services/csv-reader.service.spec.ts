import CSVReader from '../../src/services/csv-reader.service';
import CSVData from '../../src/interfaces/csv-data.interface';

const onRow = (list: CSVData[]) => (data: CSVData) => list.push(data);

describe('testing CSV Reader service', () => {

    let reader = new CSVReader('../../csv/input.csv'); 
    let list: CSVData[] = [];
    reader.read(onRow(list), () => {
        testAgainstInputCSV(list);
        reader = new CSVReader('../../csv/input1.csv'); 
        list = [];
        reader.read(onRow(list), () => {
            testAgainstInput1CSV(list);
            reader = new CSVReader('../../csv/input2.csv'); 
            list = [];
            reader.read(onRow(list), () => {
                testAgainstInput2CSV(list);
            });
        });
    });
    
});

const testAgainstInputCSV = (list) => {
    test('should read 16 rows from input.csv', () => {
        expect(list.length).toBe(16);
    });

    test('row object should have a property of mac_addresses from input.csv', () => {
        list.forEach((data: CSVData) => {
            if (!data.hasOwnProperty('mac_addresses')) {
                fail();
            }
        });
    });
}

const testAgainstInput1CSV = (list) => {
    test('should read 13 rows from input1.csv', () => {
        expect(list.length).toBe(13);
    });

    test('row object should NOT have a property of mac_addresses', () => {
        list.forEach((data: CSVData) => {
            if (data.hasOwnProperty('mac_addresses')) {
                fail();
            }
        });
    });
}

const testAgainstInput2CSV = (list) => {
    test('should read 9 rows from input2.csv', () => {
        expect(list.length).toBe(9);
    });

    test('row object should have a property of mac_addresses', () => {
        list.forEach((data: CSVData) => {
            if (!data.hasOwnProperty('mac_addresses')) {
                fail();
            }
        });
    });
}
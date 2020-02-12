import fs from 'fs';
import CsvReadableStream  from 'csv-reader';

export default class CSVReader {

    /**
     * Private property inputStream as fs ReadStream
     */
    private inputStream: fs.ReadStream;

    /**
     * Private property path as string
     */
    private path: string;

    /**
     * Private property csvReader as CsvReadableStream
     */
    private csvReader: CsvReadableStream;

    /**
     * CSVReader constructor
     * @param path the path to the csv file
     */
    constructor(path: string) {
        this.csvReader = new CsvReadableStream({ 
            skipHeader: true, 
            asObject: true, 
            parseNumbers: true, 
            parseBooleans: true, 
            trim: true 
        });
        this.path = path;
        this.inputStream = fs.createReadStream(this.path, 'utf8');
    }

    public read(onRow: Function, onEnd?: Function): CsvReadableStream {
        return this.inputStream
            .pipe(this.csvReader)
            .on('data', function (row) {
                onRow(row);
            })
            .on('end', function () {
                if(onEnd !== undefined){
                    onEnd();
                }
            });
    }
}
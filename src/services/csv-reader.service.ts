import fs from 'fs';
import CsvReadableStream  from 'csv-reader';

/**
 * CSV reader service
 */
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
     * CSVReader constructor initialized input stream and csv stream reader
     * @param path the path to the csv file
     */
    constructor(path: string) {
            if(!fs.existsSync(path)){
                throw new Error('file does not exist');
            }
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

    /**
     * starts the file stream reading process
     * @param onRow function to run on new row data emitted
     * @param onEnd function to run on read end
     */
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
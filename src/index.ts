import main from './main';
import Logger from './services/logger.service';
import yargs  from 'yargs';

/**
 * using yargs package to format input args
 */
const argv = yargs
    .option('file', {
        alias: '--file',
        description: 'Supply the CSV file path to be used',
        type: 'string'
    })
    .help()
    .alias('--help', '-h')
    .argv;
    
/**
 * Creates a new instance of logger to be used throughout the process
 */
const logging = new Logger();

/**
 * Wrapper around the main process
 * @param csvPath 
 */
const runAutoUpdaterAndOutput = (csvPath: string) => main(csvPath, logging).then(logging.logger.info);

/**
 * Reads the required input (CSV file path) from process.argv
 */
const requiredInput = () => argv.file;

try{
    /**
     * checks if csv file path has been supplied
     * throws an error otherwise
     */
    const inputFile = requiredInput();
    if(inputFile === undefined){
        console.log('invalid or empty input file');
        throw new Error('invalid or empty input file');
    }

    /** Runs the auto-updated against the input CSV file and exits process when all promises are resolved */
    runAutoUpdaterAndOutput(inputFile).then(() => process.nextTick(() => process.exit()));
} catch(e) {
    /** catch-all error logger */
    logging.logger.error(e);    
    console.log('An error has occured, please check the log files');

    // exists process on error 
    process.nextTick(() => process.exit())
}

import main from './main';
import Logger from './services/logger.service';

/**
 * Creates a new instance of logger to be used throughout the process
 */
const logging = new Logger();

/**
 * Wrapper around the main process
 * @param csvPath 
 */
const runAutoUpdaterAndOutput = (csvPath: string) => logging.logger.info(main(csvPath, logging));

/**
 * Reads the required input (CSV file path) from process.argv
 */
const requiredInput = () => process.argv[process.argv.length - 1];

try{
    /** Runs the auto-updated against the input CSV file */
    runAutoUpdaterAndOutput(requiredInput());
} catch(e) {
    /** catch-all error logger */
    logging.logger.error(e);    
    console.log('An error has occured, please check the log files');
}

//  afa4ded61ae80f0356e881a03d8daac449a5d850
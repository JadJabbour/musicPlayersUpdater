import fs from 'fs';
import Log from 'simple-node-logger';

/**
 * Logging service
 */
export default class Logging {
    /**
     * internal simple-node-logger object
     */
    public logger: any;

    /**
     * Creates an instance of Logging and initializes internal logger setting level to 'all'
     * @param [opts] optional paramater including options for simple-node-logger
     */
    constructor(opts?: any) {
        if (!fs.existsSync('logs')){
            fs.mkdirSync('logs');
        }

        this.logger = Log.createRollingFileLogger({
            logDirectory: 'logs', 
            fileNamePattern: 'roll-<DATE>.log',
            dateFormat: 'YYYY.MM.DD',
            ...opts
        });

        this.logger.setLevel('all');
    }

}
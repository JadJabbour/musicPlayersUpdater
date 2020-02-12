import Log from 'simple-node-logger';

export default class Logging {
    /**
     * Logger object
     */
    public logger: any;

    /**
     * Creates an instance of Logging and initializes internal logger
     * @param [opts] optional paramater including options for simple-node-logger
     */
    constructor(opts?: any) {
        this.logger = Log.createRollingFileLogger({
            logDirectory: 'logs', 
            fileNamePattern: 'roll-<DATE>.log',
            dateFormat: 'YYYY.MM.DD',
            ...opts
        });
    }

}
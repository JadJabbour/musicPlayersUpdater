import ProcessStatus from './interfaces/process-status.interface';
import Logging from './services/logger.service';

const main = (csvPath: string): ProcessStatus => {

    return {
        file: {
            path: csvPath,
            validCSV: false
        },
        error: { 
            service: 'main', 
            function: 'main',
            message: 'not implemented', 
            data: {}
        }
    }
}

export default main;